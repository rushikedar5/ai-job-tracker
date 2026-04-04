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
      } catch (err) {
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

    } catch (err) {
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
    } catch (err) {
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
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-2xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="outline">Back</Button>
          </Link>

          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>

        <div className="bg-white border rounded-xl p-6 space-y-6">

          <div>
            <h1 className="text-2xl font-semibold">
              {application.company}
            </h1>

            <p className="text-gray-600 text-lg">
              {application.role}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Applied{" "}
              {new Date(application.appliedAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Job Description</h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {application.jobDescription}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Update Status</h2>

            <div className="flex gap-3">
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
              >
                {updating ? "Saving..." : "Save"}
              </Button>
            </div>

            {success && (
              <p className="text-sm text-green-600 font-medium">
                {success}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}