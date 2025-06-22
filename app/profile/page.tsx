"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Edit3, Activity } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useAuth } from "@/components/auth-provider"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    age: "28",
    height: "5'8\"",
    weight: "150 lbs",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
  }

  const healthStats = [
    { label: "Total Analyses", value: "0", change: "Start your first analysis", color: "from-blue-400 to-cyan-400" },
    { label: "Health Score", value: "--", change: "Complete analysis for score", color: "from-green-400 to-teal-400" },
    { label: "Monitoring Days", value: "0", change: "Begin your health journey", color: "from-purple-400 to-pink-400" },
    { label: "Last Analysis", value: "None", change: "No analyses yet", color: "from-orange-400 to-red-400" },
  ]

  const recentAnalyses = [
    // Empty array or placeholder message
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Profile</h1>
            <p className="text-white/70 text-lg">Manage your account and view your health journey</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-white/20 shadow-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 relative w-fit">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user?.avatar}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-white text-2xl">{user?.name}</CardTitle>
                <CardDescription className="text-white/70">{user?.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white/80">Name</Label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80">Email</Label>
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80">Age</Label>
                      <Input
                        value={profileData.age}
                        onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80">Height</Label>
                      <Input
                        value={profileData.height}
                        onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80">Weight</Label>
                      <Input
                        value={profileData.weight}
                        onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <Button onClick={handleSave} className="w-full bg-gradient-to-r from-green-500 to-teal-600">
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/70">Age</span>
                      <span className="text-white">{profileData.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Height</span>
                      <span className="text-white">{profileData.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Weight</span>
                      <span className="text-white">{profileData.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Member since</span>
                      <span className="text-white">Jan 2024</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Health Stats and Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Health Stats */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Health Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthStats.map((stat, index) => (
                  <Card key={index} className="glass-card border-white/10 shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white/80 text-sm font-medium">{stat.label}</h3>
                        <div className={`w-3 h-3 bg-gradient-to-r ${stat.color} rounded-full`}></div>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-sm text-white/60">{stat.change}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Analyses */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Recent Analyses</h2>
              <Card className="glass-card border-white/10 shadow-xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentAnalyses.length > 0 ? (
                      recentAnalyses.map((analysis, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-white/60" />
                              <span className="text-white/80">{analysis.date}</span>
                            </div>
                            <Badge
                              className={`bg-${analysis.color}-500/20 text-${analysis.color}-300 border-${analysis.color}-500/30`}
                            >
                              {analysis.result}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-white text-sm font-medium">{analysis.confidence}% confidence</div>
                              <Progress value={analysis.confidence} className="w-20 h-2" />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-white/60">
                        <Activity className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No analyses completed yet</p>
                        <p className="text-sm">Start your first lung health analysis to see results here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
