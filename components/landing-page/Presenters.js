import PresentersCard from './PresentersCard';
import SectionHeader from './SectionHeader';

export default function Presenters({ presentersData }) {
  return (
    <section id="presenters" className="my-20">
      <SectionHeader text="Pemateri" />
      <div className="max-w-max mx-auto flex flex-wrap justify-evenly sm:max-w-4xl xl:max-w-6xl">
        {presentersData?.map((el) => (
          <PresentersCard
            key={el.id}
            src={el.photo}
            name={el.name}
            info={el.desc}
          />
        ))}
      </div>
    </section>
  );
}
