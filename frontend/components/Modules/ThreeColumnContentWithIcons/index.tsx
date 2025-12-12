import { SanityImage, ButtonPrimary, PortableText, MediaAsset, ResolvedLink } from '@/components';
import cn from 'classnames';
import { ThreeColumnContentWithIcons } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

export default function ThreeColumnContentWithIconsModule({
  block,
}: {
  block: ThreeColumnContentWithIcons;
}) {
  if (!block.enabled) return null;
  const {
    sectionBackground = defaultBackground,
    heading,
    description,
    ctaButton,
    listItem,
  } = block;

  const { enabled: backgroundEnabled, backgroundType, backgroundColor } = sectionBackground;

  const bgColor = `bg-${backgroundColor}`;

  return (
    <section
      className={cn(
        'section-module relative',
        'three-column-content-with-icons',
        backgroundEnabled && backgroundType === 'color'
          ? 'py-12 sm:py-16 md:py-24'
          : 'my-12 sm:my-16 md:my-24',
        backgroundEnabled && backgroundType === 'color' ? bgColor : 'bg-white'
      )}
    >
      {backgroundEnabled && backgroundType === 'image' && (
        <div className="absolute w-full h-full inset-0" />
      )}
      <div className="container">
        <div className="grid-container gap-8 border-b border-green pb-6 mb-6 md:pb-8 md:mb-8">
          <div className="description col-span-12 md:col-span-8">
            {heading && <h2 className="text-2xl md:text-3xl font-medium mb-4">{heading}</h2>}
            {description && <PortableText value={description} />}
          </div>
          {ctaButton && ctaButton.linkLabel && (
            <div className="col-span-12 md:col-span-4 flex justify-end h-auto">
              <div className="button-wrapper">
                <ButtonPrimary>
                  <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                </ButtonPrimary>
              </div>
            </div>
          )}
        </div>
        <div className="grid-container gap-0 gap-y-10 sm:gap-8 lg:gap-12">
          {listItem?.map((content) => {
            return (
              <div className={'col-span-12 xs:col-span-6 md:col-span-4 gap-4'} key={content._key}>
                <div className="content-wrapper">
                  <div className="flex justify-between items-center">
                    {content.title && <h5 className="w-full pr-8 font-medium">{content.title}</h5>}
                    {content?.image && (
                      <div className="relative w-[70px] h-[50px] md:h-[60px]">
                        <SanityImage
                          image={content.image}
                          className="object-contain w-full h-full absolute inset-0"
                        />
                      </div>
                    )}
                  </div>
                  {content.content && (
                    <div className="mt-3 md:pr-10">
                      <PortableText value={content.content} />
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
