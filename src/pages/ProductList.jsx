import 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductList() {
  const [search, setSearch] = useSearchParams();
  const { cat } = useParams();
  const { products, categories, cart, wishlist, dispatch, loading, error } = useShop();

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
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  const searchBySubcategory = (event) => {
    event.target.innerText == "All" ?
    setSearch({}) :
    setSearch({ subcategory: event.target.innerText });
  };

  const productsList = products.filter((prod)=> 
    search.get("subcategory") ? prod.subcategory==search.get("subcategory") : prod.category === cat
  );

  const productLabels = {
    "none" : "hidden",
    "Terlaris" : "bg-indigo-500",
    "Terbaru" : "bg-pink-500",
    "Diskon" : "bg-purple-500",
    "Special" : "bg-green-500",
    "Edisi terbatas" : "bg-yellow-500",
    "Series" : "bg-blue-500",
  };


  return (
    <div className="max-w-7xl mx-auto py-8 px-6 sm:px-6 lg:px-8">
      <h1 className="text-lg lg:text-xl font-bold text-dark mb-6">kategori {cat}</h1>
      <Slider {...sliderSettings}>
        <div>
          <button onClick={searchBySubcategory} className="border border-solid border-black rounded px-2 py-1 text-dark hover:bg-secondary hover:border-white hover:text-white">All</button>
        </div>
        {categories.map(category => (
          (category.refference === cat) &&
          <div key={category.id}>
            <button onClick={searchBySubcategory} className="border border-solid border-black rounded px-2 py-1 text-dark hover:bg-secondary hover:border-white hover:text-white">{category.name}</button>
          </div>
        ))}
      </Slider>
      <h1 className="text-lg lg:text-xl font-bold text-dark mb-6 mt-6 lg:mt-4">{cat}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {productsList.map(product => (
          <div key={product.id} className="card">
            <img src={(product.image).split(" ~fitshu~ ")[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className={`${productLabels[product.label]} rounded-br-xl`}>
              <span className="font-semibold text-sm text-white px-2 py-1">{product.label} {product.label_desc}</span>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-dark">{product.name}</h2>
              <div className="flex">
                { (product.label == "Diskon") ?
                <div className="flex gap-2 items-center md:flex-col md:items-start xl:flex-row xl:items-center flex-auto">
                  <p className="text-dark line-through text-xs">Rp {Number(product.price).toLocaleString("id")}</p>
                  <p className="text-primary font-bold">Rp {Number(product.price-product.price*parseInt(product.label_desc)/100).toLocaleString("id")}</p>
                </div>
                  :
                <p className="flex-auto text-primary font-bold">Rp {Number(product.price).toLocaleString("id")}</p>
                }
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