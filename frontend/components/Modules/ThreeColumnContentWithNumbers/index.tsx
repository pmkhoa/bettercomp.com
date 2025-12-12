import { SanityImage, ButtonPrimary, PortableText, MediaAsset, ResolvedLink } from '@/components';
import cn from 'classnames';
import { ThreeColumnContentWithNumbers } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

export default function ThreeColumnContentWithNumbersModule({
  block,
}: {
  block: ThreeColumnContentWithNumbers;
}) {
  if (!block.enabled) return null;
  const {
    sectionBackground = defaultBackground,
    heading,
    description,
    ctaButton,
    listItem,
  } = block;

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    textColor = 'blue',
  } = sectionBackground;

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;

  return (
    <section
      className={cn(
        'section-module relative',
        'three-column-content',
        backgroundEnabled && backgroundType === 'color' ? 'py-12 md:py-24' : 'my-12 md:my-24',
        backgroundEnabled && backgroundType === 'color' ? bgColor : 'bg-white',
        sectionTextColor
      )}
    >
      {backgroundEnabled && backgroundType === 'image' && (
        <div className="absolute w-full h-full inset-0" />
      )}
      <div className="container">
        <div className="grid-container gap-8 mb-6 lg:mb-12">
          <div className={cn('description', 'col-span-12 md:col-span-8')}>
            {heading && <h2 className="text-2xl md:text-3xl font-medium mb-4">{heading}</h2>}
            {description && <PortableText value={description} />}
          </div>
          {ctaButton && ctaButton.linkLabel && (
            <div className="col-span-12 md:col-span-4 flex md:justify-end h-auto">
              <div className="button-wrapper">
                <ButtonPrimary>
                  <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                </ButtonPrimary>
              </div>
            </div>
          )}
        </div>
        <div className="grid-container gap-x-0 gap-y-10 sm:gap-8 lg:gap-12">
          {listItem?.map((content) => {
            return (
              <div
                className={'py-2 col-span-12 sm:col-span-6 md:col-span-4 gap-4'}
                key={content._key}
              >
                <div className="content-wrapper">
                  {content?.image && (
                    <div className="flex justify-between items-center gap-8">
                      <div className="relative w-[80px] h-[60px] md:h-[80px]">
                        <SanityImage
                          image={content.image}
                          className="object-contain w-full h-full absolute inset-0"
                        />
                      </div>
                      <div className="h-[1px] bg-bright-blue w-full" />
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-6">
                    {content.title && <h5 className="font-medium mb-3">{content.title}</h5>}
                  </div>
                  {content.content && (
                    <div className="my-0">
                      <PortableText value={content.content} />
                    </div>
                  )}
                  {content.ctaButton && content.ctaButton.linkLabel && content.ctaButton.link && (
                    <div className="cta-wrapper mt-8">
                      <ResolvedLink link={content.ctaButton?.link} className="btn-secondary">
                        {content.ctaButton?.linkLabel}
                      </ResolvedLink>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
