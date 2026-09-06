"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, LayoutDashboard, PlusCircle, Sparkles, LogOut } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.dispatchEvent(new Event("authChanged"))
    setMobileMenuOpen(false)
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

  const getMobileLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
      isActive
        ? "bg-primary/10 text-primary"
        : "text-foreground/70 hover:bg-muted hover:text-foreground active:bg-muted/80"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 py-3 sm:px-6 lg:px-8">
      {isLandingPage && (
        <div className="absolute inset-x-0 -top-full h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300" />
      )}
      <nav className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 sm:px-6 backdrop-blur-md shadow-lg shadow-black/5 dark:bg-black/20 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="text-lg sm:text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary">
            HireVault
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-primary" />
          </Link>
        </div>
        
        {/* Desktop Nav Links */}
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

        <div className="flex items-center gap-3">
          {/* Desktop Auth Buttons */}
          {isLoggedIn ? (
            <button 
              className="hidden md:inline-flex rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted active:scale-95"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/signin" className="hidden text-sm font-medium text-foreground hover:text-primary sm:block md:block">
                Sign in
              </Link>
              <Link href="/signup" className="hidden sm:inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:scale-105 active:scale-95">
                  Get started
              </Link>
            </>
          )}
          
          {/* Mobile Hamburger */}
          <button 
            className="md:hidden flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-foreground/10 active:bg-foreground/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-[calc(3.5rem+1.5rem)] z-40 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div className={`md:hidden absolute left-3 right-3 top-[calc(3.5rem+1.5rem+0.5rem)] z-50 rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-out overflow-hidden ${
        mobileMenuOpen 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}>
        <div className="p-4 space-y-1">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" onClick={(e) => handleProtectedRoute(e, "/dashboard")} className={getMobileLinkClass("/dashboard")}>
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link href="/applications/new" onClick={(e) => handleProtectedRoute(e, "/applications/new")} className={getMobileLinkClass("/applications/new")}>
                <PlusCircle className="h-5 w-5" />
                Add Application
              </Link>
              <Link href="/upload" onClick={(e) => handleProtectedRoute(e, "/upload")} className={getMobileLinkClass("/upload")}>
                <Sparkles className="h-5 w-5" />
                AI Review
              </Link>
              <div className="my-3 border-t border-border/40" />
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full active:bg-red-100"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/#product" className={getMobileLinkClass("/#product")}>Product</Link>
              <Link href="/#features" className={getMobileLinkClass("/#features")}>Features</Link>
              <Link href="/#analytics" className={getMobileLinkClass("/#analytics")}>Insights</Link>
              <Link href="/#how" className={getMobileLinkClass("/#how")}>How it works</Link>
              <div className="my-3 border-t border-border/40" />
              <div className="flex flex-col gap-2 px-1">
                <Link href="/signin" className="flex items-center justify-center rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted active:bg-muted/80">
                  Sign in
                </Link>
                <Link href="/signup" className="flex items-center justify-center rounded-xl bg-primary py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all active:scale-[0.98]">
                  Get started
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}