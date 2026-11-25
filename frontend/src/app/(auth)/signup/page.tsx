"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/axios"
import { getErrorMessage } from "@/lib/errors"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill all fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      await api.post("/auth/signUp", {
        name,
        email,
        password,
      })

      router.push("/signin")
    } catch (err) {
      setError(getErrorMessage(err, "Signup failed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[400px] space-y-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground font-space-grotesk">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Start tracking your job applications today
            </p>
          </div>
          
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-md font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Creating account..." : "Sign up"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline hover:text-primary font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-primary lg:flex items-center justify-center flex-col p-12 text-primary-foreground relative overflow-hidden lg:rounded-tl-3xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="z-10 max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-space-grotesk tracking-tight font-medium">
            Elevate your search.
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Get instant signals on ATS readiness, role alignment, and keywords that actually matter to recruiters.
          </p>
        </div>
      </div>
    </div>
  )
}