import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { addItemsToCart } from "../store/slices/cartSlice";
import { toggleWishlist } from "../store/slices/wishlistSlice";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const product = items.find((p) => p.id === Number(id));
  const isInWishlist = product ? wishlistItems.some((item) => item.id === product.id) : false;

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
    setActiveTab("description");
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemsToCart({ product, quantity }));
    }
  };

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => Math.max(1, q - 1));

  if (status === "loading" || status === "idle") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 border-4 border-brand-100 dark:border-midnight-700 border-t-brand-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 dark:text-ice-400 font-medium animate-pulse">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-gray-100 dark:bg-midnight-800 p-6 rounded-full mb-6">
          <span className="material-icons text-6xl text-gray-400 dark:text-ice-500">
            inventory_2
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-ice-100 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-500 dark:text-ice-400 mb-8 max-w-sm">
          The product you are looking for might have been removed or is
          temporarily unavailable.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <span className="material-icons text-sm">arrow_back</span>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 dark:text-ice-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <button
          onClick={() => navigate("/")}
          className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          Home
        </button>
        <span className="material-icons text-base mx-2 text-gray-400 dark:text-midnight-600">
          chevron_right
        </span>
        <span className="capitalize hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer">
          {product.category}
        </span>
        <span className="material-icons text-base mx-2 text-gray-400 dark:text-midnight-600">
          chevron_right
        </span>
        <span className="text-gray-900 dark:text-ice-100 font-medium truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="space-y-6">
          <div
            className="relative bg-white dark:bg-white rounded-3xl p-8 aspect-square flex items-center justify-center shadow-sm border border-gray-100 dark:border-midnight-700 overflow-hidden group cursor-zoom-in"
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
          >
            <img
              src={product.image}
              alt={product.title}
              className={`max-h-[80%] w-auto object-contain transition-transform duration-700 ease-out will-change-transform ${isHoveringImage ? "scale-125" : "scale-100"}`}
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-midnight-900 text-brand-700 dark:text-brand-400 uppercase tracking-wide border border-brand-100 dark:border-midnight-700">
                {product.category}
              </span>
            </div>
          </div>
          {/* Simulated Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl border-2 p-2 flex items-center justify-center cursor-pointer transition-all ${i === 0 ? "border-brand-500 bg-brand-50 dark:bg-midnight-800" : "border-transparent bg-white dark:bg-midnight-900 hover:border-gray-200 dark:hover:border-midnight-600"}`}
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-ice-100 mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-1">
              <span className="material-icons text-yellow-400">star</span>
              <span className="font-bold text-gray-900 dark:text-ice-100 text-lg">
                {product.rating.rate}
              </span>
              <span className="text-gray-400 dark:text-ice-500">
                ({product.rating.count} reviews)
              </span>
            </div>
            <div className="w-px h-6 bg-gray-200 dark:bg-midnight-700"></div>
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
              <span className="material-icons text-sm">check_circle</span>
              In Stock
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-bold text-gray-900 dark:text-ice-50">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-400 dark:text-ice-500 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="ml-2 text-sm font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
              -20%
            </span>
          </div>

          <div className="border-t border-b border-gray-100 dark:border-midnight-700 py-6 mb-8 space-y-4">
            <p className="text-gray-600 dark:text-ice-300 leading-relaxed text-lg">
              {product.description}
            </p>
            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3 text-gray-700 dark:text-ice-200">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <span className="material-icons text-xl">local_shipping</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">Free Shipping</span>
                  <span className="text-xs text-gray-500 dark:text-ice-500">
                    On orders over $50
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-ice-200">
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <span className="material-icons text-xl">verified_user</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm">2 Year Warranty</span>
                  <span className="text-xs text-gray-500 dark:text-ice-500">Full coverage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Quantity Selector */}
            <div className="flex items-center border-2 border-gray-200 dark:border-midnight-600 rounded-xl p-1 w-max">
              <button
                onClick={decrementQty}
                disabled={quantity <= 1}
                className="w-12 h-12 flex items-center justify-center text-gray-500 dark:text-ice-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-midnight-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <span className="material-icons">remove</span>
              </button>
              <input
                type="text"
                readOnly
                value={quantity}
                className="w-12 text-center font-bold text-lg bg-transparent border-none focus:ring-0 text-gray-900 dark:text-ice-100"
              />
              <button
                onClick={incrementQty}
                className="w-12 h-12 flex items-center justify-center text-gray-500 dark:text-ice-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-100 dark:hover:bg-midnight-700 rounded-lg transition-colors"
              >
                <span className="material-icons">add</span>
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 active:shadow-none flex items-center justify-center gap-3"
            >
              <span className="material-icons">shopping_basket</span>
              Add to Cart
            </button>

            <button
              onClick={() => product && dispatch(toggleWishlist(product))}
              className={`p-4 rounded-xl border-2 transition-colors ${
                isInWishlist
                  ? "border-red-100 bg-red-50 text-red-500 dark:border-red-900/30 dark:bg-red-900/10"
                  : "border-gray-200 dark:border-midnight-600 text-gray-400 dark:text-ice-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50"
              }`}
            >
              <span className="material-icons">
                {isInWishlist ? "favorite" : "favorite_border"}
              </span>
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-auto">
            <div className="flex border-b border-gray-200 dark:border-midnight-700">
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-4 px-4 text-sm font-bold uppercase tracking-wide transition-colors relative ${activeTab === "description" ? "text-brand-600 dark:text-brand-400" : "text-gray-400 hover:text-gray-600 dark:hover:text-ice-300"}`}
              >
                Description
                {activeTab === "description" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 dark:bg-brand-400"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 px-4 text-sm font-bold uppercase tracking-wide transition-colors relative ${activeTab === "reviews" ? "text-brand-600 dark:text-brand-400" : "text-gray-400 hover:text-gray-600 dark:hover:text-ice-300"}`}
              >
                Reviews ({product.rating.count})
                {activeTab === "reviews" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 dark:bg-brand-400"></span>
                )}
              </button>
            </div>
            <div className="py-6 animate-fade-in">
              {activeTab === "description" ? (
                <div className="prose prose-sm text-gray-600 dark:text-ice-300 dark:prose-invert max-w-none">
                  <p>{product.description}</p>
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-1">
                    <li>Premium quality materials</li>
                    <li>Designed for durability and comfort</li>
                    <li>Easy to clean and maintain</li>
                    <li>Environmentally friendly manufacturing</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Mock Review */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-midnight-700 flex items-center justify-center font-bold text-gray-500 dark:text-ice-400">
                      JD
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 dark:text-ice-100">
                          John Doe
                        </span>
                        <div className="flex text-yellow-400 text-xs">
                          <span className="material-icons text-sm">star</span>
                          <span className="material-icons text-sm">star</span>
                          <span className="material-icons text-sm">star</span>
                          <span className="material-icons text-sm">star</span>
                          <span className="material-icons text-sm">star</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-ice-400 text-sm">
                        Absolutely love this product! The quality is outstanding
                        and it arrived much faster than expected.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-midnight-700 flex items-center justify-center font-bold text-gray-500 dark:text-ice-400">
                      AS
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 dark:text-ice-100">
                          Alice Smith
                        </span>
                        <div className="flex text-yellow-400 text-xs">
                          <span className="material-icons text-sm">star</span>
                          <span className="material-icons text-sm">star</span>
                          <span className="material-icons text-sm">star</span>
                          <span className="material-icons text-sm">
                            star_half
                          </span>
                          <span className="material-icons text-sm text-gray-300 dark:text-midnight-600">
                            star
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-ice-400 text-sm">
                        Great value for money. Would recommend to friends.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
