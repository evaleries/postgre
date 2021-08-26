import Head from 'next/head';
import Image from 'next/image';
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
    <div className="overflow-x-hidden relative">
      <Head>
        <title>
          POSTGRE 2021 | Kembangkan skill kamu dengan pemateri profesional
        </title>
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
        <Hero />
        <Objective />
        <Events eventsData={eventsData?.data} />
        <Presenters presentersData={presentersData?.data} />
        <Docs docsData={docsData?.data} />
        <Footer />
        <FloatingButton />
      </main>
    </div>
  );
}
