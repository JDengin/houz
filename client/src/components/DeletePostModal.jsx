import { RiCloseCircleLine } from "react-icons/ri"
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost, getMyHomes } from '../features/post/postSlice';

const DeletePostModal = ({postId, showDeleteModal, handleCloseDeleteModal}) => {

    const dispatch = useDispatch();
    const search = useLocation().search
    const userid = new URLSearchParams(search).get('userid'); //searchQuery here is a query string in the url 
   
    const onClose = (e) => {
      if(e.target.id === "ModalContainer") handleCloseDeleteModal() //With just one line inside if, I don't need to add curly bracket
    }

    const FIRST_PAGE = 1

    const HandleDeletePost = () => {
    
      dispatch(deletePost(postId))

      handleCloseDeleteModal()

      dispatch(getMyHomes({userid, FIRST_PAGE })) //Allow me to directly display the homes without the deleted home
    }

    return (
      <>
        {showDeleteModal && (
          
          <div id="ModalContainer" onClick={onClose} className="z-20 fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm w-full h-full ">
          
              <div className="drop-shadow-lg my-10 bg-white px-2 w-[450px] lg:w-[600px]  h-[230px]">              
                
                <div className="relative flex justify-between text-2xl font-semibold my-2">
                    <span className="ml-4">CONFIRM DELETE</span>        
                    <span onClick={handleCloseDeleteModal} className="cursor-pointer absolute right-2 hover:opacity-70"><RiCloseCircleLine className="text-3xl"/></span>                     
                </div>                
                <hr /> {/* Draw an horizontal line below this div */}
                <br />

                <p className="flex justify-center items-center text-lg lg:text-xl">Are you sure you want to delete the selected post ?</p>

                <br />
                <hr />
                <br />
                
                <div className="flex justify-between px-6">
                    <button onClick={handleCloseDeleteModal} className="bg-gray-500 text-white p-2 text-xl rounded-sm hover:opacity-70">Cancel</button>
                    <button onClick={HandleDeletePost} className="bg-red-500 text-white p-2 text-xl rounded-sm hover:opacity-70">Delete</button>            
                    {/* <button onClick={() => dispatch(deletePost(postId))} className="bg-red-500 text-white p-2 text-xl rounded-sm hover:opacity-70">Delete</button>             */}

                </div>                                               
  
              </div>              
          
          </div>        

        )}
      </>
    );
};

export default DeletePostModal