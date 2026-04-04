// app/privacy/page.tsx

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

      <p className="text-gray-600 mb-4">
        Your privacy is important to us. This policy explains how we collect,
        use, and protect your data.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">Information We Collect</h2>
      <p className="text-gray-600 mb-4">
        We may collect basic user information such as email, job applications,
        and uploaded resumes.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">How We Use Data</h2>
      <p className="text-gray-600 mb-4">
        Your data is used to provide and improve our services, including tracking
        applications and generating AI-based feedback.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">Data Security</h2>
      <p className="text-gray-600 mb-4">
        We take reasonable measures to protect your data, but no system is
        completely secure.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">Third Parties</h2>
      <p className="text-gray-600 mb-4">
        We do not sell your data. Some services (like AI tools) may process
        your data to provide functionality.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">Updates</h2>
      <p className="text-gray-600">
        This policy may be updated periodically.
      </p>
    </div>
  )
}