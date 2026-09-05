"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, FileText, Lightbulb, UploadCloud, XCircle } from "lucide-react";

type Feedback = {
  "ats score": number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
};

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return setError("Please select a PDF file");

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFeedback(response.data.feedback);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50/50 dark:bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-semibold tracking-tight font-space-grotesk flex items-center gap-2">
              AI Resume Review
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-dm-mono uppercase dark:bg-blue-900/40 dark:text-blue-400 ml-2">Beta</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Upload your resume to get instant AI-powered feedback on your ATS readiness, formatting, and content.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-lg font-medium shadow-sm flex items-start gap-3">
            <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {!feedback ? (
          <Card className="border-dashed border-2 bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-24 text-center px-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <UploadCloud className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight font-space-grotesk mb-2">Upload your resume</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8">
                Drag and drop your PDF resume here, or click to browse files from your computer. Max file size: 5MB.
              </p>
              
              <div className="relative group">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <Button variant="outline" size="lg" className="w-full sm:w-64 border-primary/20 hover:bg-primary/5 transition-all">
                  <FileText className="mr-2 h-4 w-4 text-primary" />
                  {file ? file.name : "Select PDF File"}
                </Button>
              </div>

              {file && (
                <div className="mt-8">
                  <Button
                    size="lg"
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full sm:w-64 px-8 text-base shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                        Analyzing...
                      </span>
                    ) : (
                      "Analyze Resume"
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-black p-6 rounded-2xl border border-border/50 shadow-sm">
              <div className="flex items-center gap-6">
                <div className="relative flex items-center justify-center h-24 w-24">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                      strokeDasharray="283" 
                      strokeDashoffset={283 - (283 * feedback["ats score"]) / 100} 
                      className={getProgressColor(feedback["ats score"])} 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className={`text-2xl font-bold font-space-grotesk ${getScoreColor(feedback["ats score"])}`}>
                      {feedback["ats score"]}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold font-space-grotesk">ATS Match Score</h2>
                  <p className="text-sm text-muted-foreground mt-1">Based on industry standard ATS parsing rules.</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => { setFeedback(null); setFile(null); }}>
                Analyze Another
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-sm border-green-200 dark:border-green-900/50 bg-green-50/30 dark:bg-green-950/10">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-md">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-base text-green-800 dark:text-green-400">Strengths</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feedback.strengths.map((s, i) => (
                      <li key={i} className="flex items-start text-sm text-muted-foreground">
                        <ChevronRight className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/10">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-md">
                      <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <CardTitle className="text-base text-red-800 dark:text-red-400">Areas to Improve</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feedback.improvements.map((s, i) => (
                      <li key={i} className="flex items-start text-sm text-muted-foreground">
                        <ChevronRight className="h-4 w-4 mr-2 text-red-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/10">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-md">
                      <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-base text-blue-800 dark:text-blue-400">Suggestions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feedback.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start text-sm text-muted-foreground">
                        <ChevronRight className="h-4 w-4 mr-2 text-blue-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
