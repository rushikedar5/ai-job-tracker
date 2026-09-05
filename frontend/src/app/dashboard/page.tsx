"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import api from "@/lib/axios"
import { Application } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BarChart3, Briefcase, Calendar, ChevronRight, MessageSquare, Plus, Sparkles, TrendingUp } from "lucide-react"

const statusColors: Record<string, string> = {
  APPLIED: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  SCREENING: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  INTERVIEW: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
  OFFER: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  REJECTED: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  WITHDRAWN: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const upgraded = searchParams.get("upgraded")

  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<string>("free")

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/applications")
        setApplications(response.data.application || [])
        if (response.data.user?.plan) {
          setPlan(response.data.user.plan)
        }
      } catch (err) {
        router.push("/signin")
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [router])

  const totalApplications = applications.length
  const totalInterviews = applications.filter(app => app.status === "INTERVIEW").length
  const offers = applications.filter(app => app.status === "OFFER").length
  const responseRate = totalApplications > 0 ? Math.round(((totalInterviews + offers) / totalApplications) * 100) : 0

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading your vault...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50/50 dark:bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Upgrade success banner */}
        {upgraded && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl p-4 flex items-center gap-3 text-green-800 dark:text-green-400 text-sm shadow-sm">
            <Sparkles className="h-5 w-5" />
            <div>
              <strong className="font-semibold block">Successfully upgraded to Pro!</strong>
              Enjoy unlimited AI resume reviews and advanced insights.
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight font-space-grotesk text-foreground">
                Overview
              </h1>
              {plan === "Pro" && (
                <Badge variant="default" className="bg-primary text-primary-foreground font-dm-mono uppercase tracking-wider text-[10px]">
                  Pro Member
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              Track and manage your job applications
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {plan === "free" && (
              <Link href="/pricing">
                <Button variant="outline" className="border-orange-200 bg-orange-50/50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/20 dark:text-orange-400">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              </Link>
            )}
            <Link href="/upload">
              <Button variant="secondary" className="shadow-sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                AI Resume Review
              </Button>
            </Link>
            <Link href="/applications/new">
              <Button className="shadow-sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Application
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground font-dm-mono uppercase tracking-wider">
                Total Applied
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-space-grotesk">{totalApplications}</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground font-dm-mono uppercase tracking-wider">
                Interviews
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-space-grotesk">{totalInterviews}</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground font-dm-mono uppercase tracking-wider">
                Offers
              </CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-space-grotesk">{offers}</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground font-dm-mono uppercase tracking-wider">
                Response Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-space-grotesk">{responseRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight font-space-grotesk">Recent Applications</h2>
          
          {applications.length === 0 ? (
            <Card className="border-dashed border-2 shadow-sm bg-transparent">
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground">No applications yet</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-sm">
                  Start building your pipeline by adding your first job application to the vault.
                </p>
                <Link href="/applications/new">
                  <Button>Add Your First Application</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="shadow-sm border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="w-[300px] font-dm-mono text-xs uppercase tracking-wider">Company & Role</TableHead>
                      <TableHead className="font-dm-mono text-xs uppercase tracking-wider">Status</TableHead>
                      <TableHead className="font-dm-mono text-xs uppercase tracking-wider">Applied Date</TableHead>
                      <TableHead className="text-right font-dm-mono text-xs uppercase tracking-wider">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id} className="group hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => router.push(`/applications/${app.id}`)}>
                        <TableCell>
                          <div className="font-medium text-foreground">{app.company}</div>
                          <div className="text-sm text-muted-foreground mt-0.5">{app.role}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`font-medium ${statusColors[app.status]}`}>
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-3.5 w-3.5" />
                            {new Date(app.appliedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}