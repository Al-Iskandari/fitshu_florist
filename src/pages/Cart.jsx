import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Cart() {
  const { cart, dispatch } = useShop();

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div>Your cart is empty. <Link to="/shop" className="text-primary">Shop now</Link></div>
      ) : (
        <div>
          <ul>
            {cart.map(item => (
              <li key={item.id} className="flex justify-between items-center py-4 border-b">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-dark">{item.name}</h2>
                    <p className="text-primary">Rp {Number(item.price).toLocaleString("id")}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="input w-16"
                  />
                  <button onClick={() => removeFromCart(item.id)} className="btn btn-secondary ml-4">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <p className="text-xl font-bold mb-2">Total: Rp {total.toLocaleString("id")}</p>
            <Link to="/checkout" className="btn btn-primary mt-4">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}