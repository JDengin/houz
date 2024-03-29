import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Navbar, HomeCard, PaginateHomeSearched, Footer } from "../components"
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { reset, getPostBySearch } from '../features/post/postSlice';
import Spinner from "../components/Spinner";

const HomeSearched = () => {

  const dispatch = useDispatch();

  const { posts, numberOfPages, isSuccess, isLoading, isError, message } = useSelector((state) => state.posts)
  const search = useLocation().search
  const searchQuery = new URLSearchParams(search).get('searchQuery'); //searchQuery here is a query string in the url 
  const page = new URLSearchParams(search).get('page') || 1; //type here is a query string in the url 


   useEffect(() => {
      /* if(isError) {
        toast.error(message)
      } */  
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); //force webpage to load at the top     
      dispatch(getPostBySearch({searchQuery, page}))     
   }, [dispatch, page]) 

  return (
      <>
          <Navbar/>           
          
          <section className=" mx-[3vw] w-[94vw] min-h-screen flex flex-wrap justify-center">
              
              {isLoading/*  || destructuredPosts?.length === undefined */ ? ( // "destructuredPosts.length" is undefined until             
                <Spinner/>
                ) : (posts?.length > 0 ? (
                        <div className='my-[15vh] flex flex-wrap items-center justify-center'>
                          {(posts).map((post) => (
                            <HomeCard key={post._id} post={post} />
                          ))}
                        </div>
                      ) : ( <p className='my-[15vh]'>No home matches your search</p> ) 
                    )       
              }       

             {/*  {((isSuccess) && (posts?.length > 8 )) && <Paginate/>}  */}
              {/*display Paginate component only for a number of post greater than 8, bcoz we've 8 post per page*/}
            
          </section>

          <div className='flex justify-center my-[2vh]'>   
      
            {/* {(posts.length > 8) && <Paginate2 page={page} posts={posts}/>} */}
            <PaginateHomeSearched searchQuery={searchQuery} page={page} numberOfPages={numberOfPages}/>
      
         </div>
  
          <Footer/>
      </>
    )
  }

export default HomeSearched