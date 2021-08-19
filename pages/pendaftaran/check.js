import Head from 'next/head';
import { HiChevronLeft, HiSearch } from 'react-icons/hi';
import { useRef } from 'react';
import Tickets from '../../components/registration-check/Tickets';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Check() {
  const emailRef = useRef();
  const router = useRouter();
  let usersData = {};
  const { data } = useSWR(`/api/users?email=${router.query.email || ''}`);
  if (router.query.email) {
    usersData = data;
    console.log(`/api/users?email=${router.query.email || ''}`);
    console.log(usersData?.data);
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Head>
        <title>POSTGRE 2021 | Registration checck</title>
      </Head>
      <div className="min-h-[400px] mx-8 flex-1 bg-white max-w-3xl">
        <div
          className="absolute cursor-pointer hover:scale-110 active:scale-100 transition-transform"
          onClick={() => router.push('/')}
        >
          <HiChevronLeft className="h-10 w-10 sm:h-12 sm:w-12 text-[#004BA7] hover:text-blue-500 transition-colors" />
        </div>
        <img
          src="/assets/logo.svg"
          className="h-10 sm:h-12 object-contain mx-auto"
        />
        <h1 className="font-medium text-lg sm:text-xl text-center my-4">
          Registration Check
        </h1>

        <main className="mt-8">
          <div className="text-center text-sm font-medium">
            <h2>Apakah anda sudah mendaftar?</h2>
            <p>Cek disini</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.replace(
                `/pendaftaran/check?email=${emailRef.current.value}`
              );
            }}
            className="flex mx-8 sm:mx-auto sm:max-w-sm justify-center ring-2 ring-[#004BA7] p-1 mt-2"
          >
            <input
              ref={emailRef}
              type="text"
              placeholder="Masukkan alamat email"
              className="text-center flex-1 outline-none text-sm sm:text-base"
            />
            <button type="submit">
              <HiSearch className="h-5 w-5 text-gray-600 hover:text-black transition-colors" />
            </button>
          </form>
          <hr className="bg-[#004BA7] h-[3px] m-4 sm:m-6"></hr>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mx-4 sm:mx-6 justify-items-center">
            <Tickets
              eventName="Profesional Work Environment"
              date="26 September 2021"
              name="nama1"
              code="1"
            />
            <Tickets
              eventName="Data Science for Beginners"
              date="17 Oktober 2021"
              name="nama2"
              code="2"
            />
            <Tickets
              eventName="Python Fundamentals"
              date="18 September 2021"
              name="nama3"
              code="3"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
