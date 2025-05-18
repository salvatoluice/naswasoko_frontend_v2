import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Leather Tote',
    description: 'This premium leather tote is handcrafted by Kenyan artisans using traditional techniques. Perfect for everyday use with its spacious design and durable construction.',
    price: 4500,
    discountPrice: 3800,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500', '/api/placeholder/400/500'],
    category: 'fashion',
    tags: ['leather', 'handcrafted', 'bag'],
    featured: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Beaded Statement Necklace',
    description: 'A stunning statement necklace featuring traditional Maasai beadwork in vibrant colors, reinterpreted with a contemporary design sensibility.',
    price: 2800,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    category: 'jewelry',
    tags: ['beadwork', 'handcrafted', 'maasai'],
    featured: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Shuka Pattern Scarf',
    description: 'This elegant scarf features the iconic Maasai Shuka pattern, woven from high-quality cotton with a soft finish. A versatile addition to any wardrobe.',
    price: 1200,
    images: ['/api/placeholder/400/500'],
    category: 'fashion',
    tags: ['cotton', 'pattern', 'traditional'],
    featured: false,
    inStock: true
  },
  {
    id: '4',
    name: 'Ceramic Table Lamp',
    description: 'Handmade ceramic lamp with traditional patterns and a contemporary silhouette. Each piece is unique with subtle variations in the glaze and design.',
    price: 3600,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    category: 'home-decor',
    tags: ['ceramic', 'lighting', 'handmade'],
    featured: true,
    inStock: true
  },
  {
    id: '5',
    name: 'Woven Sisal Basket',
    description: 'Meticulously handwoven sisal basket using traditional techniques, perfect for storage or as a decorative piece. Each basket features a unique pattern.',
    price: 1800,
    discountPrice: 1500,
    images: ['/api/placeholder/400/500'],
    category: 'home-decor',
    tags: ['sisal', 'woven', 'basket'],
    featured: false,
    inStock: true
  },
  {
    id: '6',
    name: 'Brass Bangle Set',
    description: 'Set of three handcrafted brass bangles with delicate engraved patterns. These stackable bracelets add an elegant touch to any outfit.',
    price: 2200,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    category: 'jewelry',
    tags: ['brass', 'handcrafted', 'bracelet'],
    featured: true,
    inStock: true
  },
  {
    id: '7',
    name: 'Abstract Canvas Painting',
    description: 'Original artwork by a Kenyan artist featuring vibrant colors and abstract patterns inspired by Kenyan landscapes and cultural motifs.',
    price: 7500,
    images: ['/api/placeholder/400/500'],
    category: 'art',
    tags: ['painting', 'canvas', 'original'],
    featured: true,
    inStock: true
  },
  {
    id: '8',
    name: 'Olive Wood Salad Servers',
    description: 'Elegant salad servers handcrafted from sustainably harvested olive wood. The natural grain of the wood makes each piece unique.',
    price: 1600,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    category: 'home-decor',
    tags: ['wood', 'kitchen', 'handcrafted'],
    featured: false,
    inStock: true
  },
  {
    id: '9',
    name: 'Embroidered Throw Pillow',
    description: 'Handembroidered cotton pillow cover featuring traditional Kenyan geometric patterns in vibrant colors.',
    price: 1900,
    images: ['/api/placeholder/400/500'],
    category: 'home-decor',
    tags: ['textile', 'embroidery', 'cushion'],
    featured: false,
    inStock: true
  },
  {
    id: '10',
    name: 'Kiondo Market Bag',
    description: 'Traditional Kiondo bag handwoven from sisal fiber and leather, perfect for shopping or as a stylish everyday tote. Durable and eco-friendly.',
    price: 2500,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    category: 'fashion',
    tags: ['sisal', 'woven', 'bag'],
    featured: true,
    inStock: true
  },
  {
    id: '11',
    name: 'Soapstone Sculpture',
    description: 'Hand-carved soapstone sculpture by Kisii artisans, featuring smooth curves and a polished finish. A beautiful decorative piece for any home.',
    price: 3200,
    images: ['/api/placeholder/400/500'],
    category: 'art',
    tags: ['soapstone', 'sculpture', 'handcarved'],
    featured: false,
    inStock: true
  },
  {
    id: '12',
    name: 'Hand-printed Textile Wall Hanging',
    description: 'Beautiful textile wall hanging with hand-printed designs using traditional techniques and natural dyes.',
    price: 2800,
    discountPrice: 2400,
    images: ['/api/placeholder/400/500', '/api/placeholder/400/500'],
    category: 'home-decor',
    tags: ['textile', 'printed', 'walldecor'],
    featured: true,
    inStock: true
  }
];

// src/data/tags.ts
