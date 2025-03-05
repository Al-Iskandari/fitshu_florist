import axios from 'axios';

const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
const PRODUCTS_SHEET_ID = import.meta.env.VITE_PRODUCTS_SHEET_ID;
const TRANSACTIONS_SHEET_ID = import.meta.env.VITE_TRANSACTIONS_SHEET_ID;

// This is a simplified example. In a real application, you would need to set up
// a proper backend service to handle Google Sheets API authentication and requests.

export async function fetchProducts() {
  try {
    // In a real application, you would make a request to your backend API
    // which would then fetch data from Google Sheets
    const response = await axios.get(PRODUCTS_SHEET_ID).then((response)=>{
      return parseCSV(response.data);
    });

    console.log(response);
    
    // For demonstration purposes, let's assume the API returns data in this format
    return response.map(product => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      description: product.description,
      image: product.image,
      category: product.category,
      stock: parseInt(product.stock, 10),
      featured: product.featured === 'TRUE',
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // For development purposes, return mock data if API fails
    return mockProducts;
  }
}

function parseCSV(csvText) {
  const rows = csvText.split(/\r?\n/);        // Use a regular expression to split the CSV text into rows while handling '\r'
  const headers = rows[0].split(',');        // Extract headers (assumes the first row is the header row)
  const data = [];        // Initialize an array to store the parsed data
  for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(',');          // Use the regular expression to split the row while handling '\r'
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
          rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
  }
  return data;
}

export async function saveTransaction(transaction) {
  try {
    // In a real application, you would make a POST request to your backend API
    // which would then save the data to Google Sheets
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return response.data;
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  }
}

// Mock data for development purposes
const mockProducts = [
  {
    id: '1',
    name: 'Elegant Rose Bouquet',
    price: 49.99,
    description: 'A beautiful arrangement of fresh red roses, perfect for romantic occasions.',
    image: 'https://images.unsplash.com/photo-1561181286-d5c73431dabd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Roses',
    stock: 15,
    featured: true,
  },
  {
    id: '2',
    name: 'Spring Mix Bouquet',
    price: 39.99,
    description: 'A colorful mix of seasonal spring flowers that brings joy to any space.',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Mixed',
    stock: 10,
    featured: true,
  },
  {
    id: '3',
    name: 'Sunflower Delight',
    price: 34.99,
    description: 'Bright and cheerful sunflowers arranged to brighten anyone\'s day.',
    image: 'https://images.unsplash.com/photo-1543157145-f78c636d023d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Sunflowers',
    stock: 8,
    featured: false,
  },
  {
    id: '4',
    name: 'Lavender Dreams',
    price: 44.99,
    description: 'Fragrant lavender bouquet that brings calm and relaxation.',
    image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Lavender',
    stock: 12,
    featured: false,
  },
  {
    id: '5',
    name: 'Orchid Elegance',
    price: 59.99,
    description: 'Exotic orchids arranged in a modern, elegant design.',
    image: 'https://images.unsplash.com/photo-1566835106909-e85bb9c2d0f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Orchids',
    stock: 5,
    featured: true,
  },
  {
    id: '6',
    name: 'Tulip Festival',
    price: 29.99,
    description: 'A vibrant arrangement of colorful tulips to celebrate spring.',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Tulips',
    stock: 20,
    featured: false,
  },
];