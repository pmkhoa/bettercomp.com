import { SanityImage, ButtonPrimary, PortableText, MediaAsset, ResolvedLink } from '@/components';
import cn from 'classnames';
import { TwoColumnPhotoCards } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

export default function TwoColumnPhotoCardsModule({ block }: { block: TwoColumnPhotoCards }) {
  if (!block.enabled) return null;
  const { sectionBackground, heading, description, ctaButton, listItem } = block;

  const bgColor = `bg-${sectionBackground}`;

  return (
    <section
      className={cn(
        'section-module relative',
        'three-column-content',
        sectionBackground === 'sand' && 'py-24',
        bgColor
      )}
    >
      <div className="container">
        <div className="flex justify-center items-center text-center mb-8 pb-8">
          {heading && (
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-0">{heading}</h2>
          )}
        </div>
        <div className="grid-container gap-12">
          {listItem?.map((content) => {
            return (
              <div className={'col-span-12 sm:col-span-6 md:col-span-6 gap-4'} key={content._key}>
                <div className="content-wrapper grid-container gap-4 bg-white shadow-md">
                  <div className="col-span-6">
                    {content?.image && (
                      <div className="relative w-full h-full">
                        <SanityImage
                          image={content.image}
                          className="object-cover w-full h-full absolute top-0 left-0"
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-span-6 p-6">
                    <div className="inner-content">
                      {content.title && <p className="text-xl font-medium">{content.title}</p>}
                    </div>
                    {content.content && (
                      <div className="my-6">
                        <PortableText value={content.content} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hero__cta mt-12 flex flex-wrap gap-8 items-center justify-center">
          {ctaButton && ctaButton.linkLabel && (
            <ButtonPrimary>
              <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
            </ButtonPrimary>
          )}
        </div>
      </div>
    </section>
  );
}
