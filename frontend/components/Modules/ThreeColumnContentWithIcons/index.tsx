import {
  SanityImage,
  ButtonPrimary,
  PortableText,
  MediaAsset,
  ResolvedLink,
} from '@/components';
import cn from 'classnames';
import { ThreeColumnContentWithIcons } from '@/sanity.types';

export default function ThreeColumnContentWithIconsModule({
  block,
}: {
  block: ThreeColumnContentWithIcons;
}) {
  if (!block.enabled) return null;
  const { sectionBackground = {}, heading, description, ctaButton, listItem } = block;

  const { enabled: backgroundEnabled, backgroundType, backgroundColor } = sectionBackground;

  const bgColor = `bg-${backgroundColor}`;

  return (
    <section
      className={cn(
        'section-module relative',
        'three-column-content',
        backgroundEnabled && backgroundType === 'color' ? 'py-24' : 'my-24',
        backgroundEnabled && backgroundType === 'color' ? bgColor : 'bg-white',
      )}
    >
      {backgroundEnabled && backgroundType === 'image' && (
        <div className="absolute w-full h-full inset-0" />
      )}
      <div className="container">
        {heading && (
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">{heading}</h2>
        )}
        <div className="grid-container gap-12">
          {listItem?.map((content) => {
            return (
              <div
                className={'py-2 col-span-12 sm:col-span-6 md:col-span-4 gap-4'}
                key={content._key}
              >
                <div className="content-wrapper">
                  <div className="flex justify-between items-center">
                    {content.title && (
                      <p className="max-w-[180px] text-xl font-medium">{content.title}</p>
                    )}
                    {content?.image && (
                      <div className="relative w-[70px] h-[60px]">
                        <SanityImage
                          image={content.image}
                          className="object-contain w-full h-full absolute inset-0"
                        />
                      </div>
                    )}
                  </div>
                  {content.content && (
                    <div className="my-6">
                      <PortableText value={content.content} />
                    </div>
                  )}
                  {ctaButton && ctaButton && (
                    <ButtonPrimary className="">
                      <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                    </ButtonPrimary>
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
