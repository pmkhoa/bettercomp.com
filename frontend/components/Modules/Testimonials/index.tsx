import cn from 'classnames';
import { PortableText, Carousel, SanityImage } from '@/components';
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

  const { heading, subHeading, testimonialList = [] } = block;

  return (
    <section className={cn('section-module testimonial-carousel', 'pb-[48px]')}>
      <div className="container">
        {heading && (
          <div className="grid-container items-center mt-8 justify-between">
            <div className="section__description col-span-12 md:col-start-2 md:col-span-10 text-center">
              {subHeading && <div className="text-artic mb-3 h5">{subHeading}</div>}
              {heading && <h2>{heading}</h2>}
            </div>
          </div>
        )}

        <div className={cn(s['content-wrapper'])}>
          <Carousel
            options={{
              slidesPerPage: 1,
              center: false,
              adaptiveHeight: true,
              Navigation: {
                nextTpl: `
								<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
									<rect opacity="0.4" width="70" height="70" fill="#E5EDF1"/>
									<path d="M21 33.1689H45.9339V36.3858H21V33.1689Z" fill="#687FA0"/>
									<path d="M39.0188 45.5571L36.7656 43.304L45.2926 34.7786L36.7656 26.2531L39.0188 24L49.7958 34.7786L39.0188 45.5571Z" fill="#687FA0"/>
								</svg>
								`,
                prevTpl: `
							<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
								<rect opacity="0.4" width="70" height="70" fill="#E5EDF1"/>
								<path d="M49 36.8311H24.0661V33.6142H49V36.8311Z" fill="#687FA0"/>
								<path d="M30.9812 24.4429L33.2344 26.696L24.7074 35.2214L33.2344 43.7469L30.9812 46L20.2042 35.2214L30.9812 24.4429Z" fill="#687FA0"/>
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
                  )}
                  key={d._key}
                >
                  <div
                    className={cn(
                      s['testimonial-content'],
                      'pt-16 pb-12 px-16 relative bg-sand mt-24',
                    )}
                  >
                    <div className="company-icon absolute -top-12 left-16 flex justify-start">
                      <SanityImage image={companyIcon} className="max-h-[94px] h-auto w-auto" />
                    </div>
                    <div className={s['content-heading']}>
                      <div className="title my-4">
                        <strong>{title}</strong>
                      </div>
                    </div>
                    <div className={s['content-inner']}>
                      <PortableText value={content} />
                    </div>
                    <div className="review-stars my-8">
                      <SanityImage image={totalStars} className="max-h-[24px] w-auto" />
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
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
