// documents & singletons
import { author } from './documents/author';
import { blog } from './documents/blog';
import { page } from './documents/page';
import { settings } from './singletons/settings';
import { home } from './singletons/home';

// Objects
import { background } from './objects/background';
import { blockContent } from './objects/blockContent';
import { ctaLink } from './objects/ctaLink';
import { form } from './objects/form';
import { link } from './objects/link';
import { mediaAsset } from './objects/mediaAsset';
import { menuItem } from './objects/menuItem';
import { seo } from './objects/seo';
import { statNumber } from './objects/statNumber';

// Modules
import { accordionCenter } from './modules/accordionCenter';
import { accordionLeftPanel } from './modules/accordionWithLeftPanel';
import { contactForm } from './modules/contactForm';
import { featuredResources } from './modules/featuredResources';
import { fullWidthCTA } from './modules/fullWidthCTA';
import { heroLarge } from './modules/heroLarge';
import { heroResource } from './modules/heroResource';
import { heroShort } from './modules/heroShort';
import { iconCards } from './modules/iconCards';
import { logos } from './modules/logos';
import { pageBuilder } from './modules/pageBuilder';
import { preFooterCTA } from './modules/preFooterCta';
import { resourcesWithLeftPanel } from './modules/resourcesWithLeftPanel';
import { richtext } from './modules/richtext';
import { stats } from './modules/stats';
import { testimonials } from './modules/testimonials';
import { threeColumnContentWithIcons } from './modules/threeColumnContentWithIcons';
import { threeColumnContentWithNumbers } from './modules/threeColumnContentWithNumbers';
import { twoColumnPhotoCards } from './modules/twoColumnPhotoCards';
import { twoColumnsContent } from './modules/twoColumnsContent';

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,

  // Documents
  author,
  blog,
  home,
  page,

  // Objects
  background,
  blockContent,
  ctaLink,
  form,
  fullWidthCTA,
  heroResource,
  link,
  mediaAsset,
  menuItem,
  seo,
  statNumber,

  // Modules
  accordionCenter,
  accordionLeftPanel,
  contactForm,
  featuredResources,
  heroLarge,
  heroShort,
  iconCards,
  logos,
  pageBuilder,
  preFooterCTA,
  resourcesWithLeftPanel,
  richtext,
  stats,
  testimonials,
  threeColumnContentWithIcons,
  threeColumnContentWithNumbers,
  twoColumnPhotoCards,
  twoColumnsContent,
];
