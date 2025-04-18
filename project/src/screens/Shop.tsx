import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Search, ShoppingCart, Filter, ChevronDown } from "lucide-react";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  bestseller: boolean;
  isNew: boolean;
  inStock: boolean;
};

export const Shop = () => {
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSorting, setActiveSorting] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: "Hydrating Shampoo",
      brand: "Kerastase",
      price: 28.99,
      image: "/products/shampoo-1.jpg",
      category: "shampoo",
      bestseller: true,
      isNew: false,
      inStock: true
    },
    {
      id: 2,
      name: "Repair Conditioner",
      brand: "Oribe",
      price: 32.99,
      image: "/products/conditioner-1.jpg",
      category: "conditioner",
      bestseller: false,
      isNew: true,
      inStock: true
    },
    {
      id: 3,
      name: "Styling Pomade",
      brand: "Aveda",
      price: 24.99,
      salePrice: 19.99,
      image: "/products/styling-1.jpg",
      category: "styling",
      bestseller: false,
      isNew: false,
      inStock: true
    },
    {
      id: 4,
      name: "Hair Oil Treatment",
      brand: "Moroccanoil",
      price: 46.99,
      image: "/products/treatment-1.jpg",
      category: "treatment",
      bestseller: true,
      isNew: false,
      inStock: true
    },
    {
      id: 5,
      name: "Volume Spray",
      brand: "Kevin Murphy",
      price: 29.99,
      image: "/products/styling-2.jpg",
      category: "styling",
      bestseller: false,
      isNew: true,
      inStock: true
    },
    {
      id: 6,
      name: "Curl Defining Cream",
      brand: "DevaCurl",
      price: 26.99,
      image: "/products/styling-3.jpg",
      category: "styling",
      bestseller: false,
      isNew: false,
      inStock: false
    },
    {
      id: 7,
      name: "Color Protection Shampoo",
      brand: "Pureology",
      price: 34.99,
      salePrice: 29.99,
      image: "/products/shampoo-2.jpg",
      category: "shampoo",
      bestseller: false,
      isNew: false,
      inStock: true
    },
    {
      id: 8,
      name: "Deep Repair Mask",
      brand: "Redken",
      price: 38.99,
      image: "/products/treatment-2.jpg",
      category: "treatment",
      bestseller: true,
      isNew: false,
      inStock: true
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'shampoo', name: 'Shampoo' },
    { id: 'conditioner', name: 'Conditioner' },
    { id: 'styling', name: 'Styling' },
    { id: 'treatment', name: 'Treatments' }
  ];
  
  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'newest', name: 'Newest' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' }
  ];
  
  // Filter products based on active category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Sort products based on active sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeSorting) {
      case 'newest':
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      case 'price-low':
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case 'price-high':
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      default: // featured - bestsellers first
        return a.bestseller ? -1 : b.bestseller ? 1 : 0;
    }
  });
  
  const addToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-[url(/shop-hero.jpg)] bg-cover bg-center h-64 md:h-80">
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Our Products</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Premium hair care products used and recommended by our stylists
            </p>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search and Cart Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 text-white focus:ring-[#fbb034] focus:border-[#fbb034] outline-none"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex items-center">
            <button className="relative p-2 mr-2">
              <ShoppingCart size={24} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#fbb034] text-black text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="flex items-center bg-gray-800 p-2 border border-gray-700 md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar - Hidden on mobile unless toggled */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block col-span-1 space-y-8`}>
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`block w-full text-left px-3 py-2 transition-colors ${
                      activeCategory === category.id
                        ? "bg-[#fbb034]/10 text-[#fbb034]"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Sort By</h3>
              <div className="space-y-2">
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setActiveSorting(option.id)}
                    className={`block w-full text-left px-3 py-2 transition-colors ${
                      activeSorting === option.id
                        ? "bg-[#fbb034]/10 text-[#fbb034]"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="col-span-1 md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.length > 0 ? (
                sortedProducts.map(product => (
                  <div key={product.id} className="bg-gray-800 border border-gray-700 group">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-700 overflow-hidden">
                      <img 
                        src="/api/placeholder/300/300" 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                      />
                      
                      {/* Sale or New Badge */}
                      {product.salePrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1">
                          SALE
                        </div>
                      )}
                      {product.isNew && !product.salePrice && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1">
                          NEW
                        </div>
                      )}
                      
                      {/* Out of Stock Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <span className="bg-gray-800 text-white px-4 py-2 font-bold">OUT OF STOCK</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <div className="text-sm text-gray-400 mb-1">{product.brand}</div>
                      <h3 className="font-bold text-white mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {product.salePrice ? (
                            <>
                              <span className="text-red-500 font-bold mr-2">${product.salePrice.toFixed(2)}</span>
                              <span className="text-gray-400 line-through text-sm">${product.price.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="font-bold">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <Button
                          onClick={addToCart}
                          disabled={!product.inStock}
                          className="bg-[#fbb034] hover:bg-[#fbb034]/90 text-black rounded-none px-3 py-1 text-sm disabled:bg-gray-700 disabled:text-gray-500"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-400">No products found matching your criteria.</p>
                  <Button 
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm('');
                    }}
                    className="mt-4 bg-[#fbb034] hover:bg-[#fbb034]/90 text-black rounded-none"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Products Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Staff Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {products
              .filter(product => product.bestseller)
              .map(product => (
                <div key={product.id} className="bg-gray-900 border border-gray-700 group">
                  <div className="aspect-square bg-gray-700 overflow-hidden">
                    <img 
                      src="/api/placeholder/250/250" 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-gray-400">{product.brand}</div>
                    <h3 className="font-bold text-white mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${(product.salePrice || product.price).toFixed(2)}</span>
                      <Button
                        onClick={addToCart}
                        className="bg-[#fbb034] hover:bg-[#fbb034]/90 text-black rounded-none px-3 py-1 text-sm"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-400 mb-8">
            Subscribe to get special offers, free giveaways, and product launches.
          </p>
          <div className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-3 bg-gray-800 border border-gray-700 text-white outline-none sm:rounded-none"
            />
            <Button className="mt-2 sm:mt-0 bg-[#fbb034] hover:bg-[#fbb034]/90 text-black font-bold px-8 py-3 rounded-none">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};