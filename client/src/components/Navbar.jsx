import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import houz_logo from '../assets/houz_logo.png';
import { logout, reset } from '../features/auth/authSlice';

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const Logout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate('/');
  }

  return (
    <header className="bg-[#1B4571] w-full h-[75px] flex justify-between items-center px-5">
        <Link to="/">
          <img src={houz_logo} alt="logo" className="w-[125px] h-[75px]"/>
        </Link>

        <div className="text-white">
          <Link to="/studio_for_rent" className="px-[15px] hover:text-sky-400">
            Studio
          </Link>
          <Link to="/room_for_rent" className="px-[15px] hover:text-sky-400" >
            Chambre
          </Link>
          <Link to="/apartment_for_rent" className="px-[15px] hover:text-sky-400">
            Appartement
          </Link>
          <Link to="/commercial_space_for_rent" className="px-[15px] hover:text-sky-400">
            Espace commercial
          </Link>
        </div>

        <div> 
          {user ? ( 
            <>   
                <Link to="/create_home" className="text-white hover:text-sky-400">
                    Create an Home
                </Link>  
                <button className="text-[white] mx-5 hover:text-sky-400" onClick={Logout}>
                    Logout
                </button>
            </>
          ) : (
            <Link to="/auth" className="text-[white] hover:text-sky-400">
              Connexion
            </Link>
          )}

        </div>

    </header>
  )
}

export default Navbar