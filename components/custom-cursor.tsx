"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const hoverRingRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const isPointerRef = useRef(false)
  const isTouchDeviceRef = useRef(false)

  useEffect(() => {
    const isTouchDevice = () => {
      return (
        (typeof window !== "undefined" && navigator.maxTouchPoints > 0) ||
        (navigator as any).msMaxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches
      )
    }

    isTouchDeviceRef.current = isTouchDevice()

    if (isTouchDeviceRef.current) {
      return
    }

    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateCursor = () => {
      positionRef.current.x = lerp(positionRef.current.x, targetPositionRef.current.x, 0.15)
      positionRef.current.y = lerp(positionRef.current.y, targetPositionRef.current.y, 0.15)

      if (outerRef.current && innerRef.current && hoverRingRef.current) {
        const scale = isPointerRef.current ? 2 : 1
        const innerScale = isPointerRef.current ? 0.4 : 1
        const ringOpacity = isPointerRef.current ? 1 : 0

        outerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
        innerRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${innerScale})`
        hoverRingRef.current.style.opacity = ringOpacity.toString()
      }

      animationFrameId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }

      const target = e.target as HTMLElement
      isPointerRef.current =
        window.getComputedStyle(target).cursor === "pointer" || target.tagName === "BUTTON" || target.tagName === "A"
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    animationFrameId = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (isTouchDeviceRef.current) {
    return null
  }

  return (
    <>
      {/* Outer border ring - navy blue */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div className="h-5 w-5 rounded-full border-2 border-primary shadow-lg shadow-primary/40" />
      </div>

      {/* Inner dot - navy blue */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
        style={{ contain: "layout style paint" }}
      >
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>

      <div
        ref={hoverRingRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform transition-opacity duration-200"
        style={{ contain: "layout style paint", opacity: 0 }}
      >
        <div className="h-8 w-8 rounded-full border-2 border-accent" style={{ transform: "translate(-50%, -50%)" }} />
      </div>
    </>
  )
}
