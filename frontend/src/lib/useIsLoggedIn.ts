"use client"

import { useSyncExternalStore } from "react"

// Auth state lives in localStorage; "authChanged" is dispatched on login/logout in this tab,
// and "storage" fires when another tab changes it.
function subscribe(onChange: () => void) {
  window.addEventListener("authChanged", onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener("authChanged", onChange)
    window.removeEventListener("storage", onChange)
  }
}

const getSnapshot = () => !!localStorage.getItem("token")
// The server can't see localStorage, so render as logged out until hydrated.
const getServerSnapshot = () => false

export function useIsLoggedIn(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
