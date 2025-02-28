import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow,Pagination,Navigation } from 'swiper/modules';
import slide_image_1 from '../assets/img-1.jpg';
import slide_image_2 from '../assets/img-2.jpg';
import slide_image_3 from '../assets/img-3.jpg';
import slide_image_4 from '../assets/img-4.jpg';
import slide_image_5 from '../assets/img-5.jpg';
import slide_image_6 from '../assets/img-6.jpg';
import slide_image_7 from '../assets/img-7.jpg';

function Gallery() {
  
  return (
    <div>
      <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={
        {
          rotate:0,
          stretch:0,
          depth:100,
          modifier:2.5,
        }
      }
      pagination={{el:'.swiper-pagination',clickable:true}}
      modules={[EffectCoverflow,Pagination,Navigation]}
      className='swiper_container'>
        <SwiperSlide>
          <img src={slide_image_1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_4} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_5} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_6} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_7} />
        </SwiperSlide>
        <div className='slider-controler'>
          <div className='swiper-pagination'></div>
        </div>
      </Swiper>
    </div>
  )
}

export default Gallery;