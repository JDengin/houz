//This file manage the front-end of the homepage
import { useState, useEffect } from 'react';
import { HomeCard, Navbar, Footer } from "../components";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllPosts, getPostBySearch, reset } from '../features/post/postSlice';
import Spinner from "../components/Spinner";

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchedWord, setSearchedWord] = useState("");
  const { posts, isLoading, isError, message, isSuccess } = useSelector((state) => state.posts)

  //console.log(isLoading)

  useEffect(() => {

    if(isError) {
      toast.error(message)
    } 
    
    dispatch(getAllPosts()) 
       
      /* return () => {
      dispatch(reset()) 
      }   */  
    
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate(`./home_searched?searchQuery=${searchedWord}`);

    //dispatch(getPostBySearch(searchedWord))   

    //alert(`The address you entered was: ${searchedAddress}`);
  }   

  return (
    <>
      <Navbar/>
      <div className="w-full h-[400px] bg-white flex flex-col items-center justify-center bg-[url('./assets/bg.jpg')]">        
          <h1 className='bold text-xl mx-5 lg:mx-1 lg:text-3xl text-white '>Découvrez appartement, studio, chambre à louer terrain, maison à vendre</h1>
          <form  onSubmit={handleSubmit}>
              <input 
                  type="text"
                  value={searchedWord}
                  onChange={(e) => setSearchedWord(e.target.value)}
                  placeholder='Enter home type, town, quarter, price...'
                  className='w-[300px] lg:w-[600px] h-14 px-2 my-[40px] border-2 text-sm lg:text-xl rounded-sm'
              />
              <button className='mx-4 px-2 h-14 w-fit bg-[#1B4571] text-[white] cursor-pointer rounded-lg hover:bg-sky-400' type="submit" >
                Search
              </button>
          </form>
              
      </div>
      
      <div className="mx-[50px] my-[50px]">
        <p className='text-2xl mx-16 mb-5'>NEW HOMES </p>
        {/* <p className='mx-16'>Based on your view history</p> */}
        
        {isLoading ? (
            <Spinner/>
          ) : ( posts.length > 0 ? (
                  <div className='flex flex-wrap items-center justify-center gap-1'>
                    {posts.map((post) => (
                      <HomeCard key={post._id} post={post} />
                    ))}
                  </div>
                ) : (
                  <p className='text-xl mx-16 text-[#1B4571]'>You have no home to display</p>
                ) 
          )            
          
        }
        
      </div>     
      
      <Footer/>
    </>
    
  )
}

export default Home