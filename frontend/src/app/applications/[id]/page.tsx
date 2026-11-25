"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import api from "@/lib/axios"
import { Application } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import Swal from "sweetalert2" // ✅ added

type StatusType =
  | "APPLIED"
  | "SCREENING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "WITHDRAWN"

export default function ApplicationPage() {
  const router = useRouter()
  const { id } = useParams()

  const [application, setApplication] = useState<Application | null>(null)
  const [status, setStatus] = useState<StatusType | null>(null)

  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await api.get(`/applications/${id}`)
        setApplication(response.data.application)
        setStatus(response.data.application.status)
      } catch {
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [id, router])

  const handleUpdateStatus = async () => {
    if (!status) return

    setUpdating(true)
    setSuccess("")

    try {
      await api.put(`/applications/${id}`, { status })

      setApplication((prev) =>
        prev ? { ...prev, status } : null
      )

      setSuccess("Status updated successfully ✅")

      setTimeout(() => {
        setSuccess("")
      }, 2000)

    } catch {
      console.error("Failed to update status")
    } finally {
      setUpdating(false)
    }
  }

  // 🔥 SweetAlert Delete
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Application?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    })

    if (!result.isConfirmed) return

    try {
      await api.delete(`/applications/${id}`)

      await Swal.fire({
        title: "Deleted!",
        text: "Application has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })

      router.push("/dashboard")
    } catch {
      Swal.fire({
        title: "Error",
        text: "Failed to delete application",
        icon: "error",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading application...
      </div>
    )
  }

  if (!application) return null

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50/50 dark:bg-black p-4 sm:p-6 lg:p-8">

      <div className="max-w-2xl mx-auto space-y-6">

        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </Link>

          <Button variant="destructive" size="sm" onClick={handleDelete} className="active:scale-95 transition-transform">
            Delete
          </Button>
        </div>

        {/* Main card */}
        <div className="bg-background border border-border/50 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-border/40">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {application.company}
            </h1>
            <p className="text-base text-muted-foreground mt-0.5">
              {application.role}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Applied{" "}
              {new Date(application.appliedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Job Description */}
          {application.jobDescription && (
            <div className="p-5 sm:p-6 border-b border-border/40">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Job Description</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {application.jobDescription}
              </p>
            </div>
          )}

          {/* Update Status */}
          <div className="p-5 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Update Status</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={status ?? undefined}
                onValueChange={(val) => setStatus(val as StatusType)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select status" />
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

              <Button
                onClick={handleUpdateStatus}
                disabled={updating}
                className="w-full sm:w-auto active:scale-95 transition-transform"
              >
                {updating ? "Saving..." : "Save"}
              </Button>
            </div>

            {success && (
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                {success}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}