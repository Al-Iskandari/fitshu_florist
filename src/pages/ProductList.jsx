import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function ProductList() {
  const { products, loading, error } = useShop();

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Shop Our Bouquets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-dark">{product.name}</h2>
              <p className="text-primary font-bold">Rp.{Number(product.price).toLocaleString("id")}</p>
              <Link to={`/product/${product.id}`} className="btn btn-primary mt-4 block text-center">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}