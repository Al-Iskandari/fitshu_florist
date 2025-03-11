import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/product/:id" element={<ProductDetail/>} />
              <Route path="/shop/:cat" element={<ProductList/>} />
              <Route path="/shop/:cat" element={<ProductList/>} />
              <Route path="/shop/:cat" element={<ProductList/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist/>} />
              <Route path="/transactions" element={<TransactionHistory/>} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </Router>
    </ShopProvider>
  );
}

export default App;