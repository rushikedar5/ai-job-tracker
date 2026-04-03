export type User = {
    id: number
    name: string
    email: string
}

export type Application = {
    id: number
    company: string
    role: string
    jobDescription: string
    status: "APPLIED" | "SCREENING" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN"
    appliedAt: string
    userId: number
}

export type Document = {
    id: number
    filename: string
    url: string
    createdAt: string
    userId: number
}