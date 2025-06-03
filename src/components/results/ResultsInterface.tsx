import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Filter, ArrowUpDown, Search, Check, ChevronDown, ChevronLeft, ChevronRight, Download, ArrowUpRight } from 'lucide-react';
import Toast from '../common/Toast';
import { Link, useSearchParams, useParams } from 'react-router-dom';

interface Profile {
  id: string;
  username: string;
  name: string;
  bio: string;
  category: {
    icon: string;
    name: string;
  };
  followers: number;
  engagement: number;
  country: {
    flag: string;
    code: string;
  };
  huntScore: number;
  lastTweet?: string;
}

const categories = [
  { icon: '🧙‍♂️', name: 'SaaS', count: 234 },
  { icon: '📈', name: 'AI', count: 186 },
  { icon: '💰', name: 'VC', count: 147 },
  { icon: '🎨', name: 'Design', count: 89 },
  { icon: '📱', name: 'Mobile', count: 191 }
];

const countries = [
  { flag: '🇺🇸', code: 'US' },
  { flag: '🇬🇧', code: 'GB' },
  { flag: '🇩🇪', code: 'DE' },
  { flag: '🇫🇷', code: 'FR' },
  { flag: '🇨🇦', code: 'CA' },
  { flag: '🇦🇺', code: 'AU' }
];

const generateMockProfiles = (count: number): Profile[] => {
  const profiles: Profile[] = [];
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const huntScore = Math.floor(Math.random() * 4) + 6;
    const followers = Math.floor(Math.random() * 99000) + 1000;
    const engagement = (Math.random() * 7 + 1).toFixed(1);

    profiles.push({
      id: `profile-${i}`,
      username: `user${i}`,
      name: `User ${i}`,
      bio: `${category.name} expert | Building the future of tech | Previously @bigtech`,
      category: {
        icon: category.icon,
        name: category.name
      },
      followers,
      engagement: parseFloat(engagement),
      country: {
        flag: country.flag,
        code: country.code
      },
      huntScore
    });
  }
  return profiles;
};

const mockProfiles = generateMockProfiles(50);

