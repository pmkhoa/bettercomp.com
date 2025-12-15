import cn from 'classnames';

import { HubspotForm, PortableText } from '@/components';
import { FormContent } from '@/sanity.types';
import { sanitizeToken } from '@/sanity/lib/utils';

type Props = {
  block: FormContent;
  pageData: any;
};

export default function FormContentSection({ block, pageData }: Props) {
  const { backgroundColor, contentMaxWidth, textAlign, formContentSection, description } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  console.log(block);

  return (
    <section
      className={cn(
        'section-module form-content',
        sanitizeToken(backgroundColor) === 'sand' ? `py-20 bg-sand` : 'my-20'
      )}
    >
      <div
        className={cn(
          'container',
          contentMaxWidth === 'medium' && 'max-w-3xl',
          textAlign && `text-${textAlign}`
        )}
      >
        <div className={cn('grid-container')}>
          <div
            className={cn(
              useNarrowWidthContent && !showTOC ? 'col-span-12 md:col-span-9' : 'col-span-12'
            )}
          >
            <PortableText value={description} />
            {formContentSection && (
              <div className="form-container mt-8">
                {(formContentSection.formId || formContentSection.formType) && (
                  <div className={cn('col-span-12', 'sm:col-start-8 sm:col-span-5')}>
                    <HubspotForm
                      formId={formContentSection.formId}
                      formType={formContentSection.formType}
                      uniqTarget={'form-content'}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
