import { Product } from '@/types';

const BASE_URL = 'https://dummyjson.com';

// Cosmetic product keywords to filter from the API
const COSMETIC_KEYWORDS = [
  'mascara', 'lipstick', 'foundation', 'concealer', 'blush', 'eyeshadow',
  'eyeliner', 'primer', 'powder', 'bronzer', 'highlighter', 'serum',
  'moisturizer', 'cleanser', 'toner', 'sunscreen', 'lip', 'eye', 'face',
  'beauty', 'makeup', 'skin', 'care', 'cream', 'lotion', 'oil'
];

const HARDCODED_COSMETICS = [
  {
    id: 1001,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Suitable for everyday use.',
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    category: 'beauty',
    thumbnail: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    brand: 'Essence',
    weight: 13,
    dimensions: { width: 23.17, height: 14.43, depth: 28.01 },
    warrantyInformation: '1 month warranty',
    shippingInformation: 'Ships in 1 month',
    reviews: [
      {
        rating: 5,
        comment: 'Great mascara, highly recommend!',
        date: '2024-05-23T08:56:21.618Z',
        reviewerName: 'Scarlett Wright',
        reviewerEmail: 'scarlett.wright@x.dummyjson.com'
      }
    ]
  },
  {
    id: 1002,
    title: 'Eyeshadow Palette with Mirror',
    description: 'A versatile eyeshadow palette with 12 stunning shades and built-in mirror. Perfect for creating day and night looks.',
    price: 19.99,
    discountPercentage: 5.99,
    rating: 4.44,
    stock: 44,
    category: 'beauty',
    thumbnail: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    brand: 'Glamour',
    weight: 200,
    dimensions: { width: 15.0, height: 2.0, depth: 10.0 },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    reviews: [
      {
        rating: 4,
        comment: 'Good quality eyeshadows with nice pigmentation.',
        date: '2024-05-23T08:56:21.618Z',
        reviewerName: 'Elena Rodriguez',
        reviewerEmail: 'elena.rodriguez@x.dummyjson.com'
      }
    ]
  },
  {
    id: 1003,
    title: 'Powder Canister',
    description: 'Lightweight setting powder that helps control shine and extends makeup wear. Perfect for all skin types.',
    price: 14.99,
    discountPercentage: 18.58,
    rating: 3.31,
    stock: 59,
    category: 'beauty',
    thumbnail: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    brand: 'Beauty Plus',
    weight: 85,
    dimensions: { width: 8.0, height: 8.0, depth: 3.0 },
    warrantyInformation: '6 months warranty',
    shippingInformation: 'Ships in 1-2 business days',
    reviews: [
      {
        rating: 3,
        comment: 'Decent powder, does the job.',
        date: '2024-05-23T08:56:21.618Z',
        reviewerName: 'Maya Patel',
        reviewerEmail: 'maya.patel@x.dummyjson.com'
      }
    ]
  },
  {
    id: 1004,
    title: 'Red Lipstick',
    description: 'Classic red lipstick with long-lasting formula and vibrant color payoff. A must-have for any makeup collection.',
    price: 12.99,
    discountPercentage: 19.03,
    rating: 2.46,
    stock: 68,
    category: 'beauty',
    thumbnail: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    brand: 'Chic Color',
    weight: 15,
    dimensions: { width: 2.0, height: 10.0, depth: 2.0 },
    warrantyInformation: '6 months warranty',
    shippingInformation: 'Ships in 1-2 business days',
    reviews: [
      {
        rating: 2,
        comment: 'Color is nice but formula could be better.',
        date: '2024-05-23T08:56:21.618Z',
        reviewerName: 'Sofia Chen',
        reviewerEmail: 'sofia.chen@x.dummyjson.com'
      }
    ]
  }
];

const isCosmetic = (product: any): boolean => {
  const searchText = `${product.title} ${product.description} ${product.category}`.toLowerCase();
  return COSMETIC_KEYWORDS.some(keyword => searchText.includes(keyword));
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=100`);
    const data = await response.json();
    
    // Filter for cosmetic products
    const cosmeticProducts = data.products.filter(isCosmetic);
    
    // Combine with hardcoded cosmetics
    const allProducts = [...HARDCODED_COSMETICS, ...cosmeticProducts];
    
    return allProducts.slice(0, 20); // Return first 20 products
  } catch (error) {
    console.error('Error fetching products:', error);
    return HARDCODED_COSMETICS; // Fallback to hardcoded products
  }
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    // Check hardcoded products first
    const hardcodedProduct = HARDCODED_COSMETICS.find(p => p.id === id);
    if (hardcodedProduct) {
      return hardcodedProduct;
    }

    const response = await fetch(`${BASE_URL}/products/${id}`);
    const product = await response.json();
    
    if (isCosmetic(product)) {
      return product;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const allProducts = await fetchProducts();
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};