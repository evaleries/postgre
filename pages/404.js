import Head from 'next/head';

export default function custom404() {
  return (
    <div>
      <Head>
        <title>POSTGRE 2021 | Page Not Found</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-700">
        <img
          src="/assets/pemro.png"
          alt="pemro"
          className="h-24 object-contain"
        />
        <div className="text-gray-200 font-mono">
          <h1 className="fons-bold mt-10 text-2xl">404</h1>
          <p>Page not found.</p>
        </div>
      </div>
    </div>
  );
}
