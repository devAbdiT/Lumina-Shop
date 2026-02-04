import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setPage, loadMore } from '../store/slices/productSlice';
import ProductCard from './ProductCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    displayedItems, 
    status, 
    error, 
    totalItems, 
    filteredItems, 
    pagination 
  } = useAppSelector((state) => state.products);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: null,
    rootMargin: '100px',
    threshold: 0.1,
  });

  // Infinite Scroll Trigger
  useEffect(() => {
    if (isIntersecting && pagination.mode === 'infinite-scroll' && status === 'succeeded') {
      dispatch(loadMore());
    }
  }, [isIntersecting, pagination.mode, status, dispatch]);

  const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);

  // --- Render States ---

  if (status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <span className="material-icons text-6xl text-red-300 mb-4">error_outline</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (status === 'loading' && displayedItems.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
        ))}
      </div>
    );
  }

  if (displayedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <span className="material-icons text-6xl text-gray-300 mb-4">search_off</span>
        <h2 className="text-xl font-bold text-gray-700">No products found</h2>
        <p className="text-gray-500">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination.mode === 'pagination' && (
        <div className="flex justify-center mt-8">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => dispatch(setPage(Math.max(1, pagination.currentPage - 1)))}
              disabled={pagination.currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="material-icons">chevron_left</span>
            </button>
            
            {/* Simple Pagination Numbers (simplified for demo) */}
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
               Page {pagination.currentPage} of {totalPages}
            </span>

            <button
              onClick={() => dispatch(setPage(Math.min(totalPages, pagination.currentPage + 1)))}
              disabled={pagination.currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="material-icons">chevron_right</span>
            </button>
          </nav>
        </div>
      )}

      {/* Infinite Scroll Loader */}
      {pagination.mode === 'infinite-scroll' && (
        <div ref={targetRef} className="h-20 flex items-center justify-center">
            {displayedItems.length < filteredItems.length ? (
                 <div className="flex items-center space-x-2 text-brand-600">
                     <span className="material-icons animate-spin">autorenew</span>
                     <span className="text-sm font-medium">Loading more products...</span>
                 </div>
            ) : (
                <span className="text-sm text-gray-400">You've reached the end of the catalog.</span>
            )}
        </div>
      )}
    </div>
  );
};

export default ProductList;