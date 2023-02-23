import { useState } from 'react';
import { Navbar } from "../components";
import ImagesUpload from '../components/ImagesUpload';
import FileBase64 from 'react-file-base64';

import axios from 'axios';


const CreateHome = () => {

  const [postInputs, setPostInputs] = useState({});
  const [urlImages, setUrlImages] = useState([]); //State for URL of images
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState([]);//State for images

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

   //console.log(postInputs);
   
   
   /* console.log(e.target.files);
   console.log(urlImages);*/
   //console.log(pictures); 
};

const render = (data) => {
  return data.map((image) => {
    return <img className='w-[100px] h-[100px]' src={image} alt="" key={image} />;
  });
};

const handleSubmit = (e) => {
    e.preventDefault();

    let j = 0; // j here is postInputs key

    setLoading(true);
    const formData = new FormData();
    //const postData = new FormData();

    for (const key of Object.keys(urlImages)) {
      formData.append('filesImg', pictures[key]);  
    } 
    //Object.keys give me all the keys of postInputs array
    for (const j of Object.keys(postInputs)) {
      formData.append(`${j}`, postInputs[j]);     
    }        
    
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
      .then(data => console.log(data));
    setUrlImages([]);
    setLoading(false); 

    /* axios('http://localhost:8080/posts', {
      method: 'POST',
      body: postData,
      //body: JSON.stringify({ ...formData }),
      headers: {
        'Content-Type': 'multipart/form-data'
      } 
      
    }).then(function (res,req) {
      console.log(res);
    }).catch(function (error) {
      console.log(error);
    });
    setUrlImages([]);
    setLoading(false); */
    //console.log(...formData);  
  }; 

  return (
    <>
      <Navbar/>
      <section className="flex justify-center items-center">

          <div className="drop-shadow-lg my-10 bg-slate-300  h-min-[70vh]">
              
              <p className="flex justify-center text-2xl font-semibold my-2">
                  HOME POST FORM
              </p>

              <form onSubmit={handleSubmit} className="flex" encType="multipart/form-data">
                
                <div className='flex flex-col w-[35vw]'>

                    <div className="flex my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Home type :                 
                          <select className='w-[15vw] h-[5vh] px-[5px]' name="homeType" value={postInputs.homeType} onChange={handleChange}>
                            <option value="studio">Studio</option>
                            <option value="room">Room</option>
                            <option value="apartment">Apartment</option>
                            <option value="commercial_space">Commercial space</option>
                          </select>
                        </label>

                        <label className='flex flex-col'>Price(Fcfa):
                          <input className='w-[15vw] h-[5vh] px-[5px]' type="number" name="price" min="0" value={postInputs.price || ""} onChange={handleChange} placeholder="Ex. 500000" required/>
                        </label>
                    </div>

                    <div className="flex my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Months number:
                          <input className='w-[15vw] h-[5vh] px-[5px]' type="number" name="monthsNumber" min="0" value={postInputs.monthsNumber || ""} onChange={handleChange} placeholder="Ex. 3" required/>
                        </label>

                        <label className='flex flex-col'>Rent deposit(Fcfa):
                          <input className='w-[15vw] h-[5vh] px-[5px]' type="number" name="deposit" min="0" value={postInputs.deposit || ""} onChange={handleChange} placeholder="Ex. 25000" required/>
                        </label>
                    </div>
                    
                    <div className="flex my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Town:
                          <input className='w-[15vw] h-[5vh] px-[5px]' type="text" name="town" value={postInputs.town || ""} onChange={handleChange} placeholder="Yaoundé" required/>
                        </label>

                        <label className='flex flex-col'>Quarter:
                          <input className='w-[15vw] h-[5vh] px-[5px]' type="text" name="quarter" value={postInputs.quarter || ""} onChange={handleChange} placeholder="Nkomo" required/>
                        </label>
                    </div>

                    <div className="flex my-[1vh] justify-between mx-[2vw]">
                        <label className='flex flex-col'>Phone number1*:
                          <input className='w-[15vw] h-[5vh] px-[5px]' type="number" name="phone1" min="0" value={postInputs.phone1 || ""} onChange={handleChange} placeholder="Ex. 699254878" required/>
                        </label>

                        <label className='flex flex-col'>Phone number2:
                          <input className='w-[15vw] h-[5vh] px-[5px]' type="number" name="phone2" min="0" value={postInputs.phone2 || ""} onChange={handleChange} placeholder="Ex. 678952136"/>
                        </label>
                    </div>

                    <div className="my-[1vh] mx-[2vw]">
                        <label className="flex flex-col">Home description:
                          <textarea className="px-[5px]"name="homeDescription" rows="4" cols="10" value={postInputs.homeDescription || ""} onChange={handleChange} 
                          placeholder="Ex. Cet appartement à louer est composé de 03 chambres, 02 salles d'eau, une cuisine, un parking et se trouve à 100m du goudron..." required/>
                        </label> 
                    </div>  

                    <div className="flex justify-center my-[1vh] ">
                        <button type="submit" className='flex justify-center items-center bg-[#1B4571] w-[31vw] h-[40px] my-2 text-white hover:bg-sky-500'>
                          Submit
                        </button> 
                    </div>  

                    <input type="file" name="filesImg" multiple onChange={handleImg} /> 

                    {/* <FileBase64 type="file" multiple={true} onDone={({base64}) => setPostInputs({...postInputs, filesImg: base64})}/> */}

                </div>

                

                {/* <div className='flex flex-wrap w-[35vw] my-8'>
                    <ImagesUpload/>
                </div> */}

              </form>

              {/* The render function with the multiple image state */}
              
              {render(urlImages)}

          </div>
      
      </section>
    </>
  )
}

export default CreateHome

