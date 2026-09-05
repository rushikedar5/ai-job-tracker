"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuth = () => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
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

  const isLandingPage = pathname === "/"

  const getNavLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300 ${
      isActive
        ? "text-foreground font-semibold after:scale-x-100"
        : "after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 sm:px-6 lg:px-8">
      {isLandingPage && (
        <div className="absolute inset-x-0 -top-full h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300" />
      )}
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-6 backdrop-blur-md shadow-lg shadow-black/5 dark:bg-black/20 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary">
            HireVault
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-primary" />
          </Link>
        </div>
        
        {isLoggedIn ? (
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/dashboard" onClick={(e) => handleProtectedRoute(e, "/dashboard")} className={getNavLinkClass("/dashboard")}>Dashboard</Link>
            <Link href="/applications/new" onClick={(e) => handleProtectedRoute(e, "/applications/new")} className={getNavLinkClass("/applications/new")}>Add Application</Link>
            <Link href="/upload" onClick={(e) => handleProtectedRoute(e, "/upload")} className={getNavLinkClass("/upload")}>AI Review</Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/#product" className={getNavLinkClass("/#product")}>Product</Link>
            <Link href="/#features" className={getNavLinkClass("/#features")}>Features</Link>
            <Link href="/#analytics" className={getNavLinkClass("/#analytics")}>Insights</Link>
            <Link href="/#how" className={getNavLinkClass("/#how")}>How it works</Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button 
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-95"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/signin" className="hidden text-sm font-medium text-foreground hover:text-primary sm:block">
                Sign in
              </Link>
              <Link href="/signup" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105 active:scale-95">
                  Get started
              </Link>
            </>
          )}
          <button className="md:hidden flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-foreground/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </nav>
    </header>
  )
}