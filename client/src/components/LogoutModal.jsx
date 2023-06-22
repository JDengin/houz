import { RiCloseCircleLine } from "react-icons/ri"
import { useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';


const LogoutModal = ({ showLogoutModal, handleCloseLogoutModal}) => {

    const dispatch = useDispatch();
   
    const onClose = (e) => {
      if(e.target.id === "ModalContainer") handleCloseLogoutModal() //With just one line inside if, I don't need to add curly bracket
    }

    const handleLogout = () => {     

      dispatch(logout());
      dispatch(reset());

      handleCloseLogoutModal()

      navigate('/');     
    }

    return (
      <>
        {showLogoutModal && (
          
          <div id="ModalContainer" onClick={onClose} className="z-20 fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm w-full h-full ">
          
              <div className="drop-shadow-lg my-10 bg-white px-2 w-[450px] lg:w-[600px]  h-[230px]">              
                
                <div className="relative flex justify-between text-2xl font-semibold my-2">
                    <span className="flex ml-4 text-black">CONFIRM LOGOUT</span>        
                    <span onClick={handleCloseLogoutModal} className="cursor-pointer absolute right-2 hover:opacity-70"><RiCloseCircleLine className="text-3xl"/></span>                     
                </div>                
                <hr /> {/* Draw an horizontal line below this div */}
                <br />

                <p className="flex text-black justify-center items-center text-lg lg:text-xl">Are you sure you want to Logout ?</p>

                <br />
                <hr />
                <br />
                
                <div className="flex justify-between px-6">
                    <button onClick={handleCloseLogoutModal} className="bg-gray-500 text-white p-2 text-xl rounded-sm hover:opacity-70">Cancel</button>
                    <button onClick={handleLogout} className="bg-red-500 text-white p-2 text-xl rounded-sm hover:opacity-70">Logout</button>            
                    {/* <button onClick={() => dispatch(deletePost(postId))} className="bg-red-500 text-white p-2 text-xl rounded-sm hover:opacity-70">Delete</button>             */}

                </div>        
  
              </div>              
          
          </div>        

        )}
      </>
    );
};

export default LogoutModal