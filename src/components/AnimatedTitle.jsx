import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './AnimatedTitle.css'

const AnimatedTitle = () => {
  const wrapperRef = useRef(null)
  const srcTxtRef = useRef(null)
  const topTxtRef = useRef(null)

  useEffect(() => {
    const srcTxt = srcTxtRef.current
    const topTxt = topTxtRef.current
    const wrapper = wrapperRef.current
    
    if (!srcTxt || !topTxt || !wrapper) return

    const txtContent = srcTxt.textContent
    const bb = srcTxt.getBoundingClientRect()

    // Clear previous content
    topTxt.innerHTML = ''

    // Create text slices
    for (let i = 0; i <= bb.width * 0.8; i++) {
      const div = document.createElement("div")
      topTxt.appendChild(div)
      gsap.set(div, {
        position: "absolute",
        width: 3,
        height: bb.height,
        x: i * 1.5,
        y: -bb.height,
        textIndent: -i * 1.5,
        color: "#fff",
        overflow: "hidden",
        textContent: txtContent
      })
    }

    // Set wrapper transform (removed rotation and skew for straight text)
    gsap.set(wrapper, {
      rotate: 0,
      skewY: 0,
      scaleX: 1
    })

    // Create timeline
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.25, ease: "power3.inOut", yoyoEase: "sine.inOut" }
    }).to('.top-txt *', {
      y: "-=33",
      stagger: {
        amount: 1,
        yoyo: true,
        repeat: 1,
        ease: "none"
      }
    })

    // Initial animation
    gsap.timeline()
      .fromTo(tl, { progress: 0.9 }, { duration: 1.5, progress: 0.1, ease: "power2.inOut" })
      .to(tl, { duration: 4, progress: 0.4, ease: "elastic.out(0.8)" })

    // Mouse move handler
    const handlePointerMove = (e) => {
      const xp = e.clientX / window.innerWidth
      gsap.to(tl, { progress: xp, overwrite: true })
      gsap.to(wrapper, {
        x: gsap.utils.mapRange(0, 1, 30, -30, xp),
        y: gsap.utils.mapRange(0, 1, -30, 30, xp)
      })
    }

    // Mouse down handler
    const handleMouseDown = () => {
      gsap.timeline({ defaults: { duration: 0.2, overwrite: 'auto' } })
        .to(topTxt, { y: -25 })
        .to(srcTxt, {
          filter: 'blur(2px)',
          opacity: 0.85,
          scale: 0.96,
          transformOrigin: '45px 99px'
        }, 0)
    }

    // Mouse up handler
    const handleMouseUp = () => {
      gsap.timeline({ defaults: { ease: 'bounce' } })
        .to(topTxt, { y: 0 })
        .to(srcTxt, {
          filter: 'blur(0px)',
          opacity: 1,
          scale: 1
        }, 0)
    }

    // Add event listeners
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Cleanup
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="animated-title-container">
      <div className="wrapper" ref={wrapperRef}>
        <div className="src-txt" ref={srcTxtRef}>USELESS PROJECT</div>
        <div className="top-txt" ref={topTxtRef} aria-disabled="true"></div>
      </div>
    </div>
  )
}

export default AnimatedTitle
