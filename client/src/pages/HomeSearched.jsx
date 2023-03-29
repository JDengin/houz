import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Navbar, Footer } from "../components"
import { HomeCard } from "../components"
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { reset, getPostBySearch } from '../features/post/postSlice';
import Spinner from "../components/Spinner";

const HomeSearched = () => {

  const dispatch = useDispatch();

  const { posts, isLoading, isError, message } = useSelector((state) => state.posts)
  const search = useLocation().search
  const searchedQuery = new URLSearchParams(search).get('searchQuery'); //searchQuery here is a query string in the url 

  console.log(searchedQuery)
  //let destructuredPosts = posts.posts;

  console.log(posts)

  let post =""
   
   useEffect(() => {

      if(isError) {
        toast.error(message)
      } 

      dispatch(getPostBySearch(searchedQuery))   

      console.log(isLoading)
      
      return () => {
        dispatch(reset())
      } 
    
   }, [searchedQuery])  //posts, isLoading, message

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
          
          <section className=" mx-[3vw] w-[94vw] h-min-[87vh] flex flex-wrap justify-center">
              
              {isLoading ? (                
                <Spinner/>
                ) : ( (posts).length > 0 ? (
                        <div className='flex flex-wrap items-center justify-center'>
                          {(posts).map((post) => (
                            <HomeCard key={post._id} post={post} />
                            )
                          )}
                        </div>
                      ) : ( <p>No home matches your search</p> ) 
                    )       
              }        
            
          </section>
  
          <Footer/>
      </>
    )
  }

export default HomeSearched