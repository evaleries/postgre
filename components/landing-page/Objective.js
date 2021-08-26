import SectionHeader from './SectionHeader';
import Image from 'next/image';

export default function Objective() {
  return (
    <section className="my-20">
      <SectionHeader text="Tujuan Postgre" />
      <div className="max-w-max mx-auto flex flex-col items-center justify-between sm:max-w-5xl md:flex-row xl:max-w-6xl">
        <div className="w-10/12 relative max-w-4xl my-4 md:w-7/12 md:order-1 lg:w-6/12">
          <Image
            src="/assets/amico.svg"
            layout="responsive"
            width={1920}
            height={1080}
            className="z-10"
          />
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
    </section>
  );
}
