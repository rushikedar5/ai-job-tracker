"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Footer() {
  const router = useRouter()

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
    <footer className="border-t border-border/40 bg-muted/20 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center text-xl font-semibold tracking-tight text-foreground mb-4 transition-colors hover:text-primary">
              HireVault
              <span className="ml-1 inline-block h-2 w-2 rounded-full bg-primary" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A focused workspace for people who want to take control of their job search.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="text-xs font-bold text-foreground tracking-widest uppercase mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/dashboard" onClick={(e) => handleProtectedRoute(e, "/dashboard")} className="transition-colors hover:text-foreground">Dashboard</Link></li>
              <li><Link href="/applications/new" onClick={(e) => handleProtectedRoute(e, "/applications/new")} className="transition-colors hover:text-foreground">Add Application</Link></li>
              <li><Link href="/upload" onClick={(e) => handleProtectedRoute(e, "/upload")} className="transition-colors hover:text-foreground">AI Review</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-foreground tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="transition-colors hover:text-foreground">About</Link></li>
              <li><Link href="/career" className="transition-colors hover:text-foreground">Careers</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-muted-foreground/60">
          <span>© {new Date().getFullYear()} HireVault</span>
          <span>Built for candidates, not clutter.</span>
        </div>
      </div>
    </footer>
  )
}