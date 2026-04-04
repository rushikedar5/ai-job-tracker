"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    } catch (err) {
      setError("Failed to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Resume Review</h1>
          <Link href="/dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-gray-500 text-sm">Upload your resume PDF</p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm file:mr-4 file:px-4 file:py-2 
                   file:rounded-md file:border-0 
                   file:bg-black file:text-white 
                   hover:file:bg-gray-800 cursor-pointer"
          />

          <Button
            onClick={handleUpload}
            disabled={loading || !file}
            className="w-full max-w-xs"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </div>

        {feedback && (
          <div className="space-y-6">
            <div className="border rounded-lg p-6 text-center">
              <p className="text-gray-500 text-sm">ATS Score</p>
              <p className="text-5xl font-bold mt-2">
                {feedback["ats score"]}
                <span className="text-xl text-gray-400">/100</span>
              </p>
            </div>

            <div className="border rounded-lg p-6 space-y-2">
              <h2 className="font-semibold text-green-600">Strengths</h2>
              <ul className="space-y-1">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    • {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border rounded-lg p-6 space-y-2">
              <h2 className="font-semibold text-red-500">Areas to improve</h2>
              <ul className="space-y-1">
                {feedback.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    • {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border rounded-lg p-6 space-y-2">
              <h2 className="font-semibold text-blue-500">Suggestions</h2>
              <ul className="space-y-1">
                {feedback.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    • {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
