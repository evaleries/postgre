export default function Tickets({ eventName, date, name, code }) {
  return (
    <div className="flex rounded-md shadow-md overflow-hidden max-w-xs w-full">
      <div className="flex-1 p-4">
        <div className="flex justify-between space-x-4">
          <div>
            <h2 className="font-medium sm:text-lg">{eventName}</h2>
            <p className="text-sm">{date}</p>
          </div>
          <p className="font-medium">FREE</p>
        </div>
        <div className="flex justify-between space-x-4 mt-8">
          <div>
            <p className="font-medium text-xs">Nama Pendaftar:</p>
            <p className="font-bold">{name}</p>
          </div>
          <div>
            <p className="text-right font-medium text-xs">Kode :</p>
            <p className="font-medium">{code}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#004BA7] w-4"></div>
    </div>
  );
}
