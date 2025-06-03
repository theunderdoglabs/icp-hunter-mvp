export interface TwitterProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  tweets: number;
  huntScore: number;
  relevance: string;
  savedAt?: string;
}

export interface HuntResult {
  targetUsername: string;
  targetName: string;
  totalProfiles: number;
  date: string;
  profiles: TwitterProfile[];
  savedProfiles: number;
}

export interface SavedHunt {
  id: string;
  targetUsername: string;
  targetName: string;
  savedProfiles: number;
  date: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  buttonText: string;
  followerLimit: number;
}

export interface CustomList {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  profileIds: string[];
}