import Image from 'next/image';

function PresentersCard({ src, name, info }) {
  return (
    <div className="mb-4 w-max mx-auto sm:mx-0 sm:flex sm:flex-row sm:justify-start sm:items-center">
      <div className="h-48 w-48 relative hover:scale-105 active:scale-100 transition-transform">
        <Image
          src={src}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="space-y-2 m-4">
        <div className="leading-tight">
          <h3>Nama</h3>
          <p className="text-xl text-[#004BA7] font-semibold">{name}</p>
        </div>
        <div className="leading-tight">
          <h3>Jabatan</h3>
          <p className="text-xl text-[#004BA7] font-semibold">{info}</p>
        </div>
        <div className="leading-tight">
          <h3>Tempat Kerja</h3>
          <p className="text-xl text-[#004BA7] font-semibold">{info}</p>
        </div>
      </div>
    </div>
  );
}

export default function EventPresenters({ presentersData }) {
  return (
    <div className="py-8">
      <h2 className="font-medium text-xl mb-4 text-center sm:text-left">
        Pemateri
      </h2>
      <div>
        {presentersData?.map((el) => (
          <PresentersCard
            key={el.id}
            src={el.photo}
            name={el.name}
            info={el.desc}
          />
        ))}
      </div>
    </div>
  );
}
