"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token")
    }
    return false
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/signin")
  }

  // 🔒 protect routes
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

        {/* Logo */}
        <Link href="/" className="font-semibold text-lg">
          JobTracker
        </Link>

        {/* Links (ALWAYS visible) */}
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

        </div>

        {/* Right side */}
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