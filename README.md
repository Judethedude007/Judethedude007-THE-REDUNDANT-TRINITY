 # UP! Interactive Experience

 **UP!** is a rich interactive web application that blends creative animations, physics simulations, and AI-driven interactions to provide an immersive user experience. Beginning with a GSAP-powered landing page, users seamlessly transition to a React-based single-page app featuring multiple interactive modules and a conversational AI assistant.

 ## � Project Overview
 - **Landing Page**: Scroll-triggered parallax animations using GSAP and SVG for an engaging first impression.
 - **React Application**: Modular SPA built with React and Vite, incorporating physics, animations, and responsive design.
 - **AI Assistant**: Contextual chat powered by Google Gemini API, enhanced with Web Speech API for text-to-speech functionality.

 ## ✨ Key Features & Capabilities
 1. **GSAP Landing Experience**
    - Parallax scrolling animations with clouds, hills, and stars.
   - Three themed animated scenes (cloudscape, twilight hills, starry night) that auto-transition or navigate to the main app.
 2. **Physics-Driven Background**
   - Interactive particle system created with Matter.js, responding to cursor proximity and user input.
    - Smooth animation loop with adjustable forces.
 3. **Interactive React Components**
    - **Surprise Box**: Click to unveil random delights with confetti effects.
   - **Clock**: Real-time analog clock with selectable time zones, customizable display styles, and CSS animations.
   - **UnidiscBox**: Retro vinyl player UI with rotating disc effect, dynamic background, and integrated AI chat module.
 4. **AI Knowledge Assistant**
   - Seamless conversation flow with contextual history, powered by Google Gemini API.
    - Text-to-speech “🔊” button with voice selection and customizable pitch/rate.
   - Speech synthesis via Web Speech API, with selectable voices, adjustable pitch/rate, and custom effects for repeated queries.

 ## � Project Structure
 ```
 ├── index.html             # Entry redirect to landing experience
 ├── app.html               # Main React application mount point
 ├── landing-page/          # GSAP & SVG parallax landing page assets
 ├── src/                   # React application source code
 │   ├── main.jsx           # Vite entry and render target
 │   ├── firebase.js        # Firebase initialization (uses .env)
 │   ├── App.jsx            # Root component managing routing and state
 │   ├── components/        # Shared UI components (buttons, background, chat box)
 │   └── pages/             # Page-level components (ClockPage, PomodoroPage, etc.)
 ├── public/                # Static assets (favicon, logo, sprite)
 ├── .env.example           # Environment variable template
 └── vite.config.js         # Vite build configuration
 ```

 ## 🚀 Getting Started
 These instructions will guide you through setting up the project locally.

 ### Prerequisites
 - Node.js (v14 or above)
 - npm (v6+) or Yarn
 - A Google Cloud API Key with access to the Gemini API
 - Firebase CLI (for deployment)

 ### Installation & Setup
 1. Clone the repository:
    ```bash
    git clone https://github.com/Judethedude007/Judethedude007-THE-REDUNDANT-TRINITY.git
    cd Judethedude007-THE-REDUNDANT-TRINITY
    ```
 2. Install dependencies:
    ```bash
    npm install
    ```
 3. Configure environment variables:
    - Copy `.env.example` to `.env`
    - Fill in your Google Gemini API key and Firebase project settings:
      ```env
      VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
      VITE_FIREBASE_API_KEY=... 
      VITE_FIREBASE_AUTH_DOMAIN=...
      VITE_FIREBASE_PROJECT_ID=...
      ```

 ### Development
 - **Run in development mode**:
    ```bash
    npm run dev
    ```
    Hot Reload is enabled; navigate to `http://localhost:5173` to view.
 - **Build for production**:
    ```bash
    npm run build
    ```
 - **Preview production build**:
    ```bash
    npm run preview
    ```

 ### Deployment
 The project is configured for Firebase Hosting. To deploy:
 ```bash
 firebase login
 firebase use <your-firebase-project-id>
 npm run build
 firebase deploy --only hosting
 ```

 ## 🛠️ Technologies & Tools
 | Category         | Tools & Libraries                          |
 |------------------|--------------------------------------------|
 | UI Framework     | React 18, React Hooks, JSX                 |
 | Build & Bundler  | Vite, ESBuild                              |
 | Animations       | GSAP (landing page), CSS3 Keyframes        |
 | Physics Engine   | Matter.js                                  |
 | AI Integration   | Google Gemini API (generativelanguage)      |
 | Speech Synthesis | Web Speech API                             |
 | Styling          | CSS Modules, Glassmorphism (backdrop-filter)
 | State Management | React `useState`, `useEffect`              |
 | Hosting          | Firebase Hosting, Firebase CLI             |
 | Version Control  | Git, GitHub                                 |

 ## 🤝 Contributing
 We welcome contributions from the community. Please follow these steps:
 1. Fork the repository
 2. Create a new feature branch (`git checkout -b feature/YourFeature`)
 3. Commit your changes (`git commit -am 'feat: Add YourFeature'`)
 4. Push to your branch (`git push origin feature/YourFeature`)
 5. Open a Pull Request describing your changes

 For major changes or proposals, open an issue first to discuss your ideas with maintainers.

 ## 📄 License
 This project is licensed under the MIT License. See [LICENSE](LICENSE) for full terms.

 ---
 &copy; 2023–2025 UP! Interactive Experience. Built by [Judethedude007](https://github.com/Judethedude007).
