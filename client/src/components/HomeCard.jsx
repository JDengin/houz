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

const HomeCard = () => {
  return (
    <div className="m-4 bg-white rounded-lg w-[300px]">
         <Link to="/homedetails" className="bg-white"> 
              
              <Swiper
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide><img src={sample_home} className="object-fit"/></SwiperSlide>
                <SwiperSlide><img src={sample_home} className="object-contain"/></SwiperSlide>
                <SwiperSlide><img src={sample_home} className="object-contain"/></SwiperSlide>
                <SwiperSlide><img src={sample_home} className="object-contain"/></SwiperSlide>
                <SwiperSlide><img src={sample_home} className="object-contain"/></SwiperSlide>
                <SwiperSlide><img src={sample_home} className="object-contain"/></SwiperSlide>
                <SwiperSlide><img src={sample_home} className="object-contain"/></SwiperSlide>
                <SwiperSlide><img src={sample_home} className="object-contain"/></SwiperSlide>
                <SwiperSlide><img src={sample_home} className="object-contain"/></SwiperSlide>
              </Swiper>

          </Link> 

        <p className="px-2">Price: </p>
        <p className="px-2">Home characteristic: </p>
        <p className="px-2">Home location: </p>
     </div> 
    
  )
}

export default HomeCard

