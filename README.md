 # UP! Interactive Experience

 **UP!** is a multi-layered web application showcasing a seamless transition from an animated GSAP landing page to a full-featured React experience. Explore dynamic physics-based backgrounds, playful UI components, and an AI-powered chat assistant—all in one cohesive interface.

 ## 🔍 Project Overview
 - **Landing Page**: A scroll-driven, animated introduction built with GSAP and SVG parallax.
 - **React App**: A dynamic single-page application served via Vite, featuring interactive components powered by Matter.js physics and the Gemini API.
 - **AI Chat Assistant**: Text-to-speech support and contextual follow-up questions using Google Gemini API.

 ## ✨ Key Features
 1. **GSAP Landing Experience**
    - Parallax scrolling animations with clouds, hills, and stars.
    - Three distinct scenes that auto-transition or launch the React app.
 2. **Matter.js Physics Background**
    - Interactive particle attraction system responds to pointer movement.
    - Smooth animation loop with adjustable forces.
 3. **Interactive Components**
    - **Surprise Box**: Click to unveil random delights with confetti effects.
    - **Clock**: World clock with analog hands, time zones, and stylish UI.
    - **UnidiscBox**: Vinyl-style music player aesthetic with rotating disc.
 4. **AI Knowledge Assistant**
    - Chat interface powered by Google Gemini API.
    - Text-to-speech “🔊” button with voice selection and customizable pitch/rate.
    - Contextual follow-up questions to guide conversation.

 ## 🗂 Project Structure
 ```
 /index.html           # Redirects to the landing page
 /app.html             # React app entry point
 /landing-page/        # GSAP-powered landing page
 /src/                 # React application source
   ├── main.jsx        # Vite mount point
   ├── firebase.js     # Firebase config (via .env)
   ├── App.jsx         # Root React component
   ├── components/     # Reusable UI components
   └── pages/          # Page-level component layouts
 ```

 ## 🚀 Getting Started
 ### Prerequisites
 - Node.js v14 or higher
 - npm or yarn

 ### Installation
 ```bash
 git clone https://github.com/Judethedude007/THE-REDUNDANT-TRINITY.git
 cd THE-REDUNDANT-TRINITY
 npm install
 ```

 ### Development
 ```bash
 npm run dev      # Start Vite dev server
 npm run build    # Bundle for production
 ```

 ### Deployment
 - Deployed via Firebase Hosting with automatic rebuilds.
 - `firebase deploy` to push production changes.

 ## 🛠️ Technologies & Tools
 - **Frameworks**: React 18, Vite 4
 - **Animations**: GSAP (landing), Matter.js (background)
 - **AI & TTS**: Google Gemini API, Web Speech API
 - **Styling**: CSS3, backdrop-filter, glassmorphism
 - **Hosting**: Firebase

 ## 🤝 Contributing
 Contributions are welcome! Fork the repository, create a feature branch, and submit a pull request.

 ## 📄 License
 This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
