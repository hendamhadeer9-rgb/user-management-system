import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";


interface User {
  id: number;
  image: string;
  username: string;
  email: string;
  phone: string;
  age: number;
}

export default function UsersList() {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);
  const [username, setUserName] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (user:any) =>{
    setUserId(user.id);
    setUserName(user.username)
     setShow(true);
  }
  let deleteUser = async ()=>{
    try {
      let response = await axios.delete(`https://dummyjson.com/users/${userId}`)
    handleClose()
    toast.success(`${username} deleted successfully`)
    console.log(response)
    } catch (error) {
      toast.error(`${username} not deleted`)
    }
  }
  let navigate = useNavigate()
  let [users,setUsers] =useState<User[]>([]);
  let usersList = async ()=>{
    let respose = await axios.get('https://dummyjson.com/users')
    setUsers(respose.data.users)
  }
  useEffect(()=>{
    usersList()
  }
    ,[])
  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete {username} </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={deleteUser}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>


    <div className="container-fluid bg-light">
      <div className="d-flex justify-content-between mx-4 pt-3">
        <h3>Users List</h3>
        <button onClick={()=>navigate('/home/userdata')}  className="btn btn-warning text-white px-5 ">Add new User</button>
      </div>
      <hr className="text-secondary"/>
      <table className="table text-center">
  <thead>
    <tr>
      <th scope="col">   </th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Age</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {users.map(user=>
    <tr key={user.id}>
      <th scope="row"><img className="w-25" src={user.image} alt="image" /></th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.age}</td>
      <td><i onClick={()=>navigate(`/home/editdata/${user.id}`)} className="fa-solid fa-pen text-warning mx-2"></i><i onClick={()=>handleShow(user)} className="fa-solid fa-trash text-warning mx-2"></i></td>
    </tr>
    )}
    
  </tbody>
</table>
    </div>

    </>
  )
}
