import Image from "next/image"

const features = [
  {
    title: "Flight Simulation",
    description: "Access to professional flight simulators for practice and training",
    image: "/images/feature-simulation.jpg",
  },
  {
    title: "Aviation Workshops",
    description: "Regular workshops on aviation topics led by industry professionals",
    image: "/images/feature-workshops.jpg",
  },
  {
    title: "Field Trips",
    description: "Visits to airports, aviation museums, and flight schools",
    image: "/images/feature-trips.jpg",
  },
  {
    title: "Guest Speakers",
    description: "Talks from pilots, engineers, and aviation industry experts",
    image: "/images/feature-speakers.jpg",
  },
  {
    title: "Community Events",
    description: "Social gatherings and networking opportunities for aviation enthusiasts",
    image: "/images/feature-events.jpg",
  },
]

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-background2 w-full">
      <div className="container mx-auto px-4">
        <h2 className="headline">What We Offer</h2>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="h-1/2 w-full relative overflow-hidden rounded-t-xl">
                <Image
                  src={feature.image || "/images/placeholder.png"}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-center mb-2">{feature.title}</h3>
                <p className="text-center text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
