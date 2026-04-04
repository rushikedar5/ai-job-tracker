"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { Application } from "@/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const statusColors: Record<string, string> = {
    APPLIED: "bg-blue-100 text-blue-800",
    SCREENING: "bg-yellow-100 text-yellow-800",
    INTERVIEW: "bg-purple-100 text-purple-800",
    OFFER: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    WITHDRAWN: "bg-gray-100 text-gray-800",
}

export default function DashboardPage() {
    const router = useRouter()
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get("/applications")
                setApplications(response.data.application)
            } catch (err) {
                router.push("/signin")
            } finally {
                setLoading(false)
            }
        }
        fetchApplications()
    }, [])

    if (loading) return <div className="p-8">Loading...</div>

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">My Applications</h1>
                    <div className="flex gap-3">
                        <Link href="/upload">
                            <Button variant="outline">AI Resume Review</Button>
                        </Link>
                        <Link href="/applications/new">
                            <Button>Add Application</Button>
                        </Link>
                    </div>
                </div>

                {applications.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-lg">No applications yet</p>
                        <p className="text-sm mt-2">Add your first job application to get started</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {applications.map((app) => (
                            <div key={app.id} className="border rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <h2 className="text-lg font-semibold">{app.company}</h2>
                                    <p className="text-gray-600">{app.role}</p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                                        {app.status}
                                    </span>
                                    <Link href={`/applications/${app.id}`}>
                                        <Button variant="outline" size="sm">View</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}