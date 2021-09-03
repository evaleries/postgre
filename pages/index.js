import Head from 'next/head';
import Image from 'next/image';
import Hero from '../components/landing-page/Hero';
import Objective from '../components/landing-page/Objective';
import Events from '../components/landing-page/Events';
import Docs from '../components/landing-page/Docs';
import FloatingButton from '../components/FloatingButton';
import Footer from '../components/Footer';
import useSWR from 'swr';

export default function Home() {
  let { data: eventsData } = useSWR('/api/events');
  let { data: docsData } = useSWR('/api/docs');
  if (eventsData) {
    eventsData = eventsData.data.sort((a, b) => (a.date < b.date ? -1 : 1));
  }
  return (
    <div className="overflow-hidden relative">
      <Head>
        <title>POSTGRE 2021 | Pemro Share, Talk, and Greet</title>
      </Head>

      {/* Background Ornament */}
      <div className="absolute h-full w-full">
        <div className="h-[800px] w-[800px] absolute top-1/3 -left-96">
          <Image
            src="/assets/ornament.png"
            layout="fill"
            priority
            className="animate-spin-slow"
          />
        </div>
        <div className="h-[800px] w-[800px] absolute top-3/4 -translate-y-72 -right-80">
          <Image
            src="/assets/ornament.png"
            layout="fill"
            priority
            className="animate-spin-slow"
          />
        </div>
      </div>

      {/* Page Content */}
      <main className="bg-blue-50/30 relative">
        <Hero eventsData={eventsData} />
        <Objective />
        <Events eventsData={eventsData} />
        {/* <Docs docsData={docsData?.data} /> */}
        <Footer />
        <FloatingButton />
      </main>
    </div>
  );
}
