import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Footer } from "../components"
import { getSelectedPost } from '../features/post/postSlice';
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify';
import no_image from "../assets/no_image.jpg";
 
const HomeDetails = () => {

  const dispatch = useDispatch();

  const { id } = useParams() //I get the id of the post which is given in my URL
  
  const {posts, isLoading, isSuccess, isError, message} = useSelector((state) => state.posts)

  const postsLength = Object.keys(posts).length

  const postImgs = posts?.postImages

  useEffect(() => {

    /* if(isError) {
      toast.error(message)
    }  */

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'}); //force webpage to load at the top
    
    dispatch(getSelectedPost(id)) 
        
  }, [id])
    
  return (
    <>
      <Navbar/>

        <section className="mt-[15vh] min-h-[80vh] flex justify-center">

          {isLoading ? (<Spinner/>) : 

            (isSuccess && postsLength !== 0 ? (       
                <div className=" mx-[2vw] lg:mx-[10vw] mt-[10px] mb-[3vh]">
                    <div className="flex flex-col lg:flex-row lg:justify-between mb-2">
                      <h1 className="text-lg lg:text-2xl font-semibold">{`${posts?.homeType} à louer à ${posts?.town} au quartier ${posts?.quarter}`}</h1>
                      <p className="text-lg lg:text-2xl text-blue-800 font-bold">{`${posts?.price} Fcfa/mois`}</p>
                    </div>
                    <p className="font-semibold">{`Tel: ${posts?.phoneNumber1} / ${posts?.phoneNumber2}`}</p>

                    <div className="flex flex-col lg:flex-row justify-between mb-2">
                      <p className="font-semibold">{`Versement à l'entrée : ${posts?.monthsNumber} mois de loyer`}</p>
                      <p className="text-blue-800 font-semibold">{`Caution : ${posts?.rentDeposit} Fcfa`}</p>
                    </div>

                    <div className="mt-[2vh] mb-[4vh] w-full h-fit flex flex-col lg:grid grid-row-2 grid-flow-col gap-3  lg:gap-1">  {/* h-fit */}
                        
                        <div className="rounded-2xl lg:border-2 lg:rounded-none row-span-2 col-span-2 lg:w-[600px] lg:h-[600px]">
                          { //That means If img exist for this post display it, else display no image
                            (postImgs?.length > 0 && postImgs[0] !== undefined) ? (
                                        <img src={`/uploads/${postImgs[0]}`} className="rounded-2xl lg:rounded-none lg:w-[600px] lg:h-[600px] "/>
                                    ) : (
                                      <img src={no_image} className="border-2 rounded-2xl lg:rounded-none h-full"/>
                                    )
                          }                          
                        </div>

                        <div className="lg:border-2 lg:w-[350px] lg:h-[350px]">
                          { //That means If img with index 1 exist display it, else display "no_image" but only for "lg" screen, for screen with size less than "lg", display nothing.
                           //The same logic for div below this one
                            (postImgs?.length > 1 && postImgs[1] !== undefined) ? (
                                        <img src={`/uploads/${postImgs[1]}`} className="rounded-2xl border-2 lg:rounded-none lg:w-[350px] lg:h-[350px]"/>
                                    ) : (
                                      <img src={no_image} className="border-2 rounded-2xl hidden lg:block lg:rounded-none h-full"/>
                                    )
                          }                                                      
                        </div>

                        <div className="lg:border-2 lg:w-[350px] lg:h-[350px]">
                          { //That means If img exist for this post display it, else display no image
                            (postImgs?.length > 2 && postImgs[2] !== undefined) ? (
                                        <img src={`/uploads/${postImgs[2]}`} className="border-2 rounded-2xl lg:rounded-none lg:w-[350px] lg:h-[350px]"/>
                                    ) : (
                                      <img src={no_image} className="border-2 rounded-2xl hidden lg:block lg:rounded-none h-full"/>
                                    )
                          }
                        </div>

                        <div className="lg:border-2 lg:w-[350px] lg:h-[350px]">
                            { //That means If img exist for this post display it, else display no image
                              (postImgs?.length > 3 && postImgs[3] !== undefined) ? (
                                        <img src={`/uploads/${postImgs[3]}`} className="border-2 rounded-2xl lg:rounded-none lg:w-[350px] lg:h-[350px]"/>
                                    ) : (
                                      <img src={no_image} className="border-2 rounded-2xl hidden lg:block lg:rounded-none h-full"/>
                                    )
                            }
                        </div>
                        <div className="lg:border-2 lg:w-[350px] lg:h-[350px]">
                            { //That means If img exist for this post display it, else display no image
                              (postImgs?.length > 4 && postImgs[4] !== undefined) ? (
                                        <img src={`/uploads/${postImgs[4]}`} className="border-2 rounded-2xl lg:rounded-none lg:w-[350px] lg:h-[350px]"/>
                                    ) : (
                                      <img src={no_image} className="border-2 rounded-2xl hidden lg:block lg:rounded-none h-full"/>
                                    )
                            }
                        </div>
                        
                    </div>

                    <div className="font-semibold bg-blue-200 text-black p-2 rounded-md w-full  "> 
                      <span className="font-bold">Description : </span> {`${posts?.homeDescription}`}
                    </div>       
                </div> ) : (<p className="text-center my-10">No home matches your search</p> )
            )
          }

        </section>

      <Footer/>      

  </>

  );
}

export default HomeDetails





 
