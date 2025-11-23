'use client';

import { useEffect } from 'react';
import { kebabCase } from 'lodash';

function HubspotForm({
  uniqTarget,
  formId,
  formType,
  campaignId,
}: {
  uniqTarget?: string;
  formId?: string;
  formType: string;
  campaignId?: string;
}) {
  let formByType = formId;

  if (!formId) {
    if (formType === 'contact') {
      formByType = '08be6bf9-1561-444a-a4ba-31e46ab25068';
    } else if (formType === 'newsletter') {
      formByType = '8cf65307-b8c0-4094-836a-77cc6e322379';
    } else if (formType === 'ebook') {
      formByType = 'bb9c78df-1bde-4d73-928a-6e768da0f2ca';
    }
  }
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (window.hbspt) {
        //@ts-ignore: hbspt form
        const hubspotOptions = {
          region: 'na1',
          portalId: '21848769',
          formId: formByType,
          target: `#hbspt-form-${uniqTarget}-${kebabCase(formType)}`,
        } as any;

        if (campaignId) {
          hubspotOptions['campaignId'] = campaignId;
        }

        window.hbspt.forms.create(hubspotOptions);
      }
    }, 800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [campaignId, formByType, formType, uniqTarget]);

  return (
    <>
      <div
        id={`hbspt-form-${uniqTarget}-${kebabCase(formType)}`}
        className="hbspt-form"
        data-hs-forms-root="true"
      />
    </>
  );
}

export default HubspotForm;
