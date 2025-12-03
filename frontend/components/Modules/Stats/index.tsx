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
    <section className={cn('stats-module section-module', 'my-24')}>
      <div className="container">
        <div className="grid-container items-center justify-between">
          <div className="section__description col-span-12 text-center">
            <h4>{heading}</h4>
          </div>
        </div>
        <div className={cn('grid-container items-start mx-auto pt-16')}>
          {statNumber?.map((stat: StatNumber) => {
            const {
              endNumber = '',
              suffix = '',
              startNumber = '',
              increaseStep = '',
              description,
            } = stat;

            return (
              <div className="col-span-12 md:col-span-3" key={get(stat, '_key')}>
                <div
                  className={cn('stats-number', 'flex relative justify-center text-bright-blue')}
                >
                  <AnimateNumber
                    start={parseInt(startNumber, 10)}
                    end={parseInt(endNumber, 10)}
                    increment={parseInt(increaseStep, 10)}
                    asType={'h1'}
                  />
                  <div className="h1 text-bright-blue">{suffix}</div>
                </div>
                <div className="my-2 font-normal text-center text-lg">{description}</div>
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
