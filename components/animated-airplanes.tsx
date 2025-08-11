"use client"

import { useEffect, useState } from "react"
import { Plane } from "lucide-react"

type AirplaneProps = {
  size: number
  delay: number
  duration: number
  top: string
  left: string
  rotate: number
  path: "straight" | "curve" | "zigzag"
}

const Airplane = ({ size, delay, duration, top, left, rotate, path }: AirplaneProps) => {
  const [animation, setAnimation] = useState("")

  useEffect(() => {
    // Set different animation paths
    if (path === "straight") {
      setAnimation("fly-straight")
    } else if (path === "curve") {
      setAnimation("fly-curve")
    } else if (path === "zigzag") {
      setAnimation("fly-zigzag")
    }
  }, [path])

  return (
    <div
      className={`absolute ${animation}`}
      style={{
        top,
        left,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `rotate(${rotate}deg)`,
        zIndex: 5,
      }}
    >
      <Plane size={size} className="text-white/30 dark:text-white/20" />
    </div>
  )
}

export default function AnimatedAirplanes() {
  const airplanes = [
    { size: 24, delay: 0, duration: 15, top: "15%", left: "-5%", rotate: 45, path: "straight" as const },
    { size: 32, delay: 3, duration: 20, top: "30%", left: "-5%", rotate: 30, path: "curve" as const },
    { size: 20, delay: 7, duration: 18, top: "20%", left: "-5%", rotate: 35, path: "zigzag" as const },
    { size: 28, delay: 5, duration: 25, top: "40%", left: "-5%", rotate: 25, path: "straight" as const },
    { size: 22, delay: 10, duration: 22, top: "25%", left: "-5%", rotate: 40, path: "curve" as const },
    { size: 18, delay: 12, duration: 17, top: "35%", left: "-5%", rotate: 30, path: "zigzag" as const },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {airplanes.map((plane, index) => (
        <Airplane key={index} {...plane} />
      ))}
    </div>
  )
}
