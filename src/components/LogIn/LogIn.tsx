import axios from "axios"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../Authcontext/Authcontext"

export default function LogIn() {
  let {saveLoginData} = useContext(AuthContext)!;
  let navigate = useNavigate();
  let {register , handleSubmit , formState:{errors}} = useForm();
  const onSubmit = async (data:any)=>{
    try {
      let response = await axios.post ('https://dummyjson.com/auth/login',data);
      localStorage.setItem('token',response.data.accessToken);
      saveLoginData()
    navigate('/home/userslist');
    toast.success("loged in succesfully")
    } catch (error) {
    toast.error("loged in failed")

      
    }
  }
  return (
    <>
      <div className="login-container ">
        <div className='container-fluid'>
      <div className="row justify-content-center align-content-center vh-100">
        <div className="col-md-6 col-lg-4 col-sm-8 bg-white p-5 rounded rounded-5">
          <div className="title text-center">
            <h3 className='title-color rounded rounded-2'>User Management system</h3>
          <div className='my-5'>
            <h4 >SIGN IN</h4>
          <small>Enter your credentials to access your account</small>
          </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className='my-2 px-2'>User Name</label>
            <input className='form-control' {...register("username",{required:"username is required"})} type='text' placeholder='enter your name'/>
            {errors.username&& <p className="alert alert-danger mt-2 p-1 text-center">{String(errors.username.message)}</p>}
            <label className='my-2 px-2'>Password</label>
            <input className='form-control' {...register("password",{required:"password is reqquired"})} type='password' placeholder='enter your password'/>
            {errors.password&& <p className="alert alert-danger mt-2 p-1 text-center">{String(errors.password.message)}</p>}
             <button className='btn btn-warning w-100 text-white my-4'>login</button>
          </form>
        </div>
      </div>
    </div>
      </div>
    </>
  )
}
