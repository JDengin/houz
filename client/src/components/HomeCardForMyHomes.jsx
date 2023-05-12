import { useState } from "react";
import { Link } from "react-router-dom";
import no_image from "../assets/no_image.jpg";
import { UpdatePostModal, DeletePostModal } from "../components"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../App.css";

// import required modules
import { Pagination, Navigation } from "swiper";

const HomeCardForMyHomes = ({ post }) => {

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleCloseUpdateModal = () => { 
    setShowUpdateModal(false); 
    document.body.style.overflow = 'unset';
  }

  const handleCloseDeleteModal = () => { 
    setShowDeleteModal(false); 
    document.body.style.overflow = 'unset';
  }

  const handleUpdate = () => { 
    setShowUpdateModal(true) 
    document.body.style.overflow = 'hidden' //this line remove vertical scrollbar (horizontal too)
  }
  
  const handleDelete = () => { 
    setShowDeleteModal(true) 
    document.body.style.overflow = 'hidden' //this line remove vertical scrollbar (horizontal too)
  }  

  return (
        <div className="flex flex-col">
          
            <Link to={`/homedetails/${post?._id}`} className=" hover:no-underline flex flex-col"> 

              <div>
                <Swiper
                  pagination={{
                    clickable: true,
                  }}
                navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper w-30"
                >
                  {
                    (post?.postImages?.length > 0) ? ( 
                      (post?.postImages).map((postImg) => (                    
                          <SwiperSlide key={postImg} className="border-2 rounded-t-2xl"><img src={`/uploads/${postImg}`} className="object-contain rounded-t-2xl"/></SwiperSlide>
                          // the complete root of img above is ../../public/uploads/${postImg}, this because files in the public directory are served at the root path.
                        ))
                    ) : (                      
                      <SwiperSlide className="border-2 rounded-t-2xl"><img src={no_image} className="object-contain rounded-t-2xl"/></SwiperSlide>
                    )
                  }
                    
                </Swiper>
                
              </div>                                            
                    
            </Link>

            <div className="flex justify-around w-[300px] bg-gray-200 h-10 py-1">
                <button onClick={handleUpdate} className="bg-[#1B4571] text-white w-[100px] rounded-sm hover:opacity-50">Update</button>
                <button onClick={handleDelete} className="bg-red-400 text-white w-[100px] rounded-sm hover:opacity-50">Delete</button>
            </div>            

            <Link to={`/homedetails/${post?._id}`} className=" hover:no-underline flex flex-col">    

              <div className=" w-[300px]">
                  <p className="">{`Fcfa ${post?.price}/mois | ${post?.homeType} `}</p> 
                  <p className="">{` ${post?.monthsNumber} mois d'avance | Caution ${post?.rentDeposit} Fcfa`}</p>
                  <p className="">{` ${post?.town} | ${post?.quarter} `} </p>
                  <p className=" text-gray-500 no-underline">Click for more information ...</p>
              </div>

            </Link>

            <UpdatePostModal post={post} handleCloseUpdateModal={handleCloseUpdateModal} showUpdateModal={showUpdateModal} />
       
            <DeletePostModal postId={post?._id} handleCloseDeleteModal={handleCloseDeleteModal} showDeleteModal={showDeleteModal} /> 

        </div>     
  )
}

export default HomeCardForMyHomes

