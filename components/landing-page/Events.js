import SectionHeader from './SectionHeader';
import EventsCard from './EventsCard';

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

export default function Events({ eventsData }) {
  console.log(eventsData);
  return (
    <section id="events" className="mt-20">
      <SectionHeader text="Acara Postgre" />
      <div className="max-w-max mx-auto flex flex-wrap justify-evenly sm:max-w-4xl xl:max-w-6xl">
        {eventsData?.map((el) => {
          return (
            <EventsCard
              key={el.id}
              src="/assets/event.png"
              title={el.title}
              place="Via Zoom"
              date={convertDate(el.date)}
              speakers={el.presenters}
            />
          );
        })}
      </div>
    </section>
  );
}
