import { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import './PomodoroPage.css';

const PomodoroPage = ({ onBack }) => {
  // Timer settings
  const [pomodoroLength, setPomodoroLength] = useState(25)
  const [shortBreakLength, setShortBreakLength] = useState(5)
  const [longBreakLength, setLongBreakLength] = useState(15)
  
  // Timer logic
  const [remainingTime, setRemainingTime] = useState(25 * 60); // seconds
  const [pause, setPause] = useState(true);
  const [activeTimer, setActiveTimer] = useState('pomodoro');
  const [cycleCount, setCycleCount] = useState(0);

  // UI state
  const [showTasks, setShowTasks] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Study React Hooks', completed: false, note: 'Focus on useEffect and useState' },
    { id: 2, text: 'Build Pomodoro Timer', completed: true, note: 'Add task management and settings' }
  ])
  const [newTaskText, setNewTaskText] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [editingNote, setEditingNote] = useState('')

  // Settings
  const [autoStartBreaks, setAutoStartBreaks] = useState(false)
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false)
  const [longBreakInterval, setLongBreakInterval] = useState(4)
  const [alarmSound, setAlarmSound] = useState('digital')
  const [alarmVolume, setAlarmVolume] = useState(50)

  const intervalRef = useRef(null)

  // Check if we're on mobile
  const isMobile = () => window.innerWidth <= 768

  const handleOverlayClick = () => {
    if (isMobile()) {
      setShowTasks(false)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const selectTimer = useCallback((active) => {
    let seconds = 0;
    if (active === "pomodoro") {
      seconds = pomodoroLength * 60;
    } else if (active === "short-break") {
      seconds = shortBreakLength * 60;
    } else if (active === "long-break") {
      seconds = longBreakLength * 60;
    }
    setRemainingTime(seconds);
    setPause(true);
    setActiveTimer(active);
  }, [pomodoroLength, shortBreakLength, longBreakLength]);

  // Task management functions
  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        note: ''
      }
      setTasks([...tasks, newTask])
      setNewTaskText('')
    }
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const startEditingNote = (taskId, currentNote) => {
    setEditingTask(taskId)
    setEditingNote(currentNote)
  }

  const saveNote = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask ? { ...task, note: editingNote } : task
    ))
    setEditingTask(null)
    setEditingNote('')
  }

  const cancelEditingNote = () => {
    setEditingTask(null)
    setEditingNote('')
  }

  // Sound function
  const playNotificationSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      if (alarmSound === 'digital') {
        // Digital beep sequence
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
      } else if (alarmSound === 'bell') {
        // Bell sound
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5)
      } else if (alarmSound === 'chime') {
        // Chime sound
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime) // C5
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2) // E5
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.4) // G5
      } else if (alarmSound === 'beep') {
        // Simple beep
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
      } else if (alarmSound === 'notification') {
        // Notification sound
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.1)
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.2)
      } else if (alarmSound === 'alarm') {
        // Alarm sound
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.15)
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.3)
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.45)
      } else {
        // Default simple tone
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
      }
      
      gainNode.gain.setValueAtTime(alarmVolume / 100 * 0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.6)
    } catch {
      console.log('Could not play notification sound')
    }
  }, [alarmSound, alarmVolume])

  const play = () => {
    setPause((prev) => !prev);
  }

  // Helper: get initial time for current mode
  const getInitialTime = useCallback(() => {
    if (activeTimer === 'pomodoro') return pomodoroLength * 60;
    if (activeTimer === 'short-break') return shortBreakLength * 60;
    if (activeTimer === 'long-break') return longBreakLength * 60;
    return 0;
  }, [activeTimer, pomodoroLength, shortBreakLength, longBreakLength]);

  // Update remainingTime if timer length changes and timer is paused and at initial value
  useEffect(() => {
    if (pause && (remainingTime === getInitialTime() || remainingTime === 0)) {
      setRemainingTime(getInitialTime());
    }
  }, [pomodoroLength, shortBreakLength, longBreakLength, activeTimer, pause, remainingTime, getInitialTime]);

  // Timer countdown effect
  useEffect(() => {
    if (pause) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          // Timer finished
          clearInterval(intervalRef.current);
          playNotificationSound();
          // Auto-switch logic
          if (activeTimer === 'pomodoro') {
            setCycleCount((c) => c + 1);
            if ((cycleCount + 1) % longBreakInterval === 0) {
              selectTimer('long-break');
            } else {
              selectTimer('short-break');
            }
            if (autoStartBreaks) setPause(false);
          } else {
            selectTimer('pomodoro');
            if (autoStartPomodoros) setPause(false);
          }
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [pause, activeTimer, autoStartBreaks, autoStartPomodoros, longBreakInterval, selectTimer, playNotificationSound]);

  // Update resetTime to always use latest setting
  const resetTime = () => {
    setRemainingTime(getInitialTime());
    setPause(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m.toString().padStart(2, '0') + ":" + s.toString().padStart(2, '0');
  }

  const timeDisplay = remainingTime > 0 ? formatTime(remainingTime) : "00:00";
  const isBlinking = !pause && remainingTime <= 10 && remainingTime > 0;

  return (
    <div
      className={[
        'pomodoro-container',
        showTasks ? 'tasks-open' : '',
        isDarkMode ? 'dark-theme' : 'light-theme',
        activeTimer === 'short-break' ? 'short-break-theme' : '',
        activeTimer === 'long-break' ? 'long-break-theme' : '',
      ].filter(Boolean).join(' ')}
    >
      <button className="back-button-pomodoro" onClick={onBack}>
        ← Back to Clock
      </button>

      {/* Top controls */}
      <div className="top-controls">
        <button 
          className={`icon-button ${showTasks ? 'active' : ''}`}
          onClick={() => setShowTasks(!showTasks)}
          title="Tasks"
        >
          📋
        </button>
        <button 
          className="icon-button" 
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <button 
          className="icon-button" 
          onClick={() => setShowSettings(true)}
          title="Settings"
        >
          ⚙️
        </button>
      </div>
      
      {/* Timer header */}
      <div className="timer-header">
        <button 
          className={activeTimer === 'pomodoro' ? "timer-btn active" : "timer-btn"} 
          onClick={() => selectTimer('pomodoro')}
        >
          Pomodoro
        </button>
        <button 
          className={activeTimer === 'short-break' ? "timer-btn active" : "timer-btn"} 
          onClick={() => selectTimer('short-break')}
        >
          Short Break
        </button>
        <button 
          className={activeTimer === 'long-break' ? "timer-btn active" : "timer-btn"} 
          onClick={() => selectTimer('long-break')}
        >
          Long Break
        </button>
      </div>

      {/* Main timer display */}
      <div className="timer-display">
        <div className={classNames('time-text', { blinking: isBlinking })}>{timeDisplay}</div>
      </div>

      {/* Control buttons */}
      <div className="timer-controls">
        <button 
          onClick={play} 
          className="control-button primary"
        >
          {pause ? 'START' : 'PAUSE'}
        </button>
        <button 
          onClick={resetTime} 
          className="control-button secondary"
        >
          RESET
        </button>
      </div>

      {/* Tasks Sidebar */}
      {showTasks && (
        <>
          <div className="overlay" onClick={handleOverlayClick}></div>
          <div className="tasks-sidebar">
            <div className="tasks-header">
              <h3>Tasks</h3>
              <button className="close-btn" onClick={() => setShowTasks(false)}>×</button>
            </div>
            
            <div className="add-task">
              <input
                type="text"
                placeholder="What are you working on?"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <button onClick={addTask}>Add</button>
            </div>

            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-main">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className="task-text">{task.text}</span>
                    <div className="task-actions">
                      <button onClick={() => startEditingNote(task.id, task.note)} title="Add note">📝</button>
                      <button onClick={() => deleteTask(task.id)} title="Delete">🗑️</button>
                    </div>
                  </div>
                  {task.note && (
                    <div className="task-note">{task.note}</div>
                  )}
                  {editingTask === task.id && (
                    <div className="note-editor">
                      <textarea
                        value={editingNote}
                        onChange={(e) => setEditingNote(e.target.value)}
                        placeholder="Add a note..."
                        rows={3}
                      />
                      <div className="note-actions">
                        <button onClick={saveNote}>Save</button>
                        <button onClick={cancelEditingNote}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <>
          <div className="overlay" onClick={() => setShowSettings(false)}></div>
          <div className="settings-modal">
            <div className="settings-header">
              <h3>Settings</h3>
              <button className="close-btn" onClick={() => setShowSettings(false)}>×</button>
            </div>
            
            <div className="settings-content">
              <div className="setting-group">
                <h4>Timer</h4>
                <div className="timer-settings">
                  <div className="timer-input">
                    <label>Pomodoro</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={pomodoroLength}
                      onChange={(e) => setPomodoroLength(Number(e.target.value))}
                    />
                    <span>minutes</span>
                  </div>
                  <div className="timer-input">
                    <label>Short Break</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={shortBreakLength}
                      onChange={(e) => setShortBreakLength(Number(e.target.value))}
                    />
                    <span>minutes</span>
                  </div>
                  <div className="timer-input">
                    <label>Long Break</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={longBreakLength}
                      onChange={(e) => setLongBreakLength(Number(e.target.value))}
                    />
                    <span>minutes</span>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h4>Sound</h4>
                <div className="sound-settings">
                  <div className="sound-input">
                    <label>Alarm Sound</label>
                    <select value={alarmSound} onChange={(e) => setAlarmSound(e.target.value)}>
                      <option value="digital">Digital</option>
                      <option value="bell">Bell</option>
                      <option value="chime">Chime</option>
                      <option value="beep">Beep</option>
                      <option value="notification">Notification</option>
                      <option value="alarm">Alarm</option>
                      <option value="simple">Simple</option>
                    </select>
                    <button 
                      type="button" 
                      onClick={playNotificationSound}
                      className="test-sound-btn"
                    >
                      🔊 Test
                    </button>
                  </div>
                  <div className="volume-input">
                    <label>Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={alarmVolume}
                      onChange={(e) => setAlarmVolume(Number(e.target.value))}
                    />
                    <span>{alarmVolume}%</span>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h4>Auto Start</h4>
                <div className="auto-start-settings">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={autoStartBreaks}
                      onChange={(e) => setAutoStartBreaks(e.target.checked)}
                    />
                    Auto start breaks
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={autoStartPomodoros}
                      onChange={(e) => setAutoStartPomodoros(e.target.checked)}
                    />
                    Auto start pomodoros
                  </label>
                </div>
              </div>

              <div className="setting-group">
                <h4>Long Break Interval</h4>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={longBreakInterval}
                  onChange={(e) => setLongBreakInterval(Number(e.target.value))}
                />
                <span>pomodoros</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PomodoroPage
