import Hero from "@/components/hero"
import Features from "@/components/features"
import DiscordSection from "@/components/discord-section"
import TeamSection from "@/components/team-section"
import JoinSection from "@/components/join-section"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <DiscordSection />
      <TeamSection />
      <JoinSection />
      <Newsletter />
    </>
  )
}
