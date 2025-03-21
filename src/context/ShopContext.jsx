import { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../services/googleSheetsService';
import toast from 'react-hot-toast';

const ShopContext = createContext();

// Helper functions for localStorage
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return null;
  }
};

const initialState = {
  products: [],
  categories: [],
  cart: [],
  wishlist: [],
  transactions: [],
  sliderImages: [
    { id: '1', imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-spring-sale-horizontal-banner_23-2149269388.jpg?t=st=1741217462~exp=1741221062~hmac=c2e7ad11167f319eed57728c4de2cd9c305d8f7eb1ff5afe9d63665484ac6f3a&w=826' },
    { id: '2', imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-spring-sale-horizontal-banner_23-2149269387.jpg?t=st=1741217563~exp=1741221163~hmac=27367658ecd859902659c4e415e70ec4adc21b288f81672459c0d59bccca60cd&w=826' },
    { id: '3', imageUrl: 'https://img.freepik.com/premium-vector/spring-sale-coupon-template-banner-vector-design-pink-cherry-blossom-background_94250-832.jpg?w=826' },
  ],
  loading: false,
  error: null,
};

function shopReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item => 
            item.id === action.payload.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
    case 'TOGGLE_WISHLIST': {
      const existingItem = state.wishlist.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          wishlist: state.wishlist.filter(item => item.id !== action.payload.id)
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, action.payload]
        };
      }
    }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        cart: [] // Clear cart after successful transaction
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_SLIDER_IMAGES':
      return { ...state, sliderImages: action.payload };

    case 'ADD_SLIDER_IMAGE':
      return { ...state, sliderImages: [...state.sliderImages, action.payload] };

    case 'REMOVE_SLIDER_IMAGE':
      return { ...state, sliderImages: state.sliderImages.filter(image => image.id !== action.payload) }; 
    default:
      return state;
  }
}

export function ShopProvider({ children }) {
  // Initialize state with data from localStorage if available
  const persistedCart = loadFromLocalStorage('flowerShopCart') || [];
  const persistedWishlist = loadFromLocalStorage('flowerShopWishlist') || [];
  const persistedTransactions = loadFromLocalStorage('flowerShopTransactions') || [];
  
  const initialStateWithPersistedData = {
    ...initialState,
    cart: persistedCart,
    wishlist: persistedWishlist,
    transactions: persistedTransactions
  };
  const [state, dispatch] = useReducer(shopReducer, initialStateWithPersistedData);

  useEffect(() => {
    const loadProductsAndCategories = async () => {
      try {
        const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
        dispatch({ type: 'SET_PRODUCTS', payload: products });
        dispatch({ type: 'SET_CATEGORIES', payload: categories });
      } catch (error) {
        console.error('Failed to fetch data:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load data. Please try again later.' });
        toast.error('Failed to load data');
      }
    };

    loadProductsAndCategories();
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    saveToLocalStorage('flowerShopCart', state.cart);
  }, [state.cart]);
  
  // Save wishlist to localStorage when it changes
  useEffect(() => {
    saveToLocalStorage('flowerShopWishlist', state.wishlist);
  }, [state.wishlist]);
  
  // Save transactions to localStorage when they change
  useEffect(() => {
    saveToLocalStorage('flowerShopTransactions', state.transactions);
  }, [state.transactions]);

  const value = {
    ...state,
    dispatch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}