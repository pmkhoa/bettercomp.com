import cn from 'classnames';

import SearchBox from '@/components/Header/SearchBox';

type Props = {
  searchTerm?: string;
};

export default function SearchHero({ searchTerm }: Props) {
  return (
    <section className={cn('hero-short mb-16 md:mb-32 relative flex flex-col')}>
      <div className={cn('bg-blue text-white', 'order-1')}>
        <div
          className="absolute w-full h-[44%] left-0 bottom-0 bg-cover bg-repeat bg-center"
          style={{
            backgroundImage: `url('/images/bg-graphical-grid.svg')`,
          }}
        />
        <div className="container z-10 relative z-20">
          <div className="grid-container justify-center items-center  gap-none">
            <div
              className={cn('col-span-12 md:col-start-3 md:col-span-8 my-24 md:my-40 text-center')}
            >
              <div className={'my-4'}>
                <h5 className="">Search Results</h5>
              </div>
              <div className="flex justify-center">
                <SearchBox searchTerm={searchTerm} className="text-white bg-midnight-blue-darker" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
