import React, { useState } from 'react';
import { Trophy, Download, Search, Trash2, ArrowUpDown, List, Plus, X, Folder } from 'lucide-react';
import { mockTrophyRoom } from '../data/mockData';
import { TwitterProfile, CustomList } from '../types';
import CustomListModal from '../components/trophy-room/CustomListModal';
import AddToListModal from '../components/trophy-room/AddToListModal';

const TrophyRoomPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'savedAt' | 'huntScore'>('savedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [customLists, setCustomLists] = useState<CustomList[]>([]);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [activeListFilter, setActiveListFilter] = useState<string>('all'); // 'all' or list id
  
  // Get profiles based on active filter
  const getFilteredProfiles = () => {
    let profiles = mockTrophyRoom;
    
    // Filter by active list
    if (activeListFilter !== 'all') {
      const activeList = customLists.find(list => list.id === activeListFilter);
      if (activeList) {
        profiles = profiles.filter(profile => activeList.profileIds.includes(profile.id));
      }
    }
    
    // Apply search filter
    profiles = profiles.filter(profile => 
      profile.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Apply sorting
    return profiles.sort((a, b) => {
      if (sortBy === 'savedAt') {
        const dateA = a.savedAt ? new Date(a.savedAt).getTime() : 0;
        const dateB = b.savedAt ? new Date(b.savedAt).getTime() : 0;
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a.huntScore - b.huntScore : b.huntScore - a.huntScore;
      }
    });
  };

  const filteredProfiles = getFilteredProfiles();
  
  // Toggle profile selection
  const toggleProfileSelection = (profileId: string) => {
    if (selectedProfiles.includes(profileId)) {
      setSelectedProfiles(selectedProfiles.filter(id => id !== profileId));
    } else {
      setSelectedProfiles([...selectedProfiles, profileId]);
    }
  };
  
  // Toggle sort
  const toggleSort = (field: 'savedAt' | 'huntScore') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  // Select all profiles (only filtered ones)
  const toggleSelectAll = () => {
    if (selectedProfiles.length === filteredProfiles.length) {
      setSelectedProfiles([]);
    } else {
      setSelectedProfiles(filteredProfiles.map(profile => profile.id));
    }
  };

  // Handle creating a new list
  const handleCreateList = (list: Omit<CustomList, 'id' | 'createdAt'>) => {
    const newList: CustomList = {
      ...list,
      id: `list-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setCustomLists([...customLists, newList]);
  };

  // Handle adding profiles to a list
  const handleAddToList = (listId: string, profileIds: string[]) => {
    setCustomLists(customLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          profileIds: [...new Set([...list.profileIds, ...profileIds])]
        };
      }
      return list;
    }));
    setSelectedProfiles([]); // Clear selection after adding
  };

  // Handle deleting a list
  const handleDeleteList = (listId: string) => {
    setCustomLists(customLists.filter(list => list.id !== listId));
    if (activeListFilter === listId) {
      setActiveListFilter('all');
    }
  };

  // Get active list name for display
  const getActiveListName = () => {
    if (activeListFilter === 'all') return 'All Profiles';
    const activeList = customLists.find(list => list.id === activeListFilter);
    return activeList ? activeList.name : 'All Profiles';
  };
  
  const ProfileCard = ({ profile }: { profile: TwitterProfile }) => (
    <div className="card card-hover p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={selectedProfiles.includes(profile.id)}
            onChange={() => toggleProfileSelection(profile.id)}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="w-12 h-12 rounded-full mx-4"
          />
          <div>
            <h4 className="font-bold">{profile.name}</h4>
            <p className="text-gray-500">@{profile.username}</p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {profile.bio}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className={`badge ${
            profile.huntScore > 80 ? 'badge-success' : 
            profile.huntScore > 50 ? 'badge-secondary' : 
            'badge-accent'
          }`}>
            {profile.huntScore}% Match
          </div>
          
          <div className="text-sm text-gray-500 mt-1">
            {profile.followers.toLocaleString()} followers
          </div>
          
          {profile.savedAt && (
            <div className="text-xs text-gray-500 mt-1">
              Bagged on {profile.savedAt}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Trophy size={28} className="text-primary mr-2" />
              Trophy Room
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all your bagged profiles in one place.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {selectedProfiles.length > 0 ? (
              <>
                <button 
                  onClick={() => setShowAddToListModal(true)}
                  className="btn btn-primary flex items-center"
                >
                  <List size={18} className="mr-2" />
                  Add to List
                </button>
                <button className="btn btn-secondary flex items-center">
                  <Download size={18} className="mr-2" />
                  Export Selected
                </button>
                <button className="btn btn-accent flex items-center">
                  <Trash2 size={18} className="mr-2" />
                  Remove Selected
                </button>
              </>
            ) : (
              <button 
                onClick={() => setShowCreateListModal(true)}
                className="btn btn-primary flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Create List
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Lists Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="card p-4 sticky top-4">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Folder size={20} className="text-primary mr-2" />
                Lists
              </h3>
              
              <div className="space-y-2">
                {/* All Profiles */}
                <button
                  onClick={() => setActiveListFilter('all')}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                    activeListFilter === 'all' 
                      ? 'bg-primary/10 text-primary border-2 border-primary' 
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div>
                    <div className="font-medium">📁 All Profiles</div>
                    <div className="text-sm text-gray-500">{mockTrophyRoom.length} profiles</div>
                  </div>
                </button>

                {/* Custom Lists */}
                {customLists.map(list => (
                  <div key={list.id} className="relative group">
                    <button
                      onClick={() => setActiveListFilter(list.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                        activeListFilter === list.id 
                          ? 'bg-primary/10 text-primary border-2 border-primary' 
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div>
                        <div className="font-medium">📋 {list.name}</div>
                        <div className="text-sm text-gray-500">{list.profileIds.length} profiles</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleDeleteList(list.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete list"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}

                {/* Create New List Button */}
                <button
                  onClick={() => setShowCreateListModal(true)}
                  className="w-full p-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center text-gray-500 hover:text-primary"
                >
                  <Plus size={18} className="mr-2" />
                  New List
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Current List Header */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {getActiveListName()} ({filteredProfiles.length})
              </h2>
              {activeListFilter !== 'all' && (
                <p className="text-sm text-gray-600 mt-1">
                  {customLists.find(list => list.id === activeListFilter)?.description}
                </p>
              )}
            </div>

            {/* Profiles Toolbar */}
            <div className="bg-white rounded-xl p-4 mb-6 flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search profiles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="select-all"
                    checked={selectedProfiles.length === filteredProfiles.length && filteredProfiles.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="select-all" className="ml-2 text-sm">
                    Select All
                  </label>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm mr-2">Sort by:</span>
                  <button
                    onClick={() => toggleSort('savedAt')}
                    className={`text-sm flex items-center px-3 py-1 rounded ${
                      sortBy === 'savedAt' ? 'bg-primary/10 text-primary' : 'bg-gray-100'
                    }`}
                  >
                    Date
                    {sortBy === 'savedAt' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleSort('huntScore')}
                    className={`text-sm flex items-center px-3 py-1 rounded ml-2 ${
                      sortBy === 'huntScore' ? 'bg-primary/10 text-primary' : 'bg-gray-100'
                    }`}
                  >
                    Score
                    {sortBy === 'huntScore' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Profiles Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map(profile => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <Trophy size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No profiles found</h3>
                  <p className="text-gray-500">
                    {searchTerm 
                      ? 'No profiles match your search criteria. Try a different search term.' 
                      : activeListFilter === 'all'
                        ? 'Your Trophy Room is empty. Start hunting to bag some profiles!'
                        : 'This list is empty. Add some profiles to get started!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <CustomListModal
          isOpen={showCreateListModal}
          onClose={() => setShowCreateListModal(false)}
          onCreateList={handleCreateList}
        />

        <AddToListModal
          isOpen={showAddToListModal}
          onClose={() => setShowAddToListModal(false)}
          lists={customLists}
          selectedProfiles={selectedProfiles}
          onAddToList={handleAddToList}
          onCreateNewList={() => {
            setShowAddToListModal(false);
            setShowCreateListModal(true);
          }}
        />
      </div>
    </div>
  );
};

export default TrophyRoomPage;