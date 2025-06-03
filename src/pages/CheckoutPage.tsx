import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import TierSelection from '../components/checkout/TierSelection';
import CheckoutForm from '../components/checkout/CheckoutForm';

const CheckoutPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedTier, setSelectedTier] = useState<'sneak_peek' | 'sweet_spot' | null>(null);

  // Extract upgrade parameters
  const isUpgrade = searchParams.get('upgrade') === 'true';
  const originalPrice = parseInt(searchParams.get('originalPrice') || '0');
  const upgradePrice = parseInt(searchParams.get('upgradePrice') || '0');

  useEffect(() => {
    // Check if tier is specified in URL query params
    const tierFromUrl = searchParams.get('tier');
    if (tierFromUrl === 'sneak-peek') {
      setSelectedTier('sneak_peek');
    } else if (tierFromUrl === 'sweet-spot') {
      setSelectedTier('sweet_spot');
    }
  }, [searchParams]);

  const handleTierSelection = (tier: 'sneak_peek' | 'sweet_spot') => {
    setSelectedTier(tier);
  };

  const handleCheckoutSuccess = (tier: 'sneak_peek' | 'sweet_spot') => {
    navigate(`/processing/${username}?tier=${tier}`);
  };

  if (!username) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen pt-8 pb-16">
      {!selectedTier ? (
        <TierSelection 
          username={username} 
          onSelectTier={handleTierSelection} 
        />
      ) : (
        <CheckoutForm 
          username={username}
          tier={selectedTier}
          onSuccess={() => handleCheckoutSuccess(selectedTier)}
          isUpgrade={isUpgrade}
          originalPrice={originalPrice}
          upgradePrice={upgradePrice}
        />
      )}
    </div>
  );
};

export default CheckoutPage;