//This file manage the front-end of the homepage
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { HomeCard, Navbar, Spinner, PaginateHome, Footer } from "../components";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllPosts, reset } from '../features/post/postSlice';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchedWord, setSearchedWord] = useState("");
  const { posts, numberOfPages, isLoading, isError, message } = useSelector((state) => state.posts)

  //This code give me the queryString "page" of the url for the pagination
  const search = useLocation().search
  const page = new URLSearchParams(search).get('page') || 1; //page here is a query string in the url
  //End

  useEffect(() => {

    if(isError) {
      toast.error(message)
    } 

    if(page && (page <= numberOfPages)){
      dispatch(getAllPosts(page)) 
    }
   
    return () => {
      dispatch(reset())       
    }    
    
  }, [page]) 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate(`./home_searched?searchQuery=${searchedWord}&page=1`); // "page=1" allows me to always reach on the 1st page of homeSearched.jsx after submit
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

      <div className='flex justify-center my-[2vh]'>   
      
          {/* {(posts.length > 8) && <Paginate2 page={page} posts={posts}/>} */}
          <PaginateHome page={page}/>
      
      </div>
      
      <Footer/>
    </>
    
  )
}

export default Home