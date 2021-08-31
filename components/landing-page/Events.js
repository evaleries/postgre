import SectionHeader from './SectionHeader';
import EventsCard from './EventsCard';
import convertDate from '../../utils/convertDate';

export default function Events({ eventsData }) {
  const now = new Date();
  return (
    <section id="events" className="py-10">
      <SectionHeader text="Acara Postgre" />
      <div className="max-w-max mx-auto flex flex-wrap justify-evenly sm:max-w-4xl xl:max-w-6xl items-stretch">
        {eventsData?.map((el) => {
          return (
            <EventsCard
              key={el.id}
              eventId={el.id}
              src={el.photo}
              title={el.title}
              place="Via Zoom"
              date={convertDate(el.date)}
              speakers={el.presenters}
              underway={now < new Date(el.date)}
            />
          );
        })}
      </div>
    </section>
  );
}
