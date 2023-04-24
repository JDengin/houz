//This display the homes I've created
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeCardForMyHomes, Navbar, Spinner, PaginateMyHomes, Footer, UpdatePostModal, DeletePostModal} from "../components";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { reset, getMyHomes } from '../features/post/postSlice';

const MyHomes = () => {

  const dispatch = useDispatch();
  
  /*const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  } */

  const { posts, numberOfPages, isSuccess, isLoading, isError, message } = useSelector((state) => state.posts)
  const search = useLocation().search
  const userid = new URLSearchParams(search).get('userid'); //searchQuery here is a query string in the url 
  const page = new URLSearchParams(search).get('page') || 1; //type here is a query string in the url 
  const Page = Number(page) //cast transforms it from string to number

   useEffect(() => {

      if(isError) {
        toast.error(message)
      }  
      
      dispatch(getMyHomes({userid, Page}))

      //if(isSuccess) toast.success(message)
      
      /* return () => {
        dispatch(reset())       
      }    */
    
  }, [dispatch, page, isSuccess]) 
     

  return (
    <>
      <Navbar/>
      <section className="mx-[3vw] w-[94vw] min-h-screen flex flex-wrap justify-center">
          
              {isLoading ? (          
                <Spinner/>
                ) : (posts?.length > 0 ? (
                        <div className='my-[15vh] flex flex-wrap items-center justify-center'>
                          {(posts).map((post) => (
                            <HomeCardForMyHomes key={post._id} post={post} />
                          ))}

                        </div>
                      ) : ( <p className='my-[15vh]'>You have no home in your home list</p> ) 
                    )       
              }     
            
      </section>

      <div className='flex justify-center my-[2vh]'>   
      
         <PaginateMyHomes userid={userid} page={page} numberOfPages={numberOfPages}/>
      
      </div>

      <Footer/>

    </>
  )
}

export default MyHomes;