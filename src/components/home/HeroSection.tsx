import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import TargetInput from './TargetInput';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (username: string) => {
    if (username.trim()) {
      navigate(`/checkout/${username}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="gradient-bg min-h-[calc(100vh-4rem)] py-8 md:py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(80vh-4rem)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                variants={itemVariants}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary block animate-pulse-glow">
                  Hunt Your Perfect
                </span>
                <span className="text-dark">Customers on Twitter</span>
                <motion.span 
                  className="inline-block ml-2 text-4xl"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  🎯
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed"
                variants={itemVariants}
              >
                No subscriptions. No commitments. 
                <span className="text-primary font-semibold"> Just results in under 5 minutes.</span>
              </motion.p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl"
            >
              <TargetInput onSubmit={handleSubmit} />
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center space-x-4 p-4 glass rounded-xl hover-lift"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-r from-primary to-orange-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                  <Target size={28} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">5,000+</p>
                  <p className="text-sm text-gray-600">Hunts completed</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-4 p-4 glass rounded-xl hover-lift"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-r from-secondary to-yellow-400 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                  <Sparkles size={28} className="text-dark" />
                </div>
                <div>
                  <p className="font-bold text-lg">One-time fee</p>
                  <p className="text-sm text-gray-600">No subscriptions</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-4 p-4 glass rounded-xl hover-lift"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-r from-accent to-pink-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                  <Zap size={28} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">Instant results</p>
                  <p className="text-sm text-gray-600">Quick analysis</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative flex justify-center items-center"
            variants={itemVariants}
          >
            <motion.div 
              className="relative animate-float"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 max-w-md w-full">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-primary to-accent rounded-full p-2 mr-3">
                    <Target size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-dark">Hunt Demo: @elonmusk</h3>
                </div>
                
                <div className="space-y-4">
                  <motion.div 
                    className="flex justify-between items-center p-4 glass rounded-xl hover-lift"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <img 
                        src="https://randomuser.me/api/portraits/men/32.jpg" 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      />
                      <div className="ml-4">
                        <p className="font-semibold text-dark">Alex Johnson</p>
                        <p className="text-sm text-gray-500">@alexjtech</p>
                      </div>
                    </div>
                    <div className="badge badge-success shadow-sm">98% Match</div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between items-center p-4 glass rounded-xl hover-lift"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <img 
                        src="https://randomuser.me/api/portraits/women/44.jpg" 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      />
                      <div className="ml-4">
                        <p className="font-semibold text-dark">Sarah Miller</p>
                        <p className="text-sm text-gray-500">@sarahm</p>
                      </div>
                    </div>
                    <div className="badge badge-success shadow-sm">95% Match</div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex justify-between items-center p-4 glass rounded-xl hover-lift"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <img 
                        src="https://randomuser.me/api/portraits/men/67.jpg" 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      />
                      <div className="ml-4">
                        <p className="font-semibold text-dark">Michael Chen</p>
                        <p className="text-sm text-gray-500">@mikechen</p>
                      </div>
                    </div>
                    <div className="badge badge-primary shadow-sm">87% Match</div>
                  </motion.div>
                  
                  <motion.button 
                    className="btn btn-accent w-full flex items-center justify-center space-x-2 text-lg font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Bag 'Em!</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-secondary to-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-2xl">🎯</span>
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-accent to-pink-500 rounded-full shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <motion.div 
                className="absolute top-1/2 -left-8 w-8 h-8 bg-gradient-to-r from-primary to-orange-500 rounded-full shadow-lg"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;