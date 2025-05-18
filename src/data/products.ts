// src/data/products.ts

import type { Product } from "../types/product";

export const products: Product[] = [
  // Enhanced existing products with Unsplash images
  {
    id: '1',
    name: 'Handcrafted Leather Tote',
    description: 'This premium leather tote is handcrafted by Kenyan artisans using traditional techniques. Perfect for everyday use with its spacious design and durable construction.',
    price: 4500,
    discountPrice: 3800,
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7',
      'https://images.unsplash.com/photo-1601379329542-31c7627fca1e'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e21e1e5a45c',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1652990763092-ddd9d56e65e8',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1615196534111-aadbe5ff20b7',
      'https://images.unsplash.com/photo-1590047178976-87dce7f57f46'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd',
      'https://images.unsplash.com/photo-1630019852942-7a3592560416'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
      'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1592923279396-4b77616d1f9e',
      'https://images.unsplash.com/photo-1579438851724-3a66c4d94ef6'
    ],
    category: 'home-decor',
    tags: ['wood', 'kitchen', 'handcrafted'],
    featured: false,
    inStock: true
  },
  {
    id: '9',
    name: 'Embroidered Throw Pillow',
    description: 'Hand-embroidered cotton pillow cover featuring traditional Kenyan geometric patterns in vibrant colors.',
    price: 1900,
    images: [
      'https://images.unsplash.com/photo-1584295453869-8197244a75ee',
      'https://images.unsplash.com/photo-1616486701797-0f33f61589c3'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e',
      'https://images.unsplash.com/photo-1548863227-3af567fc3b27'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1628678784347-2e1f3dc1c25f',
      'https://images.unsplash.com/photo-1639903240403-a936be51ffd4'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1616046386594-c152babc9e15',
      'https://images.unsplash.com/photo-1594357632935-9d829270bf62'
    ],
    category: 'home-decor',
    tags: ['textile', 'printed', 'walldecor'],
    featured: true,
    inStock: true
  },
  
  // Additional new products
  {
    id: '13',
    name: 'Maasai Bead Earrings',
    description: 'Delicate yet striking earrings handcrafted with authentic Maasai beadwork techniques. These vibrant accessories celebrate traditional craftsmanship with a modern twist.',
    price: 1200,
    discountPrice: 980,
    images: [
      'https://images.unsplash.com/photo-1561159236-3cc4272afb67',
      'https://images.unsplash.com/photo-1622398925373-3f91b1ff63e6'
    ],
    category: 'jewelry',
    tags: ['beadwork', 'earrings', 'maasai'],
    featured: true,
    inStock: true
  },
  {
    id: '14',
    name: 'Hand-carved Wooden Bowl',
    description: 'Beautifully crafted bowl made from sustainably sourced African olive wood. Each piece showcases the wood\'s natural grain patterns and is finished with food-safe oils.',
    price: 2800,
    images: [
      'https://images.unsplash.com/photo-1578903520868-a5ba2370c9c4',
      'https://images.unsplash.com/photo-1580440282860-8555b21872df',
      'https://images.unsplash.com/photo-1605883705077-8d3d3cebe78c'
    ],
    category: 'home-decor',
    tags: ['wood', 'kitchen', 'handcrafted'],
    featured: true,
    inStock: true
  },
  {
    id: '15',
    name: 'Ankole Horn Serving Spoons',
    description: 'Elegant serving spoons crafted from ethically sourced Ankole cow horn. The natural variations in the horn create unique patterns, making each set one-of-a-kind.',
    price: 1800,
    images: [
      'https://images.unsplash.com/photo-1579438851724-3a66c4d94ef6',
      'https://images.unsplash.com/photo-1596456303350-8531f571f3c3'
    ],
    category: 'home-decor',
    tags: ['horn', 'kitchen', 'handcrafted'],
    featured: false,
    inStock: true
  },
  {
    id: '16',
    name: 'Tribal Pattern Ceramic Vase',
    description: 'Handcrafted ceramic vase featuring intricate tribal patterns inspired by traditional Kenyan art. Perfect as a statement piece in any room.',
    price: 3200,
    images: [
      'https://images.unsplash.com/photo-1612196808214-3d7822a98239',
      'https://images.unsplash.com/photo-1580221421877-6e00d4cb6722'
    ],
    category: 'home-decor',
    tags: ['ceramic', 'tribal', 'vase'],
    featured: true,
    inStock: true
  },
  {
    id: '17',
    name: 'Kitenge Fabric Clutch',
    description: 'Stylish clutch purse made from vibrant Kitenge fabric with leather trim. Features an interior pocket and magnetic closure. A perfect accessory for any occasion.',
    price: 1900,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
      'https://images.unsplash.com/photo-1628149455678-16f37bc392f4'
    ],
    category: 'fashion',
    tags: ['kitenge', 'fabric', 'clutch'],
    featured: false,
    inStock: true
  },
  {
    id: '18',
    name: 'African Landscape Photography Print',
    description: 'Stunning fine art print of the Kenyan savanna at sunset, captured by a local photographer. Each print is signed and numbered in a limited edition series.',
    price: 4500,
    discountPrice: 3600,
    images: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
      'https://images.unsplash.com/photo-1549366021-9f761d450615'
    ],
    category: 'art',
    tags: ['photography', 'landscape', 'print'],
    featured: true,
    inStock: true
  },
  {
    id: '19',
    name: 'Recycled Glass Beaded Bracelet',
    description: 'Eco-friendly bracelet handcrafted from recycled glass beads. Each piece supports sustainable practices while showcasing traditional Kenyan artisanship.',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a'
    ],
    category: 'jewelry',
    tags: ['recycled', 'beads', 'bracelet'],
    featured: false,
    inStock: true
  },
  {
    id: '20',
    name: 'Handwoven Floor Mat',
    description: 'Traditional floor mat handwoven from natural fibers using ancient techniques. Adds warmth and texture to any space while honoring cultural heritage.',
    price: 3800,
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2'
    ],
    category: 'home-decor',
    tags: ['woven', 'mat', 'natural'],
    featured: true,
    inStock: true
  },
  {
    id: '21',
    name: 'Soapstone Chess Set',
    description: 'Exquisite chess set hand-carved from Kisii soapstone. Each piece represents traditional African figures, blending the classic game with cultural artistry.',
    price: 8500,
    images: [
      'https://images.unsplash.com/photo-1586165368502-1bad197a6461',
      'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5'
    ],
    category: 'art',
    tags: ['soapstone', 'chess', 'game'],
    featured: true,
    inStock: true
  },
  {
    id: '22',
    name: 'Hammered Brass Coffee Spoons',
    description: 'Set of four elegant coffee spoons handcrafted from solid brass. Each spoon features a delicately hammered finish and slender handle.',
    price: 1600,
    images: [
      'https://images.unsplash.com/photo-1585514795381-baa893cff2b5',
      'https://images.unsplash.com/photo-1608666634759-4376010f863d'
    ],
    category: 'home-decor',
    tags: ['brass', 'kitchen', 'handcrafted'],
    featured: false,
    inStock: true
  },
  {
    id: '23',
    name: 'Ankara Fabric Headwrap',
    description: 'Versatile headwrap made from authentic Ankara fabric in vibrant patterns. Can be styled multiple ways for different occasions.',
    price: 950,
    images: [
      'https://images.unsplash.com/photo-1551469616-47e639eef342',
      'https://images.unsplash.com/photo-1589451359791-d92c265155cc'
    ],
    category: 'fashion',
    tags: ['ankara', 'headwrap', 'fabric'],
    featured: false,
    inStock: true
  },
  {
    id: '24',
    name: 'Tribal Bone Inlay Picture Frame',
    description: 'Elegant picture frame featuring intricate bone inlay work in traditional geometric patterns. Each frame is handcrafted by skilled artisans using sustainable materials.',
    price: 2900,
    discountPrice: 2400,
    images: [
      'https://images.unsplash.com/photo-1581343821519-7f93ce322012',
      'https://images.unsplash.com/photo-1593067422542-3e7e05093df3'
    ],
    category: 'home-decor',
    tags: ['bone', 'frame', 'tribal'],
    featured: true,
    inStock: true
  }
];