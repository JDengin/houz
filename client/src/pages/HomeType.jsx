import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Navbar, Footer } from "../components"
import { HomeCard } from "../components"
import { getPostBySearch } from "../features/post/postSlice"
import Spinner from '../components/Spinner'

const HomeType = () => {

  const dispatch = useDispatch()
  const search = useLocation().search
  const home_type = new URLSearchParams(search).get('type'); //type here is a query string in the url 

  const { posts, isLoading, isError, message, reset } = useSelector((state) => (state.posts))

  //const destructuredPosts = posts.posts;

  //console.log(destructuredPosts)
  console.log(posts)
  //console.log(home_type)

  /* useEffect(() => {

    if(isError) {
      toast.error(message)
    } 
    
    dispatch(getPostBySearch(home_type)) 
    
    return () => {
      dispatch(reset() )
    }  
    
  }, [isLoading])  */

  return (
    <>
      <Navbar/>
      
      <section className=" mx-[3vw] my-[5vw] h-min-[70vh] flex flex-wrap justify-center">
           
        {isLoading ? (
              <Spinner/>
            ) : ( posts.length > 0 ? (
                    <div className='flex flex-wrap items-center justify-center'>
                      {posts.map((post) => (
                        <HomeCard key={post._id} post={post} />
                      ))}
                    </div>
                  ) : (
                    <p>You have no home to display</p>
                  ) 
            )            
            
          }

      </section>
            
      <Footer/>
    </>
  )
}

export default HomeType