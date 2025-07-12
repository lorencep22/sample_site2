# 🍳 KitchenCraft - Full E-Commerce Website

A modern, fully functional e-commerce website for kitchen equipment with beautiful animations, user authentication, shopping cart, and admin dashboard.

## ✨ Features

### 🛍️ E-Commerce Features

- **Product Catalog** - Browse kitchen equipment with filtering and sorting
- **Shopping Cart** - Add/remove items, update quantities, persistent cart
- **User Authentication** - Sign up, login, logout with Firebase Auth
- **Checkout Process** - Multi-step checkout with shipping and payment forms
- **Order Management** - Order history and tracking
- **Product Details** - Detailed product modals with images and descriptions

### 🎨 Design & UX

- **Smooth Animations** - Framer Motion powered animations throughout
- **Responsive Design** - Works perfectly on all devices
- **Modern UI** - Clean, professional design with orange theme
- **Interactive Elements** - Hover effects, loading states, toast notifications

### 🔧 Admin Features

- **Product Management** - Add, edit, delete products
- **Content Management** - Edit website text content
- **Inventory Control** - Manage product categories and pricing
- **Analytics Dashboard** - Sales and user analytics (placeholder)

### 🛠️ Technical Features

- **React 19** - Latest React with modern hooks
- **Firebase Integration** - Authentication and database
- **Context API** - State management for cart and auth
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Local Storage** - Persistent data storage
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Clear cache and rebuild
npm run build -- --force
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-project2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase** (Optional for full functionality)

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Get your Firebase config and update `src/firebase/config.js`

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Main website: `http://localhost:5173/` or `http://localhost:5174/`
   - Admin dashboard: `http://localhost:5173/admin` or `http://localhost:5174/admin`
   - User profile: `http://localhost:5173/profile` or `http://localhost:5174/profile` (when logged in)

### Alternative Setup (Without Firebase)

If you don't want to set up Firebase, the website will work with local storage only:

1. **Skip Firebase setup** - The app will use localStorage for data
2. **Authentication will be simulated** - You can still test the UI
3. **Data will persist in browser** - Cart and user data saved locally

### Troubleshooting

**If you get dependency errors:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**If the dev server won't start:**

```bash
# Check if port is in use
netstat -ano | findstr :5173

# Kill process using the port (Windows)
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- --port 3000
```

**If images don't load:**

- Check your internet connection
- The app includes fallback "Image Unavailable" messages
- Images are loaded from Unsplash (external service)

**If you get build errors:**

```bash
# Clear build cache
npm run build -- --force

# Or clean and rebuild
rm -rf dist
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Website.jsx     # Main website component
│   ├── Header.jsx      # Navigation header
│   ├── Hero.jsx        # Hero section
│   ├── Products.jsx    # Product catalog
│   ├── ProductModal.jsx # Product details modal
│   ├── CartModal.jsx   # Shopping cart modal
│   ├── Checkout.jsx    # Checkout process
│   ├── AuthModal.jsx   # Authentication modal
│   ├── AdminDashboard.jsx # Admin panel
│   ├── UserProfile.jsx # User profile page
│   └── Footer.jsx      # Website footer
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── CartContext.jsx # Shopping cart state
├── firebase/           # Firebase configuration
│   └── config.js       # Firebase setup
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## 🛒 How to Use

### For Customers

1. **Browse Products** - Visit the main page to see kitchen equipment
2. **Add to Cart** - Click the cart icon on any product
3. **View Cart** - Click the cart icon in the header
4. **Sign Up/Login** - Create an account or sign in
5. **Checkout** - Complete the checkout process with shipping and payment
6. **View Orders** - Check your order history in your profile

### For Admins

1. **Access Admin Panel** - Click "Admin" in the header
2. **Manage Products** - Add, edit, or delete products
3. **Edit Content** - Update website text and descriptions
4. **View Analytics** - Monitor sales and user activity

## 🔧 Configuration

### Firebase Setup

To enable full authentication and database features:

1. Create a Firebase project
2. Enable Email/Password authentication
3. Create a Firestore database
4. Update the Firebase config in `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
```

### Customization

- **Colors**: Update the orange theme in `tailwind.config.js`
- **Products**: Add/remove products in the admin dashboard
- **Content**: Edit website text in the admin content management
- **Styling**: Modify components in the `src/components/` directory

## 📱 Responsive Design

The website is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎯 Key Features Explained

### Shopping Cart

- Persistent cart using localStorage
- Real-time quantity updates
- Cart total calculations
- Smooth animations

### Authentication

- Firebase Authentication integration
- Email/password signup and login
- Protected routes
- User profile management

### Product Management

- Admin-only access
- CRUD operations for products
- Image URL support
- Category management

### Checkout Process

- Multi-step checkout flow
- Shipping information collection
- Payment form (simulated)
- Order confirmation

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **Firebase Hosting**: Use Firebase CLI
- **Any static hosting**: Upload the `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Verify Firebase configuration (if using auth)
4. Check that the development server is running

## ⚠️ Important Note

**This is a sample/demo website for demonstration purposes only.**

- No real transactions will be processed
- All data is stored locally or in demo Firebase project
- Product images are from Unsplash (external service)
- Authentication is for demo purposes only
- This is meant for learning and portfolio purposes

## 🎉 What's Next?

Potential enhancements:

- Real payment processing (Stripe integration)
- Email notifications
- Advanced search and filtering
- Wishlist functionality
- Product reviews and ratings
- Inventory management
- Sales analytics
- Multi-language support

## 🛠️ Development Commands

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear build cache
npm run build -- --force

# Check for port conflicts
netstat -ano | findstr :5173

# Kill process on specific port (Windows)
taskkill /PID <PID> /F
```

---

**Built with ❤️ using React, Firebase, and Tailwind CSS**
