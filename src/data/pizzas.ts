export interface Pizza {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'classic' | 'premium' | 'vegetarian' | 'spicy';
    ingredients: string[];
    rating: number;
    reviews: number;
    isPopular?: boolean;
    calories: number;
  }
  
  export const PIZZAS: Pizza[] = [
    {
      id: '1',
      name: 'Margherita Classica',
      description: 'San Marzano tomatoes, fresh mozzarella di bufala, basil, olive oil',
      price: 42,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600',
      category: 'classic',
      ingredients: ['San Marzano tomatoes', 'Buffalo mozzarella', 'Fresh basil', 'Olive oil'],
      rating: 4.8, reviews: 312, isPopular: true, calories: 720,
    },
    {
      id: '2',
      name: 'Diavola',
      description: 'Spicy salami, tomato sauce, fior di latte, chili, oregano',
      price: 52,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600',
      category: 'spicy',
      ingredients: ['Spicy salami', 'Tomato sauce', 'Fior di latte', 'Chili', 'Oregano'],
      rating: 4.7, reviews: 198, isPopular: true, calories: 890,
    },
    {
      id: '3',
      name: 'Quattro Stagioni',
      description: 'Ham, mushrooms, artichokes, olives, mozzarella',
      price: 56,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
      category: 'classic',
      ingredients: ['Ham', 'Mushrooms', 'Artichokes', 'Olives', 'Mozzarella'],
      rating: 4.6, reviews: 145, calories: 810,
    },
    {
      id: '4',
      name: 'Tartufo Nero',
      description: 'Black truffle cream, wild mushrooms, taleggio, thyme',
      price: 89,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
      category: 'premium',
      ingredients: ['Black truffle', 'Wild mushrooms', 'Taleggio', 'Thyme'],
      rating: 4.9, reviews: 87, isPopular: true, calories: 760,
    },
    {
      id: '5',
      name: 'Primavera',
      description: 'Grilled zucchini, cherry tomatoes, bell peppers, goat cheese, pesto',
      price: 48,
      image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600',
      category: 'vegetarian',
      ingredients: ['Zucchini', 'Cherry tomatoes', 'Bell peppers', 'Goat cheese', 'Pesto'],
      rating: 4.5, reviews: 203, calories: 650,
    },
    {
      id: '6',
      name: "Nduja & Honey",
      description: 'Spicy nduja, ricotta, wild honey, arugula, lemon zest',
      price: 64,
      image: 'https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?w=600',
      category: 'premium',
      ingredients: ['Nduja', 'Ricotta', 'Wild honey', 'Arugula', 'Lemon'],
      rating: 4.8, reviews: 112, calories: 830,
    },
  ];
  
  export const CATEGORIES = ['all', 'classic', 'premium', 'vegetarian', 'spicy'] as const;