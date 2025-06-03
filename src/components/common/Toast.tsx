import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  count: number;
}

const Toast: React.FC<ToastProps> = ({ show, onClose, count }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs w-full z-50"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Trophy size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {count} {count === 1 ? 'profile' : 'profiles'} bagged!
              </h3>
              <p className="text-sm text-gray-600">
                Added to your Trophy Room
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/trophy-room"
              className="btn btn-primary btn-sm flex items-center justify-center"
            >
              <Trophy size={16} className="mr-1" />
              View Trophy Room
            </Link>
            <button className="btn btn-accent btn-sm flex items-center justify-center">
              <Download size={16} className="mr-1" />
              Export Results
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;