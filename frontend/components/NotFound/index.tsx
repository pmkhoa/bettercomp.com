import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className="page-404">
      <div className="container">
        <div className="grid-container -mt-16 md:-mt-24 xl:-mt-32 mb-20 relative z-20">
          <div className="section__description col-span-12 md:col-start-2 md:col-span-10 text-center">
            <h1 className="h2 font-bold">OOPS.</h1>
            <p className="mt-0 mb-8 h3">The page you are looking has moved or not existed.</p>
            <Link href={'/'} className="button button-primary">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
