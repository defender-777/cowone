import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, MessageCircle, Star, Upload, Phone, Mail, Shield, Eye, MapPin, Calendar, Wallet, Bell, Menu, X, Camera, Check } from 'lucide-react';


const LivestockTradingApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [userType, setUserType] = useState('buyer');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [offers, setOffers] = useState([]);
  const [newOfferAmount, setNewOfferAmount] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Sample data
  const animals = [
    {
      id: 1,
      name: 'Premium Holstein Cow',
      breed: 'Holstein',
      age: '3 years',
      price: 45000,
      location: 'Punjab, India',
      seller: 'Rajesh Farms',
      rating: 4.8,
      images: ['🐄'],
      description: 'High milk yield, vaccinated, healthy',
      verified: true,
      category: 'dairy'
    },
    {
      id: 2,
      name: 'Strong Bull Ox',
      breed: 'Gir',
      age: '4 years',
      price: 35000,
      location: 'Gujarat, India',
      seller: 'Patel Livestock',
      rating: 4.6,
      images: ['🐂'],
      description: 'Perfect for farming, well-trained',
      verified: true,
      category: 'draft'
    },
    {
      id: 3,
      name: 'Jersey Cow',
      breed: 'Jersey',
      age: '2 years',
      price: 28000,
      location: 'Kerala, India',
      seller: 'Nair Dairy Farm',
      rating: 4.9,
      images: ['🐄'],
      description: 'Excellent milk quality, gentle nature',
      verified: false,
      category: 'dairy'
    }
  ];

  const notifications = [
    { id: 1, type: 'offer', message: 'New offer received for Holstein Cow - ₹42,000', time: '2 mins ago' },
    { id: 2, type: 'accepted', message: 'Your offer of ₹30,000 was accepted!', time: '1 hour ago' },
    { id: 3, type: 'message', message: 'New message from Rajesh Farms', time: '3 hours ago' }
  ];

  const NavBar = () => (
    <div className="bg-green-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="text-2xl">🐄</div>
        <h1 className="text-xl font-bold">LiveStock Trade</h1>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <button 
          onClick={() => setCurrentView('home')}
          className={`px-3 py-1 rounded ${currentView === 'home' ? 'bg-green-700' : 'hover:bg-green-700'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentView('listings')}
          className={`px-3 py-1 rounded ${currentView === 'listings' ? 'bg-green-700' : 'hover:bg-green-700'}`}
        >
          Browse
        </button>
        <button 
          onClick={() => setCurrentView('sell')}
          className={`px-3 py-1 rounded ${currentView === 'sell' ? 'bg-green-700' : 'hover:bg-green-700'}`}
        >
          Sell
        </button>
        <button 
          onClick={() => setCurrentView('wallet')}
          className={`px-3 py-1 rounded ${currentView === 'wallet' ? 'bg-green-700' : 'hover:bg-green-700'}`}
        >
          Wallet
        </button>
        <div className="relative">
          <Bell 
            size={20} 
            className="cursor-pointer hover:text-green-200"
            onClick={() => setShowNotifications(!showNotifications)}
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>
      </div>

      <button 
        className="md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );

  const MobileMenu = () => showMobileMenu && (
    <div className="bg-green-600 text-white p-4 md:hidden">
      <div className="flex flex-col space-y-2">
        <button onClick={() => {setCurrentView('home'); setShowMobileMenu(false);}}>Home</button>
        <button onClick={() => {setCurrentView('listings'); setShowMobileMenu(false);}}>Browse</button>
        <button onClick={() => {setCurrentView('sell'); setShowMobileMenu(false);}}>Sell</button>
        <button onClick={() => {setCurrentView('wallet'); setShowMobileMenu(false);}}>Wallet</button>
      </div>
    </div>
  );

  const NotificationPanel = () => showNotifications && (
    <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-50">
      <h3 className="font-bold mb-3 text-gray-800">Notifications</h3>
      {notifications.map(notif => (
        <div key={notif.id} className="border-b py-2 last:border-b-0">
          <p className="text-sm text-gray-700">{notif.message}</p>
          <span className="text-xs text-gray-500">{notif.time}</span>
        </div>
      ))}
    </div>
  );

  const HomeView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Buy & Sell Quality Livestock</h2>
          <p className="text-xl mb-8">Connect with verified farmers and traders across the country</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for cows, oxen, bulls..."
              className="flex-1 px-4 py-3 rounded-lg text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              onClick={() => setCurrentView('listings')}
            >
              <Search size={20} className="inline mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose LiveStock Trade?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <Shield size={48} className="mx-auto mb-4 text-green-600" />
            <h4 className="text-xl font-semibold mb-2">Secure Transactions</h4>
            <p className="text-gray-600">Escrow system ensures safe payments for both buyers and sellers</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <Eye size={48} className="mx-auto mb-4 text-green-600" />
            <h4 className="text-xl font-semibold mb-2">Verified Sellers</h4>
            <p className="text-gray-600">KYC verification and rating system for trusted transactions</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <MessageCircle size={48} className="mx-auto mb-4 text-green-600" />
            <h4 className="text-xl font-semibold mb-2">Easy Negotiation</h4>
            <p className="text-gray-600">Built-in chat and offer system for seamless price negotiations</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AnimalCard = ({ animal }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center text-6xl">
        {animal.images[0]}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{animal.name}</h3>
          {animal.verified && (
            <div className="flex items-center text-green-600 text-sm">
              <Shield size={16} className="mr-1" />
              Verified
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-600 mb-2">
          <div>Breed: {animal.breed} • Age: {animal.age}</div>
          <div className="flex items-center mt-1">
            <MapPin size={14} className="mr-1" />
            {animal.location}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-green-600">₹{animal.price.toLocaleString()}</span>
          <div className="flex items-center text-sm">
            <Star size={16} className="text-yellow-500 mr-1" />
            {animal.rating}
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-3">
          Seller: {animal.seller}
        </div>
        
        <button 
          onClick={() => {
            setSelectedAnimal(animal);
            setCurrentView('detail');
          }}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const ListingsView = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Browse Livestock</h2>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="border rounded-lg px-3 py-2">
              <option>All Categories</option>
              <option>Dairy Cows</option>
              <option>Draft Animals</option>
              <option>Bulls</option>
            </select>
            <select className="border rounded-lg px-3 py-2">
              <option>All Locations</option>
              <option>Punjab</option>
              <option>Gujarat</option>
              <option>Kerala</option>
            </select>
            <select className="border rounded-lg px-3 py-2">
              <option>Price Range</option>
              <option>Below ₹30,000</option>
              <option>₹30,000 - ₹50,000</option>
              <option>Above ₹50,000</option>
            </select>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <Filter size={20} className="inline mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
        
        {/* Animal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
    </div>
  );

  const AnimalDetailView = () => {
    if (!selectedAnimal) return <div>Animal not found</div>;

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentView('listings')}
            className="mb-4 text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Listings
          </button>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/2 h-64 md:h-96 bg-gray-200 flex items-center justify-center text-8xl">
                {selectedAnimal.images[0]}
              </div>
              
              {/* Details */}
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold">{selectedAnimal.name}</h1>
                  {selectedAnimal.verified && (
                    <div className="flex items-center text-green-600">
                      <Shield size={20} className="mr-1" />
                      Verified
                    </div>
                  )}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div><strong>Breed:</strong> {selectedAnimal.breed}</div>
                  <div><strong>Age:</strong> {selectedAnimal.age}</div>
                  <div><strong>Location:</strong> {selectedAnimal.location}</div>
                  <div><strong>Seller:</strong> {selectedAnimal.seller}</div>
                  <div className="flex items-center">
                    <strong className="mr-2">Rating:</strong>
                    <Star size={16} className="text-yellow-500 mr-1" />
                    {selectedAnimal.rating}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{selectedAnimal.description}</p>
                
                <div className="text-3xl font-bold text-green-600 mb-6">
                  ₹{selectedAnimal.price.toLocaleString()}
                </div>
                
                {/* Offer Section */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Enter your offer"
                      className="flex-1 border rounded-lg px-3 py-2"
                      value={newOfferAmount}
                      onChange={(e) => setNewOfferAmount(e.target.value)}
                    />
                    <button 
                      onClick={() => {
                        if (newOfferAmount) {
                          setOffers([...offers, { amount: newOfferAmount, status: 'pending', animal: selectedAnimal.id }]);
                          setNewOfferAmount('');
                          alert('Offer sent successfully!');
                        }
                      }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Make Offer
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
                      <MessageCircle size={20} className="inline mr-2" />
                      Contact Seller
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SellView = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">List Your Animal</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form>
            <div className="space-y-6">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Animal Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 mb-2">Click to upload photos or drag and drop</p>
                  <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <Upload size={20} className="inline mr-2" />
                    Upload Photos
                  </button>
                </div>
              </div>
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Animal Type</label>
                  <select className="w-full border rounded-lg px-3 py-2">
                    <option>Select Type</option>
                    <option>Dairy Cow</option>
                    <option>Bull</option>
                    <option>Ox</option>
                    <option>Buffalo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Breed</label>
                  <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="e.g., Holstein" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Age</label>
                  <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="e.g., 3 years" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <input type="number" className="w-full border rounded-lg px-3 py-2" placeholder="45000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="City, State" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  rows="4" 
                  className="w-full border rounded-lg px-3 py-2" 
                  placeholder="Describe your animal's health, temperament, milk yield, etc."
                ></textarea>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm">I confirm this animal is healthy and all information is accurate</label>
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
              >
                List Animal for Sale
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const WalletView = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My Wallet</h2>
        
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 mb-2">Available Balance</p>
              <p className="text-3xl font-bold">₹12,450</p>
            </div>
            <Wallet size={48} className="text-green-200" />
          </div>
          <div className="flex gap-4 mt-6">
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Add Money
            </button>
            <button className="border border-white text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Withdraw
            </button>
          </div>
        </div>
        
        {/* Transactions */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Payment received</p>
                  <p className="text-sm text-gray-600">Holstein Cow sold to Farmer John</p>
                  <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                </div>
                <span className="text-green-600 font-semibold">+₹42,000</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Payment sent</p>
                  <p className="text-sm text-gray-600">Jersey Cow purchase</p>
                  <p className="text-xs text-gray-500">Yesterday, 4:15 PM</p>
                </div>
                <span className="text-red-600 font-semibold">-₹28,000</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Wallet top-up</p>
                  <p className="text-sm text-gray-600">Added via UPI</p>
                  <p className="text-xs text-gray-500">2 days ago, 11:20 AM</p>
                </div>
                <span className="text-green-600 font-semibold">+₹5,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <MobileMenu />
      <NotificationPanel />
      
      {currentView === 'home' && <HomeView />}
      {currentView === 'listings' && <ListingsView />}
      {currentView === 'detail' && <AnimalDetailView />}
      {currentView === 'sell' && <SellView />}
      {currentView === 'wallet' && <WalletView />}
    </div>
  );
};

export default LivestockTradingApp;