import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa"
import houz_logo from '../assets/houz_logo.png';
import { logout, reset } from '../features/auth/authSlice';

const Navbar = () => {  

  const [navbarOpen, setNavbarOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);   

  const Logout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate('/');
  }

  return (
    <header className="fixed z-20 top-0 left-0 right-0  bg-[#1B4571] text-white w-full h-fit lg:h-[13vh] lg:items-center flex flex-col lg:flex-row justify-items-start lg:justify-between lg:px-5">
                 
      <div className="flex justify-between mr-4">
        <Link to="/">
          <img src={houz_logo} alt="logo" className="w-[125px] h-[75px]"/>                
        </Link>

        <button className="text-2xl block lg:hidden" onClick={() => setNavbarOpen(!navbarOpen)}>
          {navbarOpen ? <FaTimes/> : <FaBars/>}
        </button>

      </div>   
                
      <div className={"flex-col lg:flex lg:flex-row lg:flex-between" + (navbarOpen ? " flex" : " hidden")}> 

          <nav  className="flex flex-col lg:flex-row text-3xl lg:text-lg leading-10 lg:leading-normal">
                            
            <Link to={`/home_type?type=studio&page=1`} onClick={() => setNavbarOpen(!navbarOpen)} className="text-xl lg:text-base px-[15px] hover:text-sky-400 hover:no-underline">
              Studio
            </Link>
            <Link to={`/home_type?type=chambre&page=1`} onClick={() => setNavbarOpen(!navbarOpen)} className="text-xl lg:text-base px-[15px] hover:text-sky-400 hover:no-underline" >
              Chambre
            </Link>
            <Link to={`/home_type?type=appartement&page=1`} onClick={() => setNavbarOpen(!navbarOpen)} className="text-xl lg:text-base px-[15px] hover:text-sky-400 hover:no-underline">
              Appartement
            </Link>
            <Link to={`/home_type?type=espace commercial&page=1`} onClick={() => setNavbarOpen(!navbarOpen)} className="text-xl lg:text-base px-[15px] hover:text-sky-400 hover:no-underline">
              Espace commercial
            </Link>
          </nav>

      </div>

      <div className={"flex-col lg:flex lg:flex-row lg:flex-between" + (navbarOpen ? "flex" : " hidden")}> 
                            
          <div className="flex flex-col lg:flex-row mx-3 text-3xl lg:text-lg leading-10 lg:leading-normal"> 
            {user ? ( 
              <div className="flex lg:flex-row flex-col ">
                  <Link to="/create_home" onClick={() => setNavbarOpen(!navbarOpen)} className="text-xl lg:text-base hover:no-underline hover:text-sky-400">
                      Create an Home
                  </Link>  
                  <Link to={`/my_homes?userid=${user?._id}&page=1`} onClick={() => setNavbarOpen(!navbarOpen)} className="text-xl lg:text-base hover:no-underline lg:ml-7 hover:text-sky-400">
                      My Homes
                  </Link>
                  <button className="text-xl lg:text-base flex justify-start lg:ml-7 hover:text-sky-400" onClick={Logout}>
                      Logout
                  </button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setNavbarOpen(!navbarOpen)} className="text-xl lg:text-base hover:no-underline hover:text-sky-400">
                Connexion
              </Link>
            )}
         </div>
      </div>                       

    </header>
  )
}

export default Navbar