import React from 'react';
import { Target, Filter, ThumbsUp } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Target size={32} className="text-primary" />,
      title: 'Enter Target',
      description: 'Start by entering a Twitter/X username whose followers you want to analyze as potential customers.'
    },
    {
      icon: <Filter size={32} className="text-secondary" />,
      title: 'We Hunt',
      description: 'Our algorithm analyzes follower profiles, engagement, and content to identify ideal customer matches.'
    },
    {
      icon: <ThumbsUp size={32} className="text-accent" />,
      title: 'You Choose',
      description: 'Review and save the best matches to your Trophy Room or export them as CSV for your marketing campaigns.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">How The Hunt Works</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our simple 3-step process helps you find your ideal customer profiles on Twitter/X without the hassle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="card card-hover flex flex-col items-center text-center p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-light rounded-bl-3xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{index + 1}</span>
              </div>
              
              <div className="w-16 h-16 rounded-full bg-light flex items-center justify-center mb-6">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;