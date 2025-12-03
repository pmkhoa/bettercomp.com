import cn from 'classnames';
import {
  ButtonPrimary,
  MotionFadeIn,
  SanityImage,
  MediaAsset,
  ResolvedLink,
  PortableText,
  ResourceCard,
  ResourceCardFeature,
} from '@/components';
import { defaultBackground } from '@/utils/constants';

export default function FeaturedResourcesModule({
  block,
  pageData,
}: {
  block: any;
  pageData: any;
}) {
  const {
    latestResources = [],
    enabled,
    subheading,
    selectedResources = [],
    description,
    ctaButton,
    resourceDisplayTypes,
  } = block;

  if (!enabled) {
    return null;
  }

  return (
    <section className={cn('section-module relative py-24 bg-blue text-white')}>
      <div className="container">
        <div className="grid-container gap-8 my-8">
          <div className="col-span-12 md:col-span-4">
            <div className="featured-description">
              <h6 className="text-green font-serif font-bold mb-2">{subheading}</h6>
              <div className="description">
                <PortableText value={description} />
                {ctaButton && ctaButton.link && (
                  <ButtonPrimary className="mt-6">
                    <ResolvedLink link={ctaButton.link}>{ctaButton.linkLabel}</ResolvedLink>
                  </ButtonPrimary>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="grid-container gap-8">
              {resourceDisplayTypes === 'mostRecents' ? (
                <>
                  {latestResources.slice(0, 2).map((resource: any) => {
                    return (
                      <div className="most-recents col-span-6" key={resource._id}>
                        <ResourceCard resource={resource} />
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {selectedResources[0] && (
                    <div className="most-recents col-span-6">
                      <ResourceCard resource={selectedResources[0]} />
                    </div>
                  )}
                  {selectedResources[1] && (
                    <div className="most-recents col-span-6">
                      <ResourceCard resource={selectedResources[1]} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="grid-container gap-8 my-8">
          {resourceDisplayTypes === 'mostRecents' ? (
            <>
              {latestResources[2] && (
                <div className="most-recents col-span-8">
                  <ResourceCardFeature resource={latestResources[2]} />
                </div>
              )}
              {latestResources[3] && (
                <div className="most-recents col-span-4">
                  <ResourceCard resource={latestResources[3]} />
                </div>
              )}
            </>
          ) : (
            <>
              {selectedResources[2] && (
                <div className="most-recents col-span-8">
                  <ResourceCardFeature resource={selectedResources[2]} />
                </div>
              )}
              {selectedResources[3] && (
                <div className="most-recents col-span-4">
                  <ResourceCard resource={selectedResources[3]} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
