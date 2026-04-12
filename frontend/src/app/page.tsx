"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Track Your Job Applications <br />
          <span className="text-gray-500">
            Like a Pro
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Manage applications, track progress, and use AI to improve your resume —
          all in one place.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          {/* ✅ Changed */}
          {isLoggedIn ? (
            <Link href="/applications/new">
              <Button size="lg">Add Application</Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
          )}

          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              View Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold text-lg">Track Applications</h3>
          <p className="text-sm text-gray-500 mt-2">
            Keep all your job applications organized in one place.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold text-lg">AI Resume Review</h3>
          <p className="text-sm text-gray-500 mt-2">
            Get instant feedback on your resume with AI insights.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-semibold text-lg">Status Tracking</h3>
          <p className="text-sm text-gray-500 mt-2">
            Monitor your progress from applied to offer.
          </p>
        </div>

      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Ready to land your next job?
        </h2>

        <p className="text-gray-300 mt-3">
          Start tracking your applications today.
        </p>

        <div className="mt-6">
          <Link href="/signup">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}