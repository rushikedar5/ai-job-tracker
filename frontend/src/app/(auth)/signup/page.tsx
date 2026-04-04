"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/lib/axios"
import Link from "next/link"

export default function SignUpPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
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
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed")
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
            Create your account
          </h1>
          <p className="text-sm text-gray-500">
            Start tracking your job applications
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
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            {loading ? "Creating account..." : "Sign up"}
          </Button>

        </div>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link href="/signin" className="underline hover:text-black">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}