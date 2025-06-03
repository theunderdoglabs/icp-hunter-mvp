import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Check, ArrowRight } from 'lucide-react';

interface TierSelectionProps {
  username: string;
  onSelectTier: (tier: 'sneak_peek' | 'sweet_spot') => void;
}

const TierSelection: React.FC<TierSelectionProps> = ({ username, onSelectTier }) => {
  const tiers = [
    {
      id: 'sneak_peek',
      icon: <Target size={24} className="text-primary" />,
      name: 'Sneak Peek',
      price: 9,
      description: 'Quick hunt for smaller targets',
      features: [
        '5K followers limit',
        'Basic filters',
        'CSV export only',
        'No dashboard access',
        'Simple results modal',
        'One-time purchase'
      ]
    },
    {
      id: 'sweet_spot',
      icon: <Trophy size={24} className="text-primary" />,
      name: 'Sweet Spot',
      price: 19,
      description: 'Full hunting experience',
      popular: true,
      features: [
        '25K followers limit',
        'Advanced filters',
        'Full dashboard access',
        'Trophy Room for saved profiles',
        'CSV Export + Profile saving',
        'One-time purchase'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Choose Your Hunting Gear</h1>
            <p className="text-gray-600">
              Select the perfect gear for hunting @{username}'s followers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {tiers.map((tier) => (
              <motion.div
                key={tier.id}
                className={`card relative ${
                  tier.popular ? 'border-2 border-primary' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 right-4 bg-secondary text-dark px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {tier.icon}
                    <h3 className="text-xl font-bold ml-2">{tier.name}</h3>
                  </div>

                  <div className="mb-4">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-gray-500 ml-2">one-time</span>
                  </div>

                  <p className="text-gray-600 mb-6">{tier.description}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={20} className="text-success mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => onSelectTier(tier.id as 'sneak_peek' | 'sweet_spot')}
                    className={`w-full btn ${tier.popular ? 'btn-primary' : 'btn-secondary'} flex items-center justify-center`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Gear Up! <ArrowRight size={18} className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Feature Comparison</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="font-medium">Feature</div>
              <div className="font-medium text-center">Sneak Peek</div>
              <div className="font-medium text-center">Sweet Spot</div>

              <div>Follower Analysis</div>
              <div className="text-center">5K</div>
              <div className="text-center">25K</div>

              <div>Filter Options</div>
              <div className="text-center">Basic</div>
              <div className="text-center">Advanced</div>

              <div>Results Format</div>
              <div className="text-center">CSV Only</div>
              <div className="text-center">Interactive Dashboard</div>

              <div>Trophy Room</div>
              <div className="text-center">❌</div>
              <div className="text-center">✅</div>

              <div>Profile Saving</div>
              <div className="text-center">❌</div>
              <div className="text-center">✅</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierSelection;