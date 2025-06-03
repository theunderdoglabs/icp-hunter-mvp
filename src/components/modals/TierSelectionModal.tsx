import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Check } from 'lucide-react';

interface TierSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetAccount: string;
  onSelectTier: (tier: 'sneak_peek' | 'sweet_spot') => void;
}

const TierSelectionModal: React.FC<TierSelectionModalProps> = ({
  isOpen,
  onClose,
  targetAccount,
  onSelectTier,
}) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const tiers = [
    {
      id: 'sneak_peek',
      name: 'Sneak Peek',
      icon: '🔍',
      price: 9,
      features: [
        '5K Followers',
        'Basic Filters',
        'CSV Export Only',
        'Quick Results',
      ],
      buttonText: 'Quick Hunt!',
      buttonClass: 'btn-accent'
    },
    {
      id: 'sweet_spot',
      name: 'Sweet Spot',
      icon: '🎯',
      price: 19,
      recommended: true,
      features: [
        '25K Followers',
        'Advanced Filters',
        'Dashboard Access',
        'Trophy Room',
        'Profile Saving',
        'Priority Support',
      ],
      buttonText: 'Perfect Hunt!',
      buttonClass: 'btn-primary'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold flex items-center">
                  <Target size={24} className="text-primary mr-2" />
                  Choose Your Hunt for {targetAccount}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tiers.map((tier) => (
                    <motion.div
                      key={tier.id}
                      className={`relative rounded-xl p-6 border-2 transition-all duration-300 hover:border-primary hover:shadow-lg ${
                        tier.recommended ? 'border-primary' : 'border-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tier.recommended && (
                        <div className="absolute -top-3 right-4 bg-secondary text-dark px-4 py-1 rounded-full text-sm font-bold">
                          ⭐ RECOMMENDED
                        </div>
                      )}

                      <div className="text-2xl mb-2">
                        {tier.icon} {tier.name}
                      </div>
                      <div className="text-3xl font-bold mb-6">
                        ${tier.price}
                      </div>

                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check size={20} className="text-success mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => onSelectTier(tier.id as 'sneak_peek' | 'sweet_spot')}
                        className={`w-full btn ${tier.buttonClass} flex items-center justify-center`}
                      >
                        {tier.buttonText}
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-6 text-gray-600">
                  ℹ️ One-time payment • No subscriptions • Results in ~5 minutes
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TierSelectionModal;