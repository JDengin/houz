//This display the homes I've created
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeCard, Navbar, Spinner, PaginateMyHomes, Footer } from "../components";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { reset, getMyHomes } from '../features/post/postSlice';

const MyHomes = () => {

  const dispatch = useDispatch();

  const { posts, isSuccess, isLoading, isError, message } = useSelector((state) => state.posts)
  const search = useLocation().search
  const userid = new URLSearchParams(search).get('userid'); //searchQuery here is a query string in the url 
  const page = new URLSearchParams(search).get('page') || 1; //type here is a query string in the url 
  const Page = Number(page)

  

   useEffect(() => {

      if(isError) {
        toast.error(message)
      } 
      //dispatch(getPostBySearch(searchQuery, Number(page))) 
      dispatch(getMyHomes({userid, Page}))
    
   }, [dispatch, page]) 

  return (
    <>
      <Navbar/>
      <section className="mt-[15vh] mx-[3vw] w-[94vw] min-h-screen flex flex-wrap justify-center">
              
              {isLoading/*  || destructuredPosts?.length === undefined */ ? ( // "destructuredPosts.length" is undefined until             
                <Spinner/>
                ) : (posts?.length > 0 ? (
                        <div className='flex flex-wrap items-center justify-center'>
                          {(posts).map((post) => (
                            <HomeCard key={post._id} post={post} />
                          ))}
                        </div>
                      ) : ( <p>You have no home in your home list</p> ) 
                    )       
              }       

             {/*  {((isSuccess) && (posts?.length > 8 )) && <Paginate/>}  */}
              {/*display Paginate component only for a number of post greater than 8, bcoz we've 8 post per page*/}
            
          </section>

          <div className='flex justify-center my-[2vh]'>   
      
            {/* {(posts.length > 8) && <Paginate2 page={page} posts={posts}/>} */}
            <PaginateMyHomes userid={userid} page={page}/>
      
         </div>
      <Footer/>
    </>
  )
}

export default MyHomes