// app/contact/page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | JobTracker",
  description: "Get in touch with JobTracker for support, feedback, or queries.",
}

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Heading */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-2">
          Have questions, feedback, or suggestions? We’d love to hear from you.
        </p>
      </header>

      {/* Contact Card */}
      <section
        className="border rounded-xl p-6 space-y-4 bg-white shadow-sm"
        aria-labelledby="contact-details"
      >
        <h2 id="contact-details" className="text-lg font-medium">
          Support
        </h2>

        <p className="text-gray-600">
          Reach out to us via email:
        </p>

        <a
          href="mailto:support@jobtracker.com"
          className="text-lg font-medium text-blue-600 hover:underline break-all"
        >
          support@jobtracker.com
        </a>

        <p className="text-sm text-gray-500">
          We typically respond within 24–48 hours.
        </p>
      </section>

      {/* Divider */}
      <div className="my-10 border-t" />

      {/* Extra Info (Optional but good for production) */}
      <section className="space-y-3">
        <h3 className="text-lg font-medium">Before you contact</h3>
        <p className="text-gray-600 text-sm">
          You may find quick answers in our FAQ or Help section. If your issue
          is urgent, please include detailed information in your email to help
          us resolve it faster.
        </p>
      </section>
    </main>
  )
}