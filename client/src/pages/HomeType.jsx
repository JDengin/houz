import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Navbar, HomeCard, Footer, PaginateHomeSearched } from "../components"
import { getPostBySearch } from "../features/post/postSlice"
import Spinner from '../components/Spinner'

const HomeType = () => {

  //console.log(useLocation())

  const dispatch = useDispatch()
  const search = useLocation().search
  //const home_type = new URLSearchParams(search).get('page'); //type here is a query string in the url 

  
  const searchQuery = new URLSearchParams(search).get('type'); //searchQuery here is a query string in the url 
  const page = new URLSearchParams(search).get('page') || 1; //type here is a query string in the url 

  const { posts, numberOfPages, isLoading, isError, isSuccess, message, reset } = useSelector((state) => (state.posts))

  useEffect(() => {

    /* if(isError) {
      toast.error(message)
    }  */
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); //force webpage to load at the top
        
    dispatch(getPostBySearch({searchQuery, page})) 

    /* return () => {
      dispatch(reset() )
    } */  
    
  }, [dispatch, searchQuery, page]) 

  return (
    <>
      <Navbar/>
      
      {/* <section className="mx-[3vw] min-h-screen flex flex-wrap justify-center"> */}
      <section className="mx-[3vw] w-[94vw] h-fit">
        {isLoading ? (
            <div className='mt-[20vh] mb-[34vh]'>
              <Spinner/>
            </div>
              
            ) : ( posts?.length > 0 ? (
                    <div className='mt-[20vh] mb-[10vh] flex flex-wrap items-center justify-center gap-5'>
                      {posts.map((post) => (
                        <HomeCard key={post._id} post={post} />
                      ))}
                    </div>                   

                  ) : (
                    <p className='mt-[20vh] mb-[60vh] text-red-500 text-2xl flex justify-center'>We have no such type of home</p>
                  ) 
            )            
            
        }
         
      </section>

      <div className='flex justify-center my-[5vh]'>   
      
          {/* {(posts.length > 8) && <Paginate2 page={page} posts={posts}/>} */}
          <PaginateHomeSearched searchQuery={searchQuery} page={page} numberOfPages={numberOfPages}/>

      </div>
            
      <Footer/>
    </>
  )
}

export default HomeType