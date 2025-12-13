import cn from 'classnames';

import { PortableText, SanityImage } from '@/components';
import { Richtext } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';

type Props = {
  block: Richtext;
  pageData: any;
};

export default function RichTextWithImage({ block, pageData }: Props) {
  const {
    background = defaultBackground,
    columnContent,
    image,
    contentMaxWidth,
    textAlign,
  } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  const { enabled: backgroundEnabled, backgroundColor, textColor } = background;

  let maxWidth = 'w-full';
  if (contentMaxWidth === 'medium') {
    maxWidth = 'max-w-[80%]';
  } else if (contentMaxWidth === 'narrow') {
    maxWidth = 'max-w-2xl';
  }

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;

  return (
    <section
      className={cn(
        'section-module section-richtext',
        'richtext-image',
        backgroundEnabled ? 'py-12 md:py-20' : 'my-12 md:my-20',
        sectionTextColor,
        backgroundEnabled && bgColor
      )}
    >
      <div className="container">
        <div className={cn('grid-container gap-y-10')}>
          <div
            className={cn(
              useNarrowWidthContent && showTOC ? 'col-span-12 md:col-span-9' : 'col-span-12',
              `text-${textAlign}`
            )}
          >
            <div
              className={cn(
                'richtext-inner',
                `text-${textAlign}`,
                maxWidth,
                contentMaxWidth === 'medium' && textAlign === 'center' && 'narrow-paragraph',
                textAlign === 'center' && 'mx-auto'
              )}
            >
              <PortableText value={columnContent} />
            </div>
          </div>
          {image?.asset && (
            <div
              className={cn(
                useNarrowWidthContent
                  ? 'col-span-12 md:col-start 2 md:col-span-7'
                  : 'col-span-12 md:col-start-2 md:col-span-10',
                'flex flex-col w-full',
                `justify-${textAlign === 'center' ? 'center' : 'flex-start'}`
              )}
            >
              <SanityImage
                image={image}
                alt={image?.alt}
                className="w-full"
                caption={image.caption}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
