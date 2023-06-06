import ReactDOM from "react-dom/client";


// main app component

const App = () => {
    return (
        <div>
        <h1 className='bg-red-900'  >React App1</h1>
        </div>
    );
    }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);