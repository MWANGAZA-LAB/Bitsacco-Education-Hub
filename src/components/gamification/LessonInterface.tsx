import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  X, 
  ArrowRight, 
  Zap, 
  Flame
} from 'lucide-react';
import { useGamificationStore } from '../../store/gamificationStore';
import { gamificationLevels } from '../../data/gamificationData';

interface LessonInterfaceProps {
  lessonId: string;
  onComplete: () => void;
  onBack: () => void;
}

const LessonInterface: React.FC<LessonInterfaceProps> = ({ lessonId, onComplete, onBack }) => {
  const { completeLesson, currentStreak, totalXP } = useGamificationStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Find the lesson
  const lesson = gamificationLevels
    .flatMap(level => level.lessons)
    .find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <button onClick={onBack} className="bg-blue-600 px-4 py-2 rounded-lg">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === lesson.questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    if (currentQuestion.type === 'multiple-choice') {
      setSelectedAnswer(answer);
    } else if (currentQuestion.type === 'matching') {
      if (Array.isArray(selectedAnswer)) {
        if (selectedAnswer.includes(answer)) {
          setSelectedAnswer(selectedAnswer.filter(a => a !== answer));
        } else {
          setSelectedAnswer([...selectedAnswer, answer]);
        }
      } else {
        setSelectedAnswer([answer]);
      }
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSelectedAnswer(value);
  };

  const checkAnswer = () => {
    let correct = false;
    
    if (currentQuestion.type === 'multiple-choice') {
      correct = selectedAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'matching') {
      if (Array.isArray(currentQuestion.correctAnswer) && Array.isArray(selectedAnswer)) {
        correct = currentQuestion.correctAnswer.length === selectedAnswer.length &&
                 currentQuestion.correctAnswer.every(answer => selectedAnswer.includes(answer));
      }
    } else if (currentQuestion.type === 'input') {
      correct = true; // Input questions are always correct for learning purposes
    }

    setIsCorrect(correct);
    setShowExplanation(true);
    
    if (correct) {
      const xp = lesson.xpReward + (currentStreak > 0 ? lesson.streakBonus : 0);
      setEarnedXP(xp);
    }
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      // Lesson completed
      if (isCorrect) {
        completeLesson(lessonId, earnedXP);
        setShowCelebration(true);
        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer([]);
      setShowExplanation(false);
      setIsCorrect(false);
      setInputValue('');
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-600/20'
                    : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === option
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswer === option && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-white font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 'matching':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options?.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
                      ? 'border-green-500 bg-green-600/20'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <span className="text-white font-medium">{option}</span>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'input':
        return (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <label className="block text-gray-300 text-sm mb-2">
                {currentQuestion.question}
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        );

      default:
        return <div className="text-white">Question type not supported</div>;
    }
  };

  const renderExplanation = () => {
    if (!showExplanation) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-6 p-4 rounded-lg border-2 ${
          isCorrect 
            ? 'border-green-500 bg-green-600/20' 
            : 'border-red-500 bg-red-600/20'
        }`}
      >
        <div className="flex items-center space-x-3 mb-3">
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 text-green-400" />
          ) : (
            <X className="w-6 h-6 text-red-400" />
          )}
          <span className={`font-semibold ${
            isCorrect ? 'text-green-400' : 'text-red-400'
          }`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </span>
        </div>
        <p className="text-gray-300">{currentQuestion.explanation}</p>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Back to Course</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>{totalXP} XP</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Flame className="w-5 h-5 text-orange-400" />
              <span>{currentStreak}</span>
            </div>
          </div>
        </div>

        {/* Lesson Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">
              Question {currentQuestionIndex + 1} of {lesson.questions.length}
            </span>
            <span className="text-gray-400 text-sm">
              {Math.round(((currentQuestionIndex + 1) / lesson.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / lesson.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Lesson Content */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
        >
          {/* Lesson Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{lesson.emoji}</div>
            <h1 className="text-3xl font-bold text-white mb-4">{lesson.title}</h1>
            <p className="text-gray-300 text-lg mb-4">{lesson.content}</p>
            <div className="text-sm text-gray-400">{lesson.funnyMessage}</div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-3">
              <span className="text-2xl">{currentQuestion.emoji}</span>
              <span>{currentQuestion.question}</span>
            </h2>
            {renderQuestion()}
          </div>

          {/* Explanation */}
          {renderExplanation()}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {!showExplanation ? (
              <button
                onClick={checkAnswer}
                disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Check Answer</span>
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <span>{isLastQuestion ? 'Complete Lesson' : 'Next Question'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* XP and Streak Info */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-2">{lesson.xpReward}</div>
              <div className="text-gray-400 text-sm">XP Reward</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-2">+{lesson.streakBonus}</div>
              <div className="text-gray-400 text-sm">Streak Bonus</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-2">
                {lesson.xpReward + (currentStreak > 0 ? lesson.streakBonus : 0)}
              </div>
              <div className="text-gray-400 text-sm">Total XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-12 text-center text-white"
            >
              <div className="text-8xl mb-6">🎉</div>
              <h1 className="text-4xl font-bold mb-4">Lesson Complete!</h1>
              <p className="text-xl mb-6">Great job! You've earned {earnedXP} XP!</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">{earnedXP}</div>
                  <div className="text-sm">XP Earned</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">{currentStreak + 1}</div>
                  <div className="text-sm">New Streak</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold">🔥</div>
                  <div className="text-sm">Keep Going!</div>
                </div>
              </div>
              
              <div className="text-lg">
                <p>Your streak is on fire! 🔥</p>
                <p className="text-sm mt-2">Don't break the chain!</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LessonInterface;
