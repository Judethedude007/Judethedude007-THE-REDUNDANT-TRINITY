import { useState, useEffect, useRef } from 'react'

// Page Components
import HomePage from './pages/HomePage'
import SurprizeBoxPage from './pages/SurprizeBoxPage'
import ClockPage from './pages/ClockPage'
import UnidiscBoxPage from './pages/UnidiscBoxPage'
import PasswordPage from './pages/PasswordPage'
import PomodoroPage from './pages/PomodoroPage'

// UI Components
import MatterBackground from './components/MatterBackground'

// Styles
import './App.css'

function App() {
  // Page navigation state
  const [currentPage, setCurrentPage] = useState('home')
  const [_isClockUnlocked, setIsClockUnlocked] = useState(false)
  
  // Mischievous close button state
  const [closeButtonPos, setCloseButtonPos] = useState({ 
    x: window.innerWidth - 48, 
    y: 20 
  })
  const [isButtonBeingChased, setIsButtonBeingChased] = useState(false)
  const [buttonMoveCount, setButtonMoveCount] = useState(0)
  const timeoutRef = useRef(null)

  
  // Navigation functions
  const goToSurprizeBox = () => setCurrentPage('surprize')
  
  const goToClock = () => {
    setIsClockUnlocked(false) // Reset lock status
    setCurrentPage('clock-password')
  }
  
  const goToUnidiscBox = () => setCurrentPage('unidisc')
  const goToPomodoro = () => setCurrentPage('pomodoro')
  
  const goHome = () => {
    setCurrentPage('home')
    setIsClockUnlocked(false) // Reset lock when going home
  }
  
  const handleClockUnlock = () => {
    setIsClockUnlocked(true)
    setCurrentPage('clock')
  }

  // Mischievous close button auto-return timer
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    const isInTopRight = closeButtonPos.x > window.innerWidth - 80 && closeButtonPos.y < 50
    
    if (!isInTopRight) {
      timeoutRef.current = setTimeout(() => {
        setCloseButtonPos({ x: window.innerWidth - 48, y: 20 })
        setIsButtonBeingChased(false)
      }, 10000) // Return to corner after 10 seconds
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [closeButtonPos])

  // Close button mouse interactions
  const handleCloseButtonMouseEnter = () => {
    const slowdownFactor = Math.max(0.15, 1 - (buttonMoveCount * 0.05))
    const shouldMove = Math.random() < slowdownFactor
    
    if (shouldMove) {
      moveButtonToRandomPosition()
      console.log(`Button moved ${buttonMoveCount + 1} times. Slowdown factor: ${slowdownFactor.toFixed(2)}`)
    } else {
      console.log(`Button is getting tired... (moved ${buttonMoveCount} times)`)
    }
  }

  const handleCloseButtonMouseLeave = () => {
    setTimeout(() => setIsButtonBeingChased(false), 1000)
  }

  const moveButtonToRandomPosition = () => {
    setIsButtonBeingChased(true)
    setButtonMoveCount(prev => prev + 1)
    
    const margin = 60
    const newX = margin + Math.random() * (window.innerWidth - margin * 2 - 40)
    const newY = margin + Math.random() * (window.innerHeight - margin * 2 - 40)
    setCloseButtonPos({ x: newX, y: newY })
  }

  // Close button click handler - opens Rick Roll video
  const handleCloseButtonClick = () => {
    console.log('Close button clicked! Opening video...')
    
    try {
      const videoWindow = window.open('https://youtu.be/xvFZjo5PgG0?si=v3TGVejjRINl0YWd', '_blank')
      
      if (!videoWindow || videoWindow.closed || typeof videoWindow.closed == 'undefined') {
        console.log('Popup blocked, trying direct navigation...')
        window.location.href = 'https://youtu.be/xvFZjo5PgG0?si=v3TGVejjRINl0YWd'
      } else {
        console.log('Video opened in new tab!')
      }
    } catch {
      console.log('Audio not available')
      window.location.href = 'https://youtu.be/xvFZjo5PgG0?si=v3TGVejjRINl0YWd'
    }
    
    // Reset counter as reward for successfully clicking
    setButtonMoveCount(0)
    console.log('Button move counter reset - user succeeded!')
    
    // Move one more time for fun
    moveButtonToRandomPosition()
  }

  // Page rendering logic
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'surprize':
        return <SurprizeBoxPage onBack={goHome} />
      case 'clock-password':
        return <PasswordPage onSuccess={handleClockUnlock} onBack={goHome} />
      case 'clock':
        return <ClockPage onBack={goHome} onPomodoroClick={goToPomodoro} />
      case 'pomodoro':
        return <PomodoroPage onBack={() => setCurrentPage('clock')} />
      case 'unidisc':
        return <UnidiscBoxPage onBack={goHome} />
      default:
        return (
          <HomePage 
            onSurprizeBoxClick={goToSurprizeBox}
            onClockClick={goToClock}
            onUnidiscBoxClick={goToUnidiscBox}
          />
        )
    }
  }

  // Dynamic button styles
  const getButtonStyle = () => ({
    position: 'fixed',
    left: `${closeButtonPos.x}px`,
    top: `${closeButtonPos.y}px`,
    transition: isButtonBeingChased 
      ? `all ${0.3 + (buttonMoveCount * 0.03)}s ease-out` 
      : `all ${0.5 + (buttonMoveCount * 0.03)}s ease-in-out`,
    opacity: Math.max(0.8, 1 - (buttonMoveCount * 0.01))
  })

  // Dynamic button title
  const getButtonTitle = () => {
    const baseText = 'Try to close me! '
    if (buttonMoveCount === 0) {
      return baseText + 'There might be a reward... 😈🎵'
    }
    const moveText = `(Moved ${buttonMoveCount} times`
    const tiredText = buttonMoveCount > 15 ? ' - getting tired...' : ''
    return baseText + moveText + tiredText + ')'
  }

  return (
    <div className="app">
      {/* Background particles only on home page */}
      {currentPage === 'home' && <MatterBackground />}
      
      {/* Grid overlay only on home page */}
      {currentPage === 'home' && <div className="grid-overlay"></div>}
      
      {/* Mischievous Close Button - only on home page */}
      {currentPage === 'home' && (
        <div
          className={`mischievous-close-btn ${isButtonBeingChased ? 'running-away' : ''} ${buttonMoveCount > 15 ? 'getting-tired' : ''}`}
          style={getButtonStyle()}
          onMouseEnter={handleCloseButtonMouseEnter}
          onMouseLeave={handleCloseButtonMouseLeave}
          onClick={handleCloseButtonClick}
          title={getButtonTitle()}
        >
          ✕
        </div>
      )}
      
      {renderCurrentPage()}
    </div>
  )
}

export default App
