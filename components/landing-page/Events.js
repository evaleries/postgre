import SectionHeader from './SectionHeader';
import EventsCard from './EventsCard';

export default function Events() {
  return (
    <section className="mt-20">
      <SectionHeader text="Acara Postgre" />
      <div className="max-w-max mx-auto flex flex-wrap justify-evenly sm:max-w-4xl xl:max-w-6xl">
        <EventsCard
          src="/assets/event.png"
          title="Professional Work Environment"
          place="Via Zoom"
          date="26 September 2020"
          speakers={['Rochman Maarif', 'Bagus Juang']}
        />
        <EventsCard
          src="/assets/event.png"
          title="Professional Work Environment"
          place="Via Zoom"
          date="26 September 2020"
          speakers={['Rochman Maarif', 'Bagus Juang']}
        />
      </div>
    </section>
  );
}
