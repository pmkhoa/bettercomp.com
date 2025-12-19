import type { Metadata } from 'next';
import Link from 'next/link';

import { SearchHero } from '@/components/Modules';
import { sanityFetch } from '@/sanity/lib/live';
import { searchQuery } from '@/sanity/lib/queries';
import { linkHelpers } from '@/sanity/lib/utils';

type Props = {
  searchParams?: Promise<{
    s: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Search',
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const { s } = (await props.searchParams) || {};
  const [{ data: searchResults }] = await Promise.all([
    sanityFetch({ query: searchQuery, params: { searchTerm: s } }),
  ]);

  return (
    <div className="page-container">
      <SearchHero searchTerm={s} />
      {searchResults && searchResults.length === 0 && (
        <div className="search-results-container my-16 md:my-24">
          <div className="container text-center">
            <h4>No results found</h4>
          </div>
        </div>
      )}
      {searchResults && searchResults.length > 0 && (
        <div className="search-results-container my-16 md:my-24">
          <div className="container">
            <div className="grid-container">
              <div className="md:col-start-2 col-span-12 md:col-span-10">
                <div className="flex flex-col gap-10">
                  {searchResults.map((result: any) => {
                    return (
                      <div className="result border-bright-blue border-b-1 pb-10" key={result._id}>
                        <Link href={linkHelpers(result)}>
                          <h4 className="hover:underline">{result?.title || result?.name}</h4>
                          <p className="mt-2">{result?.seo?.description}</p>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
