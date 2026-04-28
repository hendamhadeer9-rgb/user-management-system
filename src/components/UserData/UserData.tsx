import axios from "axios";
import { useEffect } from "react"; 
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserData() {
  let { id } = useParams();
  let isEditMode = Boolean(id); 
  let navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();


  useEffect(() => {
    if (isEditMode) {
      const getUserData = async () => {
        try {
          let { data } = await axios.get(`https://dummyjson.com/users/${id}`);
          setValue("firstName", data.firstName);
          setValue("lastName", data.lastName);
          setValue("email", data.email);
          setValue("age", data.age);
          setValue("phone", data.phone);
          setValue("birthDate", data.birthDate);
        } catch (error) {
          toast.error("Failed to load user data");
        }
      };
      getUserData();
    }
  }, [id, isEditMode, setValue]);


  const onSubmit = async (data: any) => {
    try {
      if (isEditMode) {
        await axios.put(`https://dummyjson.com/users/${id}`, data);
        toast.success("User updated successfully");
      } else {
        await axios.post('https://dummyjson.com/users/add', data);
        toast.success("User added successfully");
      }
      navigate('/home/userslist');
    } catch (error) {
      console.log(error);
      toast.error(isEditMode ? "Update failed" : "Addition failed");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between mx-4 pt-3">
          <h3>{isEditMode ? "Update User" : "Add User"}</h3>
        </div>
        <hr className="mx-4" />

        <form onSubmit={handleSubmit(onSubmit)} className="m-5 shadow-lg p-4 bg-white rounded">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label px-2">First Name</label>
              <input {...register('firstName', { required: "First name is required", pattern: { value: /^[A-Za-z\u0600-\u06FF\s]+$/, message: "Letters only" }, minLength: { value: 2, message: "Min 2 chars" } })} className="form-control" type="text" placeholder="Enter your First Name" />
              {errors.firstName && <p className="alert alert-danger mt-2 p-1 text-center">{String(errors?.firstName.message)}</p>}
            </div>

            <div className="col-md-6">
              <label className="form-label px-2">Last Name</label>
              <input {...register('lastName', { required: "Last name is required", pattern: { value: /^[A-Za-z\u0600-\u06FF\s]+$/, message: "Letters only" }, minLength: { value: 2, message: "Min 2 chars" } })} className="form-control" type="text" placeholder="Enter your Last Name" />
              {errors.lastName && <p className="alert alert-danger mt-2 p-1 text-center">{String(errors?.lastName.message)}</p>}
            </div>
          </div>


          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label px-2">Email</label>
              <input {...register('email', { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" } })} className="form-control" type="email" placeholder="Enter your Email" />
              {errors.email && <p className="alert alert-danger mt-2 p-1 text-center">{String(errors?.email.message)}</p>}
            </div>
            <div className="col-md-6">
              <label className="form-label px-2">Age</label>
              <input {...register('age', { required: "Age is required", min: { value: 10, message: "Min age 10" }, max: { value: 80, message: "Max age 80" } })} className="form-control" type="number" placeholder="Enter your Age" />
              {errors.age && <p className="alert alert-danger mt-2 p-1 text-center">{String(errors?.age.message)}</p>}
            </div>
          </div>


          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label px-2">Phone Number</label>
              <input {...register('phone', { required: "Phone is required", pattern: { value: /^[0-9]{10,15}$/, message: "Invalid phone" } })} className="form-control" type="text" placeholder="Enter your Phone" />
              {errors.phone && <p className="alert alert-danger mt-2 p-1 text-center">{String(errors?.phone.message)}</p>}
            </div>
            <div className="col-md-6">
              <label className="form-label px-2">Birth Date</label>
              <input {...register('birthDate', { required: "Birth date is required" })} className="form-control" type="date" />
              {errors.birthDate && <p className="alert alert-danger mt-2 p-1 text-center">{String(errors?.birthDate.message)}</p>}
            </div>
          </div>


          <div className="text-center mt-4">
            <button className="btn btn-warning text-white px-5 w-50 fw-bold">
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}