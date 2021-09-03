import { HiOutlineCalendar, HiOutlineLocationMarker } from 'react-icons/hi';
import { useRouter } from 'next/router';
import convertDate from '../../utils/convertDate';

export default function EventHeader({ title, date, startTime, open_date }) {
  const router = useRouter();
  const now = new Date();
  return (
    <div className="relative md:flex items-center justify-between">
      {/* Ticket */}
      <div className="bg-white blue-shadow rounded-xl p-4 max-w-[240px] flex-1 order-1 mx-auto mb-8 md:m-0">
        <div className="px-4">
          <p className="text-xs">Harga tiket</p>
          <p className="text-[#004BA7] text-3xl font-semibold">Free</p>
          {now > new Date(open_date) ? (
            <p className="text-sm mt-2 mb-4">Tiket tersedia</p>
          ) : (
            <p className="text-sm mt-2 mb-4">Pendaftaran akan dibuka pada tanggal {convertDate(open_date)}</p>
          )}
        </div>
        {now > new Date(open_date) ? (
          <button
          className="bg-[#004BA7] text-white rounded-xl w-full py-2 hover:bg-[#99A8BB] active:text-gray-300"
          type="button"
          onClick={() =>
            router.push({
              pathname: '/pendaftaran',
              query: { eventId: router.query.eventId },
            })
          }
        >
          Daftar Sekarang
        </button>
          ) : (
            ""
          )}
      </div>

      {/* Information */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl text-[#004BA7] font-bold text-center mx-auto max-w-lg md:text-left">
          {title}
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start">
          <div className="inline-flex">
            <HiOutlineLocationMarker className="h-5 w-5 mr-2" />
            <p>Online</p>
          </div>
          <div className="inline-flex">
            <HiOutlineCalendar className="h-5 w-5 ml-4 mr-2" />
            <p>
              {date && convertDate(date)} - {startTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
