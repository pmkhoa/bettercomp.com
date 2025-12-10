import cn from 'classnames';
import { Background, Richtext } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';
import { PortableText, SanityImage } from '@/components';

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
              useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
              `text-${textAlign}`
            )}
          >
            <PortableText value={columnContent} />
          </div>
          {image?.asset && (
            <div
              className={cn(
                useNarrowWidthContent ? 'col-span-9' : 'col-span-12',
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
