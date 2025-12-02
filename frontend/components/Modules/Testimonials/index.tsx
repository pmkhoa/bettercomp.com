import cn from 'classnames';
import { PortableText, Carousel, SanityImage, ResolvedLink } from '@/components';
import { Testimonials } from '@/sanity.types';
import s from './style.module.css';
import './carousel.css';

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
    <section className={cn('section-module testimonial-carousel', 'pb-[48px]')}>
      <div className="container">
        <div className={cn(s['content-wrapper'])}>
          <Carousel
            options={{
              slidesPerPage: 1,
              center: false,
              adaptiveHeight: true,
              showProgressbar: false,
              // @ts-ignore
              Autoplay: {
                // @ts-ignore
                isEnabled: true,
                // @ts-ignore
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
                    'f-carousel__slide carousel__slide-container items-start gap-8 mt-16 w-full overflow-visible pt-20'
                  )}
                  key={d._key}
                >
                  <div
                    className={cn(
                      s['testimonial-content'],
                      'pt-16 pb-12 px-16 relative bg-sand mt-24'
                    )}
                  >
                    <div className="company-icon absolute -top-12 left-16 flex justify-start">
                      <SanityImage image={companyIcon} className="max-h-[94px] h-auto w-auto" />
                    </div>
                    <div className="grid-container">
                      <div className="col-span-9">
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
                      <div className="review-stars my-8 col-span-3">
                        <div className="flex justify-end">
                          <div className="wrapper">
                            <SanityImage
                              image={totalStars}
                              className="max-h-[24px] min-w-[140px] w-auto"
                            />
                            {readAllReviews && readAllReviews.link && (
                              <div className="review-stars">
                                <ResolvedLink
                                  link={readAllReviews.link}
                                  className={'inline-block my-4'}
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
