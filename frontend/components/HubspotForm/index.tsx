'use client';

import { kebabCase } from 'lodash';
import { useEffect } from 'react';

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
      formByType = '941ff838-5777-41fc-a7e2-34e8e6783138';
    }
  }
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (window.hbspt) {
        //@ts-expect-error: hbspt form
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
