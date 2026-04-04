// app/careers/page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers | JobTracker",
  description: "Explore career opportunities at JobTracker and join our mission to improve job searching.",
}

export default function CareersPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-center">
      {/* Heading */}
      <header className="mb-10 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Careers at JobTracker
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’re building tools to improve how people approach job searching —
          making it smarter, faster, and more organized.
        </p>
      </header>

      {/* No Open Roles Card */}
      <section
        className="border rounded-xl p-8 bg-gray-50 shadow-sm space-y-3"
        aria-labelledby="open-roles"
      >
        <h2 id="open-roles" className="text-xl font-medium">
          No open roles right now
        </h2>

        <p className="text-gray-600">
          We’re not hiring at the moment, but we’re always excited to connect
          with talented individuals.
        </p>

        {/* CTA */}
        {/* <a
          href="mailto:careers@jobtracker.com"
          className="inline-block mt-3 text-blue-600 font-medium hover:underline"
        >
          Send us your resume →
        </a> */}
      </section>

      {/* Divider */}
      <div className="my-12 border-t" />


      {/* Footer Note */}
      <footer className="mt-10">
        <p className="text-sm text-gray-500">
          Check back later for future opportunities.
        </p>
      </footer>
    </main>
  )
}
