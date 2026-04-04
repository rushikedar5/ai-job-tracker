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
        setLoading(true)
        setError("")

        try {
            const response = await api.post("/auth/signIn", { email, password })
            localStorage.setItem("token", response.data.token)
            router.push("/dashboard")
        } catch (err) {
            setError("Invalid email or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-4">
                <h1 className="text-2xl font-bold">Sign in</h1>
                
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <Input
                    type="email"
                    placeholder="Email"
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
                    className="w-full" 
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </Button>

                <p className="text-sm text-center">
                    Don't have an account?{" "}
                    <Link href="/signup" className="underline">Sign up</Link>
                </p>
            </div>
        </div>
    )
}