import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchSliderImages } from '../services/googleSheetsService';

export default function Home() {
  const { products, cart, wishlist, sliderImages, dispatch, loading, error } = useShop();

  useEffect(() => {
    async function loadSliderImages() {
      try {
        const images = await fetchSliderImages();
        dispatch({ type: 'SET_SLIDER_IMAGES', payload: images });
      } catch (error) {
        console.error('Failed to load slider images:', error);
      }
    }
    loadSliderImages();
  }, [dispatch]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  const addToCart = (id) => {
    const product = products.find((item) => item.id === id);
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const toggleWishlist = (id) => {
    const product = products.find((item) => item.id === id);
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  function CustomNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, 
          right: "12px", 
          filter: "drop-shadow(2px 4px 6px black)" }}
        onClick={onClick}
      />
    );
  }
  
  function CustomPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style,
          zIndex:"10", 
          left: "-12px",  
          filter:"drop-shadow(2px 4px 6px black)" }}
        onClick={onClick}
      />
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: false,
    prevArrow: false,
  };

  const HampersSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-6 sm:px-6 lg:px-8">
      <Slider {...sliderSettings}>
        {sliderImages.map(image => (
          <div key={image.id}>
            <img src={image.imageUrl} alt={`Promotion ${image.id}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </Slider>
      <h1 className="text-xl lg:text-2xl font-bold text-dark mb-6 mt-6 lg:mt-4">Bouquets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {products.map(product => (
          (product.category==="bouquet") &&
          <div key={`bouquet-${product.id} `} className="card">
            <img src={(product.image).split(" ~fitshu~ ")[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-dark">{product.name}</h2>
              <div className="flex">
                <p className="flex-auto text-primary font-bold">Rp {Number(product.price).toLocaleString("id")}</p>
                <button onClick={() => toggleWishlist(product.id)} className="btn-sm ml-4">
                  <HeartIcon className={`h-6 w-6 hover:text-primary ${wishlist.find((item) => item.id === product.id) ? "text-primary" : ""}`} />
                </button>
                <button onClick={() => addToCart(product.id)} className="btn-sm ml-4">
                  <ShoppingCartIcon className={`h-6 w-6 hover:text-primary ${cart.find((item) => item.id === product.id) ? "text-primary" : ""}`} />
                </button>
              </div>
              <Link to={`/product/${product.id}`} className="btn btn-primary mt-4 block text-center">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="-ml-8 -mr-6 pl-8 py-4 bg-gray-200 rounded-s-lg">
        <h1 className="text-xl lg:text-2xl font-bold text-dark mb-6 mt-6 lg:mt-8">Hampers</h1>
        <Slider {...HampersSettings}>
          {products.map(product => (
          (product.category==="hamper") &&
          <div className="pr-6">
            <div key={`hamper-${product.id}`} className="card">
              <img src={(product.image).split(" ~fitshu~ ")[0]} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-dark">{product.name}</h2>
                <div className="flex">
                  <p className="flex-auto text-primary font-bold">Rp {Number(product.price).toLocaleString("id")}</p>
                  <button onClick={() => toggleWishlist(product.id)} className="btn-sm ml-4">
                    <HeartIcon className={`h-6 w-6 hover:text-primary ${wishlist.find((item) => item.id === product.id) ? "text-primary" : ""}`} />
                  </button>
                  <button onClick={() => addToCart(product.id)} className="btn-sm ml-4">
                    <ShoppingCartIcon className={`h-6 w-6 hover:text-primary ${cart.find((item) => item.id === product.id) ? "text-primary" : ""}`} />
                  </button>
                </div>
                <Link to={`/product/${product.id}`} className="btn btn-primary mt-4 block text-center">
                  View Details
                </Link>
              </div>
            </div>
          </div>
          ))}
        </Slider>
      </div>
      <h1 className="text-xl lg:text-2xl font-bold text-dark mb-6 mt-6 lg:mt-8">Hantaran</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          (product.category==="hantaran") &&
          <div key={`hantaran-${product.id}`} className="card">
            <img src={(product.image).split(" ~fitshu~ ")[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-dark">{product.name}</h2>
              <div className="flex">
                <p className="flex-auto text-primary font-bold">Rp {Number(product.price).toLocaleString("id")}</p>
                <button onClick={() => toggleWishlist(product.id)} className="btn-sm ml-4">
                  <HeartIcon className={`h-6 w-6 hover:text-primary ${wishlist.find((item) => item.id === product.id) ? "text-primary" : ""}`} />
                </button>
                <button onClick={() => addToCart(product.id)} className="btn-sm ml-4">
                  <ShoppingCartIcon className={`h-6 w-6 hover:text-primary ${cart.find((item) => item.id === product.id) ? "text-primary" : ""}`} />
                </button>
              </div>
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