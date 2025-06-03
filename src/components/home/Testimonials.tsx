import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Marketing Director, TechStart',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'ICP Hunter helped us identify over 200 perfect-fit B2B customers in a single afternoon. The ROI was immediate!',
      stars: 5
    },
    {
      name: 'Michael Chen',
      title: 'Founder, GrowthMasters',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'The hunting metaphor is fun, but the results are seriously impressive. We\'ve completely changed our outreach strategy.',
      stars: 5
    },
    {
      name: 'Jessica Williams',
      title: 'Growth Lead, SaaSify',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      quote: 'No more guessing who our ideal customers are. ICP Hunter shows us exactly who to target on Twitter and beyond.',
      stars: 4
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Trophy Hunters Love Us</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            See what our customers say about their hunting experiences and results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card card-hover p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={i < testimonial.stars ? "text-secondary fill-secondary" : "text-gray-300"} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;