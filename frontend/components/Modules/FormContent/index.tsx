import cn from 'classnames';

import { HubspotForm, PortableText } from '@/components';
import { FormContent } from '@/sanity.types';

type Props = {
  block: FormContent;
  pageData: any;
};

export default function FormContentSection({ block, pageData }: Props) {
  const { formContentSection, description } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  return (
    <section className={cn('section-module', 'richtext-default my-20')}>
      <div className="container">
        <div className={cn('grid-container items-center')}>
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
