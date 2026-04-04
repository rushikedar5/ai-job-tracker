// app/terms/page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | JobTracker",
  description: "Read the terms and conditions for using JobTracker.",
}

const sections = [
  "Use of Service",
  "User Content",
  "Account Responsibilities",
  "Service Availability",
  "Limitation of Liability",
  "Termination",
  "Changes to Terms",
  "Contact",
]

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12 space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Terms of Service
        </h1>

        <p className="text-gray-600 leading-relaxed">
          By accessing or using JobTracker, you agree to be bound by these Terms
          of Service. Please read them carefully.
        </p>

        <p className="text-sm text-gray-500">
          Last updated: January 1, 2026
        </p>
      </header>

      {/* Divider */}
      <div className="border-t mb-10" />

      {/* Content */}
      <div className="space-y-10">
        {sections.map((title, index) => (
          <section key={title} className="space-y-3">
            <h2 className="text-xl font-semibold">
              {index + 1}. {title}
            </h2>

            {title !== "Contact" ? (
              <p className="text-gray-600 leading-relaxed">
                This is placeholder content. Replace this with your actual terms.
                Ensure the language is clear, fair, and legally reviewed before
                production use.
              </p>
            ) : (
              <>
                <p className="text-gray-600">
                  If you have any questions about these terms, contact us at:
                </p>

                <a
                  href="mailto:legal@jobtracker.com"
                  className="text-blue-600 font-medium hover:underline"
                >
                  legal@jobtracker.com
                </a>
              </>
            )}
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t">
        <p className="text-xs text-gray-500">
          This is a sample Terms of Service and may not cover all legal
          requirements. Please consult a legal professional before using it in a
          production environment.
        </p>
      </footer>
    </main>
  )
}