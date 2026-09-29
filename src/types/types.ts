export interface DishItem {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  image: string;
  category?: string;
  details?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  narrativeStep: string;
  image: string;
  aspect: 'wide' | 'tall' | 'square';
  span: string;
}

export interface Testimonial {
  quote: string;
  authorNote: string;
}

export interface HeroScene {
  id: number;
  eyebrow: string;
  heading: string;
  body: string;
  position: 'left-center' | 'right-top' | 'left-bottom' | 'right-center' | 'left-center-closing';
  showCTAs?: boolean;
  timeRange: [number, number]; // normalized scroll progress range [start, end]
}
