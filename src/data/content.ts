import { DishItem, GalleryItem, HeroScene, Testimonial } from '../types/types';
import emberRoastImage from '../assets/images/menu/featured-ember-roast.jpg';
import gardenHarvestImage from '../assets/images/menu/featured-garden-harvest.jpg';
import casaVerdePastaImage from '../assets/images/menu/featured-casa-verde-pasta.jpg';
import galleryInteriorImage from '../assets/images/gallery/01-gallery-interior.jpg';
import galleryChefImage from '../assets/images/gallery/02-gallery-chef.jpg';
import galleryIngredientsImage from '../assets/images/gallery/03-gallery-ingredients.jpg';
import galleryTableDetailsImage from '../assets/images/gallery/04-gallery-table-details.jpg';
import gallerySignatureDishImage from '../assets/images/gallery/05-gallery-signature-dish.jpg';
import galleryEveningDiningImage from '../assets/images/gallery/06-gallery-evening-dining.jpg';

export const HERO_SCENES: HeroScene[] = [
  {
    id: 1,
    eyebrow: 'CASA VERDE',
    heading: 'A table worth gathering around.',
    body: 'Seasonal food, warm surroundings, and evenings meant to be remembered.',
    position: 'left-center',
    showCTAs: true,
    timeRange: [0.0, 0.22],
  },
  {
    id: 2,
    eyebrow: 'THE TABLE',
    heading: 'Every meal begins with a moment.',
    body: 'A little anticipation, a warm table, and something worth sharing.',
    position: 'right-top',
    showCTAs: false,
    timeRange: [0.24, 0.44],
  },
  {
    id: 3,
    eyebrow: 'THE FOOD',
    heading: 'Made for moments worth sharing.',
    body: 'Seasonal food, thoughtful details, and a table that brings people closer.',
    position: 'left-bottom',
    showCTAs: false,
    timeRange: [0.46, 0.64],
  },
  {
    id: 4,
    eyebrow: 'THE EXPERIENCE',
    heading: 'Food tastes better together.',
    body: 'Because the best meals are the ones that become part of the evening.',
    position: 'right-center',
    showCTAs: false,
    timeRange: [0.66, 0.84],
  },
  {
    id: 5,
    eyebrow: 'CASA VERDE',
    heading: 'Come for the food. Stay for the moment.',
    body: 'A place for slow evenings, good conversation, and another reason to gather.',
    position: 'left-center-closing',
    showCTAs: true,
    timeRange: [0.86, 1.0],
  },
];

export const FEATURED_DISHES: DishItem[] = [
  {
    id: 'ember-roast',
    name: 'Ember Roast',
    tagline: 'Signature Hearth Cut',
    category: 'Principale',
    description:
      'Slow-roasted seasonal vegetables, seared premium protein, silky earthy sauce, roasted baby carrots, herbs, and charred vegetables.',
    image: emberRoastImage,
    details: ['Locally sourced', 'Charcoal embers', 'Braised jus reduction'],
  },
  {
    id: 'garden-harvest',
    name: 'Garden Harvest',
    tagline: 'Orchard & Earth',
    category: 'Antipasti',
    description:
      'Seasonal vegetables, heirloom tomatoes, grains, fresh herbs, seeds, and a natural house sauce.',
    image: gardenHarvestImage,
    details: ['Organic heirloom crops', 'White bean silk purée', 'Toasted kernel crunch'],
  },
  {
    id: 'casa-verde-pasta',
    name: 'CASA VERDE Pasta',
    tagline: 'Handmade Daily',
    category: 'Primi Piatti',
    description:
      'Handmade fresh pasta with creamy herb sauce, roasted mushrooms, shaved aged cheese, basil, and roasted garlic.',
    image: casaVerdePastaImage,
    details: ['Extruded semolina bronze-cut', 'Wild forest foraged fungi', '30-month aged reserve'],
  },
];

