import "dotenv/config";
import { reviewResume } from "./libs/resumeReview";
const text = `Jane Doe — Software Engineer. jane@example.com
EXPERIENCE: Acme Corp (2021–2024) Built React + Node.js dashboards used by 5,000 users; cut API latency 40% with Redis caching; led migration to TypeScript.
Startup X (2019–2021) Full-stack developer, Express, PostgreSQL, AWS Lambda, CI/CD with GitHub Actions.
EDUCATION: B.Tech Computer Science, 2019. SKILLS: JavaScript, TypeScript, React, Next.js, Node, SQL, Docker, AWS.
PROJECTS: "Tracker" — a job-application tracker with AI resume reviews ("ATS" scoring), 200+ users.`;
(async () => { for (let i = 0; i < 3; i++) { try { const r = await reviewResume(text); console.log("OK", r["ats score"], r.strengths.length); } catch (e: any) { console.log("FAIL", e.status, e.message?.slice(0, 200), e.error?.failed_generation?.slice?.(0, 300)); } } })();
