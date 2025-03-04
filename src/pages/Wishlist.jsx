import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Wishlist() {
  const { wishlist, dispatch } = useShop();

  const removeFromWishlist = (id) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: { id } });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div>Your wishlist is empty. <Link to="/shop" className="text-primary">Shop now</Link></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-dark">{item.name}</h2>
                <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                <button onClick={() => removeFromWishlist(item.id)} className="btn btn-secondary mt-4 block text-center">
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}