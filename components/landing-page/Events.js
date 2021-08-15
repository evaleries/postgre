import SectionHeader from './SectionHeader';
import EventsCard from './EventsCard';

export default function Events({ eventsData }) {
  return (
    <section className="mt-20">
      <SectionHeader text="Acara Postgre" />
      <div className="max-w-max mx-auto flex flex-wrap justify-evenly sm:max-w-4xl xl:max-w-6xl">
        {eventsData?.map((el) => {
          const speakers = [];
          el.presenters.map(({ name }) => speakers.push(name));
          return (
            <EventsCard
              key={el.id}
              src="/assets/event.png"
              title={el.title}
              place="Via Zoom"
              date={el.date}
              speakers={speakers}
            />
          );
        })}
      </div>
    </section>
  );
}
