import Head from 'next/head';
import { HiChevronLeft, HiSearch } from 'react-icons/hi';
import { useRef } from 'react';
import Tickets from '../../components/registration-check/Tickets';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const convertDate = (date) => {
  const month = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  return (
    date.split('-')[2] +
    ` ${month[date.split('-')[1] - 1]} ` +
    date.split('-')[0]
  );
};

export default function Check() {
  const emailRef = useRef();
  const router = useRouter();
  const { data: eventsData } = useSWR(`/api/events`);
  const { data } = useSWR(`/api/users?email=${router.query.email || ''}`);
  let usersData;
  if (router.query.email) {
    usersData = data;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#939CE8] to-[#004BA7] flex justify-center items-center">
      <Head>
        <title>POSTGRE 2021 | Registration checck</title>
      </Head>
      <div className="min-h-[400px] m-2 flex-1 bg-white py-4 sm:px-4 shadow-md rounded-sm max-w-3xl">
        <div
          className="absolute cursor-pointer hover:scale-110 active:scale-100 transition-transform"
          onClick={() => router.push('/pendaftaran')}
        >
          <HiChevronLeft className="mx-2 h-10 w-10 sm:h-12 sm:w-12 text-[#004BA7] hover:text-blue-500 transition-colors" />
        </div>
        <img
          src="/assets/logo.svg"
          className="h-10 sm:h-12 object-contain mx-auto"
        />
        <h1 className="font-medium text-lg sm:text-xl text-center my-4">
          Registration Check
        </h1>

        <main className="mt-8 px-2">
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
            className="flex w-8/12 sm:w-6/12 mx-auto justify-center rounded-sm ring-1 ring-[#004BA7] p-1 mt-5"
          >
            <input
              ref={emailRef}
              type="text"
              placeholder="Masukkan alamat email"
              className="text-center flex-1 outline-none text-sm sm:text-base overflow-hidden"
            />
            <button type="submit">
              <HiSearch className="h-5 w-5 text-gray-400 hover:text-black transition-colors" />
            </button>
          </form>
          <hr className="bg-[#004BA7] h-[2.2px] m-4 sm:m-6"></hr>
          <div
            className={`grid grid-cols-1 gap-6 ${
              usersData?.data.length > 1 ? 'sm:grid-cols-2' : ''
            } mx-4 sm:mx-6 justify-items-center`}
          >
            {usersData ? (
              usersData.data.length ? (
                usersData.data.map((el) => {
                  const event = eventsData?.data.filter(
                    (e) => e.id === el.id_event
                  );
                  return (
                    <Tickets
                      key={el.id}
                      eventName={event && event[0].title}
                      date={event && convertDate(event[0].date)}
                      name={el.nama}
                      code={el.id}
                    />
                  );
                })
              ) : (
                <p className="text-red-600">Alamat email belum terdaftar</p>
              )
            ) : (
              <p className="text-gray-600">
                {router.query.email && 'Tunggu sebentar . . .'}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
