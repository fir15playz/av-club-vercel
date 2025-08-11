"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Send, Users, Calendar, Award } from "lucide-react"

const membershipBenefits = [
  "Access to professional flight simulators",
  "Weekly workshops and training sessions",
  "Monthly field trips to aviation facilities",
  "Networking with industry professionals",
  "Exclusive Discord community access",
  "Mentorship from experienced pilots",
  "Discounts on aviation books and equipment",
  "Participation in group flying events",
]

const faqItems = [
  {
    question: "Do I need any prior aviation experience?",
    answer:
      "No prior experience is required! Our club welcomes members of all experience levels, from complete beginners to licensed pilots. We have programs and activities suitable for everyone.",
  },
  {
    question: "How often does the club meet?",
    answer:
      "We have weekly meetings on campus, plus additional workshops, simulator sessions, and field trips throughout the month. You can participate in as many or as few activities as your schedule allows.",
  },
  {
    question: "What does the membership fee cover?",
    answer:
      "The one-time $30 membership fee covers club materials, basic equipment usage, and helps fund our activities throughout the year. This fee ensures we can provide quality experiences for all members.",
  },
  {
    question: "Can I try before I join?",
    answer:
      "We offer a free trial period where you can attend two meetings before deciding to become a member. Just contact us to arrange your visit.",
  },
  {
    question: "Do I need to be a student at Lakeville North High School?",
    answer:
      "While our club is primarily for LNHS students, we occasionally accept members from other schools based on capacity. Priority is given to LNHS students.",
  },
]

export default function JoinPage() {
  const [activeTab, setActiveTab] = useState("form")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gradeLevel: "",
    isLNHSStudent: "",
    agreeToFee: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showLNHSPopup, setShowLNHSPopup] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Show popup if user selects "No" for LNHS student question
    if (name === "isLNHSStudent" && value === "no") {
      setShowLNHSPopup(true)
      // Reset the selection
      setFormData((prev) => ({ ...prev, [name]: "" }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="pt-16 bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-sky-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Aviation Club | LNHS</h1>
            <p className="text-xl text-sky-100 mb-8">
              Become part of our community and start your aviation journey today.
            </p>
            <button
              onClick={() => document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-sky-600 hover:bg-sky-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Jump to Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Membership <span className="gradient-text">Benefits</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Join Aviation Club and enjoy these exclusive benefits designed to enhance your aviation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Connect with fellow aviation enthusiasts and build lasting friendships with people who share your
                passion.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Events</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Participate in regular workshops, field trips, and social gatherings designed to enhance your aviation
                knowledge.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Learning</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Access educational resources, training sessions, and mentorship from experienced aviation professionals.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-8 w-8 text-sky-500"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Discord</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Join our active Discord community for daily discussions, event updates, and instant connections with
                members.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">All Members Receive</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {membershipBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-sky-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section id="join-form" className="py-20 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-700">
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "form"
                      ? "text-sky-500 border-b-2 border-sky-500"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                  onClick={() => setActiveTab("form")}
                >
                  Membership Application
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "faq"
                      ? "text-sky-500 border-b-2 border-sky-500"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                  onClick={() => setActiveTab("faq")}
                >
                  Frequently Asked Questions
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 md:p-8">
                {activeTab === "form" ? (
                  isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                        Thank you for applying to join Aviation Club | LNHS. We've received your application and will
                        contact you soon with next steps.
                      </p>
                      <div className="flex justify-center">
                        <Link
                          href="/#discord"
                          className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 inline-flex items-center"
                        >
                          Join Our Discord While You Wait
                          <svg
                            className="w-5 h-5 ml-2"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                          >
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                          >
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                          >
                            Phone Number (Optional)
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="gradeLevel"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                          >
                            Grade Level *
                          </label>
                          <select
                            id="gradeLevel"
                            name="gradeLevel"
                            value={formData.gradeLevel}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          >
                            <option value="">Select Grade Level</option>
                            <option value="9">9th Grade</option>
                            <option value="10">10th Grade</option>
                            <option value="11">11th Grade</option>
                            <option value="12">12th Grade</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="isLNHSStudent"
                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                          >
                            Are you a student at Lakeville North High School? *
                          </label>
                          <select
                            id="isLNHSStudent"
                            name="isLNHSStudent"
                            value={formData.isLNHSStudent}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="agreeToFee"
                          name="agreeToFee"
                          checked={formData.agreeToFee}
                          onChange={handleCheckboxChange}
                          required
                          className="h-4 w-4 mt-1 text-sky-500 focus:ring-sky-500 border-slate-300 rounded"
                        />
                        <label htmlFor="agreeToFee" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                          I understand that membership requires a one-time $30 fee *
                        </label>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <Send size={16} className="ml-2" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )
                ) : (
                  <div className="space-y-6">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-slate-200 dark:border-slate-700 pb-4 last:border-0">
                        <button
                          className="flex justify-between items-center w-full text-left py-2"
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        >
                          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">{item.question}</h3>
                          <svg
                            className={`h-5 w-5 text-slate-500 transition-transform ${
                              openFaq === index ? "transform rotate-180" : ""
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {openFaq === index && (
                          <div className="mt-2 text-slate-600 dark:text-slate-400 pl-0">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="text-center pt-4">
                      <p className="mb-4 text-slate-600 dark:text-slate-400">
                        Still have questions? Feel free to contact us directly.
                      </p>
                      <Link
                        href="mailto:aviationclub@lnhs.org"
                        className="text-sky-500 hover:text-sky-600 font-medium inline-flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                        aviationclub@lnhs.org
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {showLNHSPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md mx-auto shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">Membership Restricted</h3>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              We're sorry, but LNHS Aviation Club is only available for students attending Lakeville North High School.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowLNHSPopup(false)}
                className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
