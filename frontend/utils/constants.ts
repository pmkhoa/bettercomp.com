export const CONTENT_TYPES = [
  { title: 'Topics', value: 'topics' },
  { title: 'Types', value: 'types' },
  { title: 'All Topics', value: 'alltopics' },
  { title: 'All Types', value: 'alltypes' },
];

export const defaultResourcesType = ['blog', 'ebook', 'guide', 'webinar', 'tool', 'template'];

export const defaultBackground = {
  _type: 'background',
  asset: null,
  enabled: false,
  backgroundType: 'color',
  backgroundColor: 'white',
  textColor: 'blue',
  showBorderTop: false,
};

export const BG_COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue',
  sand: 'bg-sand',
  white: 'bg-white',
  'light-blue': 'bg-light-blue',
  'accent-brick': 'bg-accent-brick',
  orange: 'bg-orange',
  'bright-blue': 'bg-bright-blue',
  gold: 'bg-gold',
  'teal-green': 'bg-teal-green',
};

export const TEXT_COLOR_MAP: Record<string, string> = {
  white: 'text-white',
  blue: 'text-blue',
  black: 'text-black',
};
