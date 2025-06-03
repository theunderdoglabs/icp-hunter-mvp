import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CreditCard, Mail, AlertCircle, Check } from 'lucide-react';

interface CheckoutFormProps {
  username: string;
  tier: 'sneak_peek' | 'sweet_spot';
  onSuccess: () => void;
  isUpgrade?: boolean;
  originalPrice?: number;
  upgradePrice?: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  username, 
  tier, 
  onSuccess, 
  isUpgrade = false, 
  originalPrice = 0, 
  upgradePrice = 0 
}) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess();
    } catch (err) {
      setError('Hunt gear malfunction! Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const tierDetails = {
    sneak_peek: {
      name: 'Sneak Peek',
      price: 9,
      limit: '5K'
    },
    sweet_spot: {
      name: 'Sweet Spot',
      price: 19,
      limit: '25K'
    }
  }[tier];

  // Use upgrade price if this is an upgrade, otherwise use tier price
  const displayPrice = isUpgrade ? upgradePrice : tierDetails.price;
  const displayName = isUpgrade ? `${tierDetails.name} Upgrade` : tierDetails.name;

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <Target size={48} className="text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">
              {isUpgrade ? 'Upgrade Your Hunt!' : 'Gear Up for the Hunt!'}
            </h1>
            <p className="text-gray-600">
              {isUpgrade 
                ? `Upgrade your @${username} hunt to Trophy Room access` 
                : `Complete your purchase to start hunting @${username}'s followers`
              }
            </p>
          </div>

          <div className="card mb-8">
            {isUpgrade && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">🎯 Upgrade Benefits</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✅ Trophy Room access</li>
                  <li>✅ Dashboard view for this hunt</li>
                  <li>✅ Save and organize profiles</li>
                  <li>✅ Advanced filtering options</li>
                </ul>
              </div>
            )}
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{displayName}</h3>
                  <p className="text-sm text-gray-600">
                    {isUpgrade 
                      ? 'Unlock full Sweet Spot features for this hunt'
                      : `Up to ${tierDetails.limit} followers`
                    }
                  </p>
                  {isUpgrade && (
                    <p className="text-xs text-gray-500 mt-1">
                      Original hunt: ${originalPrice} • Upgrade: +${upgradePrice}
                    </p>
                  )}
                </div>
                <div className="text-xl font-bold">${displayPrice}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email for Results
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      className="input pl-10"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Details
                  </label>
                  <div className="relative">
                    <CreditCard size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      className="input pl-10"
                      placeholder="4242 4242 4242 4242"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <input
                      type="text"
                      className="input"
                      placeholder="MM/YY"
                      disabled
                    />
                    <input
                      type="text"
                      className="input"
                      placeholder="CVC"
                      disabled
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    className="bg-accent/10 text-accent p-4 rounded-lg flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={20} className="mr-2" />
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center"
                  disabled={isProcessing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin mr-2">
                        <Target size={20} />
                      </div>
                      Activating hunting gear...
                    </>
                  ) : (
                    <>
                      <Check size={20} className="mr-2" />
                      Complete Hunt Purchase
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>🔒 Secure payment powered by Stripe</p>
            <p className="mt-2">
              By completing this purchase, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;