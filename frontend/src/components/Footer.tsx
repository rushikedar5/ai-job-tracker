"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Footer() {
  const router = useRouter()
  const [plan, setPlan] = useState<"FREE" | "PRO">("FREE")

  useEffect(() => {
    const userPlan = localStorage.getItem("plan") as "FREE" | "PRO" | null
    setPlan(userPlan || "FREE")
  }, [])

  const handleProtectedRoute = (
    e: React.MouseEvent,
    path: string
  ) => {
    const token = localStorage.getItem("token")

    if (!token) {
      e.preventDefault()
      router.push("/signin")
    }
  }

  return (
    <footer className="w-full border-t bg-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="md:col-span-2 space-y-3">
            <h2 className="text-lg font-semibold">JobTracker</h2>
            <p className="text-sm text-gray-500 max-w-md">
              Track your job applications, manage progress, and land your next opportunity faster.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Product</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-500">

              <Link href="/dashboard" onClick={(e) => handleProtectedRoute(e, "/dashboard")} className="hover:text-black">
                Dashboard
              </Link>

              <Link href="/applications/new" onClick={(e) => handleProtectedRoute(e, "/applications/new")} className="hover:text-black">
                Add Application
              </Link>

              <Link href="/upload" onClick={(e) => handleProtectedRoute(e, "/upload")} className="hover:text-black">
                AI Resume Review
              </Link>

              {/* ✅ Upgrade only for FREE users */}
              {plan === "FREE" && (
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  Upgrade to Pro
                </Link>
              )}

            </div>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Company</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="/about" className="hover:text-black">About</Link>
              <Link href="/career" className="hover:text-black">Careers</Link>
              <Link href="/contact" className="hover:text-black">Contact</Link>
            </div>
          </div>

        </div>

        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} JobTracker. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}