import React, { useState } from "react";
import { useEffect } from "react";
import ShowClients from "./ShowClients";

//creating a clients component for admin to add client information along with his photograph
//wants to show list of clients and their details and admin can add, edit and delete the information
// name:req.body.name,
// email:req.body.email,
// address:req.body.address,
// phone:req.body.phone,
// photo:req.file.filename
// clients schema

function clients() {
  // wants to call the api and get the list of clients and their details
  var num=1;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [clients, setClients] = useState([]);
  const [clientinfo, setClientinfo] = useState([]);
  const [selectedClientid, setSelectedClientid] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [rates, setRates] = useState([]);
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [deletesinfo, setDeletesinfo] = useState([]);

    
      const handleWeightChange = (e) => {
        setWeight(e.target.value);
      };
    
      const handleDistanceChange = (e) => {
        setDistance(e.target.value);
      };
  const handleEdit = (clientId) => {
    setSelectedClientid(clientId.id);
    setEditMode(true);
  };
  

  useEffect(() => {
    
    fetch("http://localhost:3000/clientsinfo")
      .then((res) => res.json())
      .then((data) => {
        setClientinfo(data);
        console.log(data);
      }).catch(err=>{
        console.log(err)
    })
    try{
            
        fetch('http://localhost:3000/deletesinfo')
        .then(res=>res.json())
        .then(data=>{
            setDeletesinfo(data)
            console.log(data)
        }).catch(err=>{
          console.log(err)
      })
      }
          catch(err){
              console.log(err)
          }
        
  }, []);

  // wants to call the api and get the list of clients and their details

  const handleRestore = async (client) => {
    const response = await fetch(
        `http://localhost:3000/deletes/${client._id}`,
        {
            method: "DELETE",
        }
    );
    const data = await response.json();
    console.log(data);
    fetch("http://localhost:3000/clientsinfo").then((res) => res.json())
    .then((data) => {
        setClientinfo(data);
        console.log(data);
    }
    );
    fetch("http://localhost:3000/deletesinfo").then((res) => res.json())
    .then((data) => {
        setDeletesinfo(data);
        console.log(data);
    }
    );
    };



  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  
 
  

  const handleSubmit=async(e)=>{
      console.log("adding")
      e.preventDefault()
      const formData=new FormData()
      formData.append('name',name)
      formData.append('email',email)
      formData.append('address',address)
      formData.append('phone',phone)
      formData.append('photo',photo)


      const requestData = {
        weight: weight,
        distance: distance
      };
      
      try {
        const response = await fetch('http://localhost:3000/rate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });
      
        const data = await response.json();
        console.log(data);
      
        fetch('http://localhost:3000/rateinfo')
          .then(res => res.json())
          .then(data => {
            setRates(data);
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
      
        
      try{
      const response = await fetch('http://localhost:3000/clients',{
          method:'POST',
          body:formData
      })
       const data=await response.json()
      console.log(data)
      console.log("calling")
      fetch('http://localhost:3000/clientsinfo')
      .then(res=>res.json())
      .then(data=>{
          setClientinfo(data)
          console.log(data)
      }).catch(err=>{
        console.log(err)
    })
    }
        catch(err){
            console.log(err)
        }




        try{
            
            fetch('http://localhost:3000/deletesinfo')
            .then(res=>res.json())
            .then(data=>{
                setDeletesinfo(data)
                console.log(data)
            }).catch(err=>{
              console.log(err)
          })
          }
              catch(err){
                  console.log(err)
              }
     
  }

  return (
    <div className="flex flex-col">
      {/* clients information// */}
      <div className="flex justify-center items-center h-screen bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Clients Information
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleNameChange}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleEmailChange}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Enter your address"
              onChange={handleAddressChange}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone"
              onChange={handlePhoneChange}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Photo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="photo"
              type="file"
              placeholder="Enter your photo"
              onChange={handlePhotoChange}
            />
          </div>
          
        <div >
          <label htmlFor="weight">Weight:</label>
          <input type="number" id="weight" value={weight} onChange={handleWeightChange} className='border border-black'/>
        </div>
        <div>
          <label htmlFor="distance" >Distance:</label>
          <input type="number" id="distance" className='border border-black' value={distance} onChange={handleDistanceChange} />
        </div>
        
        
      
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Clients List</h2>
        <table className="table-auto">
          
          <tbody>
          <ShowClients clientinfo={clientinfo}  setDeletesinfo={setDeletesinfo} setClientinfo={setClientinfo} />


          </tbody>
        </table>
      </div>
      {/* // show the delets info */}
      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Deleted Clients List</h2>
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Photo</th>
                </tr>
            </thead>
            <tbody>
            {(deletesinfo!=null ) && deletesinfo?.map((client) => {
    return (
        <tr key={client.id}>
            <td className="border px-4 py-2">
                {client.name}
            </td>
            <td className="border px-4 py-2">
                {client.email}
            </td>
            <td className="border px-4 py-2">
                {client.address}
            </td>
            <td className="border px-4 py-2">
                {client.phone}
            </td>
            <td className="border px-4 py-2">
                <img
                src={`http://localhost:3000/uploads/${client.photo}`}
                alt="client"
                width="100px"
                height="100px"
                />
            </td>
            <td className="border px-4 py-2">
                <button onClick={() => handleRestore(client)}>Restore</button>
            </td>
        </tr>
    );
})}
            </tbody>
        </table>
        </div>
   






      {console.log(clientinfo)}
    </div>
  );
}

export default clients;
