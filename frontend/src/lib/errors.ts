import axios from "axios"

// Pulls the API's `message` out of an axios error, falling back to a friendly default.
export function getErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError<{ message?: string }>(err)) {
    return err.response?.data?.message || fallback
  }
  return fallback
}
