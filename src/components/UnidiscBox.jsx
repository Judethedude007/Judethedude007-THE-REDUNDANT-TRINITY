import { useState, useEffect } from 'react'
import './AIAssistant.css'

// Add readMessage helper
const readMessage = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech Synthesis not supported in this browser');
  }
};

const UnidiscBox = ({ onClose, isFullPage }) => {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [backgroundGradient, setBackgroundGradient] = useState(0)
  const [askedQuestions, setAskedQuestions] = useState([]) // Track asked questions

  // Your Gemini API key - you'll need to replace this with your actual key
  const GEMINI_API_KEY = 'AIzaSyBbWajetVMxJACtl-WiuOVXpY7Q3N8Hgp4'

  // Dynamic background animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundGradient(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Glowing card effect
  useEffect(() => {
    const card = document.querySelector('.ai-container')
    if (!card) return

    const cardUpdate = (e) => {
      const position = pointerPositionRelativeToElement(card, e)
      const [px, py] = position.pixels
      const [perx, pery] = position.percent
      const [dx, dy] = distanceFromCenter(card, px, py)
      const edge = closenessToEdge(card, px, py)
      const angle = angleFromPointerEvent(card, dx, dy)

      card.style.setProperty('--pointer-x', `${Math.round(perx * 1000) / 1000}%`)
      card.style.setProperty('--pointer-y', `${Math.round(pery * 1000) / 1000}%`)
      card.style.setProperty('--pointer-deg', `${Math.round(angle * 1000) / 1000}deg`)
      card.style.setProperty('--pointer-d', `${Math.round(edge * 100 * 1000) / 1000}`)
    }

    const centerOfElement = (el) => {
      const { width, height } = el.getBoundingClientRect()
      return [width / 2, height / 2]
    }

    const pointerPositionRelativeToElement = (el, e) => {
      const pos = [e.clientX, e.clientY]
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = pos[0] - left
      const y = pos[1] - top
      const px = Math.max(0, Math.min(100, (100 / width) * x))
      const py = Math.max(0, Math.min(100, (100 / height) * y))
      return { pixels: [x, y], percent: [px, py] }
    }

    const angleFromPointerEvent = (el, dx, dy) => {
      let angleRadians = 0
      let angleDegrees = 0
      if (dx !== 0 || dy !== 0) {
        angleRadians = Math.atan2(dy, dx)
        angleDegrees = angleRadians * (180 / Math.PI) + 90
        if (angleDegrees < 0) {
          angleDegrees += 360
        }
      }
      return angleDegrees
    }

    const distanceFromCenter = (card, x, y) => {
      const [cx, cy] = centerOfElement(card)
      return [x - cx, y - cy]
    }

    const closenessToEdge = (card, x, y) => {
      const [cx, cy] = centerOfElement(card)
      const [dx, dy] = distanceFromCenter(card, x, y)
      let k_x = Infinity
      let k_y = Infinity
      if (dx !== 0) {
        k_x = cx / Math.abs(dx)
      }
      if (dy !== 0) {
        k_y = cy / Math.abs(dy)
      }
      return Math.max(0, Math.min(1, 1 / Math.min(k_x, k_y)))
    }

    card.addEventListener('pointermove', cardUpdate)
    
    return () => {
      card.removeEventListener('pointermove', cardUpdate)
    }
  }, [])

  const callGeminiAPI = async (userQuestion) => {
    try {
      setIsLoading(true)
      
      // Check if similar question was asked before
      const isRepeatQuestion = askedQuestions.some(prevQ => 
        prevQ.toLowerCase().includes(userQuestion.toLowerCase().split(' ').slice(-3).join(' ')) ||
        userQuestion.toLowerCase().includes(prevQ.toLowerCase().split(' ').slice(-3).join(' '))
      )

      if (isRepeatQuestion) {
        return "I answered you before, dummy!"
      }

      // Build conversation context
      const conversationHistory = messages.slice(-6).map(msg => 
        `${msg.type === 'user' ? 'User' : 'AI'}: ${msg.content}`
      ).join('\n')
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Previous conversation:\n${conversationHistory}\n\nNew question: "${userQuestion}"\n\nPlease provide a brief 2-3 sentence overview/context about the topic without directly answering the specific question asked. Then ask the user back with a question like "I'm not sure [about the specific detail they asked], do you know [the specific detail]?" Keep your response conversational and friendly.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data) // Debug log
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text
      } else if (data.error) {
        throw new Error(`API Error: ${data.error.message}`)
      } else {
        throw new Error('Invalid response from Gemini API')
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      
      // More specific error messages
      if (error.message.includes('403')) {
        return 'API access denied. Please check your API key permissions.'
      } else if (error.message.includes('429')) {
        return 'Rate limit exceeded. Please try again in a moment.'
      } else if (error.message.includes('400')) {
        return 'Invalid request format. Please try rephrasing your question.'
      } else {
        return `Error: ${error.message}. Please check the browser console for more details.`
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    const userMessage = { type: 'user', content: question }
    setMessages(prev => [...prev, userMessage])
    
    const currentQuestion = question
    setQuestion('')

    const aiResponse = await callGeminiAPI(currentQuestion)
    const aiMessage = { type: 'ai', content: aiResponse }
    setMessages(prev => [...prev, aiMessage])
    
    // Track the question if it's not a repeat
    if (!aiResponse.includes("I answered you before, dummy!")) {
      setAskedQuestions(prev => [...prev, currentQuestion])
    }
  }

  const clearChat = () => {
    setMessages([])
    setAskedQuestions([]) // Also clear asked questions history
  }

  return (
    <div className={isFullPage ? "unidisc-page-wrapper" : "modal-overlay"} onClick={!isFullPage ? onClose : undefined}>
      {/* New dynamic background layer below the chatbot */}
      <div className="dynamic-background-layer"></div>
      
      <div className="ai-container" onClick={(e) => e.stopPropagation()}>
        <span className="glow"></span>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        
        <div 
          className="dynamic-background"
          style={{
            background: `linear-gradient(${backgroundGradient}deg, 
              rgba(102, 126, 234, 0.8) 0%, 
              rgba(118, 75, 162, 0.8) 50%, 
              rgba(255, 107, 107, 0.8) 100%)`
          }}
        ></div>
        
        <h2 className="ai-title">AI Knowledge Assistant</h2>
        <p className="ai-subtitle">Ask me anything and I'll provide insights!</p>
        
        <div className="chat-container">
          <div className="messages-area">
            {messages.length === 0 ? (
              <div className="welcome-message">
                <div className="welcome-icon">🤖</div>
                <p>
                  Hello! I'm your AI assistant. Ask me any question and I'll provide detailed information about the topic and suggest related questions to explore further.
                </p>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.type}`}>
                    <div className="message-avatar">
                      {message.type === 'user' ? '👤' : '🤖'}
                    </div>
                    <div className="message-content">
                      {message.content}
                      {message.type === 'ai' && (
                        <button
                          className="read-btn"
                          onClick={() => readMessage(message.content)}
                          title="Read message aloud"
                        >
                          🔊
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="message ai">
                    <div className="message-avatar">🤖</div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      Thinking...
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="question-form">
            <div className="input-container">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask any question..."
                className="question-input"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading || !question.trim()}
              >
                {isLoading ? '⏳' : '🚀'}
              </button>
            </div>
          </form>
          
          {messages.length > 0 && (
            <button onClick={clearChat} className="clear-chat-btn">
              🗑️ Clear Chat
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UnidiscBox
