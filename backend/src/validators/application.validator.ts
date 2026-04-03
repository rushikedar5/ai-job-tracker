import z from "zod";

export const applicationSchema = z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    jobDescription: z.string().min(1),
    status: z.enum(["APPLIED", "SCREENING", "INTERVIEW", "OFFER", "REJECTED", "WITHDRAWN"])
    .default("APPLIED").optional(),
})


