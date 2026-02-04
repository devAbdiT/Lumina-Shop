import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { addToCart, decreaseQuantity, removeFromCart } from '../store/slices/cartSlice';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Estimated 8% tax
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-up">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <span className="material-icons text-6xl text-gray-400">shopping_cart</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-brand-500/30 flex items-center gap-2"
        >
          <span className="material-icons">arrow_back</span>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <span className="material-icons text-brand-600 text-4xl">shopping_bag</span>
        Shopping Cart <span className="text-lg text-gray-400 font-normal">({cartItems.length} items)</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
              {/* Image */}
              <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg p-2 flex items-center justify-center border border-gray-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 pr-4">{item.title}</h3>
                    <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                    >
                        <span className="material-icons">delete_outline</span>
                    </button>
                </div>
                <p className="text-gray-500 text-sm mb-3 capitalize">{item.category}</p>
                
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                    <button 
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="p-2 hover:bg-gray-100 text-gray-600 transition-colors rounded-l-lg"
                    >
                      <span className="material-icons text-sm">remove</span>
                    </button>
                    <span className="w-10 text-center font-bold text-gray-800">{item.quantity}</span>
                    <button 
                      onClick={() => dispatch(addToCart(item))}
                      className="p-2 hover:bg-gray-100 text-gray-600 transition-colors rounded-r-lg"
                    >
                      <span className="material-icons text-sm">add</span>
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Total</div>
                    <div className="text-xl font-bold text-brand-700">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-gray-900 font-bold">Total</span>
                <span className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={() => alert('Checkout functionality coming soon!')}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 active:shadow-none flex justify-center items-center gap-2"
            >
              Checkout
              <span className="material-icons">arrow_forward</span>
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm">
                <span className="material-icons text-base">lock</span>
                Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;