import SectionHeader from './SectionHeader';
import Image from 'next/image';
import { useState } from 'react';

export default function Objective() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="my-20" id="objective">
      <SectionHeader text="Tentang Postgre" />
      <div className="max-w-max mx-auto flex flex-col items-center justify-between sm:max-w-5xl md:flex-row xl:max-w-6xl">
        <div className="w-10/12 relative max-w-4xl my-4 md:w-7/12 md:order-1 lg:w-6/12">
          <div
            className="relative w-[200px] cursor-pointer p-2 bg-white shadow-xl mx-auto z-10 hover:scale-105 active:scale-100 transition-transform"
            onClick={() => setModalOpen(true)}
          >
            <Image
              src="/assets/poster.png"
              layout="responsive"
              width={400}
              height={600}
            />
          </div>
          <div className="absolute h-56 w-56 md:h-72 md:w-72 xl:h-96 xl:w-96 -right-20 top-0 rounded-full bg-blue-100"></div>
        </div>
        <div className="relative flex-1 xl:text-xl 2xl:text-2xl px-4">
          <p>
            Pemro Share, Talk, and Greet <strong>(POSTGRE)</strong> adalah
            kegiatan yang diselenggarakan setahun sekali sejak 2020 untuk
            mempersiapkan masyarakat umum terutama mahasiswa dalam menghadapi
            dunia kerja nantinya.
          </p>
          <p className="mt-4">
            Disini kita berbagi bermacam pengetahuan yang disampaikan oleh
            pemateri profesional dan dikemas dalam webinar yang menarik dan
            interaktif.
          </p>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 py-4 px-8 sm:px-16 z-50 h-screen w-screen flex justify-center items-center">
          <div
            className="absolute h-full w-full bg-black/70 cursor-pointer"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="relative w-full inset-0 max-w-screen-md h-full overflow-y-scroll scrollbar-hide">
            <Image
              src="/assets/poster.png"
              layout="responsive"
              placeholder="blur"
              blurDataURL="/assets/poster_blur.png"
              width={1200}
              height={1920}
            />
          </div>
        </div>
      )}
    </section>
  );
}
