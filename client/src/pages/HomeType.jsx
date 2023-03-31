import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Navbar, Footer } from "../components"
import { HomeCard, PaginateHome } from "../components"
import { getPostBySearch } from "../features/post/postSlice"
import Spinner from '../components/Spinner'

const HomeType = () => {

  console.log(useLocation())

  const dispatch = useDispatch()
  const search = useLocation().search
  const home_type = new URLSearchParams(search).get('type'); //type here is a query string in the url 

  const { posts, isLoading, isError, isSuccess, message, reset } = useSelector((state) => (state.posts))

  const destructuredPosts = posts.posts;

  useEffect(() => {

    if(isError) {
      toast.error(message)
    } 
    
    dispatch(getPostBySearch(home_type)) 

    /* return () => {
      dispatch(reset() )
    } */  
    
  }, [home_type]) 

  return (
    <>
      <Navbar/>
      
      <section className=" mx-[3vw] my-[5vw] min-h-[63vh] flex flex-wrap justify-center">
           
        {isLoading ? (
              <Spinner/>
            ) : ( destructuredPosts?.length > 0 ? (
                    <div className='flex flex-wrap items-center justify-center'>
                      {destructuredPosts.map((post) => (
                        <HomeCard key={post._id} post={post} />
                      ))}
                    </div>

                   

                  ) : (
                    <p>We have no such type of home</p>
                  ) 
            )            
            
        }

        {((!isLoading) && (destructuredPosts?.length > 8 )) && <PaginateHome/>} 
        {/*display Paginate component only for a number of post greater than 8, bcoz we choose to display 8 post per page*/}

         
      </section>
            
      <Footer/>
    </>
  )
}

export default HomeType