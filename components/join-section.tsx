import { CheckCircle } from "lucide-react"
import Link from "next/link"

const onlineSteps = [
  "Join our Discord community",
  "Complete the membership application form",
  "Attend an orientation session",
  "Get approved and start participating",
]

const inPersonSteps = ["Coming soon! Check back for updates on in-person registration."]

export default function JoinSection() {
  return (
    <section id="join" className="py-20 md:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-sky-100 dark:bg-sky-900/20 rounded-br-full opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-indigo-100 dark:bg-indigo-900/20 rounded-tl-full opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How to <span className="gradient-text">Join Us</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Becoming a member is easy! Follow these simple steps to join our aviation community.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          <div className="md:w-1/2">
            <div className="card h-full p-8">
              <div className="inline-block p-3 bg-sky-100 dark:bg-sky-900/30 rounded-2xl mb-6">
                <svg
                  className="w-8 h-8 text-sky-500"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold mb-6">Join Online</h3>

              <ul className="space-y-4 mb-8">
                {onlineSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-sky-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{step}</span>
                  </li>
                ))}
              </ul>

              <Link href="https://discord.gg/9ZFMz7WnS8" target="_blank" className="btn-primary w-full text-center">
                Join Discord Now
              </Link>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="card h-full p-8">
              <div className="inline-block p-3 bg-sky-100 dark:bg-sky-900/30 rounded-2xl mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-sky-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold mb-6">Join In Person</h3>

              <ul className="space-y-4 mb-8">
                {inPersonSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-slate-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-500 dark:text-slate-400">{step}</span>
                  </li>
                ))}
              </ul>

              <button className="btn-secondary w-full text-center opacity-75 cursor-not-allowed" disabled>
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
