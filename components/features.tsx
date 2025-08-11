import Image from "next/image"
import { Compass, Users, Calendar, BookOpen, Award, Plane } from "lucide-react"

const features = [
  {
    title: "Flight Simulation",
    description:
      "Access professional-grade flight simulators to practice and develop your skills in a realistic environment.",
    icon: <Plane className="h-8 w-8 text-sky-500" />,
    image: "/images/placeholder.png",
  },
  {
    title: "Community Events",
    description: "Join regular meetups, workshops, and social gatherings with fellow aviation enthusiasts.",
    icon: <Calendar className="h-8 w-8 text-sky-500" />,
    image: "/images/placeholder.png",
  },
  {
    title: "Expert Workshops",
    description: "Learn from industry professionals through specialized workshops and training sessions.",
    icon: <BookOpen className="h-8 w-8 text-sky-500" />,
    image: "/images/placeholder.png",
  },
  {
    title: "Field Trips",
    description: "Visit airports, aviation museums, and flight schools to gain hands-on experience.",
    icon: <Compass className="h-8 w-8 text-sky-500" />,
    image: "/images/placeholder.png",
  },
  {
    title: "Networking",
    description: "Connect with pilots, engineers, and aviation industry professionals.",
    icon: <Users className="h-8 w-8 text-sky-500" />,
    image: "/images/placeholder.png",
  },
  {
    title: "Certifications",
    description: "Prepare for aviation certifications and exams with structured study groups.",
    icon: <Award className="h-8 w-8 text-sky-500" />,
    image: "/images/placeholder.png",
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-slate-100 dark:bg-slate-900 py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="gradient-text">Everything You Need</span> to Pursue Your Aviation Passion
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Our club provides comprehensive resources and opportunities for aviation enthusiasts of all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col hover:scale-105"
            >
              <div className="mb-6">{feature.icon}</div>

              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">{feature.description}</p>

              <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="h-40 relative rounded-lg overflow-hidden">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
