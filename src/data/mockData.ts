import { TwitterProfile, HuntResult, SavedHunt, PricingTier } from '../types';

// Generate mock Twitter profiles
const generateMockProfiles = (count: number): TwitterProfile[] => {
  const profiles: TwitterProfile[] = [];
  
  for (let i = 0; i < count; i++) {
    const huntScore = Math.floor(Math.random() * 100);
    let relevance = 'Low';
    
    if (huntScore > 80) relevance = 'High';
    else if (huntScore > 50) relevance = 'Medium';
    
    profiles.push({
      id: `profile-${i}`,
      username: `user${i}`,
      name: `User ${i}`,
      avatar: `https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i % 100}.jpg`,
      bio: `This is a mock bio for user ${i}. Passionate about tech, startups, and innovation.`,
      followers: Math.floor(Math.random() * 10000),
      following: Math.floor(Math.random() * 1000),
      tweets: Math.floor(Math.random() * 5000),
      huntScore,
      relevance,
    });
  }
  
  return profiles.sort((a, b) => b.huntScore - a.huntScore);
};

// Mock hunt results
export const mockElonHuntResult: HuntResult = {
  targetUsername: 'elonmusk',
  targetName: 'Elon Musk',
  totalProfiles: 847,
  date: '2025-06-15',
  profiles: generateMockProfiles(847),
  savedProfiles: 12,
};

export const mockNavalHuntResult: HuntResult = {
  targetUsername: 'naval',
  targetName: 'Naval Ravikant',
  totalProfiles: 632,
  date: '2025-06-10',
  profiles: generateMockProfiles(632),
  savedProfiles: 8,
};

export const mockGregHuntResult: HuntResult = {
  targetUsername: 'gregisenberg',
  targetName: 'Greg Isenberg',
  totalProfiles: 415,
  date: '2025-06-05',
  profiles: generateMockProfiles(415),
  savedProfiles: 3,
};

// Mock saved hunts
export const mockSavedHunts: SavedHunt[] = [
  {
    id: 'hunt-1',
    targetUsername: 'elonmusk',
    targetName: 'Elon Musk',
    savedProfiles: 12,
    date: '2025-06-15',
  },
  {
    id: 'hunt-2',
    targetUsername: 'naval',
    targetName: 'Naval Ravikant',
    savedProfiles: 8,
    date: '2025-06-10',
  },
  {
    id: 'hunt-3',
    targetUsername: 'gregisenberg',
    targetName: 'Greg Isenberg',
    savedProfiles: 3,
    date: '2025-06-05',
  },
];

// Mock trophy room data (saved profiles)
export const mockTrophyRoom: TwitterProfile[] = [
  ...generateMockProfiles(23).map(profile => ({
    ...profile,
    savedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  })),
];

// Pricing tiers
export const pricingTiers: PricingTier[] = [
  {
    id: 'sneak-peek',
    name: 'Sneak Peek',
    description: 'Quick hunt for smaller targets',
    price: 9,
    features: [
      '5K followers limit',
      'Basic filters',
      'CSV download ONLY',
      'No dashboard access',
      'Simple results modal',
      'One-time purchase'
    ],
    buttonText: 'Gear Up!',
    followerLimit: 5000
  },
  {
    id: 'sweet-spot',
    name: 'Sweet Spot',
    description: 'Full hunting experience',
    price: 19,
    popular: true,
    features: [
      '25K followers limit',
      'Advanced filters',
      'Full dashboard access',
      'Trophy Room for saved profiles',
      'CSV Export + Profile saving',
      'One-time purchase'
    ],
    buttonText: 'Gear Up!',
    followerLimit: 25000
  }
];