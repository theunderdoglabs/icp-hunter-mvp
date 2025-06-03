import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, Trophy, ArrowRight, BarChart, Clock, Download,
  Filter, Star, ChevronDown, Search, Trash2, MapPin, Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { mockSavedHunts, mockTrophyRoom } from '../data/mockData';
import TierSelectionModal from '../components/modals/TierSelectionModal';

const DashboardPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetAccount, setTargetAccount] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  
  // Filter states
  const [filters, setFilters] = useState({
    keyword: '',
    location: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setTargetAccount(username);
      setIsModalOpen(true);
    }
  };

  const handleHuntAgain = (targetUsername: string) => {
    setTargetAccount(targetUsername);
    setIsModalOpen(true);
  };

  const handleUpgradeHunt = (targetUsername: string) => {
    // Direct upgrade to Sweet Spot for $10
    // This should go directly to Stripe Checkout for the upgrade
    navigate(`/checkout/${targetUsername}?tier=sweet-spot&upgrade=true&originalPrice=9&upgradePrice=10`);
  };

  const handleTierSelect = (tier: 'sneak_peek' | 'sweet_spot') => {
    setIsModalOpen(false);
    
    // Build URL with filters
    const searchParams = new URLSearchParams({
      tier: tier,
      ...(filters.keyword && { keyword: filters.keyword }),
      ...(filters.location && { location: filters.location })
    });
    
    navigate(`/processing/${targetAccount}?${searchParams.toString()}`);
  };

  const stats = [
    { 
      icon: <Trophy size={24} className="text-primary" />,
      label: 'Total Trophies',
      value: 23,
      background: 'bg-primary/10'
    },
    {
      icon: <Target size={24} className="text-secondary" />,
      label: 'Hunts Completed',
      value: 3,
      background: 'bg-secondary/10'
    },
    {
      icon: <Clock size={24} className="text-accent" />,
      label: 'Avg Hunt Time',
      value: '4:32',
      background: 'bg-accent/10'
    },
    {
      icon: <Star size={24} className="text-success" />,
      label: 'Success Rate',
      value: 92,
      suffix: '%',
      background: 'bg-success/10'
    }
  ];

  const trendingTargets = ['sundarpichai', 'tim_cook', 'satyanadella'];
  const industryTargets = ['dhh', 'kentcdodds', 'dan_abramov'];

  const quickHunts = [
    { username: 'pmarca', date: 'March 1, 2025' },
    { username: 'paulg', date: 'March 2, 2025' }
  ];

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Hunter! 🎯</h1>
            <p className="text-gray-600 mt-2">Your trophy collection is growing nicely.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <div className={`w-12 h-12 ${stat.background} rounded-full flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold">
                <CountUp 
                  end={typeof stat.value === 'number' ? stat.value : 0}
                  duration={2}
                  suffix={stat.suffix}
                />
                {typeof stat.value === 'string' && stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Hunts */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Clock size={24} className="text-primary mr-2" />
              Recent Hunts
            </h2>
            <button className="text-primary hover:underline text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {mockSavedHunts.map((hunt) => (
              <div key={hunt.id} className="flex items-center justify-between p-4 bg-light rounded-xl">
                <div>
                  <div className="font-medium">@{hunt.targetUsername}</div>
                  <div className="text-sm text-gray-600">
                    {hunt.savedProfiles} trophies bagged • {hunt.date}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleHuntAgain(hunt.targetUsername)}
                    className="btn btn-secondary btn-sm"
                  >
                    Hunt Again
                  </button>
                  <button 
                    onClick={() => navigate(`/results/${hunt.targetUsername}`)}
                    className="btn btn-primary btn-sm"
                  >
                    View Results
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Hunts Section */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Download size={24} className="text-primary mr-2" />
              Quick Hunts (CSV-only)
            </h2>
            <button className="text-gray-500 hover:text-gray-700">
              Hide Section
            </button>
          </div>

          <div className="space-y-4">
            {quickHunts.map((hunt, index) => (
              <div key={index} className="p-4 bg-light rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-medium">@{hunt.username} hunt</div>
                  <div className="text-sm text-gray-600">Completed on {hunt.date}</div>
                  <div className="text-xs text-gray-500 mt-1">CSV-only • Quick Hunt ($9)</div>
                </div>
                <div className="flex space-x-2">
                  <button className="btn btn-secondary btn-sm">
                    Download CSV
                  </button>
                  <button 
                    onClick={() => handleUpgradeHunt(hunt.username)}
                    className="btn btn-primary btn-sm"
                  >
                    Upgrade to Trophy Room +$10
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
            💡 <strong>Upgrade any Quick Hunt:</strong> Pay just $10 more to unlock Trophy Room, Dashboard view, and profile saving for this specific hunt.
          </div>
        </div>

        {/* New Hunt Starter */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Target size={24} className="text-primary mr-2" />
            Ready for Your Next Hunt?
          </h2>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                @
              </div>
              <input
                id="username-input"
                type="text"
                className="input pl-8"
                placeholder="Enter Twitter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </form>

          {/* Basic Filters Toggle */}
          <div className="flex items-center justify-center mb-4">
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
                className="bg-light/60 backdrop-blur-lg rounded-xl p-6 border border-gray-200 mb-6"
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

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                💡 Trending Targets
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTargets.map((target) => (
                  <button
                    key={target}
                    onClick={() => setUsername(target)}
                    className="px-3 py-1 bg-light rounded-full text-sm hover:bg-primary/10"
                  >
                    @{target}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                🎯 Your Industry
              </div>
              <div className="flex flex-wrap gap-2">
                {industryTargets.map((target) => (
                  <button
                    key={target}
                    onClick={() => setUsername(target)}
                    className="px-3 py-1 bg-light rounded-full text-sm hover:bg-primary/10"
                  >
                    @{target}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-6 flex items-center justify-center"
          >
            Choose Your Hunt Tier & Gear Up! 🎯
          </button>
        </div>
      </div>

      {/* Tier Selection Modal */}
      <TierSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        targetAccount={targetAccount ? `@${targetAccount}` : ''}
        onSelectTier={handleTierSelect}
      />
    </div>
  );
};

export default DashboardPage;