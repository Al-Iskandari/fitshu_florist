import { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchProducts } from '../services/googleSheetsService';
import toast from 'react-hot-toast';

const ShopContext = createContext();

const initialState = {
  products: [],
  cart: [],
  wishlist: [],
  transactions: [],
  loading: true,
  error: null,
};

function shopReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
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
    default:
      return state;
  }
}

export function ShopProvider({ children }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        dispatch({ type: 'SET_PRODUCTS', payload: products });
      } catch (error) {
        console.error('Failed to fetch products:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load products. Please try again later.' });
        toast.error('Failed to load products');
      }
    };

    loadProducts();
  }, []);

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('flowerShopCart');
    const savedWishlist = localStorage.getItem('flowerShopWishlist');
    const savedTransactions = localStorage.getItem('flowerShopTransactions');
    
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
    
    if (savedWishlist) {
      dispatch({ type: 'SET_WISHLIST', payload: JSON.parse(savedWishlist) });
    }
    
    if (savedTransactions) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: JSON.parse(savedTransactions) });
    }
  }, []);

  // Save cart and wishlist to localStorage when they change
  useEffect(() => {
    localStorage.setItem('flowerShopCart', JSON.stringify(state.cart));
  }, [state.cart]);
  
  useEffect(() => {
    localStorage.setItem('flowerShopWishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);
  
  useEffect(() => {
    localStorage.setItem('flowerShopTransactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  const value = {
    ...state,
    dispatch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}