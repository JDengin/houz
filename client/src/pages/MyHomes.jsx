//This display the homes I've created
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeCardForMyHomes, Navbar, Spinner, PaginateMyHomes, Footer, UpdatePostModal, DeletePostModal} from "../components";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { reset, getMyHomes } from '../features/post/postSlice';

const MyHomes = () => {

  const dispatch = useDispatch();
  
  const { posts, numberOfPages, isSuccess, isLoading, isError, message } = useSelector((state) => state.posts)
  const search = useLocation().search
  const userid = new URLSearchParams(search).get('userid'); //searchQuery here is a query string in the url 
  const page = new URLSearchParams(search).get('page') || 1; //type here is a query string in the url 
  const Page = Number(page) //cast transforms it from string to number

   useEffect(() => {

      /* if(isError) {
        toast.error(message)
      }  */ 
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); //force webpage to load at the top
      dispatch(getMyHomes({userid, Page}))

      //if(isSuccess) toast.success(message)
      
      /* return () => {
        dispatch(reset())       
      }    */
    
  }, [dispatch, page, isSuccess]) 
     

  return (
    <div className='overflow-y-auto'>
      <Navbar/>
      <section className="mx-[3vw] w-[94vw] h-fit">
          
              {isLoading ? (          
                <Spinner/>
                ) : (posts?.length > 0 ? (
                        <div className='mt-[20vh] flex flex-wrap items-center justify-center gap-5'>
                          {(posts).map((post) => (
                            <HomeCardForMyHomes key={post._id} post={post} />
                          ))}

                        </div>
                      ) : ( <p className='mt-[20vh] mb-[60vh] text-red-500'>You have no home in your home list</p> ) 
                    )       
              }     
            
      </section>

      <div className='flex justify-center my-[5vh]'>   
      
        <PaginateMyHomes userid={userid} page={page} numberOfPages={numberOfPages}/>
      
      </div>

      <Footer/>

    </div>
  )
}

export default MyHomes;