"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

type StatusType =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "WITHDRAWN"

export default function NewApplicationPage() {
  const router = useRouter()

  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [status, setStatus] = useState<StatusType | null>(null)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!company || !role || !status) {
      setError("Please fill all required fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      await api.post("/applications", {
        company,
        role,
        jobDescription,
        status,
      })

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create application")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl bg-white border rounded-xl p-8 shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Add Application
          </h1>

          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Back
            </Button>
          </Link>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">

          {/* Company */}
          <Input
            placeholder="Company *"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          {/* Role */}
          <Input
            placeholder="Role *"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          {/* Job Description */}
          <textarea
            placeholder="Job Description (optional)"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full border rounded-md p-3 text-sm min-h-30 resize-none 
                       focus:outline-none focus:ring-2 focus:ring-black/20"
          />

          {/* Status */}
          <Select
            value={status ?? undefined}
            onValueChange={(val) => setStatus(val as StatusType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status *" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="APPLIED">Applied</SelectItem>
              <SelectItem value="SCREENING">Screening</SelectItem>
              <SelectItem value="INTERVIEW">Interview</SelectItem>
              <SelectItem value="OFFER">Offer</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
            </SelectContent>
          </Select>

          {/* Button */}
          <Button
            className="w-full mt-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Application"}
          </Button>
        </div>
      </div>
    </div>
  )
}