import PresentersCard from './PresentersCard';
import SectionHeader from './SectionHeader';

export default function Presenters() {
  return (
    <section className="my-20">
      <SectionHeader text="Pemateri" />
      <div className="max-w-max mx-auto flex flex-wrap justify-evenly sm:max-w-4xl xl:max-w-6xl">
        <PresentersCard
          src="/assets/presenters1.png"
          name="Rochman Maarif"
          info="Chief Technology Officer CMLABS"
        />
        <PresentersCard
          src="/assets/presenters2.png"
          name="Angela Colie"
          info="Data Analyst"
        />
        <PresentersCard
          src="/assets/presenters3.png"
          name="Rochman Maarif"
          info="Senior Frontend Engineer RUANG GURU"
        />
      </div>
    </section>
  );
}
