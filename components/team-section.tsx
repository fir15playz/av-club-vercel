import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

const leadership = [
  {
    name: "Pranav A",
    role: "President",
    description: "Aviation enthusiast with a passion for bringing people together through flight.",
    image: "/images/team/IMG_02.webp",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Kevin M",
    role: "Co-President",
    description: "Experienced pilot with a focus on education and community building.",
    image: "/images/team/IMG_01.png",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/fir15playz",
    },
  },
]

const team = [
  {
    name: "Team Member 1",
    role: "Events Coordinator",
    image: "/images/member_placeholder.webp",
  },
  {
    name: "Team Member 2",
    role: "Technical Officer",
    image: "/images/member_placeholder.webp",
  },
  {
    name: "Team Member 3",
    role: "Communications",
    image: "/images/member_placeholder.webp",
  },
  {
    name: "Team Member 4",
    role: "Treasurer",
    image: "/images/member_placeholder.webp",
  },
]

export default function TeamSection() {
  return (
    <section id="team" className="py-20 md:py-32 bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Passionate aviation enthusiasts dedicated to creating an engaging community experience.
          </p>
        </div>

        {/* Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          {leadership.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105 border border-slate-200 dark:border-slate-800"
            >
              <div className="relative w-40 h-40 mb-6">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full border-4 border-sky-200 dark:border-sky-900"
                />
              </div>

              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-sky-500 dark:text-sky-400 font-medium mb-4">{member.role}</p>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{member.description}</p>

              <div className="flex space-x-4">
                <Link
                  href={member.social.twitter}
                  target="_blank"
                  className="text-slate-500 hover:text-sky-500 transition-colors"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href={member.social.linkedin}
                  target="_blank"
                  className="text-slate-500 hover:text-sky-500 transition-colors"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href={member.social.github}
                  target="_blank"
                  className="text-slate-500 hover:text-sky-500 transition-colors"
                >
                  <Github size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105 border border-slate-200 dark:border-slate-800"
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full border-2 border-sky-200 dark:border-sky-900"
                />
              </div>

              <h3 className="text-lg font-bold mb-1">{member.name}</h3>
              <p className="text-sky-500 dark:text-sky-400 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
