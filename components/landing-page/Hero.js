import Nav from '../Nav';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="bg-hero">
      <Nav />
      <div className="pb-40 2xl:pb-56 relative">
        <div className="max-w-max mt-10 mx-auto flex flex-col justify-center items-center sm:max-w-4xl lg:items-start lg:justify-between lg:flex-row xl:max-w-6xl">
          <div className="lg:order-1 w-11/12 md:w-5/12 max-w-2xl relative shadow-md">
            <Image
              src="/assets/hero-img.jpg"
              alt="Postgre"
              layout="responsive"
              width={1920}
              height={1080}
              className="rounded-lg z-10"
              priority
            />
            <div className="w-full h-full hidden md:inline scale-80 rounded-lg bg-white/25 absolute top-0 md:-left-24 xl:-left-28"></div>
            <div className="w-full h-full hidden md:inline scale-90 rounded-lg bg-[#8EADDA] absolute top-0 md:-left-14 xl:-left-14"></div>
          </div>
          <header className="text-white flex flex-col lg:ml-8">
            <h1 className="font-bold text-3xl my-6 lg:text-5xl 2xl:text-6xl 2xl:mb-14">
              POSTGRE 2021
            </h1>
            <div className="font-medium text-lg mb-8 lg:text-xl 2xl:text-2xl 2xl:mb-16">
              <h2>Kembangkan skill kamu</h2>
              <h2>dengan pemateri profesional</h2>
            </div>
            <button className="font-sans2 font-bold text-[#004BA7] bg-white rounded-br-3xl shadow-md w-max py-2 px-4 2xl:text-2xl hover:bg-gray-200 active:bg-gray-300 transition-all">
              Daftar Sekarang
            </button>
          </header>
        </div>
        <div className="hidden lg:inline absolute right-0 mt-8 bg-[#0F54AE] text-white pl-14 pr-20 py-3 rounded-bl-3xl 2xl:text-xl">
          Upcoming Event
        </div>
      </div>
    </div>
  );
}
