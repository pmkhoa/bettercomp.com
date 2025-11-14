import { PortableText, MediaAsset, ButtonPrimary, ResolvedLink } from '@/components';
import cn from 'classnames';
import { TwoColumnsContent } from '@/sanity.types';

export default function TwoColumnsContentModule({ block }: { block: TwoColumnsContent }) {
  if (!block.enabled) return null;

  const {
    asset,
    assetPosition,
    sectionBackground = {},
    ctaButton,
    heading,
    description,
    subHeading,
  } = block;

  const { enabled: backgroundEnabled, backgroundType, backgroundColor } = sectionBackground;
  const bgColor = `bg-${backgroundColor}`;

  return (
    <section
      className={cn(
        'two-columns-feature-content',
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

        <div className="grid-container">
          <div className="col-span-12 col-start-1">
            <div className="grid-container md:gap-x-12 gap-y-4 md:gap-y-16 pt-12 items-center">
              <div
                className={cn(
                  'flex flex-col col-span-12 md:col-span-6',
                  assetPosition === 'left' ? 'order-1' : 'order-3',
                )}
              >
                {asset && <MediaAsset mediaAsset={asset} />}
              </div>

              <div className="col-span-12 md:col-span-6 justify-start order-2">
                <div className="flex-1">
                  {description && <PortableText value={description} />}
                </div>

                {ctaButton && ctaButton && (
                  <ButtonPrimary className="mt-6">
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
