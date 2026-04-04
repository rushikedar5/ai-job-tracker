"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/lib/axios"
import Link from "next/link"

export default function SignInPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await api.post("/auth/signIn", {
        email,
        password,
      })

      // ✅ save token
      localStorage.setItem("token", response.data.token)

      // 🔥 THIS FIXES YOUR PROBLEM (no refresh needed)
      window.dispatchEvent(new Event("authChanged"))

      router.push("/dashboard")

    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <div className="w-full max-w-md bg-white border rounded-xl p-8 shadow-sm space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500">
            Sign in to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center font-medium">
            {error}
          </p>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">

          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="w-full mt-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

        </div>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link href="/signup" className="underline hover:text-black">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}