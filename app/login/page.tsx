"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { LungsIcon } from "@/components/lungs-icon"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    login({
      id: "1",
      email,
      name: email.split("@")[0],
      avatar: email.charAt(0).toUpperCase(),
    })

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl floating-animation"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-cyan-400/10 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to home */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <Card className="glass-card border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
                  <LungsIcon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
              <CardDescription className="text-white/70">Sign in to your Sonara account</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/50 hover:text-white hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 py-3"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-white/70">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
