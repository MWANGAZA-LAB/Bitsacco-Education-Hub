import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { EducationCategory, EducationItem } from '@/data/educationLinks';
import EducationDropdown from './EducationDropdown';
import EducationContentPanel from './EducationContentPanel';
import EducationContentViewer from './EducationContentViewer';

interface EducationCenterProps {
  isOpen: boolean;
  onToggle: () => void;
}

const EducationCenter: React.FC<EducationCenterProps> = ({
  isOpen,
  onToggle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EducationCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null);
  const [showContentViewer, setShowContentViewer] = useState(false);

  const handleSelectCategory = (category: EducationCategory) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    setShowContentViewer(false);
  };

  const handleSelectItem = (item: EducationItem) => {
    setSelectedItem(item);
    setShowContentViewer(true);
  };

  const handleCloseContentPanel = () => {
    setSelectedCategory(null);
    setSelectedItem(null);
    setShowContentViewer(false);
  };

  const handleCloseContentViewer = () => {
    setShowContentViewer(false);
    setSelectedItem(null);
  };

  return (
    <>
      {/* Education Dropdown in Header */}
      <EducationDropdown
        onSelectCategory={handleSelectCategory}
        isOpen={isOpen}
        onToggle={onToggle}
      />

      {/* Content Panel */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 mt-2 z-40"
          >
            {/* Arrow Indicator */}
            <div className="flex justify-center mb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-2 rounded-full shadow-lg border border-gray-200"
              >
                <ArrowDown className="w-4 h-4 text-bitsacco-500" />
              </motion.div>
            </div>

            {/* Content Panel */}
            <div className="container mx-auto px-4">
              <EducationContentPanel
                category={selectedCategory}
                onClose={handleCloseContentPanel}
                onSelectItem={handleSelectItem}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline Content Viewer */}
      <EducationContentViewer
        item={selectedItem}
        isOpen={showContentViewer}
        onClose={handleCloseContentViewer}
      />
    </>
  );
};

export default EducationCenter;
