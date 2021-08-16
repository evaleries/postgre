import Image from 'next/image';
import Link from 'next/link';

function SpeakerInfo({ name, text, className }) {
  return (
    <div
      className={`shadow-md flex flex-col justify-between px-4 py-1 ${className}`}
    >
      <p className="text-sm font-medium my-1 2xl:text-base">{name}</p>
      <p className="text-xs 2xl:text-sm">{text}</p>
    </div>
  );
}

export default function EventsCard({ src, title, place, date, speakers }) {
  return (
    <div className="mx-4 hover:-translate-y-2 transition-transform">
      <div className="shadow-lg rounded-2xl w-[300px] overflow-hidden my-8 mx-auto">
        <div className="relative w-full h-52">
          <Image
            src={src}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="text-center my-4">
          <h3 className="font-semibold text-lg 2xl:text-xl px-6">{title}</h3>
          <p className="text-sm font-medium 2xl:text-base">{place}</p>
          <p className="text-sm font-medium 2xl:text-base">{date}</p>
        </div>
        {/* <div className="flex justify-between text-[#004BA7] my-3">
          <SpeakerInfo
            name={speakers[0]}
            text={speakers.length > 1 ? '1st Speaker' : 'Main speaker'}
            className="rounded-r-lg"
          />
          {speakers[1] && (
            <SpeakerInfo
              name={speakers[1]}
              text="2nd Speaker"
              className="rounded-l-lg"
            />
          )}
        </div> */}
        <Link href="/pendaftaran">
          <button className="font-sans2 font-bold bg-[#004BA7] text-white transition-all shadow-md w-full py-3 mt-1 hover:bg-[#99A8BB] active:text-gray-300">
            Daftar Sekarang
          </button>
        </Link>
      </div>
    </div>
  );
}
