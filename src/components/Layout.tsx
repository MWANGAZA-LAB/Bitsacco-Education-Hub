import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1">
        {children}
      </div>
      
      {/* Footer */}
      <motion.footer 
        className="bg-black/20 backdrop-blur-sm border-t border-bitsacco-500/20 py-4 mt-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <span>🪙 Bitsacco Ember Hub</span>
              <span>•</span>
              <span>Gamified Bitcoin Savings</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="hover:text-bitsacco-500 transition-colors"
                aria-label="Privacy Policy"
              >
                Privacy
              </a>
              <span>•</span>
              <a 
                href="#" 
                className="hover:text-bitsacco-500 transition-colors"
                aria-label="Terms of Service"
              >
                Terms
              </a>
              <span>•</span>
              <a 
                href="#" 
                className="hover:text-bitsacco-500 transition-colors"
                aria-label="Help and Support"
              >
                Help
              </a>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-500 mt-2">
            <p>
              Educational content only. No real Bitcoin rewards. 
              Always do your own research.
            </p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Layout;
