import Image from 'next/image';
import { HiChevronLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';

export default function EventHero({ imageUrl }) {
  const router = useRouter();

  return (
    <div className="h-80 sm:h-[300px] md:h-[450px] 2xl:h-[600px] relative z-10">
      {/* bg hero */}
      <Image
        src={imageUrl}
        layout="fill"
        objectFit="cover"
        objectPosition="50% 30%"
        className="opacity-40 blur-sm"
      />
      {/* hero */}
      <Image
        src={imageUrl}
        layout="fill"
        objectFit="contain"
        objectPosition="center"
      />

      <div
        className="absolute left-4 sm:left-10 top-8 bg-white rounded-full cursor-pointer hover:scale-105 active:scale-100 active:bg-gray-200 transition-transform shadow-md"
        onClick={() => router.push('/')}
      >
        <HiChevronLeft className="h-10 w-10 pr-1 text-[#004BA7]" />
      </div>
    </div>
  );
}
