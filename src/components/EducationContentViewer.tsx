import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, Volume2, Download, Share2 } from 'lucide-react';
import { EducationItem } from '../data/educationLinks';

interface EducationContentViewerProps {
  item: EducationItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const EducationContentViewer: React.FC<EducationContentViewerProps> = ({
  item,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const getSpotifyEmbedUrl = (url: string) => {
    const episodeId = url.match(/episode\/([^?]+)/)?.[1];
    return episodeId ? `https://open.spotify.com/embed/episode/${episodeId}` : url;
  };

  const renderContent = () => {
    if (!item) return null;

    switch (item.type) {
      case 'video':
        return (
          <div className="w-full h-full">
            <iframe
              src={getYouTubeEmbedUrl(item.url)}
              title={item.title}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      case 'podcast':
        return (
          <div className="w-full h-full">
            <iframe
              src={getSpotifyEmbedUrl(item.url)}
              title={item.title}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="encrypted-media"
            />
          </div>
        );

      case 'pdf':
        return (
          <div className="w-full h-full">
            <iframe
              src={`${item.url}#toolbar=0`}
              title={item.title}
              className="w-full h-full rounded-lg"
              frameBorder="0"
            />
          </div>
        );

      case 'article':
      default:
        return (
          <div className="w-full h-full">
            <iframe
              src={item.url}
              title={item.title}
              className="w-full h-full rounded-lg"
              frameBorder="0"
            />
          </div>
        );
    }
  };

  const handleExternalOpen = () => {
    window.open(item?.url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (navigator.share && item) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description || `Check out this ${item.type}: ${item.title}`,
          url: item.url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(item?.url || '');
    }
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-bitsacco-100 rounded-lg">
                  {item.type === 'video' && <Play className="w-5 h-5 text-bitsacco-600" />}
                  {item.type === 'podcast' && <Volume2 className="w-5 h-5 text-bitsacco-600" />}
                  {item.type === 'article' && <ExternalLink className="w-5 h-5 text-bitsacco-600" />}
                  {item.type === 'pdf' && <Download className="w-5 h-5 text-bitsacco-600" />}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                  {item.source && (
                    <p className="text-sm text-gray-500">Source: {item.source}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Share content"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleExternalOpen}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close viewer"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {item.description && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{item.description}</p>
                  {item.duration && (
                    <p className="text-sm text-gray-500 mt-2">
                      Duration: {item.duration}
                    </p>
                  )}
                </div>
              )}
              
              <div className="h-full">
                {renderContent()}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="capitalize">{item.type} • {item.source}</span>
                <button
                  onClick={handleExternalOpen}
                  className="text-bitsacco-600 hover:text-bitsacco-700 font-medium"
                >
                  Open in new tab →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EducationContentViewer;
