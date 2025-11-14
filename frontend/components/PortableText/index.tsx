/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import { PortableText, type PortableTextComponents } from 'next-sanity';
import { SanityImage } from '@/components/SanityImage';
import ResolvedLink from '@/components/ResolvedLink';

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: any;
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        return <SanityImage {...value} className="w-full" />;
      },
    },
    block: {
      h1: ({ children, value }) => (
        // Add an anchor to the h1
        <h1 className="group relative" id={`section-${value?._key}`}>
          {children}
        </h1>
      ),
      h2: ({ children, value }) => {
        return (
          <h2 className="group relative" id={`section-${value?._key}`}>
            {children}
          </h2>
        );
      },

      h3: ({ children, value }) => {
        return (
          <h3 className="group relative" id={`section-${value?._key}`}>
            {children}
          </h3>
        );
      },
      h4: ({ children, value }) => {
        return (
          <h4 className="group relative" id={`section-${value?._key}`}>
            {children}
          </h4>
        );
      },
      h5: ({ children, value }) => {
        return (
          <h5 className="group relative" id={`section-${value?._key}`}>
            {children}
          </h5>
        );
      },
    },
    marks: {
      'link': ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
      'textColor': ({ children, value }) => {
        const color = value?.color; // Get color from annotation
        return <span style={{ color }}>{children}</span>;
      },
      'sup': ({ children }) => <sup>{children}</sup>,
      'font-light': ({ children }) => <span className="font-light">{children}</span>,
    },
  };

  return (
    <div className={[className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </div>
  );
}
