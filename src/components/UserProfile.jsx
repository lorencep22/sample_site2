import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Package, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function UserProfile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // Load orders from localStorage (in a real app, this would come from a database)
    const savedOrders = localStorage.getItem(`orders_${user?.uid}`);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [user]);

  const mockOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 299.99,
      items: [
        { name: "Professional Chef Knife", quantity: 1, price: 89.99 },
        { name: "Cast Iron Skillet", quantity: 1, price: 45.99 },
        { name: "Stand Mixer", quantity: 1, price: 299.99 },
      ],
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 154.98,
      items: [
        { name: "Food Processor", quantity: 1, price: 129.99 },
        { name: "Digital Kitchen Scale", quantity: 1, price: 24.99 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {user?.displayName || "User"}
                </h1>
                <p className="text-orange-100">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Order History
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-semibold">
                          {user?.displayName || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-semibold">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-semibold">
                          {user?.metadata?.creationTime
                            ? new Date(
                                user.metadata.creationTime
                              ).toLocaleDateString()
                            : "Unknown"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">Total Orders</p>
                        <p className="font-semibold">{mockOrders.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Account Actions
                  </h3>
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Edit Profile
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Change Password
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order History
                </h2>

                {mockOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No orders yet
                    </h3>
                    <p className="text-gray-500">
                      Start shopping to see your order history here!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              Order {order.id}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Placed on{" "}
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {order.status}
                            </span>
                            <p className="text-lg font-bold text-orange-500 mt-1">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600">
                                {item.name} x {item.quantity}
                              </span>
                              <span className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t mt-4 pt-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-orange-500 hover:text-orange-600 font-semibold text-sm"
                          >
                            View Order Details
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserProfile;
