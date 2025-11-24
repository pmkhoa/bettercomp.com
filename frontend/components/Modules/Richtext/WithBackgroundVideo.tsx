import cn from 'classnames';
import { Richtext } from '@/sanity.types';
import { urlForAsset } from '@/sanity/lib/utils';
import { BackgroundVideo } from '@/components';

type Props = {
  block: Richtext;
  pageData: any;
};

export default function RichTextWithBackgroundVideo({ block, pageData }: Props) {
  const { backgroundVideo } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section className={cn('section-module', 'richtext-background-video', 'my-32')}>
      <div className="container">
        <div className={cn('grid-container')}>
          {backgroundVideo && urlForAsset(backgroundVideo) && (
            <div
              className={cn(
                useNarrowWidthContent && !showTOC ? 'col-span-9' : 'col-span-12',
                'relative responsive-iframe-container text-center',
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
