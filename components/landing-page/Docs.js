import Image from 'next/image';
import SectionHeader from './SectionHeader';

function DocsContent({ src, title, text, pos }) {
  return (
    <div
      className={`w-[300px] lg:w-[400px] my-6 hover:-translate-y-2 active:translate-y-0 transition-transform ${
        pos % 2 === 1 && 'md:mt-20'
      }`}
    >
      <div className="w-full h-48 relative rounded-lg shadow-sm lg:h-64">
        <Image
          src={src}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="font-medium">{text}</p>
    </div>
  );
}

export default function Docs({ docsData }) {
  return (
    <section className="py-10" id="docs">
      <SectionHeader text="Dokumentasi" />
      {docsData?.length > 0 ? (
        <div className="max-w-max mx-auto md:grid md:grid-cols-2 md:max-w-4xl md:gap-x-8 sm:justify-items-center lg:max-w-5xl">
          {docsData.map((el, key) => (
            <DocsContent
              key={el.id}
              pos={key}
              src={el.photo}
              title={el.events.title}
              text={el.desc}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Data dokumentasi belum tersedia.
        </p>
      )}
    </section>
  );
}
