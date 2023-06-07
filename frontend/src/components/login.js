import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

// Create a login page here
const Login=()=> {


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const submitFormHandler = async(e) => {
        e.preventDefault();
        console.log('form submitted');
        try{
            console.log("running 2")
            const response=await fetch('http://localhost:3000/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            });
            console.log("running")
            const data=await response.json();
            console.log(data);
            // data?.map((item)=>{
            //     console.log(item.name)
            //     }
            //     );
            
            console.log("login successfull")
            // wants to show on the page that login is successfull
            alert(data.message);
            navigate('/');
        }catch(err){
            console.log("error occured")
            console.log(err);
        }

    };

    return (
        <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover"
      
    >
      <div className="bg-white p-8 rounded shadow-md"
      >
        
        <div className="relative z-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between">
              <Link to="/">
                <button
                onClick={submitFormHandler}
                  // onClick={handleSubmit}
                  type="submit"
                  className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                  // className="bg-grey-500 text-white py-2 px-4 rounded hover:bg-grey-600 focus:outline-none focus:bg-grey-600"
                  style={{
                    marginLeft:'80px',
                  }}
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="submit"
                  // className="bg-grey-500 text-white py-2 px-4 rounded hover:bg-grey-600 focus:outline-none focus:bg-grey-600"
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  style={{
                    marginRight:'80px',
                  }}
                >
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
}

export default Login;
