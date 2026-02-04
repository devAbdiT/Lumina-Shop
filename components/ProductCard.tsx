import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useAppDispatch } from '../store';
import { addToCart } from '../store/slices/cartSlice';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking 'Add to Cart'
    dispatch(addToCart(product));
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-white p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm">
           {product.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-brand-600 transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-3">
            <span className="text-yellow-400 material-icons text-sm">star</span>
            <span className="ml-1 text-xs text-gray-500 font-medium">{product.rating.rate} ({product.rating.count})</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-1 shadow-sm hover:shadow-md z-10"
          >
            <span className="material-icons text-sm">add_shopping_cart</span>
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;