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
        setLoading(true)
        setError("")

        try {
            await api.post("/auth/signUp", { name, email, password })
            router.push("/signin")
        } catch (err) {
            setError("Invalid Credential")
        }finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-4">
                <h1 className="text-2xl font-bold">Sign Up</h1>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                 />

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
                    {loading ? "Signing in..." : "Sign up"}
                 </Button>

                 <p className="text-sm text-center">
                    Already have an account?{" "}
                    <Link href="/signin" className="underline">Sign In</Link>
                </p>

            </div>

        </div>
    )
}