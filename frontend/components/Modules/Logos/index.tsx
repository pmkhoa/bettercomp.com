import cn from 'classnames';
import { ResolvedLink, SanityImage, PortableText } from '@/components';
import { Logos } from '@/sanity.types';
import './marquee.scss';

type Props = {
  block: Logos;
};

export default function ScrollingCustomerWithStoriesModule({ block }: Props) {
  if (!block.enabled) return null;

  const { heading, logoGroup, useMarqueeEffect } = block;

  return (
    <section className={cn('section-module', 'my-10')}>
      <div className="container">
        <div className="grid-container items-center justify-between">
          <div
            className={cn(
              'section__description col-span-12 max-w-full md:max-w-[280px] mx-auto text-left',
              'md:col-start-1 md:col-span-4 ml-0 mb-4 md:mb-0'
            )}
          >
            {heading && <div className="text-2xl font-medium">{heading}</div>}
          </div>

          <div className={cn('col-span-12 md:col-span-8 md:col-start-5')}>
            {useMarqueeEffect ? (
              <div className="marquee-wrapper">
                <div className="marquee">
                  {['original', 'replica'].map((s) => {
                    return (
                      <div className="marquee__group" aria-hidden={s === 'replica'} key={s}>
                        {logoGroup.map((image: any, index: number) => {
                          return (
                            <div
                              className="marquee-item customers-grid-item-wrapper"
                              key={`${image._key}-${index}`}
                            >
                              <div className="customers-grid-item">
                                <div className="logo-wrapper">
                                  <div className="max-w-full max-h-20 flex my-4 items-center">
                                    <div className="w-[180px] h-[50px] flex items-center">
                                      <SanityImage
                                        image={image}
                                        alt={image.alt}
                                        className={'object-contain'}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="logo-group flex gap-6 flex-wrap justify-around">
                {logoGroup.map((image: any, index: number) => {
                  return (
                    <div className="logo-wrapper" key={`${image._key}-${index}`}>
                      <div className="w-[140px] h-[40px] relative flex justify-center items-center">
                        <SanityImage
                          image={image}
                          alt={image.alt}
                          className={'object-contain absolute w-full h-full'}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
