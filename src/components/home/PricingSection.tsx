import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Trophy, ArrowRight, X, Info, Users, MapPin, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<'sneak-peek' | 'sweet-spot' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  
  // Filter states
  const [filters, setFilters] = useState({
    keyword: '',
    location: ''
  });

  const suggestedTargets = [
    { handle: '@gregisenberg', description: 'Community Builders' },
    { handle: '@levelsio', description: 'Indie Hackers' },
    { handle: '@naval', description: 'Founders' },
    { handle: '@thedankoe', description: 'Creators' }
  ];

  const handleSelectTier = (tier: 'sneak-peek' | 'sweet-spot') => {
    setSelectedTier(tier);
    setShowModal(true);
    setUsername('');
    setError('');
    // Reset filters
    setFilters({
      keyword: '',
      location: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim().replace('@', '');
    
    if (!cleanUsername) {
      setError('Please enter a Twitter handle');
      return;
    }

    // Twitter handle validation (4-15 characters)
    if (!/^[A-Za-z0-9_]{4,15}$/.test(cleanUsername)) {
      setError('Please enter a valid Twitter handle (4-15 characters)');
      return;
    }

    // Validate keyword length
    if (filters.keyword && filters.keyword.length > 8) {
      setError('Keyword cannot be longer than 8 characters');
      return;
    }

    setError('');
    
    // Different flows for different tiers
    if (selectedTier === 'sneak-peek') {
      // Sneak Peek: Direct to payment processing (no checkout page)
      const searchParams = new URLSearchParams({
        tier: 'sneak-peek',
        ...(filters.keyword && { keyword: filters.keyword }),
        ...(filters.location && { location: filters.location })
      });
      
      navigate(`/processing/${cleanUsername}?${searchParams.toString()}`);
    } else {
      // Sweet Spot: Go through checkout flow
      const searchParams = new URLSearchParams({
        tier: selectedTier!,
        ...(filters.keyword && { keyword: filters.keyword }),
        ...(filters.location && { location: filters.location })
      });
      
      navigate(`/checkout/${cleanUsername}?${searchParams.toString()}`);
    }
  };

  const handleSuggestionClick = (handle: string) => {
    setUsername(handle);
    setError('');
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTier(null);
    setUsername('');
    setError('');
    setFilters({
      keyword: '',
      location: ''
    });
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-light">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Choose Your Hunting Gear 🎯</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              No subscriptions. No commitments. Just results.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Sneak Peek Card */}
            <div className="card card-hover border-2 border-gray-200 relative">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">🔍 Sneak Peek</h3>
                <p className="text-gray-600">Quick peek for smaller targets / Testing tool</p>
              </div>

              <div className="text-center mb-8">
                <span className="text-5xl font-bold text-primary">$9</span>
                <p className="text-sm text-gray-500 mt-1">One-time payment</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {[
                  '5,000 followers analysis',
                  'Basic filters for relevant profiles',
                  'Instant CSV download with all results',
                  'Results in under 2 minutes'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-success/5 rounded-lg border-l-4 border-success">
                    <span className="text-xl flex-shrink-0">✅</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              <div className="space-y-3 mb-8">
                {[
                  'No dashboard access',
                  'No Trophy Room function',
                  'No advanced filters',
                  'No saved hunt history'
                ].map((limitation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-accent/5 rounded-lg border-l-4 border-accent">
                    <span className="text-xl flex-shrink-0">❌</span>
                    <span className="text-gray-700">{limitation}</span>
                  </div>
                ))}
              </div>

              <div className="bg-light p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Perfect for:</strong> First tests & smaller influencers
                </p>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => handleSelectTier('sneak-peek')}
                className="w-full btn btn-primary flex items-center justify-center space-x-2 hover-lift"
              >
                <span>Get Sneak Peek</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Sweet Spot Card */}
            <div className="card card-hover border-2 border-primary relative scale-105 shadow-xl">
              <div className="absolute -top-4 right-4 bg-gradient-to-r from-secondary to-yellow-400 text-dark px-4 py-1 rounded-full text-sm font-bold animate-pulse-glow">
                MOST POPULAR
              </div>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Trophy size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">🏆 Sweet Spot</h3>
                <p className="text-gray-600">Full hunting experience for serious lead generation</p>
              </div>

              <div className="text-center mb-8">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">$19</span>
                <p className="text-sm text-gray-500 mt-1">One-time payment</p>
                <div className="inline-block bg-success/20 text-success px-3 py-1 rounded-full text-xs font-semibold mt-2">
                  Best Value - 10x features for 2x price!
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {[
                  '25,000 followers analysis (5x more!)',
                  'Interactive dashboard for browsing',
                  'Trophy Room - save profiles permanently',
                  'Advanced filters by categories',
                  '"Bag \'Em!" - collect best profiles',
                  'Hunt history & repeat function',
                  'Permanent user account access'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-success/5 rounded-lg border-l-4 border-success">
                    <span className="text-xl flex-shrink-0">✅</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-success/10 to-primary/10 p-4 rounded-lg border border-success/30 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Perfect for:</strong> Serious lead generation & larger accounts
                </p>
                <p className="text-xs text-success font-semibold mt-2">
                  Over 10x more features for only 2x the price!
                </p>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => handleSelectTier('sweet-spot')}
                className="w-full btn btn-accent flex items-center justify-center space-x-2 hover-lift text-lg font-semibold animate-pulse-glow"
              >
                <span>Get Sweet Spot</span>
                <Trophy size={18} />
              </button>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden mb-12 border border-white/20">
            <div className="bg-gradient-to-r from-primary to-accent text-white p-6 text-center">
              <h3 className="text-2xl font-bold">🎯 Direct Comparison</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">🔍 Sneak Peek</th>
                    <th className="text-center p-4 font-semibold text-primary">🏆 Sweet Spot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-4 font-medium">Follower Analysis</td>
                    <td className="p-4 text-center">5,000</td>
                    <td className="p-4 text-center text-success font-semibold">25,000 (5x more!)</td>
                  </tr>
                  <tr className="border-t bg-light/30">
                    <td className="p-4 font-medium">Result Format</td>
                    <td className="p-4 text-center">CSV Only</td>
                    <td className="p-4 text-center text-success font-semibold">Dashboard + CSV</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-4 font-medium">Save Profiles</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-t bg-light/30">
                    <td className="p-4 font-medium">Filter Options</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center text-success font-semibold">Advanced</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-4 font-medium">Hunt History</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr className="border-t bg-light/30">
                    <td className="p-4 font-medium">Re-download Access</td>
                    <td className="p-4 text-center text-accent font-semibold">One-time only</td>
                    <td className="p-4 text-center text-success font-semibold">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Twitter Handle Input Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  selectedTier === 'sneak-peek' 
                    ? 'bg-primary/20' 
                    : 'bg-gradient-to-r from-accent to-secondary'
                }`}>
                  {selectedTier === 'sneak-peek' ? (
                    <Target size={28} className="text-primary" />
                  ) : (
                    <Trophy size={28} className="text-white" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {selectedTier === 'sneak-peek' ? '🔍 Sneak Peek' : '🏆 Sweet Spot'}
                </h3>
                <p className="text-gray-600">
                  Configure your hunt settings and start hunting!
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Twitter Handle */}
                <div>
                  <label className="flex items-center text-lg font-medium mb-3">
                    🎯 Hunt Target (Twitter Handle)
                    <Info size={16} className="ml-2 text-gray-400" />
                  </label>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      @
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. levelsio"
                      className="input pl-8"
                      autoFocus
                    />
                  </div>

                  {error && (
                    <p className="text-accent mt-2 text-sm">❌ {error}</p>
                  )}
                </div>

                {/* Filters */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center">
                    ⚙️ Filters
                    <span className="ml-2 text-sm font-normal text-gray-500">- Fine-tune your hunt</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Keyword */}
                    <div className="space-y-3">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Hash size={16} className="mr-2 text-primary" />
                        Keyword (max 8 chars)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. startup, AI, crypto"
                        value={filters.keyword}
                        onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
                        className="input text-sm"
                        maxLength={8}
                      />
                      {filters.keyword && (
                        <div className="text-xs text-gray-500">
                          {filters.keyword.length}/8 characters
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="space-y-3">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <MapPin size={16} className="mr-2 text-primary" />
                        Location (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. USA, Germany, London"
                        value={filters.location}
                        onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                        className="input text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Suggested Targets */}
                <div className="space-y-3 border-t pt-6">
                  <p className="text-sm font-medium text-gray-700">🚀 Quick suggestions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedTargets.map((target) => (
                      <button
                        key={target.handle}
                        type="button"
                        onClick={() => handleSuggestionClick(target.handle)}
                        className="text-left p-2 rounded-lg bg-light hover:bg-primary/10 transition-colors border border-gray-200 text-sm"
                      >
                        <div className="font-medium">{target.handle}</div>
                        <div className="text-xs text-gray-500">{target.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={!username.trim()}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                    username.trim()
                      ? selectedTier === 'sneak-peek' 
                        ? 'btn btn-primary hover-lift'
                        : 'btn btn-accent hover-lift'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Target size={18} />
                  <span>
                    {selectedTier === 'sneak-peek' 
                      ? 'Start Quick Hunt - $9' 
                      : 'Continue to Checkout - $19'
                    }
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PricingSection;