import cn from 'classnames';
import {
  ButtonPrimary,
  MotionFadeIn,
  SanityImage,
  MediaAsset,
  ResolvedLink,
  PortableText,
} from '@/components';
import { ClockIcon } from '@/components/Icons';
import { Background, HeroResource } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

export default function HeroResourceModule({
  block,
  pageData,
}: {
  block: HeroResource;
  pageData: any;
}) {
  const {
    sectionBackground = defaultBackground,
    enabled,
    useDefaultValue,
    description,
    heroImage,
    ctaButton,
  } = block;

  if (!enabled) {
    return null;
  }

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    asset,
    textColor,
  } = sectionBackground;

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;

  if (useDefaultValue && pageData) {
    const { estimatedReadingTime, coverImage, title } = pageData;

    return (
      <section
        className={cn(
          'hero-with-bg overflow-hidden relative py-24 md:py-32 min-h-[60vh] flex flex-col justify-center',
        )}
      >
        <div className="absolute w-full h-full inset-0">
          <SanityImage image={coverImage} className="w-full h-full object-cover relative" />
          <div
            className="absolute w-full h-full z-10 bg-black inset-0"
            style={{ opacity: '0.6' }}
          />
        </div>
        <div className={'flex items-center h-full w-full'}>
          <div className="container z-10 relative z-20">
            <div className="grid-container justify-between items-center gap-y-16 gap-0 md:gap-4">
              <div className={cn('col-span-12 md:col-span-9 lg:col-span-6 text-white')}>
                <div className="flex resource-info gap-8 mb-8">
                  <div className="resource-type flex bg-green text-blue capitalize p-2 min-w-24 text-center rounded-sm text-center justify-center items-center">
                    {pageData._type}
                  </div>
                  {estimatedReadingTime && (
                    <div className="estimate-reading flex gap-2  items-center">
                      <ClockIcon color="#F6F6F3" />
                      <div className="text-white">{estimatedReadingTime} min read</div>
                    </div>
                  )}
                </div>

                <div className={'hero-description'}>
                  <h1>{title}</h1>
                </div>

                {pageData.author?.firstName && (
                  <div className="author">
                    <strong>
                      By {pageData.author?.firstName} {pageData.author?.lastName}
                    </strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'hero-with-bg overflow-hidden relative',
        backgroundEnabled && backgroundType === 'color' ? 'py-24' : 'my-24',
        backgroundEnabled && backgroundType === 'color' ? bgColor : 'bg-white',
        sectionTextColor,
      )}
    >
      {backgroundEnabled && backgroundType === 'image' && asset && (
        <div className="absolute w-full h-full inset-0">
          <SanityImage image={asset} />
          <div
            className="absolute w-full h-full z-10 bg-black inset-0"
            style={{ opacity: '0.6' }}
          />
        </div>
      )}
      <div className={cn('order-1')}>
        <div className="container z-10 relative z-20">
          <div className="grid-container justify-between items-center gap-y-16 gap-0 md:gap-16">
            <div className={cn('col-span-12 md:col-span-6')}>
              {block.showResourceTypeAndEstimateReading && (
                <div className="flex resource-info gap-8 mb-8">
                  <div className="resource-type flex bg-green text-blue capitalize p-2 min-w-24 text-center rounded-sm text-center justify-center items-center">
                    {pageData._type}
                  </div>
                  {pageData.estimatedReadingTime && (
                    <div className="estimate-reading flex gap-2  items-center">
                      <ClockIcon color="#F6F6F3" />
                      <div className="text-white">{pageData.estimatedReadingTime} min read</div>
                    </div>
                  )}
                </div>
              )}
              <div className={'hero-description'}>
                <PortableText value={description} />
              </div>
              <div className="hero__cta mt-12 flex flex-wrap gap-8 items-center">
                {ctaButton && ctaButton.linkLabel && (
                  <ButtonPrimary className="mt-6">
                    <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                  </ButtonPrimary>
                )}
              </div>
            </div>
            <div
              className={cn('h-full flex items-center justify-end col-span-12 md:col-span-6')}
            >
              <MotionFadeIn className="w-full">
                <div className="relative z-30 w-full h-full">
                  {heroImage && <MediaAsset mediaAsset={heroImage} />}
                </div>
              </MotionFadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
