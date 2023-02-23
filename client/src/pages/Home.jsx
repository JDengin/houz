//This file manage the front-end of the homepage

import { useState } from 'react';
import { HomeCard, Navbar, Footer } from "../components";

const Home = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`The address you entered was: ${searchedAddress}`);
  }

  const [searchedAddress, setSearchedAddress] = useState("");

  return (
    <>
      <Navbar/>
      <div className="w-full h-[400px] bg-white flex flex-col items-center justify-center bg-[url('./assets/bg.jpg')]">        
          <h1 className='bold text-3xl '>Découvrez appartement, studio, chambre à louer terrain, maison à vendre</h1>
          <form onSubmit={handleSubmit} >
              <input 
                  type="text"
                  value={searchedAddress}
                  onChange={(e) => setSearchedAddress(e.target.value)}
                  placeholder='Entrer un lieu, addresse, quartier, ville...'
                  className='w-[600px] h-14 px-2 my-[40px] border-2 text-lg rounded-sm'
              />
              <button className='mx-4 px-2 h-14 w-fit bg-[#1B4571] text-[white] cursor-pointer rounded-lg hover:bg-sky-400' type="submit" >
                Search
              </button>
          </form>
              
      </div>
      
      <div className="mx-[50px] my-[50px]">
        <p className='text-2xl mx-16'>Homes for you </p>
        <p className='mx-16'>Based on your view history</p>
        <div className='flex flex-wrap items-center justify-center'>
          <HomeCard/>
          <HomeCard/>
          <HomeCard/>
          <HomeCard/>
        </div>
      </div>
      <Footer/>

    </>
    
  )
}

export default Home