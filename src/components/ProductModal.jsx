import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingCart, Heart, ImageOff } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function ProductModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </motion.button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Product Image */}
                <div className="relative">
                  {imageError ? (
                    <div className="w-full h-96 lg:h-full bg-gray-200 flex flex-col items-center justify-center rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none">
                      <ImageOff className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        Image Unavailable
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Product image could not be loaded
                      </p>
                    </div>
                  ) : (
                    <motion.img
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-96 lg:h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none"
                      onError={handleImageError}
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {product.name}
                      </h2>
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400 fill-current"
                          />
                        ))}
                        <span className="text-gray-600 ml-2">
                          4.8 (128 reviews)
                        </span>
                      </div>
                    </div>

                    <div className="text-3xl font-bold text-orange-500">
                      ${product.price}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Features
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          Premium quality materials
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          Professional grade performance
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          Easy to clean and maintain
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          Warranty included
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          addToCart(product);
                          onClose();
                        }}
                        className="flex-1 bg-orange-500 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add to Cart</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-4 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition-colors"
                      >
                        <Heart className="h-5 w-5" />
                      </motion.button>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Free shipping on orders over $50</span>
                        <span>30-day return policy</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProductModal;
