"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useIsLoggedIn } from "@/lib/useIsLoggedIn"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles, LayoutDashboard, Target, BarChart3, CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()

  useEffect(() => {
    if (isLoggedIn) router.push("/dashboard")
  }, [isLoggedIn, router])

  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero Section */}
      <section id="product" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase mb-8 border border-primary/10">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Your Job Search, Organized
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-[1.1]">
          Stop searching.<br />
          <span className="text-muted-foreground italic font-medium">Start moving.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          HireVault brings every application, interview, and opportunity into one calm workspace — with AI that helps you make your next move.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isLoggedIn ? (
            <Link href="/applications/new" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 active:scale-95">
              Add Application <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          ) : (
            <Link href="/signup" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 active:scale-95">
              Start tracking free <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          )}
          <Link href="#features" className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Explore the product
          </Link>
        </div>

        {/* Product Preview Mockup */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none h-full w-full" />
          <div className="rounded-2xl border border-border/50 bg-white/50 backdrop-blur-xl shadow-2xl p-2 md:p-4 overflow-hidden dark:bg-black/50">
            <div className="rounded-xl border border-border/50 bg-background shadow-inner overflow-hidden flex flex-col md:flex-row h-[400px] md:h-[500px]">
              
              {/* Sidebar Mockup */}
              <div className="hidden md:flex w-64 bg-muted/30 border-r border-border/50 p-6 flex-col">
                <div className="text-xs font-semibold tracking-wider text-muted-foreground mb-8">HIREVAULT</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 bg-primary/5 text-primary rounded-lg text-sm font-medium"><LayoutDashboard className="w-4 h-4" /> Overview</div>
                  <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-sm font-medium"><Target className="w-4 h-4" /> Applications</div>
                  <div className="flex items-center gap-3 px-3 py-2 text-muted-foreground rounded-lg text-sm font-medium"><Sparkles className="w-4 h-4" /> Resume AI</div>
                </div>
              </div>

              {/* Main Content Mockup */}
              <div className="flex-1 p-6 md:p-10 overflow-hidden relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Overview</h2>
                    <p className="text-sm text-muted-foreground">All systems ready.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-xl border border-border/50 bg-muted/20">
                    <p className="text-xs text-muted-foreground font-medium mb-1">APPLICATIONS</p>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/50 bg-muted/20">
                    <p className="text-xs text-muted-foreground font-medium mb-1">INTERVIEWS</p>
                    <p className="text-3xl font-bold">08</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/50 bg-muted/20">
                    <p className="text-xs text-muted-foreground font-medium mb-1">RESPONSE RATE</p>
                    <p className="text-3xl font-bold text-primary">33%</p>
                  </div>
                </div>

                {/* Pipeline Mockup */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-border/50 bg-card flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-bold">Razorpay</p>
                        <p className="text-xs text-muted-foreground">Software Engineer</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-md">APPLIED</span>
                  </div>
                  <div className="p-4 rounded-xl border border-border/50 bg-card flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <div>
                        <p className="text-sm font-bold">Zepto</p>
                        <p className="text-xs text-muted-foreground">Frontend Engineer</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-md">INTERVIEW</span>
                  </div>
                </div>

                {/* Floating AI Card overlay */}
                <div className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 w-72 p-5 rounded-2xl border border-border bg-card shadow-2xl z-20">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold tracking-widest text-primary uppercase">Resume AI Match</span>
                  </div>
                  <div className="text-4xl font-extrabold mb-2">86<span className="text-xl text-muted-foreground">/100</span></div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-primary w-[86%]" />
                  </div>
                  <p className="text-xs text-muted-foreground">Strong match · 4 improvements found</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-y border-border/50 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-6">Built for the way modern candidates search</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-bold text-foreground/40">
            <span>ENGINEERS</span>
            <span>DESIGNERS</span>
            <span>PRODUCT</span>
            <span>ANALYSTS</span>
            <span>BUILDERS</span>
            <span>CAREER SWITCHERS</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="text-primary text-xs font-bold tracking-widest uppercase mb-4">One Workspace</div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Everything you need to keep opportunities moving.</h2>
          <p className="text-lg text-muted-foreground">From the first application to the final offer, HireVault turns a scattered job hunt into a clear, trackable system.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 transition-colors hover:bg-muted/50">
            <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-border shadow-sm mb-6">
              <LayoutDashboard className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">Application command center</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">Track every company, role, stage, contact and next action without losing the thread.</p>
          </div>
          <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 transition-colors hover:bg-muted/50">
            <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-border shadow-sm mb-6">
              <Sparkles className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI resume review</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">Get an instant signal on ATS readiness, role alignment, keywords and the areas worth improving.</p>
          </div>
          <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 transition-colors hover:bg-muted/50">
            <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-border shadow-sm mb-6">
              <CheckCircle2 className="w-6 h-6 text-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3">Interview intelligence</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">Keep interviews, preparation notes, dates and follow-ups connected to the application that started it all.</p>
          </div>
        </div>
      </section>

      {/* Analytics Dark Band Section */}
      <section id="analytics" className="py-24 bg-[#071829] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">Career Signals</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">Know what is working.<br />Change what isn&apos;t.</h2>
              <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">HireVault turns your application history into useful signals so you can spend less time guessing and more time improving.</p>
              <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full bg-white text-[#071829] px-8 py-4 text-sm font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">
                View your insights <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono tracking-widest text-slate-400">APPLICATION RESPONSE RATE</span>
                  <BarChart3 className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex items-end gap-3 h-48 mb-4">
                  {[32, 44, 40, 57, 63, 72, 84, 91].map((val, i) => (
                    <div key={i} className="flex-1 h-full bg-white/10 rounded-t-sm relative group">
                      <div className="absolute bottom-0 w-full bg-emerald-400 rounded-t-sm transition-all duration-500" style={{ height: `${val}%` }} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-8">
                  <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span><span>W8</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                  <div>
                    <strong className="block text-sm mb-1">Your interview rate is trending up.</strong>
                    <span className="text-xs text-slate-400 leading-relaxed">Target roles with stronger skill overlap to keep improving.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="text-primary text-xs font-bold tracking-widest uppercase mb-4">Your Next Opportunity</div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Make your job search feel less like a spreadsheet.</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">One workspace. Better signals. More momentum.</p>
        <Link href={isLoggedIn ? "/applications/new" : "/signup"} className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-10 py-5 text-base font-bold shadow-2xl transition-transform hover:scale-105 active:scale-95">
          Create your free vault <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>
    </main>
  )
}