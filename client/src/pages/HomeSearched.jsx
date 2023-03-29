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

  const { posts, isSuccess, isError, message } = useSelector((state) => state.posts)
  const search = useLocation().search
  const searchedQuery = new URLSearchParams(search).get('searchQuery'); //searchQuery here is a query string in the url 

  const destructuredPosts = posts.posts
   
   useEffect(() => {

      if(isError) {
        toast.error(message)
      } 

      dispatch(getPostBySearch(searchedQuery))  
    
   }, []) 

  console.log(posts) 
  console.log(searchedQuery)
  console.log(destructuredPosts)
  console.log(isSuccess)

  return (
      <>
          <Navbar/>           
          
          <section className=" mt-[1vh] mx-[3vw] w-[94vw] min-h-[76vh] flex flex-wrap justify-center">
              
              {!isSuccess || destructuredPosts?.length === undefined ? ( // "destructuredPosts.length" is undefined until             
                <Spinner/>
                ) : (destructuredPosts?.length > 0 ? (
                        <div className='flex flex-wrap items-center justify-center'>
                          {(destructuredPosts).map((post) => (
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