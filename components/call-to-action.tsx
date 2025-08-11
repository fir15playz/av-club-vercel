import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-16 bg-background2 w-full">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gradient-to-r from-background1 to-background1/70 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Flight?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of aviation enthusiasts and start your journey into the skies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#join" legacyBehavior>
              <Button className="text-lg">Become a Member</Button>
            </Link>

            <Link href="/blog" legacyBehavior>
              <Button variant="secondary" className="text-lg">
                Read Our Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
