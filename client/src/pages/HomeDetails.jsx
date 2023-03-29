import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Footer } from "../components"
import { getAllPosts } from '../features/post/postSlice';
import sample_home from "../assets/sample_home.jpg"
import Spinner from "../components/Spinner";
 
const HomeDetails = () => {

  const dispatch = useDispatch();

  const { id } = useParams() //I get the id of the post which is given in my URL
  let post =""
  
  const {posts, isLoading, isError} = useSelector((state) => state.posts)

  useEffect(() => {

    if(isError) {
      toast.error(message)
    } 
    
    dispatch(getAllPosts()) 
        
  }, [])
  
  //In some cases "posts" is an Array and in some others cases an object so i need to use if...else
  if(Array.isArray(posts)) {
     post = posts.find((p) => p._id === id);
  } else {
     const destructuredPosts = posts.posts;
     post = destructuredPosts.find((p) => p._id === id); //We destructure this post because " find() " method is only for array
  } 
  
  return (
    <>
      <Navbar/>

      {isLoading ? (<Spinner/>) : (
        <div className=" mx-[2vw] lg:mx-[10vw] mt-[3vh] mb-[3vh]">
          <div className="flex flex-col lg:flex-row lg:justify-between mb-2">
            <h1 className="text-lg lg:text-2xl font-semibold">{`${post?.homeType} à louer à ${post?.town} au quartier ${post?.quarter}`}</h1>
            <p className="text-lg lg:text-2xl text-blue-800 font-bold">{`${post?.price} Fcfa/mois`}</p>
          </div>
          <p className="font-semibold">{`Tel: ${post?.phoneNumber1} / ${post?.phoneNumber2}`}</p>

          <div className="flex flex-col lg:flex-row justify-between mb-2">
            <p className="font-semibold">{`Versement à l'entrée : ${post?.monthsNumber} mois de loyer`}</p>
            <p className="text-blue-800 font-semibold">{`Caution : ${post?.rentDeposit} Fcfa`}</p>
          </div>

          <div className="mt-[2vh] mb-[4vh] w-full h-fit flex flex-col lg:grid grid-row-2 grid-flow-col gap-3  lg:gap-1">  
              
              <div className="rounded-2xl lg:rounded-none row-span-2 col-span-2">
                <img src={sample_home} className="rounded-2xl lg:rounded-none h-full"/>
              </div>
              <div className="rounded-2xl lg:rounded-none">
                  <img src={sample_home} className="h-full rounded-2xl lg:rounded-none"/>
              </div>
              <div className="rounded-2xl lg:rounded-none">
                  <img src={sample_home} className="h-full rounded-2xl lg:rounded-none"/>
              </div>
              <div className="rounded-2xl lg:rounded-none">
                  <img src={sample_home} className="h-full rounded-2xl lg:rounded-none"/>
              </div>
              <div className="rounded-2xl lg:rounded-none">
                  <img src={sample_home} className="h-full rounded-2xl lg:rounded-none"/>
              </div>
              
          </div>

          <div className="font-semibold bg-blue-200 text-black p-2 rounded-md w-full  "> 
            <span className="font-bold">Description : </span> {`${post?.homeDescription}`}
          </div>       
        </div> )
      }

      <Footer/>      

  </>

  );
}

export default HomeDetails





 
