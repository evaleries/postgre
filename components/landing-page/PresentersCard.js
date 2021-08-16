import Image from 'next/image';

export default function PresentersCard({ src, name, info }) {
  return (
    <div className="mx-4 my-8 shadow-lg rounded-2xl overflow-hidden transition hover:-translate-y-2 active:translate-y-0">
      <div className="mx-auto w-72 sm:w-60">
        <div className="w-full h-52 relative">
          <Image
            src={src}
            alt={name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-medium mb-1 lg:text-xl">{name}</h3>
          <p className="text-sm font-medium px-2">{info}</p>
        </div>
      </div>
    </div>
  );
}
