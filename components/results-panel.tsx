"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, Info, Heart, Activity, Shield } from "lucide-react"

interface ResultsPanelProps {
  results: any
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  if (!results) {
    return (
      <Card className="bg-white/5 border-white/10 shadow-xl">
        <CardHeader className="text-center py-12">
          <div className="mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-50"></div>
            <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-white text-2xl mb-4">Analysis Results</CardTitle>
          <CardDescription className="text-white/70 text-lg">
            Results will appear here after analysis is complete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-white/60">
            <Info className="h-16 w-16 mx-auto mb-6 opacity-50" />
            <p className="text-lg">Start an analysis to see your lung health results</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getHealthIcon = (health: string) => {
    switch (health.toLowerCase()) {
      case "normal":
        return <CheckCircle className="h-8 w-8 text-emerald-400" />
      case "warning":
        return <AlertTriangle className="h-8 w-8 text-yellow-400" />
      case "abnormal":
        return <AlertTriangle className="h-8 w-8 text-red-400" />
      default:
        return <Info className="h-8 w-8 text-blue-400" />
    }
  }

  const getHealthGradient = (health: string) => {
    switch (health.toLowerCase()) {
      case "normal":
        return "from-emerald-400 to-teal-400"
      case "warning":
        return "from-yellow-400 to-orange-400"
      case "abnormal":
        return "from-red-400 to-pink-400"
      default:
        return "from-blue-400 to-purple-400"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 shadow-xl overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${getHealthGradient(results.overallHealth)}`}></div>
        <CardHeader className="text-center py-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${getHealthGradient(results.overallHealth)} rounded-full blur-lg opacity-75`}
              ></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
                {getHealthIcon(results.overallHealth)}
              </div>
            </div>
          </div>
          <CardTitle className="text-white text-3xl mb-4">Your Results Are In!</CardTitle>
          <CardDescription className="text-white/70 text-lg">
            Here's what we found about your lung health
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 pb-8">
          {/* Overall Health Status */}
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">How Are You Doing?</h3>
              <Badge
                className={`text-xl px-8 py-3 bg-gradient-to-r ${getHealthGradient(results.overallHealth)} text-white border-0 shadow-lg font-medium`}
              >
                {results.overallHealth}
              </Badge>
            </div>

            <div className="max-w-md mx-auto">
              <p className="text-white/80 mb-4 font-medium">Confidence Level</p>
              <div className="relative">
                <Progress value={results.confidence} className="h-4 bg-white/20 border-0" />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${getHealthGradient(results.overallHealth)} rounded-full opacity-75 blur-sm`}
                ></div>
              </div>
              <p className="text-xl font-bold text-white mt-3">{results.confidence}%</p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  Frequency Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Low Frequency (0-500 Hz)</span>
                  <Badge className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-0">Normal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Mid Frequency (500-2000 Hz)</span>
                  <Badge className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-0">Normal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">High Frequency (2000+ Hz)</span>
                  <Badge className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-0">Normal</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Pattern Recognition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Breathing Pattern</span>
                  <Badge className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-0">Regular</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Chest Resonance</span>
                  <Badge className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-0">Normal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Tissue Density</span>
                  <Badge className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white border-0">Healthy</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          {results.recommendations && results.recommendations.length > 0 && (
            <Alert className="bg-blue-900/40 border-blue-400/50 shadow-lg">
              <Info className="h-5 w-5 text-blue-300" />
              <AlertDescription className="text-white">
                <strong className="text-blue-200">Here's what we think:</strong>
                <ul className="mt-3 space-y-2">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-white/95 flex items-start gap-2">
                      <span className="text-blue-300 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Disclaimer */}
          <Alert className="bg-amber-900/40 border-amber-400/50 shadow-lg">
            <AlertTriangle className="h-5 w-5 text-amber-300" />
            <AlertDescription className="text-white/95">
              <strong className="text-amber-200">Just a friendly reminder:</strong> We're here to help you stay informed
              about your health, but we're not a replacement for your doctor. Always chat with a healthcare professional
              about any concerns you might have!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
