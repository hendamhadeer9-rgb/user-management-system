import  { useContext, useEffect} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Authcontext/Authcontext';

export default function UserProfile() {
    let {loginData} = useContext(AuthContext)!;
  const { register, setValue } = useForm();

  useEffect(() => {
    if (loginData?.id){
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`https://dummyjson.com/users/${loginData.id}`);
        setValue("firstName", data.firstName);
        setValue("lastName", data.lastName);
        setValue("email", data.email);
        setValue("phone", data.phone);
      } catch (error) {
        console.error("Error loading profile", error);
      }
    };
    fetchProfile();
}}, [setValue, loginData?.id]);


  return (
    <div className="container mt-5">
      <div className="card shadow p-4 bg-white">
        <div className="text-center mb-4">
          <img src={loginData?.image} className="rounded-circle border" alt="profile" />
          <h2 className="mt-2">{loginData?.firstName}</h2>
        </div>
        
        <form className="row g-3 mb-5">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input 
              {...register("firstName")} className="form-control bg-light" readOnly/>
          </div>

          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input {...register("lastName")} className="form-control bg-light" readOnly />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input 
              {...register("email")} className="form-control bg-light" readOnly />
          </div>

          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input 
              {...register("age")} className="form-control bg-light" readOnly />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input 
              {...register("phone")} className="form-control bg-light" readOnly />
          </div>

          <div className="col-md-6">
            <label className="form-label">Birth Date</label>
            <input 
              {...register("birthDate")} className="form-control bg-light" readOnly />
          </div>

        
        </form>
      </div>
    </div>
  );
}