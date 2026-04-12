"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [plan, setPlan] = useState<"FREE" | "PRO">("FREE")

  const checkAuth = () => {
    const token = localStorage.getItem("token")
    const userPlan = localStorage.getItem("plan") as "FREE" | "PRO" | null

    setIsLoggedIn(!!token)
    setPlan(userPlan || "FREE")
  }

  useEffect(() => {
    checkAuth()

    window.addEventListener("authChanged", checkAuth)

    return () => {
      window.removeEventListener("authChanged", checkAuth)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("plan")

    window.dispatchEvent(new Event("authChanged"))

    router.push("/signin")
  }

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

  const isActive = (path: string) => pathname === path

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="font-semibold text-lg">
          JobTracker
        </Link>

        <div className="flex items-center gap-6 text-sm">

          <Link
            href="/dashboard"
            onClick={(e) => handleProtectedRoute(e, "/dashboard")}
            className={`hover:text-black ${
              isActive("/dashboard") ? "font-medium text-black" : "text-gray-500"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/applications/new"
            onClick={(e) => handleProtectedRoute(e, "/applications/new")}
            className={`hover:text-black ${
              isActive("/applications/new")
                ? "font-medium text-black"
                : "text-gray-500"
            }`}
          >
            Add Application
          </Link>

          <Link
            href="/upload"
            onClick={(e) => handleProtectedRoute(e, "/upload")}
            className={`hover:text-black ${
              isActive("/upload") ? "font-medium text-black" : "text-gray-500"
            }`}
          >
            AI Review
          </Link>

          {/* ✅ Upgrade only for FREE users */}
          {isLoggedIn && plan === "FREE" && (
            <Link href="/pricing">
              <span className="text-blue-600 font-medium hover:underline">
                Upgrade
              </span>
            </Link>
          )}

        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>

              <Link href="/signup">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}