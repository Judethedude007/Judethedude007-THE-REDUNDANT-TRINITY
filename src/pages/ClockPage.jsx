import { useState, useEffect } from 'react'
import './PageStyles.css'
import './ClockPage.css'

const ClockPage = ({ onBack, onPomodoroClick }) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    
    hours = hours % 12
    hours = hours ? hours : 12 // 0 should be 12
    const hoursStr = hours.toString().padStart(2, '0')
    
    return { hours: hoursStr, minutes, seconds, ampm }
  }

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('en-US', options)
  }

  const timeObj = formatTime(time)

  return (
    <div className="digital-clock-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Home
      </button>
      
      <div className="digital-time">
        <div className="time-section">
          <span className="time-digit">{timeObj.hours}</span>
          <span className="time-separator">:</span>
          <span className="time-digit">{timeObj.minutes}</span>
          <span className="time-separator">:</span>
          <span className="time-digit">{timeObj.seconds}</span>
          <span className="time-ampm">{timeObj.ampm}</span>
        </div>
      </div>
      
      <div className="digital-date">
        {formatDate(time)}
      </div>
      
      <div className="pomodoro-button-container">
        <button 
          className="pomodoro-button"
          onClick={onPomodoroClick}
        >
          <span className="pomodoro-icon">🍅</span>
          <span className="pomodoro-text">Start Pomodoro</span>
        </button>
      </div>
    </div>
  )
}

export default ClockPage
