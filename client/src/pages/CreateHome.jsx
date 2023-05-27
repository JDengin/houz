import { useState, useEffect } from 'react';
import { Navbar, Footer } from "../components";
import { useDispatch, useSelector } from 'react-redux';
import { createPost, reset } from '../features/post/postSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

const CreateHome = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);
  
  const [postInputs, setPostInputs] = useState({});
  const [urlImages, setUrlImages] = useState([]); //State for URL of images
  //const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState([]);//State for images

  const MAXIMUM_IMAGES_NUMBER_ALLOWED = 5;

  const userId = user._id

  useEffect(() => {
    /* if(isError) {
      toast.error(message);
    } */
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); //force webpage to load at the top
    dispatch(reset());   

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostInputs(values => ({...values, [name]: value}))
  }

  //Function to compress an array of images
  
  /* const compressImg = async(img) => {

    if(img){

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800
      }    
      try {
        const compressedFile = await imageCompression(img, options) //imageCompression is a built-in function of "browser-image-compression" package
        setPictures(value => ({...value, compressedFile}))
        console.log(compressedFile)
        console.log(pictures)
       
      } catch (error) {        
          console.log(error)
      }  
      
    }     
  } */
//Functions to preview multiple images 

  const handleImg = (e) => {
       
    if(e.target.files) {
        //I create an array of images files called "pictures"
       setPictures([...e.target.files]);        

        /* const compressedFiles = Array.from(e.target.files).map((img) => compressImg(img))

        console.log(imageCompression(e.target.files[0], options))
        console.log(e.target.files)
        console.log(compressedFiles) */       

        const imagePreviewArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        setUrlImages((prevImage) => prevImage.concat(imagePreviewArray));
    } 
 }
  

  const render = (data_urlImg, data_pictures) => {
   
    if(data_pictures?.length > MAXIMUM_IMAGES_NUMBER_ALLOWED) {       
            
      return <p className='text-red-500'>The maximum allowed number of files to upload is 5</p>
    } else {
        return data_urlImg.map((image) => {
              return <img className='w-[100px] h-[100px]' src={image} alt="post_image" key={image}/>
        });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();    

    let j = 0; // j here is postInputs key

    let formData = new FormData();

    for (const key of Object.keys(pictures)) {
      formData.append("postImages", pictures[key]);  //`postImages[${key}]`
    }  
   
    //Object.keys give me all the keys of postInputs array

    const posts = {...postInputs, postCreator: userId} //add postCreator field to posts

    for (const j of Object.keys(posts)) {
      formData.append(`${j}`, posts[j]);     
    }      
    
   dispatch(createPost(formData));  
   navigate('/'); 
  }; 

  //This function allows me to delete all chosen files I want to upload inside the database
  const deleteAllFiles = (e) => {
    e.preventDefault();
    setPictures([]);
    setUrlImages([]);
  }

  return (
    <>
      <Navbar/>
      <section className="mt-[10vh] flex justify-center items-center">

          <div className="drop-shadow-lg my-10 bg-slate-300 w-[80vw] lg:w-[40vw]  min-h-[70vh]">
              
              <p className="flex justify-center text-2xl font-semibold my-2">
                  HOME POST FORM
              </p>

              <form onSubmit={handleSubmit} className="flex justify-center" encType="multipart/form-data">
                
                <div className='flex flex-col w-full lg:w-[40vw]'>

                     <div className="flex flex-col lg:flex-row my-[1vh] justify-between mx-[2vw]">
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

                    <div className="flex flex-col lg:flex-row my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Months number:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="number" name="monthsNumber" min="0" value={postInputs.monthsNumber || ""} onChange={handleChange} placeholder="Ex. 3" required/>
                        </label>

                        <label className='flex flex-col'>Rent deposit(Fcfa):
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="number" name="rentDeposit" min="0" value={postInputs.rentDeposit || ""} onChange={handleChange} placeholder="Ex. 25000" required/>
                        </label>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Town:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="text" name="town" value={postInputs.town || ""} onChange={handleChange} placeholder="Yaoundé" required/>
                        </label>

                        <label className='flex flex-col'>Quarter:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="text" name="quarter" value={postInputs.quarter || ""} onChange={handleChange} placeholder="Nkomo" required/>
                        </label>
                    </div>

                    <div className="flex flex-col lg:flex-row my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Phone number1*:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="number" name="phoneNumber1" min="0" value={postInputs.phoneNumber1 || ""} onChange={handleChange} placeholder="Ex. 699254878" required/>
                        </label>

                        <label className='flex flex-col'>Phone number2:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px] outline-none' type="number" name="phoneNumber2" min="0" value={postInputs.phoneNumber2 || ""} onChange={handleChange} placeholder="Ex. 678952136"/>
                        </label>
                    </div>

                    <div className="my-[1vh] mx-[2vw]">
                        <label className="flex flex-col">Home description:
                          <textarea className="px-[5px] outline-none resize-none" name="homeDescription" rows="4" cols="10" value={postInputs.homeDescription || ""} onChange={handleChange} 
                          placeholder="Ex. Cet appartement à louer est composé de 03 chambres, 02 salles d'eau, une cuisine, un parking et se trouve à 100m du goudron..." required/>
                        </label> 
                    </div>   
                    
                    <div className='mx-[2vw] flex justify-center gap-10'>
                        <input type="file" name="postImages" multiple onChange={handleImg} /> 

                        {(urlImages?.length > 0 && urlImages?.length < 5) && <button onClick={deleteAllFiles} className='bg-red-500 text-white w-40 flex justify-center'>Delete All Images</button>}

                    </div>

                    <div className='mt-5 flex flex-wrap justify-center w-full lg:w-[40vw]  gap-10'>
                      {render(urlImages, pictures)}
                    </div>

                    <div className="my-[1vh] flex justify-center ">
                        <button type="submit" className='flex justify-center items-center bg-[#1B4571] w-full lg:w-[36vw] h-[40px] mx-3 my-2 text-white hover:bg-sky-500'>
                          Submit
                        </button> 
                    </div>                      

                </div>

              </form>
              {/* The render function with the multiple image state */}              
                 
          </div>
      
      </section>
      <Footer/>
    </>
  )
}

export default CreateHome

