"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Settings, Bell, Volume2, Shield, Download } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      analysisReminders: true,
      healthAlerts: true,
      weeklyReports: false,
      emailNotifications: true,
    },
    audio: {
      volume: [75],
      micSensitivity: [60],
      noiseReduction: true,
      autoCalibration: true,
    },
    analysis: {
      frequency: "daily",
      autoSave: true,
      shareWithDoctor: false,
      dataRetention: "1year",
    },
    privacy: {
      anonymousData: false,
      researchParticipation: true,
      dataEncryption: true,
    },
  })

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem("sonara-settings", JSON.stringify(settings))

    // Show success message (you could add a toast here)
    console.log("Settings saved successfully:", settings)

    // You could add a toast notification here
    alert("Settings saved successfully!")
  }

  const handleExportData = () => {
    // Export data logic here
    console.log("Exporting user data...")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Settings</h1>
            <p className="text-white/70 text-lg">Customize your Sonara experience</p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notifications */}
          <Card className="glass-card border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription className="text-white/70">Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Analysis Reminders</Label>
                  <p className="text-sm text-white/60">Daily reminders to perform lung analysis</p>
                </div>
                <Switch
                  checked={settings.notifications.analysisReminders}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, analysisReminders: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Health Alerts</Label>
                  <p className="text-sm text-white/60">Notifications for concerning results</p>
                </div>
                <Switch
                  checked={settings.notifications.healthAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, healthAlerts: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Weekly Reports</Label>
                  <p className="text-sm text-white/60">Summary of your weekly health data</p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, weeklyReports: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Email Notifications</Label>
                  <p className="text-sm text-white/60">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailNotifications: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card className="glass-card border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Audio Settings
              </CardTitle>
              <CardDescription className="text-white/70">Configure audio analysis parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white/80 mb-4 block">Speaker Volume</Label>
                <Slider
                  value={settings.audio.volume}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      audio: { ...settings.audio, volume: value },
                    })
                  }
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>0%</span>
                  <span>{settings.audio.volume[0]}%</span>
                  <span>100%</span>
                </div>
              </div>
              <div>
                <Label className="text-white/80 mb-4 block">Microphone Sensitivity</Label>
                <Slider
                  value={settings.audio.micSensitivity}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      audio: { ...settings.audio, micSensitivity: value },
                    })
                  }
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>Low</span>
                  <span>{settings.audio.micSensitivity[0]}%</span>
                  <span>High</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Noise Reduction</Label>
                  <p className="text-sm text-white/60">Filter background noise during analysis</p>
                </div>
                <Switch
                  checked={settings.audio.noiseReduction}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      audio: { ...settings.audio, noiseReduction: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Auto Calibration</Label>
                  <p className="text-sm text-white/60">Automatically adjust audio settings</p>
                </div>
                <Switch
                  checked={settings.audio.autoCalibration}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      audio: { ...settings.audio, autoCalibration: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis Settings */}
          <Card className="glass-card border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Analysis Settings
              </CardTitle>
              <CardDescription className="text-white/70">
                Configure analysis frequency and data handling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white/80 mb-2 block">Analysis Frequency</Label>
                <Select
                  value={settings.analysis.frequency}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      analysis: { ...settings.analysis, frequency: value },
                    })
                  }
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white/80 mb-2 block">Data Retention</Label>
                <Select
                  value={settings.analysis.dataRetention}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      analysis: { ...settings.analysis, dataRetention: value },
                    })
                  }
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Auto Save Results</Label>
                  <p className="text-sm text-white/60">Automatically save analysis results</p>
                </div>
                <Switch
                  checked={settings.analysis.autoSave}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      analysis: { ...settings.analysis, autoSave: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Share with Doctor</Label>
                  <p className="text-sm text-white/60">Allow sharing results with healthcare provider</p>
                </div>
                <Switch
                  checked={settings.analysis.shareWithDoctor}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      analysis: { ...settings.analysis, shareWithDoctor: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="glass-card border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription className="text-white/70">
                Control your data privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Anonymous Data Collection</Label>
                  <p className="text-sm text-white/60">Help improve Sonara with anonymous usage data</p>
                </div>
                <Switch
                  checked={settings.privacy.anonymousData}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, anonymousData: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Research Participation</Label>
                  <p className="text-sm text-white/60">Participate in medical research studies</p>
                </div>
                <Switch
                  checked={settings.privacy.researchParticipation}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, researchParticipation: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Data Encryption</Label>
                  <p className="text-sm text-white/60">Encrypt all stored health data</p>
                </div>
                <Switch
                  checked={settings.privacy.dataEncryption}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, dataEncryption: checked },
                    })
                  }
                />
              </div>
              <div className="pt-4 border-t border-white/10">
                <Button
                  onClick={handleExportData}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white border-0 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <Card className="glass-card border-red-500/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-red-400">Danger Zone</CardTitle>
            <CardDescription className="text-white/70">Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div>
                <h3 className="text-white font-medium">Delete Account</h3>
                <p className="text-white/60 text-sm">Permanently delete your account and all associated data</p>
              </div>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
