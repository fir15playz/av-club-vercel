"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToFeatures = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center pt-16 relative"
      style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <div className="mb-16 transition-all duration-500 hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(134,183,246,0.75)]">
          <Image
            src="/images/Logo-main.png"
            alt="Aviation Club"
            width={600}
            height={300}
            className="max-w-full h-auto"
            priority
          />
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">
            <span>Fly High </span>
            <span className="font-bold text-accent1">Together</span>
            <span>.</span>
          </h1>
        </div>

        <Link href="https://discord.gg/9ZFMz7WnS8" target="_blank" className="primary-button text-xl md:text-2xl mb-16">
          <span className="font-bold block">Click To Join</span>
          <span className="text-base md:text-lg opacity-80">Discord Account Required</span>
        </Link>

        <button
          onClick={scrollToFeatures}
          className="animate-bounce opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <ChevronDown size={36} />
        </button>
      </div>

      <div ref={scrollRef} id="features" className="absolute bottom-0"></div>
    </section>
  )
}
