import AnimatedTitle from '../components/AnimatedTitle'
import InteractiveButton from '../components/InteractiveButton'

const HomePage = ({ onSurprizeBoxClick, onClockClick, onUnidiscBoxClick }) => {
  return (
    <>
      <AnimatedTitle />
      
      <div className="main-content">
        <div className="button-container">
          <InteractiveButton
            onClick={onSurprizeBoxClick}
            className="surprise-btn"
          >
            🎁 Surprise Box
          </InteractiveButton>
          
          <InteractiveButton
            onClick={onClockClick}
            className="clock-btn"
          >
            🕐 Clock
          </InteractiveButton>
          
          <InteractiveButton
            onClick={onUnidiscBoxClick}
            className="unidisc-btn"
          >
            💿 UnidiscBox
          </InteractiveButton>
        </div>
      </div>
    </>
  )
}

export default HomePage
