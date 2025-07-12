import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  FileText,
  Settings,
  Home,
  Package,
  Users,
  BarChart3,
} from "lucide-react";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [websiteContent, setWebsiteContent] = useState({
    hero: {
      title: "Transform Your Kitchen Experience",
      subtitle: "Premium Kitchen Equipment",
      description:
        "Discover our collection of premium kitchen equipment designed to elevate your cooking experience. From professional-grade knives to innovative appliances.",
    },
    about: {
      title: "About KitchenCraft",
      description:
        "We are passionate about providing the highest quality kitchen equipment to both professional chefs and home cooks. Our products are designed with innovation, durability, and performance in mind.",
    },
    contact: {
      title: "Contact Us",
      description:
        "Get in touch with us for any questions about our products or services.",
    },
  });
  const [editingContent, setEditingContent] = useState(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem("kitchenProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    const savedContent = localStorage.getItem("websiteContent");
    if (savedContent) {
      setWebsiteContent(JSON.parse(savedContent));
    }
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("kitchenProducts", JSON.stringify(newProducts));
  };

  const saveContent = (newContent) => {
    setWebsiteContent(newContent);
    localStorage.setItem("websiteContent", JSON.stringify(newContent));
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };
    const newProducts = [...products, newProduct];
    saveProducts(newProducts);
    setIsAddingProduct(false);
  };

  const updateProduct = (id, updatedProduct) => {
    const newProducts = products.map((p) =>
      p.id === id ? { ...p, ...updatedProduct } : p
    );
    saveProducts(newProducts);
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    const newProducts = products.filter((p) => p.id !== id);
    saveProducts(newProducts);
  };

  const updateContent = (section, field, value) => {
    const newContent = {
      ...websiteContent,
      [section]: {
        ...websiteContent[section],
        [field]: value,
      },
    };
    saveContent(newContent);
  };

  const tabs = [
    { id: "products", name: "Products", icon: Package },
    { id: "content", name: "Content", icon: FileText },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "users", name: "Users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
              >
                <Home className="h-5 w-5" />
                <span>Back to Website</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-gray-800">
                Admin Dashboard
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        {activeTab === "products" && (
          <ProductsTab
            products={products}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            isAddingProduct={isAddingProduct}
            setIsAddingProduct={setIsAddingProduct}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
          />
        )}

        {activeTab === "content" && (
          <ContentTab
            websiteContent={websiteContent}
            onUpdateContent={updateContent}
            editingContent={editingContent}
            setEditingContent={setEditingContent}
          />
        )}

        {activeTab === "analytics" && <AnalyticsTab />}

        {activeTab === "users" && <UsersTab />}
      </div>
    </div>
  );
}

// Products Tab Component
function ProductsTab({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  isAddingProduct,
  setIsAddingProduct,
  editingProduct,
  setEditingProduct,
}) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      ...newProduct,
      price: parseFloat(newProduct.price),
    });
    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingProduct(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </motion.button>
      </div>

      {/* Add Product Form */}
      {isAddingProduct && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 w-full h-24 focus:ring-2 focus:ring-orange-500"
              required
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setIsAddingProduct(false)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-lg object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.description.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingProduct(product)}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        <Edit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// Content Tab Component
function ContentTab({
  websiteContent,
  onUpdateContent,
  editingContent,
  setEditingContent,
}) {
  const contentSections = [
    { id: "hero", name: "Hero Section", icon: Home },
    { id: "about", name: "About Section", icon: FileText },
    { id: "contact", name: "Contact Section", icon: Settings },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentSections.map((section) => (
          <motion.div
            key={section.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-sm cursor-pointer"
            onClick={() => setEditingContent(section.id)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <section.icon className="h-6 w-6 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                {section.name}
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Title:</strong>{" "}
                {websiteContent[section.id]?.title || "Not set"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Description:</strong>{" "}
                {websiteContent[section.id]?.description?.substring(0, 50)}...
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Content Modal */}
      {editingContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setEditingContent(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Edit{" "}
                {contentSections.find((s) => s.id === editingContent)?.name}
              </h3>
              <button
                onClick={() => setEditingContent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={websiteContent[editingContent]?.title || ""}
                  onChange={(e) =>
                    onUpdateContent(editingContent, "title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {editingContent === "hero" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={websiteContent[editingContent]?.subtitle || ""}
                    onChange={(e) =>
                      onUpdateContent(
                        editingContent,
                        "subtitle",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={websiteContent[editingContent]?.description || ""}
                  onChange={(e) =>
                    onUpdateContent(
                      editingContent,
                      "description",
                      e.target.value
                    )
                  }
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Analytics Tab Component
function AnalyticsTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">Analytics dashboard coming soon...</p>
      </div>
    </motion.div>
  );
}

// Users Tab Component
function UsersTab() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">User management features coming soon...</p>
      </div>
    </motion.div>
  );
}

export default AdminDashboard;
