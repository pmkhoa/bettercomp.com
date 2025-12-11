import type { Metadata } from 'next';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { searchQuery } from '@/sanity/lib/queries';
import { SearchHero } from '@/components/Modules';
import { linkHelpers } from '@/sanity/lib/utils';

type Props = {
  searchParams?: Promise<{
    s: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Search',
    description: 'Search',
    openGraph: {
      title: 'Search Title',
    },
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
      {searchResults && searchResults.length > 0 && (
        <div className="search-results-container my-48">
          <div className="container">
            <div className="grid-container">
              <div className="col-start-2 col-span-11">
                <div className="flex flex-col gap-20">
                  {searchResults.map((result: any) => {
                    return (
                      <div className="result" key={result._id}>
                        <Link href={linkHelpers(result)}>
                          <h3 className="underline">{result?.title || result?.name}</h3>
                          <p className="mt-8">{result?.seo?.description}</p>
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
