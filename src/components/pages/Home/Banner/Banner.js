import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./Banner.css";

// import required modules
import { Navigation } from "swiper";

export default function Banner() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper lg:!h-screen !w-11/12 mx-auto rounded mt-3">
        <SwiperSlide><img src="https://images.unsplash.com/photo-1589010588553-46e8e7c21788?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1260&q=80" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://images.unsplash.com/photo-1628717341663-0007b0ee2597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}
