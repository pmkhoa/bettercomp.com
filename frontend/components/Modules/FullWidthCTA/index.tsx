import cn from 'classnames';
import {
  ButtonPrimary,
  MotionFadeIn,
  MediaAsset,
  ResolvedLink,
  PortableText,
  SanityImage,
} from '@/components';
import { Background, HeroLarge } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

export default function SectionHeroLarge({ block }: { block: HeroLarge }) {
  const { background = defaultBackground, enabled, description, ctaButton, textAlign } = block;

  if (!enabled) {
    return null;
  }

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    asset,
    textColor,
  } = background;

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;

  console.log('----------debugging: section background----------');
  console.log(block);
  console.log('----------debugging: text align----------');
  console.log(textAlign);

  return (
    <section
      className={cn(
        'hero-with-bg overflow-hidden relative',
        sectionTextColor,
        textAlign === 'center' ? 'py-40' : 'py-24'
      )}
    >
      {backgroundEnabled && backgroundType === 'image' && (
        <div className="absolute w-full h-full inset-0">
          {asset && <SanityImage image={asset} className="w-full h-full object-cover relative" />}
          <div
            className="absolute w-full h-full z-10 bg-black inset-0"
            style={{ opacity: '0.6' }}
          />
        </div>
      )}
      <div className={cn('order-1')}>
        <div className="container z-10 relative z-20">
          <div className="grid-container justify-between items-center gap-y-16 gap-0 md:gap-4">
            <div
              className={cn(
                'col-span-12',
                textAlign === 'left' && 'md:col-span-5',
                textAlign === 'right' && 'md:col-start-8 md:col-end-13',
                textAlign === 'center' &&
                  'md:col-start-3 md:col-end-11 flex flex-col items-center text-center'
              )}
            >
              <div className={'hero-description'}>
                <PortableText value={description} />
              </div>
              <div className="hero__cta mt-6 flex flex-wrap gap-8 items-center">
                {ctaButton && ctaButton.linkLabel && (
                  <ButtonPrimary className="mt-4">
                    <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                  </ButtonPrimary>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
