import React,{useState} from 'react'
// show clients component

function ShowClients(props) {


    const [editModalOpen, setEditModalOpen] = useState(false);
  const [editClientId, setEditClientId] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editid, setEditid] = useState('');
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

  const handleEditModalSubmit = (e) => {
    e.preventDefault();

    const updatedClient = {
      name: editName,
      email: editEmail,
      address: editAddress,
      phone: editPhone,
    };

    updateClient(editClientId, updatedClient)
      .then((response) => {
        // Handle the successful update
        console.log('Client information updated successfully');
        // Close the edit modal
        setEditModalOpen(false);
      })
      .catch((error) => {
        // Handle the error
        console.error('Error updating client information', error);
      });
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
    const clients = props.clientinfo;
    console.log(clients)

    const updateClient = async (clientId, updatedClient) => {
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




  return (
    
    <div>
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
        {clients?.map((client) => (
            <tr key={client._id}>
                <td className="border px-4 py-2">{client.name}</td>
                <td className="border px-4 py-2">{client.email}</td>
                <td className="border px-4 py-2">{client.phone}</td>
                <td className="border px-4 py-2">{client.address}</td>
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
            
            
            
            
        ))}


    </tbody>
        </table>
        <div>
        {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <input type="text" className='h-96 p-96 ' />
                        </div>
                        </div>
            )}
        </div>
        </div>
  )
}

export default ShowClients;