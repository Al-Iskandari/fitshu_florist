import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { ShoppingCartIcon, HeartIcon, UserIcon, Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { cart, wishlist } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="w-12 h-12 -mr-4 mt-0 md:-mt-3" width="100px" height="100px" src="/fitshuflorist-logo.png" />
              <span className="text-2xl hidden md:block font-bold text-primary">Fitshu</span>
              <span className="text-2xl hidden md:block font-light text-dark">Florist</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-dark hover:text-primary px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/shop/bouquet" className="text-dark hover:text-primary px-3 py-2 text-sm font-medium">
              Bouquets
            </Link>
            <Link to="/shop/hamper" className="text-dark hover:text-primary px-3 py-2 text-sm font-medium">
              Hampers
            </Link>
            <Link to="/shop/hantaran" className="text-dark hover:text-primary px-3 py-2 text-sm font-medium">
              Hantaran
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-dark hover:text-primary p-1 relative">
              <HeartIcon className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="text-dark hover:text-primary p-1 relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-dark hover:text-primary p-1">
              <UserIcon className="h-6 w-6" />
            </Link>
            
            {/* Mobile menu button */}
            <button 
              type="button" 
              className="md:hidden bg-white p-1 rounded-md text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars2Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop/bouquet"
              className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Bouquets
            </Link>
            <Link 
              to="/shop/hamper"
              className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Hampers
            </Link>
            <Link 
              to="/shop/hantaran"
              className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Hantaran
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}