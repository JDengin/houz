import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { RiCloseCircleLine } from "react-icons/ri"
import { updatePost, getMyHomes } from '../features/post/postSlice';


const UpdatePostModal = ({post, showUpdateModal, setShowUpdateModal, handleCloseUpdateModal}) => {

    const dispatch = useDispatch()
  
    const [postInputs, setPostInputs] = useState(post); //when I open the updatePostModal, initial values are those of original post
    const search = useLocation().search
    const userid = new URLSearchParams(search).get('userid'); //searchQuery here is a query string in the url 

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPostInputs(values => ({...values, [name]: value}))
    }

    const postId = post._id;
    const FIRST_PAGE = 1;

    //This function allows me when I click outside modal window to close the window
    const onClose = (e) => {
      if(e.target.id === "ModalContainer") handleCloseUpdateModal() //With just one line inside if, I don't need to add curly bracket
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      //postInputs here is updatedPost
      //dispatch(updatePost({postId, postInputs}));

      handleCloseUpdateModal();

     // dispatch(getMyHomes({userid, FIRST_PAGE })) //Allow me to directly display the homes without the deleted home
      
      //const updatedPost = postInputs
    }

    return (
      <>
        {showUpdateModal && (
          
          <div id="ModalContainer" onClick={onClose} className="z-20 fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm w-full h-full">
          
              <div className="drop-shadow-lg  bg-slate-300 w-[90vw] sm:w-[70vw] lg:w-[40vw]  min-h-[70vh]">              
                
                <p className="relative flex justify-center text-2xl font-semibold my-2">
                    Updating the selected post
                    <span onClick={handleCloseUpdateModal} className="cursor-pointer absolute right-2 hover:opacity-50"><RiCloseCircleLine className="text-3xl"/></span> 
                </p>                             

                <form onSubmit={handleSubmit} className="flex justify-center" encType="multipart/form-data">
                  
                  <div className='flex flex-col w-[90vw] sm:w-[70vw] lg:w-[40vw]'>

                      <div className="flex my-[1vh] justify-between mx-[2vw]">
                          <label className='flex flex-col'>Home type :                 
                            <select className='w-full lg:w-[15vw] h-[5vh] px-[5px]' name="homeType" value={postInputs.homeType} onChange={handleChange}>
                              <option value="Chambre">Chambre</option>
                              <option value="Studio">Studio</option>
                              <option value="Appartement">Appartement</option>
                              <option value="Studio moderne">Studio moderne</option>
                              <option value="Chambre moderne">Chambre moderne</option>
                              <option value="Appartement moderne">Appartement moderne</option>
                              <option value="Espace commercial">Espace commercial</option>
                            </select>
                          </label>

                          <label className='flex flex-col'>Price(Fcfa):
                            <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="number" name="price" min="0" value={postInputs.price || ""} onChange={handleChange} placeholder="Ex. 500000" required/>
                          </label>
                      </div>

                      <div className="flex my-[1vh] justify-between mx-[2vw]">
                          <label className='flex flex-col'>Months number:
                            <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="number" name="monthsNumber" min="0" value={postInputs.monthsNumber || ""} onChange={handleChange} placeholder="Ex. 3" required/>
                          </label>

                          <label className='flex flex-col'>Rent deposit(Fcfa):
                            <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="number" name="rentDeposit" min="0" value={postInputs.rentDeposit || ""} onChange={handleChange} placeholder="Ex. 25000" required/>
                          </label>
                      </div>
                      
                      <div className="flex my-[1vh] justify-between mx-[2vw]">
                          <label className='flex flex-col'>Town:
                            <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="text" name="town" value={postInputs.town || ""} onChange={handleChange} placeholder="Yaoundé" required/>
                          </label>

                          <label className='flex flex-col'>Quarter:
                            <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="text" name="quarter" value={postInputs.quarter || ""} onChange={handleChange} placeholder="Nkomo" required/>
                          </label>
                      </div>

                      <div className="flex my-[1vh] justify-between mx-[2vw]">
                          <label className='flex flex-col'>Phone number1*:
                            <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="number" name="phoneNumber1" min="0" value={postInputs.phoneNumber1 || ""} onChange={handleChange} placeholder="Ex. 699254878" required/>
                          </label>

                          <label className='flex flex-col'>Phone number2:
                            <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="number" name="phoneNumber2" min="0" value={postInputs.phoneNumber2 || ""} onChange={handleChange} placeholder="Ex. 678952136"/>
                          </label>
                      </div>

                      <div className="my-[1vh] mx-[2vw] ">
                          <label className="flex flex-col">Home description:
                            <textarea className="px-[5px] outline-none resize-none" name="homeDescription" rows="4" cols="10" value={postInputs.homeDescription || ""} onChange={handleChange} 
                            placeholder="Ex. Cet appartement à louer est composé de 03 chambres, 02 salles d'eau, une cuisine, un parking et se trouve à 100m du goudron..." required/>
                          </label> 
                      </div>   

                      <div className="flex justify-center my-[1vh] ">
                          <button type="submit" className='flex justify-center items-center bg-[#1B4571] w-full lg:w-[36vw] h-[40px] mx-3 my-2 text-white hover:bg-sky-500'>
                            Submit
                          </button> 
                      </div>  

                      {/* <input type="file" name="filesImg" multiple onChange={handleImg} />  */}

                  </div>

                </form>

                {/* The render function with the multiple image state */}
                
                {/* {render(urlImages)} */}
  
              </div>
              
          
          </div>        

        )}
      </>
    );
};

export default UpdatePostModal