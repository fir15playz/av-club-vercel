import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar } from "lucide-react"

const leadership = [
  {
    name: "Pranav A",
    role: "President",
    bio: "Aviation enthusiast with a passion for bringing people together through flight. Pranav has been flying simulators since age 12 and obtained his private pilot license at 19. He founded SkyBound to create a community where aviation enthusiasts of all levels could learn and grow together.",
    image: "/images/team/IMG_02.webp",
    contact: {
      email: "pranav@skyboundaviation.com",
      location: "San Francisco, CA",
    },
    experience: [
      "Private Pilot License - 2020",
      "Flight Simulator Instructor - 3 years",
      "Aviation Club Leadership - 5 years",
    ],
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Kevin M",
    role: "Co-President",
    bio: "An Aviation Enthusiast who loves airplanes and building planes and robots. He doesn't have a flying license or prior experience flying, but his passion for aviation drives him to learn everything he can. He also enjoys playing Airplane Simulator Games.",
    image: "/images/team/IMG_01.png",
    contact: {
      email: "kevin@skyboundaviation.com",
      location: "Seattle, WA",
    },
    experience: [
      "Model Plane Building - 3 years",
      "Robotics Club Member - 2 years",
      "Aviation Club Leadership - 1 year",
    ],
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
]

const team = [
  {
    name: "Alex Johnson",
    role: "Events Coordinator",
    bio: "Organizes club meetups, workshops, and field trips to aviation-related destinations.",
    image: "/images/member_placeholder.webp",
    contact: {
      email: "alex@skyboundaviation.com",
    },
  },
  {
    name: "Sam Rodriguez",
    role: "Technical Officer",
    bio: "Manages flight simulation setups and provides technical support to members.",
    image: "/images/member_placeholder.webp",
    contact: {
      email: "sam@skyboundaviation.com",
    },
  },
  {
    name: "Taylor Kim",
    role: "Communications Director",
    bio: "Handles club communications, social media, and the monthly newsletter.",
    image: "/images/member_placeholder.webp",
    contact: {
      email: "taylor@skyboundaviation.com",
    },
  },
  {
    name: "Jordan Patel",
    role: "Treasurer",
    bio: "Manages club finances and fundraising initiatives for new equipment.",
    image: "/images/member_placeholder.webp",
    contact: {
      email: "jordan@skyboundaviation.com",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="pt-16 bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-sky-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h1>
            <p className="text-xl text-sky-100">
              The passionate individuals behind SkyBound Aviation Club who make our community thrive.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="gradient-text">Leadership</span> Team
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {leadership.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800"
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1 p-6 flex flex-col items-center text-center bg-sky-50 dark:bg-slate-800/50">
                    <div className="relative w-40 h-40 mb-4">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full border-4 border-sky-200 dark:border-sky-900"
                      />
                    </div>

                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sky-500 dark:text-sky-400 font-medium mb-4">{member.role}</p>

                    <div className="flex space-x-3 mb-4">
                      <Link
                        href={member.social.twitter}
                        target="_blank"
                        className="text-slate-500 hover:text-sky-500 transition-colors"
                      >
                        <Twitter size={18} />
                      </Link>
                      <Link
                        href={member.social.linkedin}
                        target="_blank"
                        className="text-slate-500 hover:text-sky-500 transition-colors"
                      >
                        <Linkedin size={18} />
                      </Link>
                      <Link
                        href={member.social.github}
                        target="_blank"
                        className="text-slate-500 hover:text-sky-500 transition-colors"
                      >
                        <Github size={18} />
                      </Link>
                    </div>

                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center mb-2">
                        <Mail size={14} className="mr-2" />
                        <span>{member.contact.email}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <MapPin size={14} className="mr-2" />
                        <span>{member.contact.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 p-6">
                    <h4 className="text-lg font-bold mb-3">About</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">{member.bio}</p>

                    <h4 className="text-lg font-bold mb-3">Experience</h4>
                    <ul className="space-y-2 mb-6">
                      {member.experience.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <Calendar size={16} className="mr-2 text-sky-500 mt-1 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`mailto:${member.contact.email}`}
                      className="text-sky-500 hover:text-sky-600 font-medium flex items-center"
                    >
                      <Mail size={16} className="mr-2" />
                      Contact {member.name.split(" ")[0]}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our <span className="gradient-text">Team</span> Members
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
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
                <p className="text-sky-500 dark:text-sky-400 text-sm mb-3">{member.role}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{member.bio}</p>

                <Link
                  href={`mailto:${member.contact.email}`}
                  className="text-sky-500 hover:text-sky-600 text-sm font-medium flex items-center mt-auto"
                >
                  <Mail size={14} className="mr-1" />
                  Contact
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Want to Join</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              We're always looking for passionate aviation enthusiasts to help grow our community. If you're interested
              in joining or taking on a leadership role, we'd love to hear from you!
            </p>
            <Link
              href="/join"
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center"
            >
              Apply to Join
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
