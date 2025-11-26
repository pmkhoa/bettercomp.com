import React from 'react';
import cn from 'classnames';
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
import { urlForImage } from '@/sanity/lib/utils';

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
        return <SanityImage alt={value?.alt} image={value} className="w-full my-10" />;
      },
      divider: ({ value }) => {
        const backgroundColor = `bg-${value.backgroundColor}`;
        return (
          <>
            <span className="bg-sand bg-blue bg-bright-blue bg-orange" />
            <hr className={`${backgroundColor} h-[2px] mt-20`} />
          </>
        );
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
      h6: ({ children, value }) => {
        return (
          <h6 className="group relative" id={`section-${value?._key}`}>
            {children}
          </h6>
        );
      },
      small: ({ children, value }) => {
        return <small className="group relative">{children}</small>;
      },
    },
    marks: {
      semibold: ({ children }) => <span className="font-semibold">{children}</span>,
      link: ({ children, value: link }) => {
        return (
          <ResolvedLink link={link} className="underline">
            {children}
          </ResolvedLink>
        );
      },
      textColor: ({ children, value }) => {
        const color = value?.color; // Get color from annotation
        return <span style={{ color }}>{children}</span>;
      },
      sup: ({ children }) => <sup>{children}</sup>,
      'font-light': ({ children }) => <span className="font-light">{children}</span>,
    },

    list: {
      checkmarks: ({ children }) => (
        <ul className="space-y-2 check-list">
          {React.Children.map(children, (child) => (
            <>{child}</>
          ))}
        </ul>
      ),
    },
  };

  return (
    <div className={cn('portable-text', [className].filter(Boolean).join(' '))}>
      <PortableText components={components} value={value} />
    </div>
  );
}
