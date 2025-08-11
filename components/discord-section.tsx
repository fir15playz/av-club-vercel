import Link from "next/link"
import { MessageSquare, Users, Bell, ThumbsUp } from "lucide-react"

const discordFeatures = [
  {
    icon: <MessageSquare className="h-6 w-6 text-sky-500" />,
    title: "Chat with Members",
    description: "Connect with other aviation enthusiasts in real-time discussions",
  },
  {
    icon: <Users className="h-6 w-6 text-sky-500" />,
    title: "Build Connections",
    description: "Network with pilots, engineers, and industry professionals",
  },
  {
    icon: <Bell className="h-6 w-6 text-sky-500" />,
    title: "Event Notifications",
    description: "Stay updated on upcoming workshops, meetups, and activities",
  },
  {
    icon: <ThumbsUp className="h-6 w-6 text-sky-500" />,
    title: "Share Feedback",
    description: "Help shape the future of our club with your suggestions",
  },
]

export default function DiscordSection() {
  return (
    <section id="discord" className="py-20 md:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sky-100 dark:bg-sky-900/20 rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-100 dark:bg-indigo-900/20 rounded-tr-full opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our <span className="gradient-text">Discord Community</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Connect with fellow aviation enthusiasts, participate in discussions, and stay updated on club activities.
          </p>
        </div>

        {/* Improve responsiveness of the Discord section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Why Join Our Discord?</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {discordFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 md:mr-4 p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">{feature.icon}</div>
                    <div>
                      <h4 className="font-bold mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <Link
                  href="https://discord.gg/9ZFMz7WnS8"
                  target="_blank"
                  className="btn-primary inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                  </svg>
                  Join Our Discord
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden border-4 border-sky-200 dark:border-sky-900 shadow-2xl shadow-sky-200/20 dark:shadow-sky-900/20">
              <iframe
                src="https://discord.com/widget?id=1353885120737837207&theme=dark"
                width="100%"
                height="400"
                allowTransparency={true}
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
