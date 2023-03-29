import { useState, useEffect } from 'react';
import { Navbar } from "../components";
import { useDispatch, useSelector } from 'react-redux';
import { createPost, reset } from '../features/post/postSlice';
import { useNavigate } from 'react-router-dom';


const CreateHome = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.posts);
  
  const [postInputs, setPostInputs] = useState({});
  const [urlImages, setUrlImages] = useState([]); //State for URL of images
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState([]);//State for images

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    dispatch(reset());
    
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostInputs(values => ({...values, [name]: value}))
  }

//Functions to preview multiple images  


const handleImg = (e) => {
    
   if(e.target.files) {
    //I create an array of images files called "pictures"
    setPictures([...e.target.files]);
    const imageArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setUrlImages((prevImages) => prevImages.concat(imageArray));
   } 
};

const render = (data) => {
  return data.map((image) => {
    return <img className='w-[100px] h-[100px]' src={image} alt="" key={image} />;
  });
};

const handleSubmit = async(e) => {
    e.preventDefault();
    

    let j = 0; // j here is postInputs key

    //setLoading(true);
    //let formData = new FormData();
    //const postData = new FormData();

    /* for (const key of Object.keys(urlImages)) {
      formData.append('filesImg', pictures[key]);  
    } */  

    //Object.keys give me all the keys of postInputs array
    
    /* for (const j of Object.keys(postInputs)) {
      formData.append(`${j}`, postInputs[j]);     
    }  */       

    //dispatch(createPost(...formData));

    dispatch(createPost(postInputs));

    navigate('/');
    

    //console.log(...formData);
    //console.log(formData);
    //dispatch(createPost(...formData));

    
    //console.log(...pictures);
    //console.log(postInputs);

        
  }; 

  return (
    <>
      <Navbar/>
      <section className="flex justify-center items-center">

          <div className="drop-shadow-lg my-10 bg-slate-300 w-full lg:w-[40vw]  h-min-[70vh]">
              
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
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px]' type="number" name="price" min="0" value={postInputs.price || ""} onChange={handleChange} placeholder="Ex. 500000" required/>
                        </label>
                    </div>

                    <div className="flex flex-col lg:flex-row my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Months number:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px]' type="number" name="monthsNumber" min="0" value={postInputs.monthsNumber || ""} onChange={handleChange} placeholder="Ex. 3" required/>
                        </label>

                        <label className='flex flex-col'>Rent deposit(Fcfa):
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px]' type="number" name="deposit" min="0" value={postInputs.deposit || ""} onChange={handleChange} placeholder="Ex. 25000" required/>
                        </label>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Town:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px]' type="text" name="town" value={postInputs.town || ""} onChange={handleChange} placeholder="Yaoundé" required/>
                        </label>

                        <label className='flex flex-col'>Quarter:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px]' type="text" name="quarter" value={postInputs.quarter || ""} onChange={handleChange} placeholder="Nkomo" required/>
                        </label>
                    </div>

                    <div className="flex flex-col lg:flex-row my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Phone number1*:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px]' type="number" name="phone1" min="0" value={postInputs.phone1 || ""} onChange={handleChange} placeholder="Ex. 699254878" required/>
                        </label>

                        <label className='flex flex-col'>Phone number2:
                          <input className='w-full lg:w-[15vw] h-[5vh] px-[5px]' type="number" name="phone2" min="0" value={postInputs.phone2 || ""} onChange={handleChange} placeholder="Ex. 678952136"/>
                        </label>
                    </div>

                    <div className="my-[1vh] mx-[2vw]">
                        <label className="flex flex-col">Home description:
                          <textarea className="px-[5px]"name="homeDescription" rows="4" cols="10" value={postInputs.homeDescription || ""} onChange={handleChange} 
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
      
      </section>
    </>
  )
}

export default CreateHome

