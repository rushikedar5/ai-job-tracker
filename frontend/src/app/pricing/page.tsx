"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios"
import Link from "next/link"

export default function PricingPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handlePayment = async () => {
        setLoading(true)
        try {
            const { data } = await api.post("/payments/create-order")
            const order = data.order

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "HireVault",
                description: "Pro Plan - Unlimited AI Resume Reviews",
                order_id: order.id,
                handler: async (response: any) => {
                    try {
                        await api.post("/payments/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                        router.push("/dashboard?upgraded=true")
                    } catch (err) {
                        alert("Payment verification failed")
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                },
                theme: {
                    color: "#000000"
                }
            }

            const razor = new (window as any).Razorpay(options)
            razor.open()
        } catch (err) {
            alert("Failed to initiate payment")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Simple Pricing</h1>
                    <p className="text-gray-500">Choose the plan that works for you</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Free Plan */}
                    <div className="border rounded-lg p-8 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold">Free</h2>
                            <p className="text-gray-500 mt-1">Get started for free</p>
                        </div>
                        <div>
                            <span className="text-5xl font-bold">₹0</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <ul className="space-y-3 text-sm">
                            <li>✅ Track unlimited applications</li>
                            <li>✅ Update application status</li>
                            <li>✅ 5 AI resume reviews</li>
                            <li>❌ Unlimited AI reviews</li>
                        </ul>
                        <Link href="/dashboard">
                            <Button variant="outline" className="w-full">
                                Go to Dashboard
                            </Button>
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="border-2 border-black rounded-lg p-8 space-y-6 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                                Most Popular
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Pro</h2>
                            <p className="text-gray-500 mt-1">For serious job seekers</p>
                        </div>
                        <div>
                            <span className="text-5xl font-bold">₹199</span>
                            <span className="text-gray-500">/month</span>
                        </div>
                        <ul className="space-y-3 text-sm">
                            <li>✅ Track unlimited applications</li>
                            <li>✅ Update application status</li>
                            <li>✅ 5 AI resume reviews</li>
                            <li>✅ Unlimited AI reviews</li>
                        </ul>
                        <Button
                            className="w-full"
                            onClick={handlePayment}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Upgrade to Pro — ₹199"}
                        </Button>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link href="/dashboard">
                        <Button variant="ghost">Back to Dashboard</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}