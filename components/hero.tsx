"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import AnimatedAirplanes from "./animated-airplanes"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const featuresRef = useRef<HTMLDivElement>(null)

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/bg.png" alt="Sky background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/70 via-sky-800/50 to-slate-900/80"></div>
      </div>

      {/* Animated airplanes */}
      <AnimatedAirplanes />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              <span className="block">Explore The Skies</span>
              <span className="gradient-text">Together</span>
            </h1>

            <p className="text-lg md:text-xl text-sky-100 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
              Join our aviation community at Lakeville North High School and discover the thrill of flight through
              simulation, education, and real-world experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/join" legacyBehavior>
                <Button size="lg" className="text-base sm:text-lg">
                  Join Aviation Club
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="lg"
                className="text-base sm:text-lg"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Explore Features
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[30rem] md:h-[30rem] lg:w-[36rem] lg:h-[36rem] animate-float">
              <Image
                src="/images/Logo-main.png"
                alt="Aviation Club | LNHS"
                fill
                className="object-contain drop-shadow-[0_0_25px_rgba(134,183,246,0.5)]"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToFeatures}
            className="animate-bounce p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Scroll to features"
          >
            <ChevronDown size={24} className="text-white" />
          </button>
        </div>
      </div>

      <div ref={featuresRef} id="features" className="absolute bottom-0"></div>
    </section>
  )
}
