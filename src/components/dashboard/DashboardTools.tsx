import React from 'react';
import { motion } from 'framer-motion';
import { DashboardTool } from '../../types/dashboard';

interface DashboardToolsProps {
  tools: DashboardTool[];
  onToolClick: (toolId: string) => void;
}

const DashboardTools: React.FC<DashboardToolsProps> = ({ tools, onToolClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-white">Financial Tools</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-700 rounded-lg p-4 lg:p-6 border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
            onClick={() => onToolClick(tool.id)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${tool.color}`}>
                {tool.icon}
              </div>
              <h4 className="text-white font-semibold">{tool.name}</h4>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {tool.description}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Open Tool
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardTools;
