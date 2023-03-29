import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllPosts, reset } from '../features/post/postSlice';
import Spinner from "../components/Spinner";
import { Navbar, Footer, HomeCard } from "../components"


const Apartment_for_rent = () => {

  const dispatch = useDispatch()
  const { posts, isLoading, isError, message } = useSelector((state) => state.posts)

  useEffect(() => {

    if(isError) {
      toast.error(message)
    } 
    
    dispatch(getAllPosts())   

    return () => {
      dispatch(reset())
    }
    
  }, [isError, message, dispatch])
  
  return (
    <>
        <Navbar/>

        
    
        <section className="bg-red-500 mx-[3vw] h-fit flex flex-wrap justify-center">

          
            <HomeCard/>
            <HomeCard/>
            <HomeCard/>
            <HomeCard/>
            <HomeCard/>
            <HomeCard/>
            <HomeCard/>
            <HomeCard/>
            <HomeCard/>
            <HomeCard/>
            <HomeCard/>
        </section>

        <Footer/>
    </>
  )
}

export default Apartment_for_rent