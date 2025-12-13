import './carousel.css';

import cn from 'classnames';

import { Carousel, PortableText, ResolvedLink, SanityImage } from '@/components';
import { Testimonials } from '@/sanity.types';

import s from './style.module.css';

type Props = {
  block: Testimonials;
};

export default function SectionTestimonialsModule({ block }: Props) {
  const { enabled } = block;

  if (!enabled) {
    return <div />;
  }

  const { readAllReviews, testimonialList = [] } = block;

  return (
    <section className={cn('section-module testimonial-carousel', 'my-20')}>
      <div className="container  overflow-x-hidden">
        <div
          className={cn(
            s['content-wrapper'],
            testimonialList && testimonialList.length > 1 && 'pb-24 bg-sand lg:pb-0'
          )}
        >
          <Carousel
            options={{
              slidesPerPage: 1,
              center: false,
              adaptiveHeight: false,
              showProgressbar: false,
              Autoplay: {
                // @ts-expect-error: temp fix for type
                isEnabled: true,
                showProgressbar: false,
              },
              Dots: false,
              transition: 'fade',
              Panzoom: {
                touch: false,
              },
              Navigation: {
                nextTpl: `
                <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="-1" width="59" height="59" transform="matrix(1 0 0 -1 0 59)" fill="white" stroke="#F24E1A" stroke-width="2"/>
                  <path d="M24.0001 39.7L26.3334 42L38 30.5L26.3333 19L24 21.3L33.3333 30.5L24.0001 39.7Z" fill="#F24E1A"/>
                </svg>
								`,
                prevTpl: `
                <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="-1" y="1" width="59" height="59" transform="matrix(-1 0 0 1 59 0)" fill="white" stroke="#F24E1A" stroke-width="2"/>
                  <path d="M36.9999 21.3L34.6666 19L23 30.5L34.6667 42L37 39.7L27.6667 30.5L36.9999 21.3Z" fill="#F24E1A"/>
                </svg>
						    `,
              },
            }}
          >
            {testimonialList.map((d: any) => {
              const { companyIcon, totalStars, title, content, avatarIcon, reviewer } = d;

              return (
                <div
                  className={cn(
                    'f-carousel__slide carousel__slide-container items-start gap-8 mt-16 w-full overflow-visible pt-20',
                    testimonialList.length <= 1 && 'bg-sand'
                  )}
                  key={d._key}
                >
                  <div
                    className={cn(
                      s['testimonial-content'],
                      'pt-16 p-4 relative',
                      'md:p-16  md:mt-0'
                    )}
                  >
                    <div
                      className={cn(
                        'company-icon absolute -top-12 right-8 flex justify-start',
                        ' md:right-auto md:left-16'
                      )}
                    >
                      <SanityImage image={companyIcon} className="max-h-[94px] h-auto w-auto" />
                    </div>
                    <div className="grid-container">
                      <div className="col-span-12 md:col-span-9">
                        <div className={s['content-heading']}>
                          <div className="title my-4">
                            <strong>{title}</strong>
                          </div>
                        </div>
                        <div className={s['content-inner']}>
                          <PortableText value={content} />
                        </div>
                        <div className="flex gap-4 items-center mt-6">
                          {avatarIcon && (
                            <div className="avatar max-h-[40px] relative max-w-[120px]">
                              <SanityImage
                                image={avatarIcon}
                                className="w-auto h-auto object-contain min-h-[40px]"
                              />
                            </div>
                          )}
                          <div className="font-bold">{reviewer}</div>
                        </div>
                      </div>
                      <div className="review-stars my-2 md:my-8 col-span-12 lg:col-span-3">
                        <div className="flex justify-start lg:justify-end">
                          <div className="wrapper flex justify-start items-center gap-6 lg:gap-0 lg:flex lg:justify-end flex-wrap max-w-[200px] mr-0">
                            <SanityImage
                              image={totalStars}
                              className="max-h-[24px] min-w-[140px] w-auto"
                            />
                            {readAllReviews && readAllReviews.link && (
                              <div className="review-stars mt-2">
                                <ResolvedLink
                                  link={readAllReviews.link}
                                  className={'inline-block my-4 text-orange underline'}
                                >
                                  {readAllReviews.linkLabel}
                                </ResolvedLink>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
