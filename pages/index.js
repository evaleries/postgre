import Head from 'next/head';

import Hero from '../components/landing-page/Hero';
import Objective from '../components/landing-page/Objective';
import Events from '../components/landing-page/Events';
import Docs from '../components/landing-page/Docs';
import Presenters from '../components/landing-page/Presenters';
import FloatingButton from '../components/FloatingButton';
import Footer from '../components/Footer';
import useSWR from 'swr';

export default function Home() {
  const { data: eventsData } = useSWR('/api/events');
  const { data: presentersData } = useSWR('/api/presenters');
  const { data: docsData } = useSWR('/api/docs');

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>
          POSTGRE 2021 | Kembangkan skill kamu dengan pemateri profesional
        </title>
      </Head>
      <Hero />
      <Objective />
      <Events eventsData={eventsData?.data} />
      <Presenters presentersData={presentersData?.data} />
      <Docs docsData={docsData?.data} />
      <Footer />
      <FloatingButton />
    </div>
  );
}
