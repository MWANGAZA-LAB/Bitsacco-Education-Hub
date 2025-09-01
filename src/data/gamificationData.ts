import { GamificationLevel, Badge } from '../types/gamification';

export const gamificationLevels: GamificationLevel[] = [
  {
    id: 1,
    name: "Money Foundations",
    description: "Learn the basics of money, inflation, and why saving matters",
    icon: "💰",
    color: "bg-green-500",
    requiredXP: 0,
    unlocked: true,
    completed: false,
    progress: 0,
    lessons: [
      {
        id: "day-1",
        title: "Why Saving Matters 💰",
        content: "Money doesn't grow on trees, but it can grow in your pocket if you save it!",
        type: "multiple-choice",
        xpReward: 10,
        completed: false,
        streakBonus: 5,
        emoji: "💰",
        funnyMessage: "Even bananas don't last forever 🍌💸",
        questions: [
          {
            id: "q1-1",
            question: "Where is the BEST place to keep your money?",
            type: "multiple-choice",
            options: ["Under your mattress", "In a bank", "In Bitsacco", "In your sock"],
            correctAnswer: "In Bitsacco",
            explanation: "Bitsacco keeps your money safe AND helps it grow!",
            emoji: "🏦"
          }
        ]
      },
      {
        id: "day-2",
        title: "Inflation Explained with Chapati 🍞",
        content: "Your money loses value over time - like chapati getting smaller!",
        type: "multiple-choice",
        xpReward: 10,
        completed: false,
        streakBonus: 5,
        emoji: "🍞",
        funnyMessage: "If 50 bob buys 2 chapo today, how many in 5 years?",
        questions: [
          {
            id: "q1-2",
            question: "If 50 shillings buys 2 chapati today, how many will it buy in 5 years?",
            type: "multiple-choice",
            options: ["2 chapati", "1 chapati", "3 chapati", "0 chapati"],
            correctAnswer: "1 chapati",
            explanation: "Inflation makes money worth less over time!",
            emoji: "📈"
          }
        ]
      },
      {
        id: "day-3",
        title: "What is Money? 🪙",
        content: "Money is just a tool to trade things - like swapping goats for phones!",
        type: "matching",
        xpReward: 10,
        completed: false,
        streakBonus: 5,
        emoji: "🪙",
        funnyMessage: "Money talks, but does it walk? 🚶‍♂️💸",
        questions: [
          {
            id: "q1-3",
            question: "Match the money type with its description:",
            type: "matching",
            options: ["Cash", "Digital Money", "Bitcoin"],
            correctAnswer: ["Physical coins and notes", "Money in your phone", "Global digital money"],
            explanation: "Money comes in many forms, but they all have value!",
            emoji: "💳"
          }
        ]
      },
      {
        id: "day-4",
        title: "The Power of Compound Interest 🚀",
        content: "Your money can work for you while you sleep!",
        type: "multiple-choice",
        xpReward: 10,
        completed: false,
        streakBonus: 5,
        emoji: "🚀",
        funnyMessage: "Money that makes money? That's like having a money robot! 🤖💰",
        questions: [
          {
            id: "q1-4",
            question: "If you save 100 shillings daily for 30 days, how much will you have?",
            type: "multiple-choice",
            options: ["3,000 shillings", "3,100 shillings", "3,500 shillings", "It depends on interest"],
            correctAnswer: "It depends on interest",
            explanation: "Compound interest can make your money grow faster!",
            emoji: "📊"
          }
        ]
      },
      {
        id: "day-5",
        title: "Your First Savings Goal 🎯",
        content: "Set a target and watch your money grow!",
        type: "input",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🎯",
        funnyMessage: "Goals are like GPS for your money - they show you where to go! 🗺️",
        questions: [
          {
            id: "q1-5",
            question: "What's your first savings goal? (e.g., 1000 shillings for a new phone)",
            type: "input",
            correctAnswer: "any",
            explanation: "Great! Now you have a target to aim for!",
            emoji: "🎯"
          }
        ]
      },
      {
        id: "day-6",
        title: "Emergency Fund Basics 🚨",
        content: "Life happens - be ready for surprises!",
        type: "multiple-choice",
        xpReward: 10,
        completed: false,
        streakBonus: 5,
        emoji: "🚨",
        funnyMessage: "Emergencies are like uninvited guests - always show up at the wrong time! 😅",
        questions: [
          {
            id: "q1-6",
            question: "How much should you save for emergencies?",
            type: "multiple-choice",
            options: ["Nothing", "1 month of expenses", "3-6 months of expenses", "1 year of expenses"],
            correctAnswer: "3-6 months of expenses",
            explanation: "This gives you time to recover from unexpected events!",
            emoji: "🛡️"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Bitcoin Basics",
    description: "Understand Bitcoin, decentralization, and digital money",
    icon: "🟧",
    color: "bg-orange-500",
    requiredXP: 60,
    unlocked: false,
    completed: false,
    progress: 0,
    lessons: [
      {
        id: "day-7",
        title: "What is Bitcoin? 🟧",
        content: "Bitcoin is digital money that no one controls - like having your own bank!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🟧",
        funnyMessage: "Bitcoin is like money that lives on the internet! 🌐💰",
        questions: [
          {
            id: "q2-1",
            question: "Who controls Bitcoin?",
            type: "multiple-choice",
            options: ["The government", "Banks", "No one", "Elon Musk"],
            correctAnswer: "No one",
            explanation: "Bitcoin is decentralized - no single person or organization controls it!",
            emoji: "🔓"
          }
        ]
      },
      {
        id: "day-8",
        title: "Decentralization Explained 🌐",
        content: "Power to the people - not just the banks!",
        type: "matching",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🌐",
        funnyMessage: "Decentralized = like a party where everyone brings food, not just one person! 🎉",
        questions: [
          {
            id: "q2-2",
            question: "Match the concept with its description:",
            type: "matching",
            options: ["Centralized", "Decentralized"],
            correctAnswer: ["One person controls everything", "Many people share control"],
            explanation: "Decentralization makes systems more fair and secure!",
            emoji: "⚖️"
          }
        ]
      },
      {
        id: "day-9",
        title: "Bitcoin vs Traditional Money 💱",
        content: "Compare the old way with the new way!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "💱",
        funnyMessage: "Traditional money = like a landline phone, Bitcoin = like a smartphone! 📱",
        questions: [
          {
            id: "q2-3",
            question: "Which is faster for international transfers?",
            type: "multiple-choice",
            options: ["Bank transfer", "Bitcoin", "Cash in envelope", "Pigeon with money"],
            correctAnswer: "Bitcoin",
            explanation: "Bitcoin transfers happen in minutes, not days!",
            emoji: "⚡"
          }
        ]
      },
      {
        id: "day-10",
        title: "Bitcoin Security 🔐",
        content: "Keep your digital money safe!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🔐",
        funnyMessage: "Your Bitcoin password is like your house key - don't lose it! 🏠🔑",
        questions: [
          {
            id: "q2-4",
            question: "What's the most important thing to protect?",
            type: "multiple-choice",
            options: ["Your phone", "Your Bitcoin private key", "Your social media password", "Your favorite emoji"],
            correctAnswer: "Your Bitcoin private key",
            explanation: "Lose your private key, lose your Bitcoin forever!",
            emoji: "⚠️"
          }
        ]
      },
      {
        id: "day-11",
        title: "Bitcoin Mining ⛏️",
        content: "How new Bitcoins are created and transactions are verified",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "⛏️",
        funnyMessage: "Mining Bitcoin is like solving a giant puzzle for money! 🧩💰",
        questions: [
          {
            id: "q2-5",
            question: "What do Bitcoin miners do?",
            type: "multiple-choice",
            options: ["Dig for gold", "Verify transactions", "Print money", "Make coffee"],
            correctAnswer: "Verify transactions",
            explanation: "Miners keep the Bitcoin network secure and running!",
            emoji: "🔒"
          }
        ]
      },
      {
        id: "day-12",
        title: "Bitcoin Wallets 💼",
        content: "Where you store your digital money",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "💼",
        funnyMessage: "A Bitcoin wallet is like a digital piggy bank that fits in your phone! 📱🐷",
        questions: [
          {
            id: "q2-6",
            question: "What's the safest type of Bitcoin wallet?",
            type: "multiple-choice",
            options: ["Online wallet", "Hardware wallet", "Paper wallet", "Memory wallet"],
            correctAnswer: "Hardware wallet",
            explanation: "Hardware wallets keep your Bitcoin offline and secure!",
            emoji: "🛡️"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Smart Saving Habits",
    description: "Build daily saving habits and understand the psychology of money",
    icon: "🔥",
    color: "bg-red-500",
    requiredXP: 120,
    unlocked: false,
    completed: false,
    progress: 0,
    lessons: [
      {
        id: "day-13",
        title: "Daily vs Weekly Saving 📅",
        content: "Small amounts add up to big results!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "📅",
        funnyMessage: "Saving daily is like eating vegetables - boring but good for you! 🥬",
        questions: [
          {
            id: "q3-1",
            question: "Which saves more money in a month?",
            type: "multiple-choice",
            options: ["100 shillings daily", "1000 shillings weekly", "They're the same", "Depends on the month"],
            correctAnswer: "100 shillings daily",
            explanation: "Daily saving builds better habits and compounds faster!",
            emoji: "📊"
          }
        ]
      },
      {
        id: "day-14",
        title: "The Psychology of Saving 🧠",
        content: "Why we spend when we should save, and how to fix it!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🧠",
        funnyMessage: "Your brain is like a toddler - it wants candy now, not vegetables later! 🍭",
        questions: [
          {
            id: "q3-2",
            question: "Why do people spend instead of save?",
            type: "multiple-choice",
            options: ["They're stupid", "Instant gratification feels better", "They don't have money", "All of the above"],
            correctAnswer: "Instant gratification feels better",
            explanation: "Our brains are wired to prefer immediate rewards!",
            emoji: "🎯"
          }
        ]
      },
      {
        id: "day-15",
        title: "Setting SMART Goals 🎯",
        content: "Specific, Measurable, Achievable, Relevant, Time-bound goals!",
        type: "input",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🎯",
        funnyMessage: "SMART goals are like GPS for your money - they show you exactly where to go! 🗺️",
        questions: [
          {
            id: "q3-3",
            question: "What's your SMART savings goal? (e.g., Save 5000 shillings for a laptop by December)",
            type: "input",
            correctAnswer: "any",
            explanation: "Perfect! Now you have a clear target to work towards!",
            emoji: "🎯"
          }
        ]
      },
      {
        id: "day-16",
        title: "The 50/30/20 Rule 📊",
        content: "A simple way to budget your money!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "📊",
        funnyMessage: "50/30/20 = 50% needs, 30% wants, 20% savings. Math that makes sense! 🧮",
        questions: [
          {
            id: "q3-4",
            question: "What percentage should go to savings in the 50/30/20 rule?",
            type: "multiple-choice",
            options: ["10%", "20%", "30%", "50%"],
            correctAnswer: "20%",
            explanation: "20% for savings ensures you're building wealth!",
            emoji: "💰"
          }
        ]
      },
      {
        id: "day-17",
        title: "Automating Your Savings 🤖",
        content: "Set it and forget it - let technology do the work!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🤖",
        funnyMessage: "Automation is like having a robot butler for your money! 🤖💼",
        questions: [
          {
            id: "q3-5",
            question: "What's the best way to ensure you save regularly?",
            type: "multiple-choice",
            options: ["Remember to do it", "Automate transfers", "Ask your friend to remind you", "Hope for the best"],
            correctAnswer: "Automate transfers",
            explanation: "Automation removes the need to remember and makes saving effortless!",
            emoji: "⚡"
          }
        ]
      },
      {
        id: "day-18",
        title: "Your First Streak Challenge 🔥",
        content: "Start building your saving streak today!",
        type: "input",
        xpReward: 20,
        completed: false,
        streakBonus: 10,
        emoji: "🔥",
        funnyMessage: "Streaks are like fire - once you start them, they're hard to stop! 🔥",
        questions: [
          {
            id: "q3-6",
            question: "How much will you save today to start your streak?",
            type: "input",
            correctAnswer: "any",
            explanation: "Amazing! You've started your saving streak! 🔥",
            emoji: "🔥"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Using Bitsacco",
    description: "Learn how to use Bitsacco for real savings and goal tracking",
    icon: "🏦",
    color: "bg-blue-500",
    requiredXP: 180,
    unlocked: false,
    completed: false,
    progress: 0,
    lessons: [
      {
        id: "day-19",
        title: "What is Bitsacco? 🏦",
        content: "Bitsacco is your digital savings partner - like having a bank in your phone!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🏦",
        funnyMessage: "Bitsacco = Bank + Technology + You = Financial Superhero! 🦸‍♂️",
        questions: [
          {
            id: "q4-1",
            question: "What makes Bitsacco different from traditional banks?",
            type: "multiple-choice",
            options: ["It's free", "It's digital-first", "It's community-driven", "All of the above"],
            correctAnswer: "All of the above",
            explanation: "Bitsacco combines the best of modern technology with community values!",
            emoji: "🚀"
          }
        ]
      },
      {
        id: "day-20",
        title: "Setting Up Your Account 📱",
        content: "Get started with Bitsacco in minutes!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "📱",
        funnyMessage: "Setting up Bitsacco is easier than ordering pizza! 🍕",
        questions: [
          {
            id: "q4-2",
            question: "What do you need to open a Bitsacco account?",
            type: "multiple-choice",
            options: ["A million shillings", "A phone and ID", "A bank account", "A time machine"],
            correctAnswer: "A phone and ID",
            explanation: "That's it! Simple and accessible for everyone!",
            emoji: "✅"
          }
        ]
      },
      {
        id: "day-21",
        title: "Creating Your First Goal 🎯",
        content: "Turn your dreams into achievable targets!",
        type: "input",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🎯",
        funnyMessage: "Goals are like dreams with deadlines! ⏰💭",
        questions: [
          {
            id: "q4-3",
            question: "What's your first Bitsacco savings goal?",
            type: "input",
            correctAnswer: "any",
            explanation: "Excellent! Now you can track your progress in real-time!",
            emoji: "📈"
          }
        ]
      },
      {
        id: "day-22",
        title: "Making Your First Deposit 💰",
        content: "Start building your wealth today!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "💰",
        funnyMessage: "Your first deposit is like planting a money tree! 🌳💰",
        questions: [
          {
            id: "q4-4",
            question: "What's the minimum amount you can save on Bitsacco?",
            type: "multiple-choice",
            options: ["1000 shillings", "100 shillings", "10 shillings", "1 shilling"],
            correctAnswer: "10 shillings",
            explanation: "Start small and watch your savings grow!",
            emoji: "🌱"
          }
        ]
      },
      {
        id: "day-23",
        title: "Tracking Your Progress 📊",
        content: "See your money grow in real-time!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "📊",
        funnyMessage: "Watching your savings grow is more exciting than watching paint dry! 🎨",
        questions: [
          {
            id: "q4-5",
            question: "How often should you check your savings progress?",
            type: "multiple-choice",
            options: ["Every minute", "Daily", "Weekly", "Never"],
            correctAnswer: "Weekly",
            explanation: "Regular check-ins keep you motivated without becoming obsessive!",
            emoji: "📅"
          }
        ]
      },
      {
        id: "day-24",
        title: "Bitsacco Safety Features 🛡️",
        content: "Your money is protected with bank-level security!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🛡️",
        funnyMessage: "Bitsacco security is like having a money bodyguard! 💪💰",
        questions: [
          {
            id: "q4-6",
            question: "What protects your money on Bitsacco?",
            type: "multiple-choice",
            options: ["Good luck", "Bank-level security", "A magic spell", "Your neighbor's dog"],
            correctAnswer: "Bank-level security",
            explanation: "Your money is as safe as it would be in a traditional bank!",
            emoji: "🔒"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Community & Growth",
    description: "Join the community, take on challenges, and climb the leaderboards",
    icon: "👥",
    color: "bg-purple-500",
    requiredXP: 240,
    unlocked: false,
    completed: false,
    progress: 0,
    lessons: [
      {
        id: "day-25",
        title: "Joining the Bitsacco Community 👥",
        content: "Connect with fellow savers and learn together!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "👥",
        funnyMessage: "Community is like having 1000 financial advisors for free! 👨‍💼👩‍💼",
        questions: [
          {
            id: "q5-1",
            question: "What are the benefits of joining the Bitsacco community?",
            type: "multiple-choice",
            options: ["Free money", "Learning from others", "Making friends", "All of the above"],
            correctAnswer: "All of the above",
            explanation: "Community provides support, knowledge, and motivation!",
            emoji: "🤝"
          }
        ]
      },
      {
        id: "day-26",
        title: "Participating in Challenges 🏆",
        content: "Take on savings challenges and win rewards!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🏆",
        funnyMessage: "Challenges are like video games for your money! 🎮💰",
        questions: [
          {
            id: "q5-2",
            question: "What's the best way to approach savings challenges?",
            type: "multiple-choice",
            options: ["Ignore them", "Start small and build up", "Go all in immediately", "Ask someone else to do it"],
            correctAnswer: "Start small and build up",
            explanation: "Gradual progress builds sustainable habits!",
            emoji: "📈"
          }
        ]
      },
      {
        id: "day-27",
        title: "Understanding Leaderboards 🏅",
        content: "See how you rank among other savers!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🏅",
        funnyMessage: "Leaderboards are like a financial Olympics - everyone can be a winner! 🥇",
        questions: [
          {
            id: "q5-3",
            question: "What do leaderboards measure?",
            type: "multiple-choice",
            options: ["How rich you are", "Your savings progress and streaks", "Your social media followers", "Your height"],
            correctAnswer: "Your savings progress and streaks",
            explanation: "Leaderboards celebrate consistent saving behavior!",
            emoji: "📊"
          }
        ]
      },
      {
        id: "day-28",
        title: "Sharing Your Success 📢",
        content: "Inspire others with your savings journey!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "📢",
        funnyMessage: "Sharing success is like being a financial influencer! 📱✨",
        questions: [
          {
            id: "q5-4",
            question: "Why should you share your savings success?",
            type: "multiple-choice",
            options: ["To brag", "To inspire others", "To get free money", "Because you have to"],
            correctAnswer: "To inspire others",
            explanation: "Your success story can motivate others to start their journey!",
            emoji: "🌟"
          }
        ]
      },
      {
        id: "day-29",
        title: "Building Long-term Habits 🌱",
        content: "Make saving a part of your daily life!",
        type: "multiple-choice",
        xpReward: 15,
        completed: false,
        streakBonus: 5,
        emoji: "🌱",
        funnyMessage: "Good habits are like plants - they need daily care to grow! 🌿",
        questions: [
          {
            id: "q5-5",
            question: "How long does it take to form a habit?",
            type: "multiple-choice",
            options: ["1 day", "21 days", "66 days", "Forever"],
            correctAnswer: "66 days",
            explanation: "Consistency is key to building lasting habits!",
            emoji: "⏰"
          }
        ]
      },
      {
        id: "day-30",
        title: "Graduation Day! 🎓",
        content: "Congratulations! You've completed the Bitsacco Education Hub!",
        type: "multiple-choice",
        xpReward: 50,
        completed: false,
        streakBonus: 20,
        emoji: "🎓",
        funnyMessage: "You're now a financial ninja! Time to save the world! 🥷💰",
        questions: [
          {
            id: "q5-6",
            question: "What's your next step after completing this course?",
            type: "multiple-choice",
            options: ["Forget everything", "Start saving on Bitsacco", "Take a nap", "Brag to your friends"],
            correctAnswer: "Start saving on Bitsacco",
            explanation: "Now it's time to put your knowledge into action!",
            emoji: "🚀"
          }
        ]
      }
    ]
  }
];

export const badges: Badge[] = [
  {
    id: "beginner-saver",
    name: "Beginner Saver",
    description: "Completed your first lesson",
    icon: "🌱",
    color: "bg-green-500",
    unlocked: false,
    requirement: "Complete 1 lesson",
    emoji: "🌱"
  },
  {
    id: "bitcoin-explorer",
    name: "Bitcoin Explorer",
    description: "Completed Bitcoin basics level",
    icon: "🟧",
    color: "bg-orange-500",
    unlocked: false,
    requirement: "Complete Level 2",
    emoji: "🟧"
  },
  {
    id: "goal-setter",
    name: "Goal Setter",
    description: "Set your first savings goal",
    icon: "🎯",
    color: "bg-blue-500",
    unlocked: false,
    requirement: "Set a savings goal",
    emoji: "🎯"
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "Maintained a 7-day streak",
    icon: "🔥",
    color: "bg-red-500",
    unlocked: false,
    requirement: "7-day streak",
    emoji: "🔥"
  },
  {
    id: "bitsacco-pioneer",
    name: "Bitsacco Pioneer",
    description: "Completed the Using Bitsacco level",
    icon: "🏦",
    color: "bg-indigo-500",
    unlocked: false,
    requirement: "Complete Level 4",
    emoji: "🏦"
  },
  {
    id: "community-hero",
    name: "Community Hero",
    description: "Graduated from the Education Hub",
    icon: "👑",
    color: "bg-yellow-500",
    unlocked: false,
    requirement: "Complete all levels",
    emoji: "👑"
  }
];

export const dailyReminders = [
  "Hey 🐒 did you forget to save today? Even bananas don't last forever 🍌💸",
  "Your streak is on fire 🔥🔥🔥 don't let it die like my last phone battery 🔋😂",
  "Saving is sexy 😎… broke is not 🥲. Just saying.",
  "Knock knock 🚪… it's your money calling 📞, don't ghost it again 👻💸",
  "Even Messi trains daily ⚽… your savings game deserves the same energy 💪",
  "If you save today → Future You will send you a thank you meme 🤝😂",
  "Money talks, but does it walk? 🚶‍♂️💸",
  "Your Bitcoin password is like your house key - don't lose it! 🏠🔑",
  "Bitcoin mining is like solving a giant puzzle for money! 🧩💰",
  "A Bitcoin wallet is like a digital piggy bank that fits in your phone! 📱🐷"
];
