# 🔥 Bitsacco Ember Hub - Gamified Bitcoin Savings Platform

A modern, interactive web application that gamifies Bitcoin savings and education through engaging mini-games and educational content.

## 🎮 Features

### Core Functionality
- **Gamified Savings**: Earn KES through various mini-games
- **Educational Games**: Learn Bitcoin through Privacy Jenga
- **Progress Tracking**: Monitor your savings progress with visual indicators
- **Cooldown System**: Balanced gameplay with 5-minute cooldowns
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Games Available

#### Savings Games
- 🎲 **Roll Dice**: Roll a dice and earn 5-30 KES
- ✉️ **Draw Envelope**: Draw an envelope and earn 10-100 KES
- 🎥 **Watch Video**: Watch Bitcoin videos and earn 25-250 KES

#### Educational Games
- 🧩 **Privacy Jenga**: Learn about Bitcoin privacy through Jenga

### Education Center
- 📚 **Bitcoin Basics**: Fundamental Bitcoin concepts
- 💰 **Savings Strategies**: Effective Bitcoin saving methods
- 🔒 **Privacy & Security**: Bitcoin privacy and security best practices

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bitsacco-game-hub.git
   cd bitsacco-game-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3002`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **State Management**: Zustand with persistence
- **Build Tool**: Vite
- **Icons**: Lucide React

### Project Structure
```
src/
├── components/          # React components
│   ├── games/          # Game-specific components
│   ├── ui/             # Reusable UI components
│   └── ...
├── games/              # Game implementations
│   ├── savings/        # Savings games
│   └── educational/    # Educational games
├── store/              # State management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles.css          # Global styles
```

### Key Components

#### State Management
- **GameStore**: Manages game state, progress, and cooldowns
- **Persistence**: Automatic state persistence using localStorage

#### Game System
- **Cooldown Management**: 5-minute cooldowns for savings games
- **Reward System**: Configurable KES rewards for each game
- **Progress Tracking**: Real-time savings progress updates

## 🎯 Game Mechanics

### Savings Games
- Each game has a 5-minute cooldown after completion
- Rewards are calculated based on game-specific algorithms
- Progress is automatically saved and persisted

### Educational Games
- No cooldowns - play anytime
- Integrated iframe games for immersive experience
- Focus on Bitcoin education and privacy

### Progress System
- Monthly savings goals with visual progress bars
- Streak tracking for consistent engagement
- Milestone achievements and badges

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#f97316) to Red (#ef4444) gradient
- **Secondary**: Blue (#3b82f6) for education center
- **Background**: Dark gray gradient (#111827 to #1f2937)
- **Accent**: Green (#10b981) for success states

### Typography
- **Headings**: Bold, gradient text with custom fonts
- **Body**: Clean, readable text with proper contrast
- **Interactive**: Hover effects and smooth transitions

### Animations
- **Page Transitions**: Smooth fade and slide animations
- **Game Interactions**: Scale and bounce effects
- **Progress Updates**: Animated progress bars and counters

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Bitsacco Ember Hub
VITE_APP_VERSION=1.0.0
```

### Game Configuration
Game rewards and cooldowns can be configured in `src/store/gameStore.ts`:

```typescript
const GAME_REWARDS = {
  rollDice: { min: 5, max: 30 },
  drawEnvelope: { min: 10, max: 100 },
  // ... other games
};

const COOLDOWN_DURATION = 5 * 60 * 1000; // 5 minutes
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server to serve `index.html` for all routes

## 🧪 Testing

### Development Testing
```bash
# Run development server
npm run dev

# Build for testing
npm run build

# Preview production build
npm run preview
```

### Browser Testing
- Test on Chrome, Firefox, Safari, and Edge
- Test responsive design on mobile devices
- Verify all game mechanics work correctly
- Check cooldown system functionality

## 🔒 Security Considerations

- All game data is stored locally in the browser
- No sensitive information is transmitted
- Educational content is loaded from trusted sources
- Input validation on all user interactions

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use consistent code formatting
- Add proper error handling
- Test all game mechanics
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bitcoin community for educational content
- Framer Motion for smooth animations
- Tailwind CSS for the design system
- Vite for the build tooling

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@bitsacco.com
- Documentation: [docs.bitsacco.com](https://docs.bitsacco.com)

---

**Built with ❤️ for the Bitcoin community**

*Educational content only. No real Bitcoin rewards. Always do your own research.*
