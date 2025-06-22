"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { LungsIcon } from "@/components/lungs-icon"
import { AIChat, AIChatButton } from "@/components/ai-chat"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [aiChatOpen, setAiChatOpen] = useState(false)
  const [showPhoneDialog, setShowPhoneDialog] = useState(false)
  const [phoneModel, setPhoneModel] = useState("")
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  // Check for phone model on mount
  useEffect(() => {
    const storedPhoneModel = localStorage.getItem("sonara-phone-model")
    if (!storedPhoneModel) {
      setShowPhoneDialog(true)
    } else {
      setPhoneModel(storedPhoneModel)
    }
  }, [])

  const handlePhoneModelSave = () => {
    if (phoneModel.trim()) {
      localStorage.setItem("sonara-phone-model", phoneModel.trim())
      setShowPhoneDialog(false)
    }
  }

  const detectPhoneModel = () => {
    const userAgent = navigator.userAgent
    let detectedModel = "Unknown Device"

    if (/iPhone/.test(userAgent)) {
      const match = userAgent.match(/iPhone OS (\d+)_(\d+)/)
      if (match) {
        detectedModel = `iPhone (iOS ${match[1]}.${match[2]})`
      } else {
        detectedModel = "iPhone"
      }
    } else if (/Android/.test(userAgent)) {
      const match = userAgent.match(/Android (\d+\.?\d*)/)
      if (match) {
        detectedModel = `Android Device (${match[1]})`
      } else {
        detectedModel = "Android Device"
      }
    } else if (/iPad/.test(userAgent)) {
      detectedModel = "iPad"
    }

    setPhoneModel(detectedModel)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl floating-animation"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-cyan-400/10 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 ${sidebarCollapsed ? "w-20" : "w-80"} transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <Card className="h-full glass-card border-white/20 shadow-2xl rounded-none lg:rounded-r-2xl">
            <div className="flex flex-col h-full p-6">
              {/* Logo and Collapse Button */}
              <div className="flex items-center justify-between mb-8">
                <div className={`flex items-center gap-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
                      <LungsIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  {!sidebarCollapsed && <span className="text-2xl font-bold text-white">Sonara</span>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0 hidden lg:flex"
                >
                  {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              </div>

              {/* User Info */}
              {!sidebarCollapsed && (
                <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user?.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate">{user?.name}</div>
                      <div className="text-white/60 text-sm truncate">{user?.email}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="flex-1 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full ${sidebarCollapsed ? "justify-center px-0" : "justify-start"} text-left ${
                          isActive(item.href)
                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                        title={sidebarCollapsed ? item.name : undefined}
                      >
                        <Icon className={`h-5 w-5 ${sidebarCollapsed ? "" : "mr-3"}`} />
                        {!sidebarCollapsed && item.name}
                      </Button>
                    </Link>
                  )
                })}
              </nav>

              {/* Phone Model Display */}
              {!sidebarCollapsed && phoneModel && (
                <div className="mb-6 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-4 w-4 text-cyan-400" />
                    <span className="text-cyan-300 font-medium">Device</span>
                  </div>
                  <div className="text-white text-sm">{phoneModel}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPhoneDialog(true)}
                    className="text-cyan-300 hover:text-cyan-200 text-xs mt-1 p-0 h-auto"
                  >
                    Change device
                  </Button>
                </div>
              )}

              {/* Health Status */}
              {!sidebarCollapsed && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg border border-green-400/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-green-400" />
                    <span className="text-green-300 font-medium">Health Status</span>
                  </div>
                  <div className="text-white text-sm">Last analysis: Normal</div>
                  <div className="text-white/60 text-xs">2 days ago</div>
                </div>
              )}

              {/* Logout */}
              <Button
                onClick={logout}
                variant="ghost"
                className={`w-full ${sidebarCollapsed ? "justify-center px-0" : "justify-start"} text-white/70 hover:text-white hover:bg-red-500/20`}
                title={sidebarCollapsed ? "Sign Out" : undefined}
              >
                <LogOut className={`h-5 w-5 ${sidebarCollapsed ? "" : "mr-3"}`} />
                {!sidebarCollapsed && "Sign Out"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <div className="flex items-center gap-2">
              <LungsIcon className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Sonara</span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
              {user?.avatar}
            </div>
          </div>

          {/* Page Content */}
          <main className="p-6 lg:p-8">{children}</main>
        </div>
      </div>

      {/* Phone Model Dialog */}
      <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
        <DialogContent className="glass-card border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">What's Your Phone Model?</DialogTitle>
            <DialogDescription className="text-white/70">
              This helps us optimize the audio analysis for your specific device
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone-model" className="text-white/80">
                Phone Model
              </Label>
              <Input
                id="phone-model"
                value={phoneModel}
                onChange={(e) => setPhoneModel(e.target.value)}
                placeholder="e.g., iPhone 15 Pro, Samsung Galaxy S24"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={detectPhoneModel}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Auto-detect
              </Button>
              <Button
                onClick={handlePhoneModelSave}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex-1"
                disabled={!phoneModel.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Chat Components */}
      <AIChatButton onClick={() => setAiChatOpen(true)} />
      <AIChat isVisible={aiChatOpen} onClose={() => setAiChatOpen(false)} />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
