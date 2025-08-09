import { useState, useEffect, useCallback } from 'react'
import './PasswordPage.css'

const PasswordPage = ({ onSuccess, onBack }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)

  // 3D Clock state
  const [clockTime, setClockTime] = useState({ h: '00', m: '00', s: '00' })

  // Draggable text state - start positioned over the clock
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hasBeenMoved, setHasBeenMoved] = useState(false)

  // Update 3D clock
  useEffect(() => {
    const updateClock = () => {
      const date = new Date()
      let h = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      
      h = h < 10 ? '0' + h : h.toString()
      m = m < 10 ? '0' + m : m.toString()
      s = s < 10 ? '0' + s : s.toString()
      
      setClockTime({ h, m, s })
    }

    updateClock() // Initial call
    const interval = setInterval(updateClock, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const getCurrentTimePassword = () => {
    const now = new Date()
    let hours = now.getHours()
    const minutes = now.getMinutes().toString().padStart(2, '0')
    
    // Convert to 12-hour format
    hours = hours % 12
    hours = hours ? hours : 12 // 0 should be 12
    const hoursStr = hours.toString().padStart(2, '0')
    
    return hoursStr + minutes
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const correctPassword = getCurrentTimePassword()
    
    if (password === correctPassword) {
      setError('')
      onSuccess()
    } else {
      setAttempts(prev => prev + 1)
      setError(`Wrong password! Try the current time (HHMM format). Attempts: ${attempts + 1}`)
      setPassword('')
      
      // Give a hint after 3 attempts
      if (attempts >= 2) {
        const now = new Date()
        let hintHours = now.getHours() % 12
        hintHours = hintHours ? hintHours : 12
        const hintMinutes = now.getMinutes()
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
        setError(`Hint: Think about what time it is right now! (${hintHours}:${hintMinutes.toString().padStart(2, '0')} ${ampm} in HHMM format)`)
      }
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setPassword(value)
    if (error && value.length === 0) {
      setError('')
    }
  }

  // Dragging handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    const rect = e.target.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    e.preventDefault()
  }

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 160
    const maxY = window.innerHeight - 160
    
    setTextPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
    setHasBeenMoved(true)
  }, [isDragging, dragOffset])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div className="password-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Home
      </button>
      
      {/* 3D Digital Clock */}
      <div className="digital-clock-container">
        <figure className="clock-cube">
          <div className="face front"><p id="m">{clockTime.m}</p></div>
          <div className="face back"><p>{clockTime.m}</p></div>
          <div className="face left"><p id="h">{clockTime.h}</p></div>
          <div className="face right"><p>{clockTime.h}</p></div>
          <div className="face top"><p id="s">{clockTime.s}</p></div>
          <div className="face bottom"><p>{clockTime.s}</p></div>
        </figure>
      </div>

      {/* Draggable "Useless Projects" Text */}
      <div 
        className={`draggable-text ${!hasBeenMoved ? 'initial-position' : ''}`}
        style={{
          left: hasBeenMoved ? `${textPosition.x}px` : undefined,
          top: hasBeenMoved ? `${textPosition.y}px` : undefined,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="useless-text">
          <span className="text-line">USELESS</span>
          <span className="text-line">PROJECTS</span>
        </div>
      </div>
      
      <div className="password-container">
        <div className="lock-icon">🔐</div>
        
        <h1 className="password-title">Time Lock</h1>
        <p className="password-subtitle">
          Enter the current time as your password
        </p>
        <p className="password-hint">
          Format: HHMM (12-hour format)
        </p>
        
        <form onSubmit={handleSubmit} className="password-form">
          <div className="password-input-container">
            <input
              type="text"
              value={password}
              onChange={handleInputChange}
              placeholder="0000"
              className={`password-input ${error ? 'error' : ''}`}
              maxLength="4"
              autoFocus
            />
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="unlock-button"
            disabled={password.length !== 4}
          >
            <span className="button-text">Unlock Clock</span>
            <span className="button-icon">⏰</span>
          </button>
        </form>
        
        <div className="password-decoration">
          <div className="pulse-ring"></div>
          <div className="pulse-ring-2"></div>
        </div>
      </div>
    </div>
  )
}

export default PasswordPage
