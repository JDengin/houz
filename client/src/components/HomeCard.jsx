import { Link } from "react-router-dom";
import sample_home from "../assets/sample_home.jpg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../App.css";

// import required modules
import { Pagination, Navigation } from "swiper";

const HomeCard = ({ post }) => {

  /* const postImgs = [
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>,
    <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>
  ]  */ 

  return (
        
    <Link to={`/homedetails/${post?._id}`} className="bg-white hover:no-underline relative" > 
    
         <Swiper
             pagination={{
               clickable: true,
             }}
             navigation={true}
             modules={[Pagination, Navigation]}
             className="mySwiper"
           >
             {
                (post?.postImages?.length > 0) ? ( 
                  (post?.postImages).map((postImg) => (                    
                      <SwiperSlide><img src={`/uploads/${postImg}`} className="object-contain rounded-2xl"/></SwiperSlide>
                      // the complete root of img above is ../../public/uploads/${postImg}, this because files in the public directory are served at the root path.
                    ))
                ) : (
                  <SwiperSlide><img src={sample_home} className="object-contain rounded-2xl"/></SwiperSlide>
                )

              }
         </Swiper>

         <p className="px-4">{`Fcfa ${post?.price}/mois | ${post?.homeType} `}</p> 
         <p className="px-4">{` ${post?.monthsNumber} mois d'avance | Caution ${post?.rentDeposit} Fcfa`}</p>
         <p className="px-4">{` ${post?.town} | ${post?.quarter} `} </p>
         <p className="px-4 text-gray-500 no-underline">Click for more information ...</p>
    </Link>    
  )
}

export default HomeCard

