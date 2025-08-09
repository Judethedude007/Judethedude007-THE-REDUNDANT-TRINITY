# Interactive React Web App with Matter.js Physics

A responsive React web application# UP! Interactive Experience

A multi-layered interactive web application featuring animated landing page with GSAP scrolling animations, leading to a React-based interactive experience.

## 🚀 Structure

```
├── index.html              # Entry point - redirects to landing page
├── app.html               # React app entry point
├── landing-page/          # Animated GSAP landing page
│   ├── index.html        # Landing page with SVG animations
│   ├── style.css         # Landing page styles
│   └── script.js         # GSAP animation scripts
└── src/                  # React application
    ├── App.jsx           # Main React app
    ├── components/       # React components
    └── pages/           # Application pages
```

## 🎭 Features

### Landing Page
- **Animated SVG scenes** with parallax scrolling
- **GSAP Timeline animations** - clouds, hills, stars, and birds
- **3 animated scenes** that transition as user scrolls
- **Responsive design** for all devices
- **Auto-launch** options after user interaction

### Main App
- **Interactive components**: Surprise Box, Clock, UnidiscBox
- **Matter.js physics** background animations
- **Password-protected features**
- **Mischievous close button** with Easter egg
- **3D Rubik's cube** challenge
- **AI chat assistant** with dynamic effects

## 🛠️ Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Project Flow
1. **User visits** `index.html` → automatically redirected to `landing-page/`
2. **Landing page** displays animated SVG experience
3. **User interacts** → launches main React app at `app.html`
4. **React app** provides full interactive experience

## 🎨 Technologies

- **Frontend**: React 18, Vite
- **Animations**: GSAP, Matter.js, CSS3
- **Graphics**: SVG, Three.js, WebGL
- **Styling**: Modern CSS with glassmorphism
- **AI Integration**: Gemini API for chat features

## 🔧 Configuration

The app uses Vite with multiple entry points:
- `index.html` - Landing page redirect
- `app.html` - React application
- Auto-detection of development vs production URLs

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly interactions
- Optimized animations for all devices
- Graceful degradation for older browsers

## 🎮 Interactive Elements

### Landing Page
- Scroll-triggered animations
- Parallax effects
- Auto-launch after scroll completion
- Manual launch buttons

### Main App
- Physics-based background
- Interactive button components
- Modal-based page navigation
- Easter egg discoveries

---

**Built with ❤️ for interactive design and user experience**ring interactive Matter.js physics animations and three engaging components.

## Features

- **Matter.js Physics Background**: Interactive particle system with attraction forces
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Three Interactive Components**:
  - **🎁 Surprise Box**: Click to reveal random surprises with confetti animations
  - **🕐 Clock**: World clock with analog display and multiple time zones
  - **💿 UnidiscBox**: Vinyl-style music player with rotating disc animation

## Technologies Used

- React 18
- Vite for fast development
- Matter.js for physics simulation
- Anime.js for smooth animations
- Modern CSS with backdrop filters and animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the localhost URL shown in the terminal

## Usage

- **Background Interaction**: Click and drag on the background to move the physics attractor
- **Button Interactions**: Hover over buttons to see enlargement effects, click to open components
- **Responsive**: The app adapts to different screen sizes automatically

## Project Structure

```
src/
├── components/
│   ├── MatterBackground.jsx    # Physics simulation background
│   ├── InteractiveButton.jsx   # Reusable button with hover effects
│   ├── SurpriseBox.jsx        # Surprise box component
│   ├── Clock.jsx              # World clock component
│   ├── UnidiscBox.jsx         # Music player component
│   └── *.css                  # Component styles
├── App.jsx                    # Main application component
├── App.css                    # Main application styles
├── index.css                  # Global styles
└── main.jsx                   # Application entry point
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Development

- The project uses Vite for hot module replacement during development
- All components are responsive and follow modern React patterns
- Physics animations are optimized for performance

## Browser Compatibility

- Modern browsers supporting ES6+ features
- CSS backdrop-filter support for glass morphism effects
- WebGL support for Matter.js rendering+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
