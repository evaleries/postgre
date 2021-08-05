import Head from 'next/head';
import Hero from '../components/landing-page/Hero';
import Objective from '../components/landing-page/Objective';
import Events from '../components/landing-page/Events';
import Docs from '../components/landing-page/Docs';
import Presenters from '../components/landing-page/Presenters';
import FloatingButton from '../components/FloatingButton';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>
          POSTGRE 2021 | Kembangkan skill kamu dengan pemateri profesional
        </title>
      </Head>
      <Hero />
      <Objective />
      <Events />
      <Presenters />
      <Docs />
      <Footer />
      <FloatingButton />
    </div>
  );
}
