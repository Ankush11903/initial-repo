import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter,Outlet } from "react-router-dom";
import Login from "./login";
import Navbar from "./Navbar";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Ratesform from "./Ratesform";
import Clients from "./clients";

// main app component
// Create an application for courier delivery with the following functionalities


// a. Admin should be able to login and add the rates based on weight and distance.
// b. Admin should be able to take in client information along with his photograph, and should also be able to add, edit, and delete the information.
// c. Admin should be able to add the consignment details along with the date of delivery.



const App = () => {
  return (
    <div>
      <Navbar />
        <Outlet />
    </div>
  );
};


const Body = () => {
    return (
      <div>
        <h1 className="bg-red-900">React App</h1>
      </div>
    );
  };
const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/rates",
          element: <Ratesform />,
        },
        {
          path: "/client",
          element: <Clients />,
        },]
      
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Register />,
    }
    

  ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Router} />);
