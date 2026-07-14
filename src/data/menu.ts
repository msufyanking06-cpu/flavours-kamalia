import { MenuItem } from '../types';
export const menuItems: MenuItem[] = [
  // --- SPECIALTIES ---
  {
    id: 'spec-steam-roast',
    name: 'Flavourz Royal Steam Roast',
    description: 'Our signature whole chicken joint steam roast. Succulent and tender inside, perfectly crisped outside in a secret blend of local aromatic spices. Topped with sesame seeds and served with hand-carved lemon slices and mint chutney.',
    price: 1390,
    category: 'specialties',
    image: '/assets/images/steam_roast_1784020560823.jpg',
    rating: 4.8,
    isSpicy: true,
    estimatedPrepTime: 25
  },
  {
    id: 'spec-karahi',
    name: 'Kamalia Special Chicken Karahi',
    description: 'Traditional Punjabi chicken karahi slow-cooked in a heavy black iron wok with fresh red tomatoes, sliced ginger, slit green chilies, and hand-crushed whole black pepper.',
    price: 1550,
    category: 'specialties',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    isSpicy: true,
    estimatedPrepTime: 20
  },
  {
    id: 'spec-platter',
    name: 'Lounge Executive BBQ Platter',
    description: 'A regal platter for sharing, featuring 2 skewers of chicken malai boti, 2 skewers of mutton seekh kabab, 4 pieces of tandoori wings, and hot buttered garlic naan.',
    price: 2400,
    category: 'specialties',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    isSpicy: true,
    estimatedPrepTime: 30
  },

  // --- BURGERS ---
  {
    id: 'burg-smash',
    name: 'Double Smash Classic Burger',
    description: 'Two smash patties of premium prime beef, layered with double melted sharp cheddar, caramelized balsamic onions, crisp butterhead lettuce, and our house special smokey burger dressing on a butter-toasted brioche bun.',
    price: 850,
    category: 'burgers',
    image: '/src/assets/images/gourmet_burger_1784020579522.jpg',
    rating: 4.9,
    isSpicy: false,
    estimatedPrepTime: 12
  },
  {
    id: 'burg-zing',
    name: 'Crispy Zing Lounge Burger',
    description: 'Double hand-breaded buttermilk chicken thigh fried to golden perfection, coated with a sweet-n-spicy glaze, crunchy shredded cabbage, and signature white garlic mayo.',
    price: 650,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    isSpicy: true,
    estimatedPrepTime: 10
  },
  {
    id: 'burg-firecracker',
    name: 'Lounge Firecracker Jalapeno',
    description: 'Smashed spicy beef patty, grilled red chillies, pickled jalapenos, liquid pepperjack cheese, and fiery habanero spread.',
    price: 920,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    isSpicy: true,
    estimatedPrepTime: 12
  },

  // --- TRADITIONAL & FAST FOOD ---
  {
    id: 'trad-shawarma',
    name: 'Authentic Arabic Garlic Shawarma',
    description: 'Juicy, slow-roasted shaved chicken wrap rolled in soft, fresh-baked pita bread, stuffed with pickled turnip, fries, and a rich, heavily garlic-infused Lebanese toum sauce.',
    price: 320,
    category: 'traditional',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&auto=format&fit=crop&q=80',
    rating: 4.4,
    isSpicy: false,
    estimatedPrepTime: 8
  },
  {
    id: 'trad-seekh-kabab',
    name: 'Flame-Grilled Beef Seekh Kabab',
    description: 'Four pieces of hand-minced premium beef blended with green coriander, mint, onions, and ground spices, flame-grilled on skewers over white charcoal coals.',
    price: 780,
    category: 'traditional',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    isSpicy: true,
    estimatedPrepTime: 15
  },
  {
    id: 'trad-malai-boti',
    name: 'Velvety Tandoori Malai Boti Skewers',
    description: 'Eight pieces of boneless chicken breast marinated in thick fresh dairy cream, yogurt, white pepper, and green cardamom, grilled to moist tenderness.',
    price: 850,
    category: 'traditional',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    isSpicy: false,
    estimatedPrepTime: 18
  },

  // --- REFRESHERS ---
  {
    id: 'ref-mint-margarita',
    name: 'Ultimate Mint Margarita',
    description: 'Our most popular summer cooler. Chilled mineral soda blended with crushed ice, young peppermint leaves, hand-squeezed lime juice, and a pinch of black Himalayan salt.',
    price: 280,
    category: 'refreshers',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    isSpicy: false,
    estimatedPrepTime: 5
  },
  {
    id: 'ref-blue-lagoon',
    name: 'Lounge Blue Lagoon Slush',
    description: 'An icy blend of premium blue curacao syrup, freshly extracted lime juice, sparkling soda water, and mint garnishing.',
    price: 310,
    category: 'refreshers',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&auto=format&fit=crop&q=80',
    rating: 4.6,
    isSpicy: false,
    estimatedPrepTime: 5
  },
  {
    id: 'ref-mango-shake',
    name: 'Local Sindhri Mango Velvet Shake',
    description: 'Rich, thick blend of sun-ripened Sindhri mangoes, fresh creamy milk, organic sugar, topped with sliced pistachios and a scoop of vanilla ice cream.',
    price: 380,
    category: 'refreshers',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    isSpicy: false,
    estimatedPrepTime: 6
  },

  // --- DESSERTS ---
  {
    id: 'des-molten-lava',
    name: 'Belgian Molten Chocolate Lava',
    description: 'Warm cocoa pudding cake with an incredibly rich flowing liquid Belgian dark chocolate center. Served on a slate plate with cold vanilla bean ice cream and cocoa dusting.',
    price: 550,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    isSpicy: false,
    estimatedPrepTime: 12
  },
  {
    id: 'des-sizzling-brownie',
    name: 'Sizzling Hot Skillet Brownie',
    description: 'Our house-baked rich dark fudge walnut brownie, placed on a blazing hot cast-iron skillet, topped with gourmet vanilla gelato and finished table-side with pour-over bubbling hot chocolate fudge sauce.',
    price: 620,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80', // falls back beautifully
    rating: 4.7,
    isSpicy: false,
    estimatedPrepTime: 10
  },
  {
    id: 'des-badami-kheer',
    name: 'Traditional Royal Badami Kheer',
    description: 'Slow-cooked traditional Punjabi rice pudding infused with aromatic green cardamom, saffron threads, and loaded with shredded slivered almonds, served chilled in a clay pot.',
    price: 250,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    isSpicy: false,
    estimatedPrepTime: 5
  }
];

export const tables = [
  { id: 'tbl-1', number: 1, capacity: 2, area: 'Lounge' },
  { id: 'tbl-2', number: 2, capacity: 4, area: 'Lounge' },
  { id: 'tbl-3', number: 3, capacity: 4, area: 'Lounge' },
  { id: 'tbl-4', number: 4, capacity: 2, area: 'Window Booths' },
  { id: 'tbl-5', number: 5, capacity: 4, area: 'Window Booths' },
  { id: 'tbl-6', number: 6, capacity: 6, area: 'Family Hall' },
  { id: 'tbl-7', number: 7, capacity: 8, area: 'Family Hall' },
  { id: 'tbl-8', number: 8, capacity: 10, area: 'Family Hall' },
  { id: 'tbl-9', number: 9, capacity: 2, area: 'Outdoor Deck' },
  { id: 'tbl-10', number: 10, capacity: 4, area: 'Outdoor Deck' },
];
