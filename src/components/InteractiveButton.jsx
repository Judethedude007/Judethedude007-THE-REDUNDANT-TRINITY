import { useState } from 'react'
import './InteractiveButton.css'

const InteractiveButton = ({ children, onClick, className }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
  }
  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)

  return (
    <button
      className={`interactive-button ${className} ${isHovered ? 'hovered' : ''} ${isPressed ? 'pressed' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <span className="button-content">{children}</span>
      <div className="button-glow"></div>
    </button>
  )
}

export default InteractiveButton
