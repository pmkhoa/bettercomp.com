import cn from 'classnames';
import { Richtext } from '@/sanity.types';
import { PortableText, SanityImage } from '@/components';

type Props = {
  block: Richtext;
  pageData: any;
};

export default function RichTextWithImage({ block, pageData }: Props) {
  const { columnContent, image, contentMaxWidth, textAlign } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section className={cn('section-module section-richtext', 'richtext-image', 'my-20')}>
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
