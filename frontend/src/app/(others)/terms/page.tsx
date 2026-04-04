// app/terms/page.tsx

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-6">Terms & Conditions</h1>

      <p className="text-gray-600 mb-4">
        By using JobTracker, you agree to the following terms.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">Use of Service</h2>
      <p className="text-gray-600 mb-4">
        You agree to use the platform only for lawful purposes and not misuse
        any part of the service.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">User Data</h2>
      <p className="text-gray-600 mb-4">
        You are responsible for the data you provide. We do not guarantee
        accuracy or outcomes based on the platform.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">Limitation of Liability</h2>
      <p className="text-gray-600 mb-4">
        JobTracker is provided "as is" without warranties. We are not responsible
        for any losses or damages arising from its use.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2">Changes</h2>
      <p className="text-gray-600">
        We may update these terms at any time without prior notice.
      </p>
    </div>
  )
}