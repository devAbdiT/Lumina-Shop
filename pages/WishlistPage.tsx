import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { clearWishlist } from '../store/slices/wishlistSlice';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-up">
        <div className="bg-gray-100 dark:bg-midnight-800 p-6 rounded-full mb-6">
          <span className="material-icons text-6xl text-gray-400 dark:text-ice-500">
            favorite_border
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-ice-100 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 dark:text-ice-400 mb-8 max-w-md">
          Save items you love here to find them easily later. Explore our shop and start hearting!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-brand-500/30 flex items-center gap-2"
        >
          <span className="material-icons">arrow_back</span>
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-ice-100 flex items-center gap-3">
          <span className="material-icons text-red-500 text-4xl">
            favorite
          </span>
          My Wishlist{" "}
          <span className="text-lg text-gray-400 dark:text-ice-400 font-normal">
            ({items.length} items)
          </span>
        </h1>
        <button
          onClick={() => dispatch(clearWishlist())}
          className="text-gray-500 hover:text-red-500 dark:text-ice-400 dark:hover:text-red-400 flex items-center gap-1 transition-colors text-sm font-medium"
        >
          <span className="material-icons text-base">delete_sweep</span>
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
