import { useState, useEffect } from 'react'
import './Clock.css'

const Clock = ({ onClose }) => {
  const [time, setTime] = useState(new Date())
  const [timeZone, setTimeZone] = useState('local')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date, zone) => {
    if (zone === 'local') {
      return date.toLocaleTimeString()
    } else {
      return date.toLocaleTimeString('en-US', { timeZone: zone })
    }
  }

  const formatDate = (date, zone) => {
    if (zone === 'local') {
      return date.toLocaleDateString()
    } else {
      return date.toLocaleDateString('en-US', { timeZone: zone })
    }
  }

  const getTimeZoneLabel = (zone) => {
    switch (zone) {
      case 'local': return 'Local Time'
      case 'America/New_York': return 'New York'
      case 'Europe/London': return 'London'
      case 'Asia/Tokyo': return 'Tokyo'
      case 'Australia/Sydney': return 'Sydney'
      default: return zone
    }
  }

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours() % 12

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="clock-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        
        <h2 className="clock-title">World Clock</h2>
        
        <div className="analog-clock">
          <div className="clock-face">
            <div className="hour-markers">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={`hour-marker marker-${i + 1}`}></div>
              ))}
            </div>
            
            <div
              className="hand hour-hand"
              style={{
                transform: `translate(-50%, -100%) rotate(${(hours * 30) + (minutes * 0.5)}deg)`
              }}
            ></div>
            
            <div
              className="hand minute-hand"
              style={{
                transform: `translate(-50%, -100%) rotate(${minutes * 6}deg)`
              }}
            ></div>
            
            <div
              className="hand second-hand"
              style={{
                transform: `translate(-50%, -100%) rotate(${seconds * 6}deg)`
              }}
            ></div>
            
            <div className="center-dot"></div>
          </div>
        </div>
        
        <div className="digital-display">
          <div className="time-display">{formatTime(time, timeZone)}</div>
          <div className="date-display">{formatDate(time, timeZone)}</div>
          <div className="zone-display">{getTimeZoneLabel(timeZone)}</div>
        </div>
        
        <div className="timezone-buttons">
          {[
            'local',
            'America/New_York',
            'Europe/London',
            'Asia/Tokyo',
            'Australia/Sydney'
          ].map((zone) => (
            <button
              key={zone}
              className={`timezone-btn ${timeZone === zone ? 'active' : ''}`}
              onClick={() => setTimeZone(zone)}
            >
              {getTimeZoneLabel(zone)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Clock