const ResultsInterface: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { username } = useParams<{ username: string }>();
  const tier = searchParams.get('tier') as 'sneak-peek' | 'sweet-spot' | null;
  const isSneak = tier === 'sneak-peek';
  
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [scoreFilter, setScoreFilter] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [engagementFilter, setEngagementFilter] = useState(0);
  const [sortBy, setSortBy] = useState<'huntScore' | 'followers' | 'engagement'>('huntScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [baggedCount, setBaggedCount] = useState(0);

  const profilesPerPage = 25;

  // Mock different data for different tiers
  const resultCount = isSneak ? 127 : 847;
  const analysisScope = isSneak ? '5,000' : '25,000';

  const handleDownloadCSV = () => {
    // Simulate CSV download
    const csvData = generateCSVData();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hunt-results-${username}-${tier}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generateCSVData = () => {
    const headers = ['Username', 'Name', 'Bio', 'Followers', 'Engagement', 'Hunt Score', 'Category', 'Country'];
    const rows = mockProfiles.slice(0, resultCount).map(profile => [
      profile.username,
      profile.name,
      profile.bio.replace(/,/g, ';'), // Replace commas to avoid CSV issues
      profile.followers,
      profile.engagement,
      profile.huntScore,
      profile.category.name,
      profile.country.code
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  // If it's a Sneak Peek, show CSV-only download interface
  if (isSneak) {
    return (
      <div className="min-h-screen bg-light py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 mb-4">
              <Target size={16} className="mr-2" />
              <span className="font-semibold">Sneak Peek Hunt Complete</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              🎯 Hunt Results: @{username}
            </h1>
            <p className="text-gray-600">
              {resultCount} profiles found • Analysis completed in 2:14 minutes
            </p>
          </div>

          {/* Main CSV Download Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your Hunt Data is Ready!</h2>
              <p className="text-gray-600">
                Download your complete CSV file with all {resultCount} targeted profiles
              </p>
            </div>

            {/* Hunt Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-light rounded-lg">
                <div className="text-2xl font-bold text-primary">{resultCount}</div>
                <div className="text-sm text-gray-600">Profiles Found</div>
              </div>
              <div className="text-center p-4 bg-light rounded-lg">
                <div className="text-2xl font-bold text-success">{analysisScope}</div>
                <div className="text-sm text-gray-600">Followers Analyzed</div>
              </div>
              <div className="text-center p-4 bg-light rounded-lg">
                <div className="text-2xl font-bold text-accent">CSV</div>
                <div className="text-sm text-gray-600">Export Format</div>
              </div>
            </div>

            {/* Download Button */}
            <button 
              onClick={handleDownloadCSV}
              className="w-full btn btn-primary text-lg py-4 flex items-center justify-center mb-4"
            >
              <Download size={24} className="mr-3" />
              Download Your Loot (CSV)
            </button>

            <p className="text-sm text-gray-500 text-center mb-6">
              💡 Your CSV includes: Username, Bio, Follower Count, Engagement Rate, Hunt Score, and more!
            </p>

            {/* Upgrade CTA */}
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-6 border border-accent/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Trophy size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Want the Full Hunting Experience?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Upgrade to Sweet Spot for interactive browsing, profile saving, Trophy Room access, and 5x more profiles!
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white px-3 py-1 rounded-full text-sm border">🎯 Interactive Dashboard</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm border">🏆 Trophy Room</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm border">📊 25K Analysis</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm border">💾 Save Profiles</span>
                  </div>
                  <Link 
                    to={`/checkout/${username}?tier=sweet-spot&upgrade=true&originalPrice=9&upgradePrice=10`}
                    className="btn btn-accent inline-flex items-center"
                  >
                    <ArrowUpRight size={18} className="mr-2" />
                    Upgrade for +$10
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500">
            <p>🔒 This download link expires in 24 hours. Save your CSV file locally!</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredProfiles = mockProfiles
    .filter(profile => {
      const matchesSearch = profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.bio.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || profile.category.name === selectedCategory;
      const matchesCountry = selectedCountry === 'All' || profile.country.code === selectedCountry;
      const matchesScore = profile.huntScore >= scoreFilter;
      const matchesEngagement = profile.engagement >= engagementFilter;
      
      return matchesSearch && matchesCategory && matchesCountry && matchesScore && matchesEngagement;
    })
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return (a[sortBy] - b[sortBy]) * order;
    });

  const totalProfiles = filteredProfiles.length;
  const totalPages = Math.ceil(totalProfiles / profilesPerPage);
  const currentProfiles = filteredProfiles.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  );

  const toggleProfileSelection = (profileId: string) => {
    setSelectedProfiles(prev => {
      const isAlreadySelected = prev.includes(profileId);
      const newSelection = isAlreadySelected
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId];
      
      if (!isAlreadySelected) {
        setBaggedCount(prev => prev + 1);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      } else {
        setBaggedCount(prev => prev - 1);
      }
      
      return newSelection;
    });
  };

  const toggleSelectAll = () => {
    if (selectedProfiles.length === currentProfiles.length) {
      setBaggedCount(prev => prev - selectedProfiles.length);
      setSelectedProfiles([]);
    } else {
      const newProfiles = currentProfiles
        .filter(p => !selectedProfiles.includes(p.id))
        .map(p => p.id);
      setBaggedCount(prev => prev + newProfiles.length);
      setSelectedProfiles(prev => [...prev, ...newProfiles]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  const selectHighScores = () => {
    const highScoreProfiles = currentProfiles
      .filter(p => p.huntScore >= 8 && !selectedProfiles.includes(p.id))
      .map(p => p.id);
    setBaggedCount(prev => prev + highScoreProfiles.length);
    setSelectedProfiles(prev => [...prev, ...highScoreProfiles]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const renderHuntScore = (score: number) => {
    return (
      <div className="flex items-center">
        <div className="flex space-x-1">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < score ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">({score}/10)</span>
      </div>
    );
  };

  const renderEngagement = (rate: number) => {
    const color = rate > 4 ? 'text-success' : rate > 2 ? 'text-secondary' : 'text-accent';
    return <span className={`font-medium ${color}`}>{rate}%</span>;
  };

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center mb-2">
              <Target size={28} className="text-primary mr-2" />
              Hunt Results: @{username}
            </h1>
            <p className="text-gray-600">
              {totalProfiles} profiles found • Hunt completed in 4:32 minutes
            </p>
          </div>
          <Link 
            to="/trophy-room"
            className="btn btn-primary flex items-center"
          >
            <Trophy size={20} className="mr-2" />
            Go to Trophy Room
          </Link>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-between">
          <button
            onClick={selectHighScores}
            className="btn btn-secondary flex items-center"
          >
            <Trophy size={18} className="mr-2" />
            Select Trophy Targets (8+)
          </button>
          
          {selectedProfiles.length > 0 && (
            <div className="text-gray-600 flex items-center">
              <Trophy size={18} className="mr-2 text-primary" />
              {selectedProfiles.length} profiles selected
            </div>
          )}
        </div>

        {/* Smart Filters */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Profiles
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search by username or bio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Smart Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Smart Sort
              </label>
              <select 
                className="input"
                onChange={(e) => {
                  switch (e.target.value) {
                    case 'trophy':
                      setSortBy('huntScore');
                      setScoreFilter(8);
                      break;
                    case 'hidden':
                      setSortBy('engagement');
                      setEngagementFilter(4);
                      break;
                    case 'local':
                      setSelectedCountry('US');
                      break;
                    case 'rising':
                      setSortBy('engagement');
                      break;
                  }
                }}
              >
                <option value="">Choose a preset...</option>
                <option value="trophy">🏆 Trophy Targets</option>
                <option value="hidden">💎 Hidden Gems</option>
                <option value="local">🌍 Local Prospects</option>
                <option value="rising">📈 Rising Stars</option>
              </select>
            </div>

            {/* Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quick Filters
              </label>
              <div className="flex gap-2">
                <button 
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === 'All' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory('All')}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === cat.name
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Hunt Score
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={scoreFilter}
                onChange={(e) => setScoreFilter(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">{scoreFilter}/10</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Engagement
              </label>
              <input
                type="range"
                min="0"
                max="8"
                step="0.1"
                value={engagementFilter}
                onChange={(e) => setEngagementFilter(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">{engagementFilter}%</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select 
                className="input"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="All">All Countries</option>
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProfiles.length === currentProfiles.length}
                    onChange={toggleSelectAll}
                    className="rounded text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Profile</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Species</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <button 
                    className="flex items-center"
                    onClick={() => {
                      if (sortBy === 'followers') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy('followers');
                        setSortOrder('desc');
                      }
                    }}
                  >
                    Followers
                    {sortBy === 'followers' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <button 
                    className="flex items-center"
                    onClick={() => {
                      if (sortBy === 'engagement') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy('engagement');
                        setSortOrder('desc');
                      }
                    }}
                  >
                    Engagement
                    {sortBy === 'engagement' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Location</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  <button 
                    className="flex items-center"
                    onClick={() => {
                      if (sortBy === 'huntScore') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy('huntScore');
                        setSortOrder('desc');
                      }
                    }}
                  >
                    Hunt Score
                    {sortBy === 'huntScore' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProfiles.map((profile) => (
                <tr key={profile.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProfiles.includes(profile.id)}
                      onChange={() => toggleProfileSelection(profile.id)}
                      className="rounded text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">@{profile.username}</div>
                      <div className="text-sm text-gray-600">{profile.bio}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center">
                      {profile.category.icon} {profile.category.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {profile.followers.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {renderEngagement(profile.engagement)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center">
                      {profile.country.flag} {profile.country.code}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {renderHuntScore(profile.huntScore)}
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      className={`btn ${
                        selectedProfiles.includes(profile.id)
                          ? 'btn-success'
                          : 'btn-secondary'
                      } btn-sm flex items-center`}
                      onClick={() => toggleProfileSelection(profile.id)}
                    >
                      {selectedProfiles.includes(profile.id) ? (
                        <>
                          <Check size={14} className="mr-1" />
                          Bagged!
                        </>
                      ) : (
                        <>
                          <Trophy size={14} className="mr-1" />
                          Bag 'Em!
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * profilesPerPage) + 1}-
            {Math.min(currentPage * profilesPerPage, totalProfiles)} of {totalProfiles} results
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="btn btn-secondary btn-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-4 py-2 rounded-lg bg-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-secondary btn-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        count={baggedCount}
      />
    </div>
  );
};

export default ResultsInterface;