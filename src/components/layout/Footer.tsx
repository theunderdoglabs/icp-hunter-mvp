import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Product */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <Target size={24} className="text-primary mr-2" />
              <span className="text-xl font-bold">ICP Hunter</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Hunt your perfect customers, one analysis at a time
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/theunderdoglabs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="mailto:hunt@icphunter.com"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Hunting Tips */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hunting Tips</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tips/target-selection" className="text-gray-600 hover:text-primary transition-colors">
                  Target Selection
                </Link>
              </li>
              <li>
                <Link to="/tips/strategies" className="text-gray-600 hover:text-primary transition-colors">
                  Hunt Strategies
                </Link>
              </li>
              <li>
                <Link to="/tips/best-practices" className="text-gray-600 hover:text-primary transition-colors">
                  Best Practices
                </Link>
              </li>
              <li>
                <Link to="/tips/case-studies" className="text-gray-600 hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-600 hover:text-primary transition-colors">
                  Status Page
                </Link>
              </li>
              <li>
                <Link to="/bug-bounty" className="text-gray-600 hover:text-primary transition-colors">
                  Bug Bounty
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <a 
                  href="https://twitter.com/theunderdoglabs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 text-center text-gray-600">
          <p className="flex items-center justify-center">
            Made with <Heart size={16} className="text-accent mx-1" /> by @theunderdoglabs • © 2025 ICP Hunter
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;