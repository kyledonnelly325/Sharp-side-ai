import React, { useState } from 'react';
import { Star, TrendingUp, Target, Zap, Lock, ChevronRight, Award, BarChart3, Activity, Menu, X } from 'lucide-react';

// Main App with routing
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {currentPage === 'landing' && (
        <LandingPage 
          onGetStarted={() => setCurrentPage('dashboard')} 
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          onBackToHome={() => setCurrentPage('landing')}
        />
      )}
    </div>
  );
}

// LANDING PAGE COMPONENT
function LandingPage({ onGetStarted }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
        </div>
        
        {/* Nav */}
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 rounded-lg p-2">
              <TrendingUp size={24} className="text-white" />
            </div>
            <span className="font-black text-2xl">SHARPSIDE<span className="text-emerald-400">AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
            <button 
              onClick={onGetStarted}
              className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              <button 
                onClick={onGetStarted}
                className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-emerald-600/20 border border-emerald-600/30 rounded-full px-4 py-2 mb-8">
              <span className="text-emerald-400 font-semibold text-sm">🔥 58.2% Win Rate Over 550+ Picks</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              Stop Guessing.<br/>
              Start Winning with <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">AI.</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Advanced algorithms analyze thousands of data points to find the highest-confidence NBA bets. 
              Get the edge that sharp bettors use, powered by artificial intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={onGetStarted}
                className="bg-emerald-600 hover:bg-emerald-500 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-emerald-600/30"
              >
                Start 14-Day Free Trial
              </button>
              <button 
                onClick={onGetStarted}
                className="border border-gray-700 hover:border-emerald-600 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                See Today's Free Pick
              </button>
            </div>
            
            <p className="text-gray-500 text-sm">
              No credit card required • Cancel anytime • $19.99/month after trial
            </p>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-b border-gray-800">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-2">58.2%</p>
            <p className="text-gray-400 text-sm">30-Day Win Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-2">+12.3%</p>
            <p className="text-gray-400 text-sm">ROI This Season</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-2">550+</p>
            <p className="text-gray-400 text-sm">Picks Tracked</p>
          </div>
          <div className="text-