export const FULL_MENU_SECTIONS = [
  {
    category: 'Antipasti & Crudo',
    items: [
      {
        name: 'Garden Harvest Terrine',
        description: 'Heirloom tomatoes, roasted baby roots, puffed sorghum, garden herbs',
      },
      {
        name: 'Smoked Ricotta & Wood-Fired Figs',
        description: 'Wildflower thyme honey, toasted walnuts, sourdough lavash',
      },
      {
        name: 'Yellowtail Crudo',
        description: 'Cured citrus broth, pickled green strawberries, garden chives',
      },
    ],
  },
  {
    category: 'Primi Piatti',
    items: [
      {
        name: 'CASA VERDE Mafaldine',
        description: 'Handmade ruffled ribbons, wild chanterelles, herb velouté, 30-month parmesan',
      },
      {
        name: 'Aged Carnaroli Risotto',
        description: 'Roasted sweet corn emulsion, summer truffles, brown butter emulsion',
      },
      {
        name: 'Handcrafted Agnolotti',
        description: 'Slow-braised winter greens, taleggio cheese, toasted pine seeds',
      },
    ],
  },
  {
    category: 'Secondi & Hearth',
    items: [
      {
        name: 'Ember Roast Tenderloin',
        description: 'Glazed baby carrots, charred broccolini, bone marrow jus reduction',
      },
      {
        name: 'Charred Seabass',
        description: 'Braised fennel bulb, blood orange agrodolce, saffron broth',
      },
      {
        name: 'Hearth-Smoked Duck Breast',
        description: 'Spiced parsnip cream, braised endive, black currant reduction',
      },
    ],
  },
  {
    category: 'Dolce & Infusions',
    items: [
      {
        name: 'Smoked Vanilla Panna Cotta',
        description: 'Poached quince, toasted cardamom crumble, verbena oil',
      },
      {
        name: 'Dark Cocoa Olive Oil Torte',
        description: 'Fior di latte gelato, sea salt flake, cold-pressed estate oil',
      },
      {
        name: 'Botanical Herbal Infusion',
        description: 'House-harvested mint, chamomile flower, dried bergamot peel',
      },
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-01',
    title: 'The Great Hall',
    narrativeStep: 'Place',
    image: galleryInteriorImage,
    aspect: 'wide',
    span: 'col-span-12 md:col-span-7',
  },
  {
    id: 'gallery-02',
    title: 'Deliberate Craft',
    narrativeStep: 'Craft',
    image: galleryChefImage,
    aspect: 'tall',
    span: 'col-span-12 md:col-span-5',
  },
  {
    id: 'gallery-03',
    title: 'Seasonal Bounty',
    narrativeStep: 'Ingredients',
    image: galleryIngredientsImage,
    aspect: 'tall',
    span: 'col-span-12 md:col-span-5',
  },
  {
    id: 'gallery-04',
    title: 'Table Ritual',
    narrativeStep: 'Details',
    image: galleryTableDetailsImage,
    aspect: 'square',
    span: 'col-span-12 md:col-span-7',
  },
  {
    id: 'gallery-05',
    title: 'Signature Seared Dish',
    narrativeStep: 'Food',
    image: gallerySignatureDishImage,
    aspect: 'square',
    span: 'col-span-12 md:col-span-6',
  },
  {
    id: 'gallery-06',
    title: 'Evening Solitude & Warmth',
    narrativeStep: 'Experience',
    image: galleryEveningDiningImage,
    aspect: 'wide',
    span: 'col-span-12 md:col-span-6',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Every detail felt thoughtful without ever feeling overdone.',
    authorNote: 'Autumn Dinner Guest',
  },
  {
    quote: 'The kind of evening where you stop checking the time.',
    authorNote: 'Private Gathering',
  },
  {
    quote: 'Beautiful food, warm service, and an atmosphere you want to stay in.',
    authorNote: 'Table for Four',
  },
];

export const RESTAURANT_INFO = {
  name: 'CASA VERDE',
  descriptor: 'Contemporary Restaurant',
  tagline: 'A table worth gathering around.',
  address: {
    line1: '42 Garden Avenue',
    city: 'Lahore, Pakistan',
  },
  hours: {
    days: 'Tuesday – Sunday',
    time: '5:00 PM – 11:00 PM',
    note: 'Closed on Mondays for estate harvesting',
  },
  contact: {
    phone: '+92 300 0000000',
    email: 'hello@casaverde.example',
  },
  social: {
    instagram: '@casaverde.lahore',
  },
};
