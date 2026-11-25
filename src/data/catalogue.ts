export const PALETTE = {
  ivory: '#F7F4EE',
  oat: '#E5DCCE',
  espresso: '#302923',
  walnut: '#463B32',
  clay: '#9B573E',
} as const;

export type ProductCategory = 'Sofas' | 'Chairs' | 'Tables';
export type FilterOption = 'All' | ProductCategory;

export interface FinishOption {
  id: string;
  name: string;
  swatchHex: string;
  note: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  material: string;
  startingPrice: number;
  image: string;
  alt: string;
  dimensions: {
    width: string;
    depth: string;
    height: string;
    seatHeight?: string;
  };
  description: string;
  finishes: FinishOption[];
}

export interface MaterialSample {
  id: string;
  name: string;
  swatchHex: string;
  image: string;
  alt: string;
  description: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  caption: string;
}

export const HERO_DATA = {
  headline: 'Room to settle in.',
  subcopy: 'Deep seating, softly rounded arms, and linen you can feel. Meet the Cove Modular.',
  ctaLabel: 'Explore the collection',
} as const;

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'cove-showroom',
    image: '/src/assets/images/hero_cove_showroom_1795593816202.jpg',
    alt: 'Low-slung oatmeal linen Cove Modular sofa with softly rounded arms in a sunlit architectural room with limestone walls and a walnut coffee table.',
    caption: 'Cove Modular in Oat Linen.',
  },
  {
    id: 'vale-showroom',
    image: '/src/assets/images/hero_vale_showroom_1795594712855.jpg',
    alt: 'Tailored Vale Three-Seater sofa in sand-grey wool on a smoked oak plinth in a bright travertine living room with sheer-draped windows.',
    caption: 'Vale Three-Seater in Sand Wool.',
  },
  {
    id: 'sora-showroom',
    image: '/src/assets/images/hero_sora_showroom_1795594713260.jpg',
    alt: 'Curved natural oak Sora Lounge Chair in moss-olive wool beside a sculptural walnut and travertine side table in morning daylight.',
    caption: 'Sora Lounge Chair in Moss Wool.',
  },
];

export const FILTER_OPTIONS: FilterOption[] = ['All', 'Sofas', 'Chairs', 'Tables'];

