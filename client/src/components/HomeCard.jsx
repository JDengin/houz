import { Link } from "react-router-dom";
import no_image from "../assets/no_image.jpg";

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

  return (
        
    <Link to={`/homedetails/${post?._id}`} className="bg-white hover:no-underline" > 
    
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
                  (post?.postImages).map((postImg, i) => (                    
                      <SwiperSlide key={i+1} className="border-2 rounded-t-2xl"><img src={`/uploads/${postImg}`} className="object-contain rounded-t-2xl"/></SwiperSlide>
                      // the complete root of img above is ../../public/uploads/${postImg}, this because files in the public directory are served at the root path.
                    ))
                ) : (
                  <SwiperSlide className="border-2 rounded-t-2xl"><img src={no_image} className="object-contain rounded-t-2xl"/></SwiperSlide>
                )

              }
         </Swiper>

         <p className="">{`Fcfa ${post?.price}/mois | ${post?.homeType} `}</p> 
         <p className="">{` ${post?.monthsNumber} mois d'avance | Caution ${post?.rentDeposit} Fcfa`}</p>
         <p className="">{` ${post?.town} | ${post?.quarter} `} </p>
         <p className="text-gray-500 no-underline">Click for more information ...</p>
    </Link>    
  )
}

export default HomeCard

