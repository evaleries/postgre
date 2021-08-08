import Image from 'next/image';
import SectionHeader from './SectionHeader';

function DocsContent({ src, title, text, pos }) {
  return (
    <div
      className={`w-[300px] lg:w-[440px] my-6 hover:-translate-y-2 transition-transform ${
        pos % 2 === 1 && 'md:mt-20'
      }`}
    >
      <div className="w-full h-48 relative rounded-lg shadow-sm lg:h-72">
        <Image
          src={src}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-lg shadow-lg"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p>{text}</p>
    </div>
  );
}

const data = [
  {
    src: '/assets/DocsPostgre20191.png',
    title: 'Webinar Postgre 2019',
    text: 'Digital Branding dan Softskill',
  },
  {
    src: '/assets/DocsPostgre20192.png',
    title: 'Webinar Postgre 2019',
    text: 'Digital Branding dan Softskill',
  },
  {
    src: '/assets/DocsPostgre20201.png',
    title: 'Webinar Postgre 2020',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    src: '/assets/DocsPostgre20202.png',
    title: 'Webinar Postgre 2020',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default function Docs() {
  return (
    <section className="my-20">
      <SectionHeader text="Dokumentasi" />
      <div className="max-w-max mx-auto md:grid md:grid-cols-2 md:max-w-4xl md:gap-x-8 sm:justify-items-center xl:max-w-6xl">
        {data.map((el) => {
          const index = data.indexOf(el);
          return (
            <DocsContent
              key={index}
              pos={index}
              src={el.src}
              title={el.title}
              text={el.text}
            />
          );
        })}
      </div>
    </section>
  );
}
