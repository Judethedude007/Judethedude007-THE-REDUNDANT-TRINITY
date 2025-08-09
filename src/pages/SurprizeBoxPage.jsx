import { useState } from 'react'
import RubiksCube from '../components/RubiksCube'
import './SurprizeBoxPage.css'

function SurprizeBoxPage({ onBack }) {
  let cubeRef = null;
  const [isSolvable, setIsSolvable] = useState(true);

  const handleSwapPieces = () => {
    if (cubeRef) {
      cubeRef.swapTwoPieces();
      setIsSolvable(!isSolvable);
    }
  };

  return (
    <div className="surprize-box-page">
      <div className="page-content">
        <div className="page-header">
          <button onClick={onBack} className="back-button">← Back</button>
          <h1 className="page-title">Rubik's Cube Challenge</h1>
        </div>
        
        <div className="cube-section">
          <div className="cube-instructions">
            <p>Try to solve this Rubik's cube!</p>
            <p className="small-text">Drag to rotate the cube, click faces to turn layers</p>
            {!isSolvable && <p className="warning-text">⚠️ This cube is now unsolvable - two pieces have been swapped!</p>}
            <button onClick={handleSwapPieces} className="swap-button">
              {isSolvable ? '🔄 Make Unsolvable (Swap 2 Pieces)' : '🔄 Reset to Solvable'}
            </button>
          </div>
          
          <div className="cube-wrapper">
            <RubiksCube onRef={(ref) => cubeRef = ref} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurprizeBoxPage;
