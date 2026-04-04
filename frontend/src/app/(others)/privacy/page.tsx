// app/privacy/page.tsx

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | JobTracker",
  description: "Learn how JobTracker collects and protects your data.",
}

const sections = [
  "Information We Collect",
  "How We Use Data",
  "Data Sharing",
  "Data Retention",
  "Your Rights",
  "Security",
  "Updates",
  "Contact",
]

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-12 space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Privacy Policy
        </h1>

        <p className="text-gray-600 leading-relaxed">
          Your privacy is important to us. This Privacy Policy explains how
          JobTracker collects, uses, and protects your information when you use
          our platform.
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
                This is placeholder content. Replace this with your actual
                privacy policy details. Keep the language simple, transparent,
                and legally compliant.
              </p>
            ) : (
              <>
                <p className="text-gray-600">
                  If you have any questions about this policy, contact us at:
                </p>

                <a
                  href="mailto:privacy@jobtracker.com"
                  className="text-blue-600 font-medium hover:underline"
                >
                  privacy@jobtracker.com
                </a>
              </>
            )}
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t">
        <p className="text-xs text-gray-500">
          This is a sample privacy policy and may not cover all legal
          requirements. Please consult a legal professional before using it in a
          production environment.
        </p>
      </footer>
    </main>
  )
}