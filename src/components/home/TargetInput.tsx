import React, { useState } from 'react';
import { Target, Info, Trophy, Hash, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TargetInputProps {
  onSubmit: (username: string) => void;
}

const TargetInput: React.FC<TargetInputProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [selectedTier, setSelectedTier] = useState<'sneak-peek' | 'sweet-spot' | null>(null);
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

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

  const tiers = [
    {
      id: 'sneak-peek' as const,
      name: 'Sneak Peek',
      price: '$9',
      icon: Target,
      description: 'Quick CSV download',
      features: ['5K followers', 'CSV only', 'Instant download']
    },
    {
      id: 'sweet-spot' as const,
      name: 'Sweet Spot',
      price: '$19',
      icon: Trophy,
      description: 'Full interactive experience',
      features: ['25K followers', 'Dashboard + CSV', 'Trophy Room'],
      popular: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim().replace('@', '');
    
    if (!cleanUsername) {
      setError('Please enter a Twitter handle');
      return;
    }

    if (!selectedTier) {
      setError('Please select a hunting tier');
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

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tier Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center">Choose Your Hunting Gear</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tiers.map((tier) => (
              <motion.div
                key={tier.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  selectedTier === tier.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-secondary to-yellow-400 text-dark px-3 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedTier === tier.id 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <tier.icon size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{tier.name}</h4>
                      <span className="font-bold text-primary">{tier.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{tier.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {tier.features.map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Target Input */}
        <div className="relative">
          <label 
            htmlFor="target-input"
            className="flex items-center text-lg font-medium mb-3"
          >
            🎯 Hunt Target (Twitter Handle)
            <button
              type="button"
              className="ml-2 text-gray-400 hover:text-gray-600"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info size={18} />
            </button>
          </label>

          {/* Tooltip */}
          {showTooltip && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -right-4 top-0 transform translate-x-full bg-dark text-white p-4 rounded-xl shadow-lg max-w-xs z-10"
            >
              <p className="text-sm">
                💡 Not sure who to enter? Think of an account whose followers include your ideal customers.
              </p>
              <div className="absolute left-0 top-4 transform -translate-x-2 rotate-45 w-4 h-4 bg-dark"></div>
            </motion.div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              @
            </div>
            <input
              id="target-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. levelsio"
              className="input pl-8"
            />
          </div>

          {error && (
            <p className="text-accent mt-2 text-sm">❌ {error}</p>
          )}
        </div>

        {/* Basic Filters Toggle */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            <span>⚙️ {showFilters ? 'Hide' : 'Show'} Basic Filters</span>
          </button>
        </div>

        {/* Basic Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/60 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <h4 className="text-lg font-medium mb-4 flex items-center">
                ⚙️ Basic Filters (Optional)
                <span className="ml-2 text-sm font-normal text-gray-500">- Fine-tune your hunt</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggested Targets */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Popular Hunt Targets:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedTargets.map((target) => (
              <button
                key={target.handle}
                type="button"
                onClick={() => handleSuggestionClick(target.handle)}
                className="text-left p-3 rounded-lg bg-light hover:bg-primary/10 transition-colors border border-gray-200"
              >
                <div className="font-medium">{target.handle}</div>
                <div className="text-sm text-gray-500">{target.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          disabled={!username.trim() || !selectedTier}
          className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
            username.trim() && selectedTier
              ? 'btn btn-primary hover-lift'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Target size={20} />
          <span>
            {selectedTier === 'sneak-peek' 
              ? 'Start Quick Hunt - $9' 
              : selectedTier === 'sweet-spot' 
                ? 'Continue to Checkout - $19' 
                : 'Select a hunting tier...'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default TargetInput;