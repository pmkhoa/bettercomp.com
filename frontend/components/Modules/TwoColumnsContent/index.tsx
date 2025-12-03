import { SanityImage, PortableText, MediaAsset, ButtonPrimary, ResolvedLink } from '@/components';
import cn from 'classnames';
import { TwoColumnsContent } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

export default function TwoColumnsContentModule({ block }: { block: TwoColumnsContent }) {
  if (!block.enabled) return null;

  const {
    asset,
    assetPosition,
    columnLayout,
    ctaButton,
    description,
    sectionBackground = defaultBackground,
    heading,
    subHeading,
  } = block;

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    asset: backgroundAsset,
    textColor,
    showBorderTop,
  } = sectionBackground;

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;

  return (
    <section
      className={cn(
        'two-columns-feature-content relative',
        backgroundEnabled && backgroundType === 'color' ? 'py-20' : 'my-20',
        backgroundEnabled && backgroundType === 'color' ? bgColor : 'bg-white',
        sectionTextColor
      )}
    >
      {showBorderTop && (
        <div className="h-2 bg-[linear-gradient(81deg,var(--color-orange)_9.79%,var(--color-gold)_84.97%)] w-full absolute inset-0 z-10 md:max-w-[50%] rounded-md overflow-hidden -left-1" />
      )}
      {backgroundEnabled && backgroundAsset && (
        <div className="absolute w-full h-full inset-0">
          <SanityImage image={backgroundAsset} className="w-full h-full object-cover relative" />
        </div>
      )}

      <div className="container">
        <div className="grid-container">
          <div className="col-span-12 col-start-1">
            <div className="grid-container md:gap-x-12 gap-y-4 md:gap-y-16 items-center">
              <div
                className={cn(
                  'flex flex-col',
                  assetPosition === 'left' ? 'order-1' : 'order-3',
                  columnLayout === '1/1' && 'col-span-12 md:col-span-6',
                  columnLayout === '1/3' && 'col-span-12 md:col-span-4',
                  columnLayout === '2/3' && 'col-span-12 md:col-span-8'
                )}
              >
                {asset && <MediaAsset mediaAsset={asset} />}
              </div>

              <div
                className={cn(
                  'col-span-12 justify-start order-2',
                  columnLayout === '1/1' && 'col-span-12 md:col-span-6',
                  columnLayout === '1/3' && 'col-span-12 md:col-span-8',
                  columnLayout === '2/3' && 'col-span-12 md:col-span-4'
                )}
              >
                {subHeading && <h6 className="font-semibold mb-4 text-green">{subHeading}</h6>}
                {heading && <h2 className="text-2xl md:text-3xl font-semibold mb-4">{heading}</h2>}

                <div className="flex-1">{description && <PortableText value={description} />}</div>

                {ctaButton && ctaButton.linkLabel && (
                  <ButtonPrimary className="mt-8">
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
