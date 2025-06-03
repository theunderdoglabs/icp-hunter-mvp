import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Users, Filter, Database, Check, Trophy, Download } from 'lucide-react';

interface ProcessingStage {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: number;
}

const ProcessingPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [profilesScanned, setProfilesScanned] = useState(0);
  const [potentialTargets, setPotentialTargets] = useState(0);
  const [highValueProspects, setHighValueProspects] = useState(0);

  const tier = searchParams.get('tier') as 'sneak-peek' | 'sweet-spot' | null;
  const isSneak = tier === 'sneak-peek';
  const maxProfiles = isSneak ? 5000 : 25000;

  const stages: ProcessingStage[] = [
    {
      icon: <Target size={24} className="text-primary" />,
      title: '🎯 Gear Up Success!',
      description: `Your ${isSneak ? 'Sneak Peek' : 'Sweet Spot'} hunting license is activated!`,
      duration: 2000
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: `🔍 Hunting @${username}`,
      description: `Scanning up to ${maxProfiles.toLocaleString()} followers and analyzing patterns...`,
      duration: isSneak ? 3000 : 5000
    },
    {
      icon: <Filter size={24} className="text-primary" />,
      title: '🧠 Analyzing Profiles',
      description: 'Identifying potential targets and calculating relevance...',
      duration: isSneak ? 2500 : 4000
    },
    {
      icon: <Database size={24} className="text-primary" />,
      title: '📊 Calculating Hunt Scores',
      description: `Scoring profiles and preparing your ${isSneak ? 'CSV download' : 'trophy collection'}...`,
      duration: isSneak ? 2000 : 3000
    },
    {
      icon: isSneak ? <Download size={24} className="text-primary" /> : <Trophy size={24} className="text-primary" />,
      title: isSneak ? '📥 CSV Ready!' : '🏆 Hunt Successful!',
      description: isSneak ? 'Your CSV file is ready for download!' : 'Your trophy collection is ready!',
      duration: 1000
    }
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let progressTimer: ReturnType<typeof setInterval>;

    const simulateProgress = () => {
      progressTimer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (isSneak ? 1.5 : 1); // Sneak Peek processes faster
          if (newProgress >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return newProgress;
        });

        // Simulate profile scanning
        if (currentStage === 1) {
          setProfilesScanned(prev => Math.min(prev + (isSneak ? 150 : 500), maxProfiles));
        }
        // Simulate finding targets
        else if (currentStage === 2) {
          const maxTargets = isSneak ? 200 : 847;
          const maxHighValue = isSneak ? 35 : 124;
          setPotentialTargets(prev => Math.min(prev + (isSneak ? 8 : 15), maxTargets));
          setHighValueProspects(prev => Math.min(prev + (isSneak ? 2 : 5), maxHighValue));
        }
      }, 50);
    };

    const advanceStage = () => {
      if (currentStage < stages.length - 1) {
        timer = setTimeout(() => {
          setCurrentStage(prev => prev + 1);
          simulateProgress();
        }, stages[currentStage].duration);
      } else {
        // Navigate to results when complete
        setTimeout(() => {
          navigate(`/results/${username}?tier=${tier}`);
        }, 1000);
      }
    };

    // Start the process
    simulateProgress();
    advanceStage();

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [currentStage, navigate, username, stages.length, tier, isSneak, maxProfiles]);

  // Error simulation (uncomment to test)
  // useEffect(() => {
  //   if (progress > 50 && Math.random() > 0.8) {
  //     setError("Our hunting gear needs maintenance. Trying again...");
  //   }
  // }, [progress]);

  const stage = stages[currentStage];

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <motion.div 
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Tier Badge */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${
            isSneak 
              ? 'bg-primary/20 text-primary border border-primary/30' 
              : 'bg-gradient-to-r from-accent to-secondary text-white shadow-lg'
          }`}>
            {isSneak ? <Target size={16} className="mr-2" /> : <Trophy size={16} className="mr-2" />}
            <span className="font-semibold">
              {isSneak ? 'Sneak Peek Hunt' : 'Sweet Spot Hunt'}
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{stage.title}</h1>
          <p className="text-gray-600">{stage.description}</p>
        </div>

        <div className="glass rounded-2xl p-8 border border-white/20">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${
                  isSneak 
                    ? 'bg-gradient-to-r from-primary to-orange-500' 
                    : 'bg-gradient-to-r from-accent to-secondary'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>{progress.toFixed(0)}% Complete</span>
              <span>ETA: {Math.max(0, Math.ceil((100 - progress) * 0.8))}s</span>
            </div>
          </div>

          {/* Processing Stages */}
          <div className="space-y-6">
            {stages.map((s, index) => (
              <div key={index} className="flex items-start">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  index < currentStage 
                    ? 'bg-success text-white shadow-lg' 
                    : index === currentStage 
                      ? `${isSneak ? 'bg-primary' : 'bg-accent'} text-white animate-pulse shadow-lg` 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  {index < currentStage ? <Check size={20} /> : s.icon}
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className={`font-bold ${
                    index <= currentStage ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {s.title}
                  </h3>
                  <p className={`text-sm ${
                    index <= currentStage ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {s.description}
                  </p>
                  
                  {index === currentStage && (
                    <motion.div 
                      className="mt-3 p-3 bg-light/50 rounded-lg"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentStage === 1 && (
                        <p className="text-sm text-primary animate-pulse font-medium">
                          Profiles scanned: {profilesScanned.toLocaleString()}/{maxProfiles.toLocaleString()}
                        </p>
                      )}
                      {currentStage === 2 && (
                        <div className="space-y-1 text-sm text-primary font-medium">
                          <p>• Potential targets found: {potentialTargets}</p>
                          <p>• High-value prospects: {highValueProspects}</p>
                        </div>
                      )}
                      {currentStage === 3 && (
                        <p className="text-sm text-primary animate-pulse font-medium">
                          Calculating relevance scores and filtering best matches...
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tier Info */}
          <div className="mt-8 p-4 bg-gradient-to-r from-light to-white rounded-xl border border-gray-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Hunt Type:</span>
              <span className="font-semibold text-primary">
                {isSneak ? 'Sneak Peek ($9)' : 'Sweet Spot ($19)'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600">Analysis Scope:</span>
              <span className="font-semibold">
                {maxProfiles.toLocaleString()} followers
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600">Result Format:</span>
              <span className="font-semibold">
                {isSneak ? 'CSV Download' : 'Interactive Dashboard + CSV'}
              </span>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <motion.div 
              className="mt-6 p-4 bg-accent/10 text-accent rounded-lg border border-accent/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-medium">⚠️ {error}</p>
            </motion.div>
          )}
        </div>

        {/* Fun Facts */}
        <motion.div 
          className="mt-6 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p>💡 Fun fact: We analyze over 50 data points per profile to find your perfect matches!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProcessingPage;