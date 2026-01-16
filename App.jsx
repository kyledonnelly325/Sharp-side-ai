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
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-2">4.1/5</p>
            <p className="text-gray-400 text-sm">Avg Confidence</p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">Why Sharpside AI?</h2>
          <p className="text-xl text-gray-400">Data-driven picks you can trust</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<BarChart3 className="h-8 w-8 text-emerald-400" />}
            title="Advanced Analytics"
            description="Our AI processes team stats, player performance, injuries, rest days, pace, matchups, and public betting patterns to find edges the market misses."
            color="emerald"
          />
          
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-purple-400" />}
            title="Smart Parlays"
            description="We automatically build 2-3 leg parlays using only our highest confidence picks (4+ stars) to maximize value while managing risk."
            color="purple"
          />
          
          <FeatureCard 
            icon={<Star className="h-8 w-8 text-amber-400" />}
            title="Confidence Ratings"
            description="Every pick gets a 1-5 star confidence rating so you know exactly how strong the edge is. Our 4+ star picks hit at 61.6%."
            color="amber"
          />
          
          <FeatureCard 
            icon={<Target className="h-8 w-8 text-blue-400" />}
            title="Moneyline & Spreads"
            description="Focus on the most profitable bet types. We analyze both moneylines and spreads to find the best value for every game."
            color="blue"
          />
          
          <FeatureCard 
            icon={<Activity className="h-8 w-8 text-red-400" />}
            title="Prop Outliers"
            description="When we spot player props with exceptional value (favorable matchups, recent trends), we highlight them for you."
            color="red"
          />
          
          <FeatureCard 
            icon={<Award className="h-8 w-8 text-green-400" />}
            title="Full Transparency"
            description="Every pick is tracked with timestamp and result. We show you exactly what we hit and what we missed - no hiding losses."
            color="green"
          />
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">Simple Pricing</h2>
          <p className="text-xl text-gray-400">One plan. Full access. No upsells.</p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-emerald-950 to-gray-900 border-2 border-emerald-600 rounded-2xl p-8 shadow-2xl shadow-emerald-600/20">
            <div className="text-center mb-8">
              <p className="text-emerald-400 font-bold mb-2">FULL ACCESS</p>
              <p className="text-6xl font-black mb-2">$19.99<span className="text-2xl text-gray-400">/mo</span></p>
              <p className="text-gray-400">14-day free trial • Cancel anytime</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                'Unlimited daily picks with full analysis',
                'AI-powered smart parlays (2-3 legs)',
                'Moneyline, spread & total picks',
                'Player prop outliers & value bets',
                'Complete track record transparency',
                'NFL picks coming soon (included)'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={onGetStarted}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Start Free Trial →
            </button>
            
            <p className="text-center text-gray-500 text-sm mt-4">
              No credit card required for trial
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4">FAQs</h2>
        </div>
        
        <div className="space-y-6">
          {[
            {
              q: "How does the AI algorithm work?",
              a: "Our proprietary algorithm analyzes thousands of data points including team offensive/defensive ratings, recent form, rest advantages, injury impacts, pace metrics, home court factors, line value, and public betting patterns. It weighs these factors based on historical accuracy to generate confidence-rated picks."
            },
            {
              q: "What's your win rate?",
              a: "Our overall season win rate is 56.7% across 550+ picks. For our highest confidence picks (4+ stars), we hit at 61.6%. Past performance doesn't guarantee future results, but we track everything transparently."
            },
            {
              q: "Do you offer picks for other sports?",
              a: "Currently focused on NBA. NFL picks are coming soon and will be included in your subscription at no extra cost."
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes! No contracts. Cancel with one click from your account settings."
            },
            {
              q: "Do I need a credit card for the free trial?",
              a: "No credit card needed for the 14-day trial. You'll only be charged if you decide to continue after the trial period."
            }
          ].map((faq, idx) => (
            <details key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6 group">
              <summary className="text-xl font-bold cursor-pointer">{faq.q}</summary>
              <p className="text-gray-400 mt-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="bg-gradient-to-br from-emerald-950 to-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-6xl font-black mb-6">
            Ready to Bet <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">Smarter</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join bettors who are winning with data-driven picks
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-emerald-600 hover:bg-emerald-500 px-10 py-5 rounded-lg font-bold text-xl transition-colors shadow-lg shadow-emerald-600/30"
          >
            Start Your Free Trial →
          </button>
          <p className="text-gray-500 mt-4">14 days free • No credit card required</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 rounded-lg p-2">
                <TrendingUp size={20} />
              </div>
              <span className="font-black text-xl">SHARPSIDE<span className="text-emerald-400">AI</span></span>
            </div>
            
            <div className="text-center text-gray-400 text-sm">
              <p className="mb-2">© 2026 Sharpside AI. All rights reserved.</p>
              <p>For entertainment purposes only. 21+ only. Please gamble responsibly.</p>
              <p className="mt-2">Past performance does not guarantee future results.</p>
            </div>
            
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description, color }) {
  const colorClasses = {
    emerald: 'bg-emerald-600/20 border-emerald-600/50',
    purple: 'bg-purple-600/20 border-purple-600/50',
    amber: 'bg-amber-600/20 border-amber-600/50',
    blue: 'bg-blue-600/20 border-blue-600/50',
    red: 'bg-red-600/20 border-red-600/50',
    green: 'bg-green-600/20 border-green-600/50'
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 hover:border-emerald-600/50 transition-colors">
      <div className={`${colorClasses[color]} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

// DASHBOARD COMPONENT
function Dashboard({ isLoggedIn, setIsLoggedIn, onBackToHome }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [picks, setPicks] = useState([]);
  const [parlays, setParlays] = useState([]);
  const [activeTab, setActiveTab] = useState('today');

  React.useEffect(() => {
    // Sample data - would come from API in production
    setPicks([
      {
        id: 1,
        matchup: "Lakers @ Celtics",
        gameTime: "7:30 PM ET",
        bestBet: {
          type: "spread",
          pick: "Celtics -7.5",
          confidence: 4.2,
          stars: 4,
          odds: "-110",
          reasoning: "🔥 High confidence play | Home team well-rested | Key away injuries | Home ATS: 15-10"
        },
        moneyline: { pick: "Celtics ML", confidence: 3.8, odds: "-280" },
        spread: { pick: "Celtics -7.5", confidence: 4.2, odds: "-110" },
        total: { pick: "Over 225.5", confidence: 3.9, odds: "-115" },
        props: [
          { player: "Jayson Tatum", type: "Points Over", line: 25.5, confidence: 4.3 }
        ],
        isFreePickOfDay: true
      },
      {
        id: 2,
        matchup: "Warriors @ Nuggets",
        gameTime: "9:00 PM ET",
        bestBet: {
          type: "moneyline",
          pick: "Warriors ML",
          confidence: 4.5,
          stars: 5,
          odds: "+145",
          reasoning: "⭐⭐⭐⭐⭐ BEST PICK | Warriors on fire 4-1 L5 | Nuggets slow pace matchup"
        },
        moneyline: { pick: "Warriors ML", confidence: 4.5, odds: "+145" },
        spread: { pick: "Warriors +3.5", confidence: 4.1, odds: "-110" },
        total: { pick: "Under 218.5", confidence: 3.2, odds: "-110" },
        props: [],
        isFreePickOfDay: false
      },
      {
        id: 3,
        matchup: "Heat @ Bucks",
        gameTime: "8:00 PM ET",
        bestBet: {
          type: "total",
          pick: "Over 230.5",
          confidence: 4.4,
          stars: 4,
          odds: "-110",
          reasoning: "🔥 High confidence play | High combined pace (104.2) | Both teams averaging 118+ PPG"
        },
        moneyline: { pick: "Bucks ML", confidence: 3.5, odds: "-195" },
        spread: { pick: "Bucks -4.5", confidence: 3.8, odds: "-110" },
        total: { pick: "Over 230.5", confidence: 4.4, odds: "-110" },
        props: [
          { player: "Giannis Antetokounmpo", type: "Rebounds Over", line: 11.5, confidence: 4.1 }
        ],
        isFreePickOfDay: false
      }
    ]);

    setParlays([
      {
        id: 1,
        legs: 2,
        picks: ["Celtics -7.5", "Warriors ML"],
        games: ["Lakers @ Celtics", "Warriors @ Nuggets"],
        confidence: 4.35,
        stars: 4,
        odds: "+280"
      },
      {
        id: 2,
        legs: 3,
        picks: ["Celtics -7.5", "Warriors ML", "Over 230.5 (Heat/Bucks)"],
        games: ["Lakers @ Celtics", "Warriors @ Nuggets", "Heat @ Bucks"],
        confidence: 4.2,
        stars: 4,
        odds: "+620"
      }
    ]);
  }, []);

  const ConfidenceStars = ({ count }) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14}
            className={i < count ? "fill-amber-400 text-amber-400" : "text-gray-700"}
          />
        ))}
      </div>
    );
  };

  const PickCard = ({ pick, showFull }) => {
    const bgGradient = pick.bestBet.stars >= 4 
      ? "from-emerald-950 to-gray-900 border-emerald-700/30"
      : "from-gray-900 to-gray-950 border-gray-700/30";

    return (
      <div className={`bg-gradient-to-br ${bgGradient} border rounded-xl p-5 hover:border-emerald-600/40 transition-all group`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">{pick.matchup}</h3>
            <p className="text-gray-400 text-sm">{pick.gameTime}</p>
          </div>
          {pick.isFreePickOfDay && (
            <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
              FREE PICK
            </span>
          )}
        </div>

        <div className="bg-black/30 rounded-lg p-4 mb-4 border border-emerald-600/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm font-medium">BEST BET</span>
            <ConfidenceStars count={pick.bestBet.stars} />
          </div>
          <p className="text-white font-bold text-xl mb-1">{pick.bestBet.pick}</p>
          <p className="text-emerald-400 text-sm font-medium mb-2">
            {pick.bestBet.confidence}/5.0 Confidence | {pick.bestBet.odds}
          </p>
          {showFull && (
            <p className="text-gray-300 text-sm leading-relaxed border-t border-gray-700/50 pt-3 mt-3">
              {pick.bestBet.reasoning}
            </p>
          )}
        </div>

        {showFull ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-800/50 rounded p-3 border border-gray-700/30">
                <p className="text-gray-400 text-xs mb-1">Moneyline</p>
                <p className="text-white text-sm font-semibold">{pick.moneyline.pick}</p>
                <p className="text-emerald-400 text-xs">{pick.moneyline.confidence}/5</p>
              </div>
              <div className="bg-gray-800/50 rounded p-3 border border-gray-700/30">
                <p className="text-gray-400 text-xs mb-1">Spread</p>
                <p className="text-white text-sm font-semibold">{pick.spread.pick}</p>
                <p className="text-emerald-400 text-xs">{pick.spread.confidence}/5</p>
              </div>
              <div className="bg-gray-800/50 rounded p-3 border border-gray-700/30">
                <p className="text-gray-400 text-xs mb-1">Total</p>
                <p className="text-white text-sm font-semibold">{pick.total.pick}</p>
                <p className="text-emerald-400 text-xs">{pick.total.confidence}/5</p>
              </div>
            </div>

            {pick.props.length > 0 && (
              <div className="bg-purple-950/30 border border-purple-700/30 rounded-lg p-3">
                <p className="text-purple-400 text-xs font-semibold mb-2">🎲 PROP OUTLIERS</p>
                {pick.props.map((prop, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <p className="text-white text-sm">{prop.player} {prop.type} {prop.line}</p>
                    <p className="text-purple-400 text-xs font-medium">{prop.confidence}/5</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => setShowLoginModal(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors group-hover:bg-emerald-500"
          >
            <Lock size={16} />
            Unlock Full Analysis
          </button>
        )}
      </div>
    );
  };

  const ParlayCard = ({ parlay }) => {
    return (
      <div className="bg-gradient-to-br from-purple-950 to-gray-900 border border-purple-700/30 rounded-xl p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" />
              {parlay.legs}-Leg Parlay
            </h3>
            <p className="text-purple-400 text-sm font-medium mt-1">
              {parlay.confidence}/5.0 Combined Confidence
            </p>
          </div>
          <div className="text-right">
            <ConfidenceStars count={parlay.stars} />
            <p className="text-emerald-400 font-bold text-lg mt-1">{parlay.odds}</p>
          </div>
        </div>

        <div className="space-y-2">
          {parlay.picks.map((pick, idx) => (
            <div key={idx} className="flex items-center gap-2 text-white">
              <ChevronRight size={16} className="text-purple-400" />
              <span className="text-sm">{pick}</span>
            </div>
          ))}
        </div>

        {!isLoggedIn && (
          <button 
            onClick={() => setShowLoginModal(true)}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition-colors"
          >
            <Lock size={16} />
            Unlock Smart Parlays
          </button>
        )}
      </div>
    );
  };

  const LoginModal = () => {
    if (!showLoginModal) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-emerald-600/30 rounded-2xl p-8 max-w-md w-full">
          <h2 className="text-white font-bold text-2xl mb-2">Unlock Sharpside AI</h2>
          <p className="text-gray-400 mb-6">Get full access to all picks, analysis, and smart parlays</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-emerald-400">
              <Target size={20} />
              <span className="text-sm">Unlimited daily picks with full analysis</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-400">
              <Zap size={20} />
              <span className="text-sm">AI-powered smart parlays (2-3 legs)</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-400">
              <TrendingUp size={20} />
              <span className="text-sm">Player prop outliers & value bets</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-400">
              <Activity size={20} />
              <span className="text-sm">Real-time confidence ratings</span>
            </div>
          </div>

          <div className="bg-emerald-600 rounded-lg p-4 mb-6 text-center">
            <p className="text-white font-bold text-xl mb-1">$19.99/month</p>
            <p className="text-emerald-100 text-sm">14-day free trial • Cancel anytime</p>
          </div>

          <button 
            onClick={() => {
              setIsLoggedIn(true);
              setShowLoginModal(false);
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg mb-3 transition-colors"
          >
            Start Free Trial
          </button>
          
          <button 
            onClick={() => setShowLoginModal(false)}
            className="w-full text-gray-400 hover:text-white py-2 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-emerald-600 rounded-lg p-2">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-black text-2xl tracking-tight">
                SHARPSIDE<span className="text-emerald-400">AI</span>
              </h1>
              <p className="text-gray-400 text-xs font-medium">NBA Betting Intelligence</p>
            </div>
          </button>
          
          {!isLoggedIn && (
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Get Access
            </button>
          )}
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-emerald-950 to-gray-900 border-b border-emerald-700/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Win Rate (30d)</p>
              <p className="text-white font-bold text-2xl">58.2%</p>
            </div>
            <div className="text-center border-x border-gray-700/50">
              <p className="text-gray-400 text-sm mb-1">Avg Confidence</p>
              <p className="text-emerald-400 font-bold text-2xl">4.1/5.0</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">ROI</p>
              <p className="text-emerald-400 font-bold text-2xl">+12.3%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          <button 
            onClick={() => setActiveTab('today')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'today' 
                ? 'text-emerald-400 border-b-2 border-emerald-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Picks
          </button>
          <button 
            onClick={() => setActiveTab('parlays')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'parlays' 
                ? 'text-purple-400 border-b-2 border-purple-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Smart Parlays
          </button>
        </div>

        {activeTab === 'today' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {picks.map(pick => (
              <PickCard 
                key={pick.id} 
                pick={pick} 
                showFull={isLoggedIn || pick.isFreePickOfDay} 
              />
            ))}
          </div>
        )}

        {activeTab === 'parlays' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {parlays.map(parlay => (
              <ParlayCard key={parlay.id} parlay={parlay} />
            ))}
            
            {!isLoggedIn && (
              <div className="lg:col-span-2 text-center py-12">
                <Lock size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Unlock all smart parlays with a subscription</p>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  View All Parlays
                </button>
              </div>
            )}
          </div>
        )}

        {/* Track Record Section */}
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={24} className="text-emerald-400" />
            <h2 className="text-white font-bold text-xl">Transparent Track Record</h2>
          </div>
          <p className="text-gray-400 mb-4">
            We track every pick with full transparency. All historical picks are viewable with timestamps.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Last 7 Days</p>
              <p className="text-white font-bold text-xl mt-1">18-13</p>
              <p className="text-emerald-400 text-sm">58.1% Win Rate</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Last 30 Days</p>
              <p className="text-white font-bold text-xl mt-1">74-53</p>
              <p className="text-emerald-400 text-sm">58.3% Win Rate</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Season Total</p>
              <p className="text-white font-bold text-xl mt-1">312-238</p>
              <p className="text-emerald-400 text-sm">56.7% Win Rate</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">4+ Star Picks</p>
              <p className="text-white font-bold text-xl mt-1">45-28</p>
              <p className="text-emerald-400 text-sm">61.6% Win Rate</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p className="mb-2">© 2026 Sharpside AI. For entertainment purposes only.</p>
          <p>21+ only. Please gamble responsibly. Past performance does not guarantee future results.</p>
        </div>
      </footer>

      <LoginModal />
    </div>
  );
}
