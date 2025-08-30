import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, FileText, Headphones, Video, ArrowLeft } from 'lucide-react';
import { EducationCategory, EducationItem } from '../data/educationLinks';

interface EducationContentPanelProps {
  category: EducationCategory | null;
  onClose: () => void;
  onSelectItem: (item: EducationItem) => void;
}

const EducationContentPanel: React.FC<EducationContentPanelProps> = ({
  category,
  onClose,
  onSelectItem
}) => {
  if (!category) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'podcast':
        return <Headphones className="w-5 h-5" />;
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'text-blue-600 bg-blue-50';
      case 'video':
        return 'text-red-600 bg-red-50';
      case 'podcast':
        return 'text-purple-600 bg-purple-50';
      case 'pdf':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-bitsacco-500 to-bitsacco-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close education panel"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-2xl">{category.icon}</span>
            <div>
              <h2 className="text-xl font-bold">{category.title}</h2>
              <p className="text-bitsacco-100 text-sm mt-1">{category.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close education panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Available Resources ({category.items.length})
          </h3>
          <p className="text-gray-600 text-sm">
            Click on any resource to view it inline or open in a new tab
          </p>
        </div>

        <div className="space-y-4">
          {category.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
              onClick={() => onSelectItem(item)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-gray-900 group-hover:text-bitsacco-600 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-2 ml-2">
                      {item.duration && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {item.duration}
                        </span>
                      )}
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-bitsacco-500 transition-colors" />
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>All resources are curated for educational purposes</span>
            <div className="flex items-center space-x-4">
              <span>📌 {category.items.length} resources</span>
              <span>🎓 {category.title}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationContentPanel;
