import cn from 'classnames';
import Link from 'next/link';
import { ContactForm } from '@/sanity.types';
import { PortableText, HubspotForm, SanityImage } from '@/components';

type Props = {
  block: ContactForm;
};

export default function ContactFormInfoModule({ block }: Props) {
  const { form, contactInfo, address, phone, email, mapPhoto, mapLink } = block;

  return (
    <section className={cn('section-module section-richtext', 'richtext-default my-20')}>
      <div className="container grid-container gap-12">
        <div className={cn('col-span-12 md:col-span-5', 'relative')}>
          <div className="mb-8">
            <PortableText value={contactInfo} />
          </div>
          <div className="address-info my-8">
            {address && (
              <div className="flex justify-start">
                <div className="min-w-full md:min-w-[140px] font-medium">Address: </div>
                <div className="max-w-md">
                  <PortableText value={address} />
                </div>
              </div>
            )}
          </div>
          <div className="address-info my-8">
            {phone && (
              <div className="flex justify-start">
                <div className="min-w-full md:min-w-[140px] font-medium">Phone: </div>
                <div className="max-w-md">
                  <p>{phone}</p>
                </div>
              </div>
            )}
          </div>
          <div className="address-info my-8">
            {email && (
              <div className="flex justify-start">
                <div className="min-w-full md:min-w-[140px] font-medium">Email: </div>
                <div className="max-w-md">
                  <PortableText value={email} />
                </div>
              </div>
            )}
          </div>
          <div className="address-info my-8">
            {mapLink && mapPhoto && (
              <div className="flex justify-start">
                <div className="w-full">
                  <Link href={mapLink} target="_blank">
                    <SanityImage image={mapPhoto} alt="Map Photo" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={cn('col-span-12 md:col-start-7 md:col-end-13', 'relative')}>
          {form && (
            <HubspotForm
              formId={form.formId}
              formType={form.formType}
              uniqTarget={'contact-form-content'}
            />
          )}
        </div>
      </div>
    </section>
  );
}
