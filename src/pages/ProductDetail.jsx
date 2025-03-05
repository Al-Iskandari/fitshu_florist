import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, dispatch } = useShop();
  const product = products.find(p => p.id === id);

  if (!product) return <div>Product not found</div>;

  const productImages = (product.image).split(" ~fitshu~ ");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  
  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={selectedImage}
            alt={`${product.name} main view`}
            className="w-full h-96 object-cover"
          />
          <div className="flex flex-wrap mt-4">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-1/4 h-24 object-cover cursor-pointer"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold text-dark">{product.name}</h1>
          <p className="text-primary font-bold text-2xl mt-2">Rp {Number(product.price).toLocaleString("id")}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <button onClick={addToCart} className="btn btn-primary mt-6">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}