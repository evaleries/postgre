import Head from 'next/head';
import Link from 'next/link';
import { HiChevronLeft, HiCheck } from 'react-icons/hi';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function success() {
  const router = useRouter();
  const { data: eventsData } = useSWR(
    router.query.eventId ? `/api/events?eventId=${router.query.eventId}` : null
  );

  console.log(eventsData);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#939CE8] to-[#004BA7] flex justify-center items-center">
      <Head>
        <title>POSTGRE 2021 | Pendaftaran Berhasil</title>
      </Head>
      <div className="m-2 flex-1 bg-white py-4 sm:px-4 shadow-md rounded-xl max-w-3xl">
        <div
          className="absolute cursor-pointer hover:scale-110 active:scale-100 transition-transform"
          onClick={() => router.back()}
        >
          <HiChevronLeft className="mx-2 h-10 w-10 sm:h-12 sm:w-12 text-[#004BA7] hover:text-blue-500 transition-colors" />
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-10">
          <HiCheck className="h-24 w-24 text-green-700 rounded-full border-4 border-green-700 p-3 mx-auto" />
          <h1 className="font-medium text-lg sm:text-xl text-center my-4">
            Pendaftaran Berhasil
          </h1>
          <div className="bg-white rounded-md w-full mx-auto flex flex-col items-center">
            <p className="px-2 text-sm font-medium">
              Pendaftaran telah berhasil.{' '}
              <strong>
                Periksa e-mail untuk mendapatkan link group Whatsapp.
              </strong>{' '}
              Informasi mengenai link zoom akan dibagikan melalui e-mail dan
              group Whatsapp.
            </p>
            <Link href="/pendaftaran/check">
              <div className="text-white bg-blue-700 px-4 py-2 shadow-md ring-1 cursor-pointer hover:scale-105 active:scale-100 transition-transform mt-10 rounded-md">
                Cek Pendaftaran
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
