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

  const { posts, isLoading, isError, isSuccess, message, reset } = useSelector((state) => (state.posts))

  useEffect(() => {

    if(isError) {
      toast.error(message)
    } 
    
    dispatch(getPostBySearch({searchQuery, page})) 

    /* return () => {
      dispatch(reset() )
    } */  
    
  }, [dispatch, searchQuery, page]) 

  return (
    <>
      <Navbar/>
      
      <section className=" mx-[3vw] my-[5vw] min-h-[63vh] flex flex-wrap justify-center">
           
        {isLoading ? (
              <Spinner/>
            ) : ( posts?.length > 0 ? (
                    <div className='flex flex-wrap items-center justify-center'>
                      {posts.map((post) => (
                        <HomeCard key={post._id} post={post} />
                      ))}
                    </div>                   

                  ) : (
                    <p>We have no such type of home</p>
                  ) 
            )            
            
        }
         
      </section>

      <div className='flex justify-center my-[2vh]'>   
      
          {/* {(posts.length > 8) && <Paginate2 page={page} posts={posts}/>} */}
          <PaginateHomeSearched searchQuery={searchQuery} page={page}/>

      </div>
            
      <Footer/>
    </>
  )
}

export default HomeType