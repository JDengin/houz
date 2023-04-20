import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import sample_home from "../assets/sample_home.jpg";
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdDeleteOutline } from "react-icons/md"
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
//import { getSelectedPost } from "../features/post/postSlice";

const HomeCardForMyHomes = ({ post }) => {

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  }

  const postImgs = [
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>
  ]

  const handleUpdate = () => {
    
      setShowUpdateModal(true)
  }

  const handleDelete = () => {
      
      setShowDeleteModal(true)
  }  

  return (
   /*  <button onClick={handleClick} className="m-4 bg-white rounded-lg w-[300px]"> */
        <div className="relative">
          <button onClick={handleUpdate} className="absolute right-8 top-2 z-10 hover:opacity-50"><BsThreeDotsVertical className="text-white text-2xl"/></button>    
          <button onClick={handleDelete} className="absolute left-8 top-2 z-10 hover:opacity-50"><MdDeleteOutline className="text-white text-2xl"/></button>  

         <Link to={`/homedetails/${post?._id}`} className="bg-white hover:no-underline relative" > 
         
            <Swiper
                pagination={{
                  clickable: true,
                }}
               navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {(postImgs).map(() => (
                  <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>
                  //replace 'sample_home' by 'imgUrl' when I'll find a way to send Imgs inside my db
                ))}
                  
            </Swiper>

            <p className="px-4">{`Fcfa ${post?.price}/mois | ${post?.homeType} `}</p> 
            <p className="px-4">{` ${post?.monthsNumber} mois d'avance | Caution ${post?.rentDeposit} Fcfa`}</p>
            <p className="px-4">{` ${post?.town} | ${post?.quarter} `} </p>
            <p className="px-4 text-gray-500 no-underline">Click for more information ...</p>
                    
         </Link>

           <UpdatePostModal post={post} handleCloseUpdateModal={handleCloseUpdateModal} showUpdateModal={showUpdateModal} />
       
           <DeletePostModal postId={post?._id} handleCloseDeleteModal={handleCloseDeleteModal} showDeleteModal={showDeleteModal} /> 

        </div>     
  )
}

export default HomeCardForMyHomes

