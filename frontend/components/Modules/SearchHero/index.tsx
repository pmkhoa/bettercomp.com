import cn from 'classnames';
import SearchBox from '@/components/Header/SearchBox';
import { MotionFadeIn } from '@/components';
import Image from 'next/image';

type Props = {
  searchTerm?: string;
};

export default function SearchHero({ searchTerm }: Props) {
  return (
    <section className={cn('hero-short mb-32 relative flex flex-col')}>
      <div className={cn('bg-blue text-white', 'order-1')}>
        <div className="container z-10 relative z-20">
          <div className="grid-container justify-center items-center  gap-none">
            <div
              className={cn('col-span-12 md:col-start-3 md:col-span-8 my-32 md:my-40 text-center')}
            >
              <div className={'my-4'}>
                <h5 className="text-artic uppercase">Search Results</h5>
              </div>
              <SearchBox searchTerm={searchTerm} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
