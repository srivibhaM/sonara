"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("sonara-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect logic
    const protectedRoutes = ["/dashboard", "/profile", "/settings"]
    const publicRoutes = ["/", "/login", "/signup"]

    if (!isLoading) {
      if (!user && protectedRoutes.some((route) => pathname.startsWith(route))) {
        router.push("/login")
      } else if (user && publicRoutes.includes(pathname)) {
        router.push("/dashboard")
      }
    }
  }, [user, pathname, router, isLoading])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("sonara-user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sonara-user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
