import cn from 'classnames';
import { AnimateNumber, ResolvedLink, ButtonPrimary } from '@/components';
import { Stats, StatNumber } from '@/sanity.types';
import { get } from 'lodash';

type Props = {
  heading?: string;
  ctaText?: string;
  ctaLink?: any;
  statNumber: any;
};

export default function StatsModule({ block }: { block: Stats }) {
  if (!block.enabled) return null;
  const { heading, ctaButton, statNumber } = block;

  return (
    <section className={cn('stats-module section-module', 'my-20 md:my-32')}>
      <div className="container">
        <div className="grid-container items-center justify-between">
          <div className="section__description col-span-12 text-center">
            <h4>{heading}</h4>
          </div>
        </div>
        <div
          className={cn(
            'flex gap-0 gap-y-8 md:gap-8 justify-center mx-auto pt-8 flex-wrap',
            statNumber && statNumber.length > 3 && 'gap-x-0'
          )}
        >
          {statNumber?.map((stat: StatNumber) => {
            const {
              endNumber = '',
              suffix = '',
              startNumber = '',
              increaseStep = '',
              description,
            } = stat;

            return (
              <div className={cn('w-full md:w-1/4 my-2 px-4')} key={get(stat, '_key')}>
                <div
                  className={cn('stats-number', 'flex relative justify-center text-bright-blue')}
                >
                  <AnimateNumber
                    start={parseInt(startNumber, 10)}
                    end={parseInt(endNumber, 10)}
                    increment={parseInt(increaseStep, 10)}
                    asType={'h1 mb-2'}
                  />
                  {suffix && <div className="h1 mb-0 text-bright-blue">{suffix}</div>}
                </div>
                <div className="font-normal text-center md:text-xl">{description}</div>
              </div>
            );
          })}
        </div>
        {ctaButton && ctaButton.linkLabel && (
          <div className="text-center my-8">
            <ButtonPrimary>
              <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
            </ButtonPrimary>
          </div>
        )}
      </div>
    </section>
  );
}
