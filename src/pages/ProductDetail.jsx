import { useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, dispatch } = useShop();
  const product = products.find(p => p.id === id);

  if (!product) return <div>Product not found</div>;

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-96 object-cover" />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold text-dark">{product.name}</h1>
          <p className="text-primary font-bold text-2xl mt-2">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <button onClick={addToCart} className="btn btn-primary mt-6">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}