export const PRODUCTS: Product[] = [
  {
    id: 'cove-modular',
    name: 'Cove Modular',
    category: 'Sofas',
    material: 'Oat Linen',
    startingPrice: 4250,
    image: '/src/assets/images/studio_cove_modular_1795593816292.jpg',
    alt: 'Studio view of the Cove Modular sofa in textured oatmeal linen with deep boxy cushions and rounded arms.',
    dimensions: {
      width: '112 in (284 cm)',
      depth: '41 in (104 cm)',
      height: '28.5 in (72 cm)',
      seatHeight: '16 in (41 cm)',
    },
    description:
      'Low architectural proportions with feather-wrapped cushions and softly rounded arms. Individual bays lock quietly together for wide or compact rooms.',
    finishes: [
      {
        id: 'oat-linen',
        name: 'Oat Linen',
        swatchHex: '#DDD4C3',
        note: 'Heavyweight Belgian flax with a dry, breathable hand.',
      },
      {
        id: 'moss-wool',
        name: 'Moss Wool',
        swatchHex: '#4E5840',
        note: 'Dense felted wool melange in deep woodland olive.',
      },
      {
        id: 'chalk-boucle',
        name: 'Chalk Bouclé',
        swatchHex: '#ECE8DF',
        note: 'Looped cotton-wool weave with quiet surface relief.',
      },
    ],
  },
  {
    id: 'vale-three-seater',
    name: 'Vale Three-Seater',
    category: 'Sofas',
    material: 'Sand Wool & Smoked Oak',
    startingPrice: 3680,
    image: '/src/assets/images/studio_vale_sofa_1795593815906.jpg',
    alt: 'Vale Three-Seater sofa upholstered in sand-grey wool resting on a recessed smoked oak timber plinth.',
    dimensions: {
      width: '90 in (229 cm)',
      depth: '37 in (94 cm)',
      height: '30 in (76 cm)',
      seatHeight: '16.5 in (42 cm)',
    },
    description:
      'Tailored bench cushions meet slim upright arms and a recessed smoked oak plinth that lifts the silhouette lightly off the floor.',
    finishes: [
      {
        id: 'sand-wool',
        name: 'Sand Wool',
        swatchHex: '#B6ADA0',
        note: 'Tightly woven worsted wool in warm stone.',
      },
      {
        id: 'oat-linen',
        name: 'Oat Linen',
        swatchHex: '#DDD4C3',
        note: 'Natural unbleached linen with subtle flax slub.',
      },
      {
        id: 'smoked-oak-plinth',
        name: 'Moss Wool / Smoked Oak',
        swatchHex: '#4E5840',
        note: 'Olive wool paired with a hand-oiled dark oak base.',
      },
    ],
  },
  {
    id: 'fold-loveseat',
    name: 'Fold Loveseat',
    category: 'Sofas',
    material: 'Clay Cotton-Linen',
    startingPrice: 2890,
    image: '/src/assets/images/studio_fold_loveseat_1795593817145.jpg',
    alt: 'Fold Loveseat two-seater sofa in muted clay woven fabric featuring gently folded envelope armrests on turned oak feet.',
    dimensions: {
      width: '66 in (168 cm)',
      depth: '36 in (91 cm)',
      height: '31 in (79 cm)',
      seatHeight: '17 in (43 cm)',
    },
    description:
      'Compact two-person seating framed by softly creased envelope armrests and turned white oak legs.',
    finishes: [
      {
        id: 'burnished-clay-linen',
        name: 'Clay Cotton-Linen',
        swatchHex: '#9B573E',
        note: 'Brushed terracotta-toned weave with warm matte depth.',
      },
      {
        id: 'oat-linen',
        name: 'Oat Linen',
        swatchHex: '#DDD4C3',
        note: 'Soft neutral flax weave for sunlit spaces.',
      },
      {
        id: 'moss-wool',
        name: 'Moss Wool',
        swatchHex: '#4E5840',
        note: 'Rich olive wool with soft natural crimp.',
      },
    ],
  },
  {
    id: 'sora-lounge-chair',
    name: 'Sora Lounge Chair',
    category: 'Chairs',
    material: 'Moss Wool & White Oak',
    startingPrice: 1740,
    image: '/src/assets/images/studio_sora_chair_1795593817711.jpg',
    alt: 'Sora Lounge Chair with a curved natural oak frame and deep moss-olive wool cushions.',
    dimensions: {
      width: '31 in (79 cm)',
      depth: '33.5 in (85 cm)',
      height: '33 in (84 cm)',
      seatHeight: '15.5 in (39 cm)',
    },
    description:
      'A continuous steam-bent oak sled frame cradles a relaxed, high-back cushion set with open side joinery.',
    finishes: [
      {
        id: 'moss-wool',
        name: 'Moss Wool',
        swatchHex: '#4E5840',
        note: 'Woven olive wool over natural soap-finished oak.',
      },
      {
        id: 'oat-linen',
        name: 'Oat Linen',
        swatchHex: '#DDD4C3',
        note: 'Belgian oatmeal linen with natural oak frame.',
      },
      {
        id: 'smoked-oak-moss',
        name: 'Smoked Oak / Moss Wool',
        swatchHex: '#3B3028',
        note: 'Fumed dark oak frame paired with moss wool cushions.',
      },
    ],
  },
  {
    id: 'reed-coffee-table',
    name: 'Reed Coffee Table',
    category: 'Tables',
    material: 'Smoked Oak',
    startingPrice: 1480,
    image: '/src/assets/images/studio_reed_table_1795593817468.jpg',
    alt: 'Reed Coffee Table in dark smoked oak featuring four fluted cylindrical legs and a chamfered tabletop.',
    dimensions: {
      width: '54 in (137 cm)',
      depth: '28 in (71 cm)',
      height: '13.5 in (34 cm)',
    },
    description:
      'Solid European oak coffee table anchored by four finely fluted pillar legs and a softly beveled top.',
    finishes: [
      {
        id: 'smoked-oak',
        name: 'Smoked Oak',
        swatchHex: '#3B3028',
        note: 'Kiln-fumed dark brown grain sealed in matte oil.',
      },
      {
        id: 'natural-white-oak',
        name: 'Natural White Oak',
        swatchHex: '#C2AA89',
        note: 'Pale brushed oak with raw matte finish.',
      },
    ],
  },
  {
    id: 'arc-side-table',
    name: 'Arc Side Table',
    category: 'Tables',
    material: 'Walnut & Travertine',
    startingPrice: 920,
    image: '/src/assets/images/studio_arc_table_1795593817859.jpg',
    alt: 'Arc Side Table pairing a turned solid walnut dish top with an arched honed travertine stone base.',
    dimensions: {
      width: '18 in (46 cm)',
      depth: '18 in (46 cm)',
      height: '19.5 in (50 cm)',
    },
    description:
      'A turned walnut tray top resting atop a monolithic travertine arch for cool mineral balance.',
    finishes: [
      {
        id: 'walnut-travertine',
        name: 'Walnut & Travertine',
        swatchHex: '#5A4031',
        note: 'Hand-rubbed American walnut over open-pore stone.',
      },
      {
        id: 'smoked-oak-travertine',
        name: 'Smoked Oak & Travertine',
        swatchHex: '#3B3028',
        note: 'Deep fumed oak top paired with warm travertine.',
      },
    ],
  },
];

export const MATERIALS: MaterialSample[] = [
  {
    id: 'oat-linen',
    name: 'Oat Linen',
    swatchHex: '#DDD4C3',
    image: '/src/assets/images/material_oat_linen_1795592411827.jpg',
    alt: 'Macro view of draped Belgian Oat Linen upholstery fabric showing natural flax slub weave in morning daylight.',
    description:
      'Heavyweight unbleached Belgian flax with an organic slub weave that stays cool to the touch and softens with daily use.',
  },
  {
    id: 'moss-wool',
    name: 'Moss Wool',
    swatchHex: '#4E5840',
    image: '/src/assets/images/material_moss_wool_1795592412641.jpg',
    alt: 'Macro view of dense woven Moss Wool upholstery textile with deep olive and sage melange yarns.',
    description:
      'Three closely dyed olive and lichen yarns spun into a dense, springy basket weave with quiet matte depth.',
  },
  {
    id: 'smoked-oak',
    name: 'Smoked Oak',
    swatchHex: '#3B3028',
    image: '/src/assets/images/material_smoked_oak_1795592413241.jpg',
    alt: 'Macro view of a kiln-fumed Smoked Oak hardwood sample showing rich dark espresso wood grain and chamfered edge.',
    description:
      'Kiln-fumed European oak sealed in matte plant oil to deepen the timber naturally while keeping the open grain tactile.',
  },
];

export function formatUsdPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
