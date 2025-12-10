import cn from 'classnames';
import { Richtext } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';
import { urlForAsset } from '@/sanity/lib/utils';
import { PortableText, BackgroundVideo } from '@/components';

type Props = {
  block: Richtext;
  pageData: any;
};

export default function RichTextWithBackgroundVideo({ block, pageData }: Props) {
  const { background = defaultBackground, columnContent, backgroundVideo, textAlign } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  const {
    enabled: backgroundEnabled,
    backgroundType,
    backgroundColor,
    asset,
    textColor,
  } = background;

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;

  return (
    <section
      className={cn(
        'section-module section-richtext',
        'richtext-background-video',
        backgroundEnabled ? 'py-16 md:py-20' : 'my-16 md:my-24',
        sectionTextColor,
        backgroundEnabled && bgColor
      )}
    >
      <div className="container">
        <div className={cn('grid-container')}>
          <div
            className={cn(
              useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
              `text-${textAlign}`
            )}
          >
            <PortableText value={columnContent} />
          </div>
          {backgroundVideo && urlForAsset(backgroundVideo) && (
            <div
              className={cn(
                useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
                'relative responsive-iframe-container text-center'
              )}
            >
              <BackgroundVideo src={urlForAsset(backgroundVideo)} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
