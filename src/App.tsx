import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/Shared/AuthLayout/AuthLayout'
import LogIn from './components/LogIn/LogIn'
import MasterLayout from './components/Shared/MasterLayout/MasterLayout'
import UsersList from './components/UsersList/UsersList'
import UserData from './components/UserData/UserData'
import UserProfile from './components/UserProfile/UserProfile'
import NotFound from './components/Shared/NotFound/NotFound' 
import { ToastContainer } from 'react-toastify';

function App() {
let routes = createBrowserRouter([
  {path:'',
    element:<AuthLayout/>,
    errorElement:<NotFound/>,
    children:[
    {index:true,element:<LogIn/>},
    {path:'login',element:<LogIn/>}
]

  },
  {path:'home',
    element:<MasterLayout/>,
    errorElement:<NotFound/>,
    children:[
    {index:true,element:<UsersList/>},
    {path:'userslist',element:<UsersList/>},
    {path:'userdata',element:<UserData/>},
    {path:'editdata/:id',element:<UserData/>},
    {path:'userprofile',element:<UserProfile/>}
]}
])

  return (
    <>
    <ToastContainer />
<RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
