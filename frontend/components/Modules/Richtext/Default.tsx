import cn from 'classnames';
import { Background, Richtext } from '@/sanity.types';
import { defaultBackground } from '@/utils/constants';
import PortableText from '@/components/PortableText';

type Props = {
  block: Richtext;
  pageData: any;
};

export default function RichTextDefault({ block, pageData }: Props) {
  const { background = defaultBackground, columnContent, contentMaxWidth, textAlign } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  let maxWidth = 'w-full';
  if (contentMaxWidth === 'medium') {
    maxWidth = 'max-w-3xl';
  } else if (contentMaxWidth === 'narrow') {
    maxWidth = 'max-w-2xl';
  }

  const { enabled: backgroundEnabled, backgroundColor, textColor } = background;

  const bgColor = `bg-${backgroundColor}`;
  const sectionTextColor = `text-${textColor}`;

  return (
    <section
      className={cn(
        'section-module section-richtext',
        'richtext-default ',
        backgroundEnabled ? 'py-12 md:py-20' : 'my-12 md:my-20',
        sectionTextColor,
        backgroundEnabled && bgColor
      )}
    >
      <div className="container grid-container">
        <div
          className={cn(
            useNarrowWidthContent && !showTOC
              ? 'col-span-12 md:col-span-9'
              : 'col-span-12 md:col-span-12',
            'relative'
          )}
        >
          <div
            className={cn(
              'richtext-inner',
              `text-${textAlign}`,
              maxWidth,
              textAlign === 'center' && 'mx-auto'
            )}
          >
            <PortableText value={columnContent} />
          </div>
        </div>
      </div>
    </section>
  );
}
