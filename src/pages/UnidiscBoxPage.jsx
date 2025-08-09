import UnidiscBox from '../components/UnidiscBox'
import './PageStyles.css'
import './UnidiscBoxPage.css';

const UnidiscBoxPage = ({ onBack }) => {
  return (
    <div className="page-container">
      <button className="back-button" onClick={onBack}>
        ← Back to Home
      </button>
      
      <UnidiscBox onClose={onBack} isFullPage={true} />
    </div>
  )
}

export default UnidiscBoxPage
