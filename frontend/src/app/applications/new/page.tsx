"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Briefcase, Building2, Save } from "lucide-react"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50/50 dark:bg-black p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <Card className="shadow-lg border-border/50">
          <CardHeader className="space-y-1 pb-6 border-b border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-space-grotesk tracking-tight">Add Application</CardTitle>
                <CardDescription>Track a new job opportunity in your vault</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {error && (
              <div className="mb-6 p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-md font-medium">
                {error}
              </div>
            )}

            <form id="add-app-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      placeholder="e.g. Acme Corp"
                      className="pl-9"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="role"
                      placeholder="e.g. Frontend Engineer"
                      className="pl-9"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
                <Select
                  value={status ?? undefined}
                  onValueChange={(val) => setStatus(val as StatusType)}
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select current status" />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description (Optional)</Label>
                <textarea
                  id="jobDescription"
                  placeholder="Paste the job description here for better AI insights..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px] resize-y"
                />
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 pt-6">
            <Link href="/dashboard">
              <Button variant="ghost" type="button">Cancel</Button>
            </Link>
            <Button 
              type="submit" 
              form="add-app-form" 
              disabled={loading}
              className="px-6 shadow-md"
            >
              {loading ? "Saving..." : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Application
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}