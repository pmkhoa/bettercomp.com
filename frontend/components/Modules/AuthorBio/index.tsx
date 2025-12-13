import Link from 'next/link';
import { AuthorBio, GetResourceQueryResult } from '@/sanity.types';
import { PortableText, SanityImage } from '@/components';
import cn from 'classnames';

type Props = {
  block: AuthorBio;
  pageData: any;
};

const AuthorBioModule = ({ block, pageData }: Props) => {
  const { enabled, teamMember } = block;
  const { showTOC, useNarrowWidthContent } = pageData;

  if (!enabled) {
    return <div />;
  }

  if (!teamMember) {
    return <div />;
  }

  // @ts-ignore: ignore
  const { authorBio, firstName, lastName, picture, slug, jobTitle } = teamMember;

  return (
    <section className="section-module section-author relative">
      <div className="container">
        <div className={cn('grid-container relative md:my-20 ')}>
          <div
            className={cn(
              useNarrowWidthContent && !showTOC ? 'col-span-12 md:col-span-9' : 'col-span-12'
            )}
          >
            <div className="flex justify-start  gap-8">
              {picture?.asset?._ref && (
                <div className="mx-auto md:mr-4 h-[100px] w-[100px] rounded-full min-w-[100px] overflow-hidden">
                  <SanityImage image={picture} className="object-contain" alt={picture?.alt} />
                </div>
              )}
              <div className="content-bio w-full">
                <div className="flex flex-col">
                  {firstName && lastName && (
                    <h4 className="font-bold mb-0 font-normal js-toc-ignore mt-0">
                      {firstName} {lastName}
                    </h4>
                  )}
                  <div className="">{jobTitle}</div>
                  <div className="my-4">
                    <PortableText value={authorBio} />
                  </div>
                  <div className="button-wrapper my-0">
                    <Link
                      className="cursor-pointer text-orange font-medium underline"
                      href={`/author/${slug?.current}`}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorBioModule;
