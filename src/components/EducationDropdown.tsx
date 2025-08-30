import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Video, Headphones, FileText } from 'lucide-react';
import { getAllCategories, EducationCategory } from '../data/educationLinks';

interface EducationDropdownProps {
  onSelectCategory: (category: EducationCategory) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EducationDropdown: React.FC<EducationDropdownProps> = ({
  onSelectCategory,
  isOpen,
  onToggle
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categories = getAllCategories();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'podcast':
        return <Headphones className="w-4 h-4" />;
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 text-white hover:text-bitsacco-400 transition-colors duration-200 font-medium"
        aria-label="Open Education Center"
        aria-expanded={isOpen}
      >
        <BookOpen className="w-5 h-5" />
        <span>Education Center</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-bitsacco-500" />
                Learning Resources
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onSelectCategory(category);
                      onToggle();
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-bitsacco-600 transition-colors">
                            {category.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <span className="text-xs">
                          {category.items.length} items
                        </span>
                        <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                      </div>
                    </div>
                    
                    {/* Preview of content types */}
                    <div className="flex items-center space-x-2 mt-2">
                      {Array.from(new Set(category.items.map(item => item.type))).map(type => (
                        <div key={type} className="flex items-center space-x-1 text-xs text-gray-400">
                          {getTypeIcon(type)}
                          <span className="capitalize">{type}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationDropdown;
