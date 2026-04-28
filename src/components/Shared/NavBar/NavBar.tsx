import { useContext } from "react";
import { AuthContext } from "../../Authcontext/Authcontext";

export default function NavBar() {
    let {loginData} = useContext(AuthContext)!;
  
  return (
    <>
      <nav className="navbar navbar-light bg-white">
  <div className="container-fluid">
    <a className="navbar-brand">hello {loginData?.firstName}</a>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-warning" type="submit">Search</button>
    </form>
  </div>
</nav>
    </>
  )
}
