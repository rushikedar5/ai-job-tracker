// app/about/page.tsx

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-3xl font-semibold">About JobTracker</h1>

      <p className="text-gray-600">
        JobTracker is an AI-powered platform designed to simplify and improve
        the job application process. Managing multiple applications across
        companies can be overwhelming — we bring everything into one place.
      </p>

      <p className="text-gray-600">
        With built-in tracking, structured workflows, and AI-powered resume
        analysis, JobTracker helps you stay organized and make better decisions
        during your job search.
      </p>

      <div className="space-y-3">
        <h2 className="text-xl font-medium">What we offer</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li>Centralized job application tracking</li>
          <li>Real-time status updates</li>
          <li>AI-based resume feedback with actionable insights</li>
          <li>Simple and distraction-free dashboard</li>
        </ul>
      </div>

      <p className="text-gray-600">
        Our mission is to make job searching more structured, less stressful,
        and more effective.
      </p>
    </div>
  )
}