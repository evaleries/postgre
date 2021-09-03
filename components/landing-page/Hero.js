import Nav from '../Nav';
import Image from 'next/image';
import SwiperCore, { Navigation, EffectCoverflow, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation, EffectCoverflow, Autoplay]);
export default function Hero({ eventsData }) {
  return (
    <div id="home" className="bg-hero">
      <Nav />
      <div className="pb-40 2xl:pb-56 relative">
        <div className="max-w-max mt-10 mx-auto flex flex-col justify-center items-center sm:max-w-4xl lg:justify-between lg:flex-row lg:max-w-6xl">
          {eventsData && (
            <Swiper
              spaceBetween={50}
              slidesPerView="auto"
              navigation
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 40,
              }}
              className="lg:order-1 w-11/12 md:w-5/12 max-w-2xl rounded-lg relative"
            >
              {eventsData?.map((el) => (
                <SwiperSlide
                  key={el.id}
                  className="w-96 h-60 shadow-lg relative"
                >
                  <Image
                    src={el.photo}
                    alt={el.title}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 20%"
                    className="rounded-lg bg-blue-50/30"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <header className="text-white flex flex-col lg:ml-8 px-4">
            <h1 className="font-bold text-3xl my-6 lg:text-5xl 2xl:text-6xl 2xl:mb-14">
              POSTGRE 2021
            </h1>
            <div className="font-medium text-lg mb-8 lg:text-xl 2xl:text-2xl 2xl:mb-16 max-w-lg">
              <h2>
                Talkshow dan webinar yang membantu kamu mengetahui seluk beluk dunia professional dan bagaimana agar kamu bisa mencapainya
              </h2>
            </div>
            <button className="font-sans2 font-bold text-[#004BA7] bg-white rounded-br-3xl shadow-md w-max py-2 px-4 2xl:text-2xl hover:bg-gray-100 hover:scale-105 active:scale-100 transition-all">
              <a href="#events">Daftar Sekarang</a>
            </button>
          </header>
        </div>
        <div className="hidden lg:inline absolute right-0 mt-8 bg-[#0F54AE] text-white pl-14 pr-20 py-3 rounded-bl-3xl 2xl:hidden">
          Upcoming Event
        </div>
      </div>
    </div>
  );
}
