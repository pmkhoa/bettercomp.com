'use client';

import { get } from 'lodash';
import { SanityDocument } from 'next-sanity';
import { useOptimistic } from 'next-sanity/hooks';
import Link from 'next/link';

import BlockRenderer from '@/components/BlockRenderer';
import { TOC } from '@/components';
import { GetPageQueryResult } from '@/sanity.types';
import { dataAttr } from '@/sanity/lib/utils';
import { studioUrl } from '@/sanity/lib/api';

type PageBuilderPageProps = {
  page: GetPageQueryResult;
};

type PageBuilderSection = {
  _key: string;
  _type: string;
};

type PageData = {
  _id: string;
  _type: string;
  pageBuilder?: PageBuilderSection[];
};

/**
 * The PageBuilder component is used to render the blocks from the `pageBuilder` field in the Page type in your Sanity Studio.
 */

function renderSections(pageBuilderSections: PageBuilderSection[], page: GetPageQueryResult) {
  if (!page) {
    return null;
  }

  return (
    <>
      <span className="nav-background" data-bg={get(page, 'mainNavBackground', 'white')} />
      <div
        data-sanity={dataAttr({
          id: page._id,
          type: page._type,
          path: `pageBuilder`,
        }).toString()}
      >
        {pageBuilderSections.map((block: any, index: number) => (
          <BlockRenderer
            key={block._key}
            index={index}
            block={block}
            pageId={page._id}
            pageType={page._type}
            pageData={page}
          />
        ))}
      </div>
    </>
  );
}

function renderEmptyState(page: GetPageQueryResult) {
  if (!page) {
    return null;
  }
  return (
    <div className="container py-24">
      <h1 className="">This page has no content!</h1>
      <p className="mt-2 text-base text-gray-500">
        Open the page in Sanity Studio to add content.
      </p>
      <div className="mt-10 flex">
        <Link
          className="rounded-full flex gap-2 mr-6 items-center bg-black hover:bg-brand focus:bg-blue py-3 px-6 text-white transition-colors duration-200"
          href={`${studioUrl}/structure/intent/edit/template=page;type=page;path=pageBuilder;id=${page._id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add content to this page
        </Link>
      </div>
    </div>
  );
}

export default function PageBuilder({ page }: PageBuilderPageProps) {
  const pageBuilderSections = useOptimistic<
    PageBuilderSection[] | undefined,
    SanityDocument<PageData>
  >(page?.pageBuilder || [], (currentSections, action) => {
    // The action contains updated document data from Sanity
    // when someone makes an edit in the Studio

    // If the edit was to a different document, ignore it
    if (action.id !== page?._id) {
      return currentSections;
    }

    // If there are sections in the updated document, use them
    if (action.document.pageBuilder) {
      // Reconcile References. https://www.sanity.io/docs/enabling-drag-and-drop#ffe728eea8c1
      return action.document.pageBuilder.map(
        (section) => currentSections?.find((s) => s._key === section?._key) || section,
      );
    }

    // Otherwise keep the current sections
    return currentSections;
  });

  if (!page) {
    return renderEmptyState(page);
  }

  if (pageBuilderSections && pageBuilderSections.length > 0 && get(page, 'showTOC')) {
    return (
      <>
        <span className="nav-background" data-bg={get(page, 'mainNavBackground', 'white')} />
        <div className="with-toc">
          {pageBuilderSections.map((block: any, index: number) => {
            if (block._type === 'heroResource') {
              return (
                <BlockRenderer
                  key={block._key}
                  index={index}
                  block={block}
                  pageId={page._id}
                  pageType={page._type}
                  pageData={page}
                />
              );
            }
            return null;
          })}

          <div className="section-module">
            <div className="container">
              <div className="grid-container gap-8">
                <div className="hidden md:block md:col-span-3 py-20">
                  <div className="toc-inner">
                    <h6 className="text-bright-blue font-bold mb-4 font-zilla-slab">
                      SECTIONS
                    </h6>
                    <TOC />
                  </div>
                </div>
                <div
                  className="inner-content toc-inner-content col-span-12 md:col-span-9"
                  id="toc-inner-content"
                >
                  {pageBuilderSections.map((block: any, index: number) => {
                    if (block._type !== 'heroResource') {
                      return (
                        <BlockRenderer
                          key={block._key}
                          index={index}
                          block={block}
                          pageId={page._id}
                          pageType={page._type}
                          pageData={page}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return pageBuilderSections && pageBuilderSections.length > 0
    ? renderSections(pageBuilderSections, page)
    : renderEmptyState(page);
}
