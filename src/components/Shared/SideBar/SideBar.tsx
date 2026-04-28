import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Authcontext/Authcontext';
export default function SideBar() {
  let {loginData} = useContext(AuthContext)!;
  let [isCollaps,setIsCollaps]=useState(false);
  const toggleCollaps =()=>{
    setIsCollaps(!isCollaps)
  }
  return (
    <>
      <div className="sidebar-container text-center">
        <Sidebar collapsed={isCollaps}>
          
            <h1 className='title-color fs-5 text-start px-3 m-2 rounded '>UMS<i onClick={toggleCollaps} className='fas fa-bars text-end w-75 '></i></h1>
            <img className='rounded-circle w-50 py-4' src={loginData?.image} alt="userimage" />
            <h4>{loginData?.firstName} </h4>
            <h6 className='py-2 text-warning'>admin</h6>
          <Menu>
            <MenuItem component={<Link to="/" />}><i className="fa-solid fa-house mx-1"></i> Home </MenuItem>
            <MenuItem component={<Link to="/home/userslist" />}><i className="fa-solid fa-bookmark mx-1"></i> Users </MenuItem>
            <MenuItem component={<Link to="/home/userdata" />}><i className="fa-solid fa-user-plus mx-2"></i>Add User </MenuItem>
            <MenuItem component={<Link to="/home/userprofile" />}><i className="fa-solid fa-circle-dollar-to-slot mx-2"></i>User Profile </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  )
}
