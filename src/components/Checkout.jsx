import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, CreditCard, Truck, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Checkout({ isOpen, onClose, onBack }) {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would integrate with Stripe or other payment processor
      console.log("Processing payment:", { shippingInfo, paymentInfo, items });

      setOrderComplete(true);
      clearCart();
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => getCartTotal();
  const calculateShipping = () => 9.99;
  const calculateTax = () => calculateSubtotal() * 0.08;
  const calculateTotal = () =>
    calculateSubtotal() + calculateShipping() + calculateTax();

  if (orderComplete) {
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
              className="bg-white rounded-2xl max-w-md w-full p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Order Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. You will receive a confirmation
                email shortly.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

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
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="h-6 w-6" />
                </motion.button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
                  <div className="flex space-x-2 mt-1">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        step >= 1 ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`w-3 h-3 rounded-full ${
                        step >= 2 ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    />
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            <div className="flex">
              {/* Main Content */}
              <div className="flex-1 p-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3">
                      <Truck className="h-6 w-6 text-orange-500" />
                      <h3 className="text-xl font-semibold">
                        Shipping Information
                      </h3>
                    </div>

                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={shippingInfo.firstName}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              firstName: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={shippingInfo.lastName}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              lastName: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>

                      <input
                        type="email"
                        placeholder="Email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 w-full"
                        required
                      />

                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 w-full"
                        required
                      />

                      <input
                        type="text"
                        placeholder="Address"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 w-full"
                        required
                      />

                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              city: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                          required
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={shippingInfo.state}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              state: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                          required
                        />
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          value={shippingInfo.zipCode}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              zipCode: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
                      >
                        Continue to Payment
                      </motion.button>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-orange-500" />
                      <h3 className="text-xl font-semibold">
                        Payment Information
                      </h3>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={paymentInfo.cardholderName}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardholderName: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 w-full"
                        required
                      />

                      <input
                        type="text"
                        placeholder="Card Number"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 w-full"
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              expiryDate: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                          required
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cvv: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50"
                      >
                        {loading
                          ? "Processing..."
                          : `Pay $${calculateTotal().toFixed(2)}`}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </div>

              {/* Order Summary */}
              <div className="w-80 bg-gray-50 p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-sm font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${calculateShipping().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-orange-500">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Checkout;
