export default function EventDescription({ desc }) {
  return (
    <div className="py-8">
      <h2 className="font-medium text-xl mb-4 text-center sm:text-left">
        Deskripsi Acara
      </h2>
      <p className="text-justify">{desc}</p>
    </div>
  );
}
