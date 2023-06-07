import React,{useState} from 'react'
// show clients component

function ShowClients(props) {
    // console.log(props)
    const rates=props.rates;
    // console.log(rates)


    const [editModalOpen, setEditModalOpen] = useState(false);
  const [editClientId, setEditClientId] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editid, setEditid] = useState('');
    const [editPhoto, setEditPhoto] = useState('');
  const [showModal, setShowModal] = useState(false);


  const handleDelete = async (client) => {
    const response = await fetch(
        `http://localhost:3000/clients/${client._id}`,
        {
            method: "DELETE",
        }
    );
    const data = await response.json();
    console.log(data);
    fetch("http://localhost:3000/deletesinfo").then((res) => res.json())
    .then((data) => {
        props.setDeletesinfo(data);
        console.log(data);
    }
    );
    fetch("http://localhost:3000/clientsinfo")
        
        .then((res) => res.json())
        .then((data) => {
            props.setClientinfo(data);
            console.log(data);
        }
        );
        
  };

  const handleEdit = (clientId) => {
    setEditid(clientId);
    setEditModalOpen(true);
  };

  

  
    const clients = props.clientinfo;
    console.log(clients)

    const updateClient = async (clientId) => {
        setEditModalOpen(false);
        const updatedClient = {
            name: editName,
            email: editEmail,
            address: editAddress,
            phone: editPhone,
            photo: editPhoto,
          };
        
        try {
            const response = await fetch(
                `http://localhost:3000/clients/${clientId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedClient),
                }
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    // console.log(clients)




  return (
    
    <div>
        <table className="table-auto">
        <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">rate</th>
              <th className="px-4 py-2">Photo</th>
            </tr>
            
          </thead>
    <tbody>
    {clients?.map((client) => (
  (editid === client._id) ? (
    <div className='flex w-96'>
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        placeholder="Name"
        className="border border-red-900"
      />

      <input
        type="text"
        value={editEmail}
        onChange={(e) => setEditEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="text"
        value={editAddress}
        onChange={(e) => setEditAddress(e.target.value)}
        placeholder="Address"
      />

      <input
        type="text"
        value={editPhone}
        onChange={(e) => setEditPhone(e.target.value)}
        placeholder="Phone"
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
              onChange={(e)=>setEditPhoto(e.target.files[0])}
            />
      
      <button onClick={()=>updateClient(client._id)} className='p-2 h-8 ml-20 bg-blue-100'>Update</button>
    </div>
  ) : (
    <tr key={client._id}>
      <td className="border px-4 py-2">{client.name}</td>
      <td className="border px-4 py-2">{client.email}</td>
      <td className="border px-4 py-2">{client.phone}</td>
      <td className="border px-4 py-2">{client.address}</td>

      <tbody>
        {rates.map((rate) => {
          if (rate.num === client.num) {
            return (
              <tr key={rate._id}>
                <td>{rate.rate}{console.log(rate)}</td>
              </tr>
            );
          }
        })}
      </tbody>

      <td className="border px-4 py-2">
        <img
          src={`http://localhost:3000/uploads/${client.photo}`}
          alt="client"
          width="100px"
          height="100px"
        />
      </td>
      <td className="border px-4 py-2">
        <button onClick={() => handleEdit(client._id)}>Edit</button>
      </td>
      <td className="border px-4 py-2">
        <button onClick={() => handleDelete(client)}>Delete</button>
      </td>
    </tr>
  )
))}



    </tbody>
        </table>
        <div>
        
        </div>
        </div>
  )
}

export default ShowClients;