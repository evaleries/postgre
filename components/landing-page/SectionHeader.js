export default function SectionHeader({ text }) {
  return (
    <header className="text-center mb-10">
      <h2 className="text-[#004BA7] font-semibold text-2xl lg:text-3xl 2xl:text-4xl">
        {text}
      </h2>
    </header>
  );
}
