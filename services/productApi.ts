import { Product } from '../types';

// We duplicate data to simulate a larger database for better pagination/scroll demo
const DUPLICATION_FACTOR = 5; 

export const fetchProductsFromApi = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data: Product[] = await response.json();
    
    // Artificially expand the dataset for demonstration purposes
    let expandedData: Product[] = [];
    for (let i = 0; i < DUPLICATION_FACTOR; i++) {
      const batch = data.map(p => ({
        ...p,
        id: p.id + (i * 1000), // Ensure unique IDs
        title: i > 0 ? `${p.title} (Var. ${i})` : p.title
      }));
      expandedData = [...expandedData, ...batch];
    }
    
    return expandedData;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchCategoriesFromApi = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};