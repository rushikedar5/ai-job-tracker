// app/dashboard/page.tsx

export const dynamic = "force-dynamic"

"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import api from "@/lib/axios"
import { Application } from "@/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const statusColors: Record<string, string> = {
  APPLIED: "bg-blue-100 text-blue-800",
  SCREENING: "bg-yellow-100 text-yellow-800",
  INTERVIEW: "bg-purple-100 text-purple-800",
  OFFER: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  WITHDRAWN: "bg-gray-100 text-gray-800",
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const upgraded = searchParams.get("upgraded")

  const [applications, setApplications] = useState<Application[]>([])
  const [plan, setPlan] = useState<"FREE" | "PRO">("FREE")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/applications")

        setApplications(response.data.application || [])

        // ✅ Get user plan (adjust based on your backend response)
        if (response.data.user?.plan) {
          setPlan(response.data.user.plan)
        }

      } catch (err) {
        router.push("/signin")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading applications...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Upgrade success banner (only show once + only for PRO) */}
        {upgraded && plan === "PRO" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm mb-6">
            Successfully upgraded to Pro! Enjoy unlimited AI reviews.
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              My Applications
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track and manage your job applications
            </p>
          </div>

          <div className="flex gap-3">

            {/* ✅ Show only for FREE users */}
            {plan === "FREE" && (
              <Link href="/pricing">
                <Button variant="outline">Upgrade to Pro</Button>
              </Link>
            )}

            <Link href="/upload">
              <Button variant="outline">AI Resume Review</Button>
            </Link>

            <Link href="/applications/new">
              <Button>Add Application</Button>
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center border rounded-xl py-20 bg-white">
            <p className="text-lg font-medium text-gray-700">
              No applications yet
            </p>
            <p className="text-sm text-gray-500 mt-2 mb-4">
              Start tracking your job applications now
            </p>
            <Link href="/applications/new">
              <Button>Add Your First Application</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white border rounded-xl p-6 flex items-center justify-between hover:shadow-md transition"
              >
                <div>
                  <h2 className="text-lg font-semibold">{app.company}</h2>
                  <p className="text-gray-600">{app.role}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Applied {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                    {app.status}
                  </span>

                  <Link href={`/applications/${app.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}