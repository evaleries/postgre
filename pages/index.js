import Head from 'next/head';

import Hero from '../components/landing-page/Hero';
import Objective from '../components/landing-page/Objective';
//import Events from '../components/landing-page/Events';
//import Docs from '../components/landing-page/Docs';
import Presenters from '../components/landing-page/Presenters';
import FloatingButton from '../components/FloatingButton';
import Footer from '../components/Footer';

import PresentersCard from '../components/landing-page/PresentersCard';
import SectionHeader from '../components/landing-page/SectionHeader';

import DocsContent from '../../postgre-merged/components/landing-page/Docs';

import EventsCard from '../components/landing-page/EventsCard';

//get presenters dari events
function getPresenters(presenters, events) {
  //loop presenters, which id_event = event.id
  let data = {}
  for(var i=0;i<events.data.length;i++) {
    data[events.data[i].id] = []
    for(var j=0;j<presenters.data.length;++j) {
      if(events.data[i].id == presenters.data[j].id_event) {
        data[events.data[i].id].push(presenters.data[j].name)
      }
    }
  }
  return data
}

function convertDate(date) {
  let bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ]
  return date.split("-")[2] + ` ${bulan[parseInt(date.split("-")[1] - 1)]} ` + date.split("-")[0]
}

export default function Home({presenters, docs, events, event_details}) {
  console.log(events)
  console.log(event_details)
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>
          POSTGRE 2021 | Kembangkan skill kamu dengan pemateri profesional
        </title>
      </Head>
      <Hero />
      <Objective />
      <section className="mt-20">
      <SectionHeader text="Acara Postgre" />
      <div className="max-w-max mx-auto flex flex-wrap justify-evenly sm:max-w-4xl xl:max-w-6xl">
      {events.data.map((user, key) => (
            <EventsCard
            src={user.photo}
            title={user.title}
            date={convertDate(user.date)}
            speakers={event_details[user.id]}
          />
          ))}
      </div>
    </section>
      <section className="my-20">
      <SectionHeader text="Pemateri" />
      <div className="max-w-max mx-auto flex flex-wrap justify-evenly sm:max-w-4xl xl:max-w-6xl">
      {presenters.data.map((user, key) => (
            <PresentersCard
            src={user.photo}
            name={user.name}
            info={user.desc}
            key={key}
          />
          ))}
      </div>
    </section>
    <section className="my-20">
      <SectionHeader text="Dokumentasi" />
      <div className="max-w-max mx-auto md:grid md:grid-cols-2 md:max-w-4xl md:gap-x-8 sm:justify-items-center xl:max-w-6xl">
      {docs.data.map((i, key) => (
        <DocsContent
        key={i}
        pos={1}
        src={i.photo}
        title={i.events.title}
        text={i.events.title}
      />
          ))}
      </div>
    </section>
      <Footer />
      <FloatingButton />
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  let res = await fetch('http://localhost:3000/api/presenters')
  const presenters = await res.json()
  res = await fetch('http://localhost:3000/api/docs')
  const docs = await res.json()
  res = await fetch('http://localhost:3000/api/events')
  const events = await res.json()
  const event_details = getPresenters(presenters, events);
  // By returning { props: { presenters } }, the Blog component
  // will receive `presenters` as a prop at build time
  return {
    props: {
      presenters,
      docs,
      events,
      event_details
    },
  }
}