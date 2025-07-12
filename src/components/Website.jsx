import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Hero from "./Hero";
import Products from "./Products";
import Footer from "./Footer";
import ProductModal from "./ProductModal";

function Website() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load products from localStorage or use default data
    const savedProducts = localStorage.getItem("kitchenProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Default products
      const defaultProducts = [
        {
          id: 1,
          name: "Professional Chef Knife",
          description:
            "Premium German steel chef's knife with perfect balance and razor-sharp edge. Features a full tang construction and ergonomic handle for professional-grade cutting performance.",
          price: 89.99,
          image:
            "https://images.unsplash.com/photo-1584346134479-8c19f353aef7?w=400&h=400&fit=crop",
          category: "Cutlery",
        },
        {
          id: 2,
          name: "Wüsthof Classic Chef's Knife",
          description:
            "Premium German steel chef's knife with perfect balance and razor-sharp edge. Features a full tang construction and ergonomic handle for professional-grade cutting performance.",
          price: 149.99,
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
          category: "Cutlery",
        },
        {
          id: 3,
          name: "Le Creuset Dutch Oven",
          description:
            "Enameled cast iron Dutch oven with superior heat retention and even cooking. Perfect for braising, stewing, and slow cooking. Available in multiple colors.",
          price: 299.99,
          image:
            "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
          category: "Cookware",
        },
        {
          id: 4,
          name: "KitchenAid Artisan Stand Mixer",
          description:
            "Professional stand mixer with 10-speed motor and multiple attachments. Includes dough hook, flat beater, and wire whip. Perfect for baking and food preparation.",
          price: 379.99,
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
          category: "Appliances",
        },
        {
          id: 5,
          name: "Cuisinart Food Processor",
          description:
            "14-cup food processor with multiple blades for chopping, slicing, shredding, and pureeing. Includes work bowl, lid, and feed tube for versatile food preparation.",
          price: 189.99,
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
          category: "Appliances",
        },
        {
          id: 6,
          name: "OXO Digital Kitchen Scale",
          description:
            "11-pound digital kitchen scale with pull-out display and tare function. Features multiple unit measurements and auto-off function for precise weighing.",
          price: 34.99,
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
          category: "Tools",
        },
        {
          id: 7,
          name: "Silpat Baking Mats Set",
          description:
            "Set of 3 non-stick silicone baking mats that replace parchment paper. Heat resistant up to 480°F and dishwasher safe. Perfect for cookies, pastries, and roasting.",
          price: 29.99,
          image:
            "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
          category: "Baking",
        },
        {
          id: 8,
          name: "All-Clad Stainless Steel Pan Set",
          description:
            "5-piece stainless steel cookware set with aluminum core for even heat distribution. Includes 8-inch and 10-inch fry pans, 2-quart and 3-quart saucepans, and 5-quart Dutch oven.",
          price: 449.99,
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
          category: "Cookware",
        },
        {
          id: 9,
          name: "Microplane Premium Zester",
          description:
            "Premium stainless steel zester with razor-sharp blades for citrus zest, hard cheeses, and chocolate. Ergonomic handle and dishwasher safe design.",
          price: 19.99,
          image:
            "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
          category: "Tools",
        },
        {
          id: 10,
          name: "Breville Smart Oven Air Fryer",
          description:
            "Convection toaster oven with air fryer function. Features 13 cooking functions, digital display, and large capacity. Perfect for roasting, baking, and air frying.",
          price: 399.99,
          image:
            "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop",
          category: "Appliances",
        },
        {
          id: 11,
          name: "Victorinox Paring Knife Set",
          description:
            "Set of 3 high-carbon stainless steel paring knives with ergonomic handles. Perfect for peeling, trimming, and detailed cutting tasks. Dishwasher safe.",
          price: 39.99,
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
          category: "Cutlery",
        },
        {
          id: 12,
          name: "Nordic Ware Bundt Pan",
          description:
            "Classic bundt pan with intricate design for beautiful cakes. Made from heavy-gauge aluminum with non-stick coating. Perfect for pound cakes and coffee cakes.",
          price: 24.99,
          image:
            "https://images.unsplash.com/photo-1584346134479-8c19f353aef7?w=400&h=400&fit=crop",
          category: "Baking",
        },
        {
          id: 13,
          name: "Instant Pot Duo 7-in-1",
          description:
            "7-in-1 electric pressure cooker with slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer functions. 6-quart capacity with 13 one-touch programs.",
          price: 89.99,
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
          category: "Appliances",
        },
      ];
      setProducts(defaultProducts);
      localStorage.setItem("kitchenProducts", JSON.stringify(defaultProducts));
    }
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Products products={products} onProductClick={handleProductClick} />
      <Footer />

      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Website;
