import { useEffect, useRef } from 'react'
import './MatterBackground.css'

const MatterBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Simple canvas animation as fallback
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const container = canvasRef.current
    
    if (!container) return
    
    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.zIndex = '0'
    canvas.style.pointerEvents = 'auto'
    
    container.appendChild(canvas)

    // Simple particle system
    const particles = []
    const numParticles = 80
    
    // Create particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 4 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 70%)`,
        baseVx: (Math.random() - 0.5) * 0.5,
        baseVy: (Math.random() - 0.5) * 0.5
      })
    }

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        // Continuous floating motion
        particle.vx = particle.baseVx + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2
        particle.vy = particle.baseVy + Math.cos(Date.now() * 0.001 + particle.y * 0.01) * 0.2
        
        // Attraction to mouse
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0 && distance < 200) {
          const force = 0.0005
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = canvas.height + 50
        if (particle.y > canvas.height + 50) particle.y = -50

        // Draw particle with glow effect
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (container && canvas.parentNode) {
        container.removeChild(canvas)
      }
    }
  }, [])

  return <div ref={canvasRef} className="matter-background" />
}

export default MatterBackground
