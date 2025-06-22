"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Play, Square, Mic, Activity, Waves, Heart } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import WaveformDisplay from "@/components/waveform-display"
import FFTDisplay from "@/components/fft-display"
import ResultsPanel from "@/components/results-panel"
import AudioProcessor from "@/components/audio-processor"

export default function DashboardPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<
    "idle" | "calibrating" | "emitting" | "recording" | "analyzing" | "complete"
  >("idle")
  const [audioData, setAudioData] = useState<Float32Array | null>(null)
  const [fftData, setFFTData] = useState<Float32Array | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [showAIChat, setShowAIChat] = useState(false)

  const audioProcessorRef = useRef<any>(null)

  const startAnalysis = async () => {
    setCurrentPhase("calibrating")
    setAnalysisProgress(10)

    // Simulate calibration phase
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setCurrentPhase("emitting")
    setAnalysisProgress(25)
    setIsPlaying(true)

    // Start audio emission and recording
    if (audioProcessorRef.current) {
      await audioProcessorRef.current.startAnalysis()
    }

    // Simulate emission phase
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setCurrentPhase("recording")
    setAnalysisProgress(50)
    setIsRecording(true)
    setIsPlaying(false)

    // Recording phase
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setCurrentPhase("analyzing")
    setAnalysisProgress(75)
    setIsRecording(false)

    // Analysis phase
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setCurrentPhase("complete")
    setAnalysisProgress(100)

    // Generate mock results
    const results = {
      overallHealth: "Normal",
      confidence: 87,
      anomalies: [],
      recommendations: ["Continue regular monitoring", "Maintain good respiratory health"],
    }
    setAnalysisResults(results)

    // Show AI chat after analysis is complete
    setTimeout(() => {
      setShowAIChat(true)
    }, 1000)
  }

  const stopAnalysis = () => {
    setCurrentPhase("idle")
    setIsRecording(false)
    setIsPlaying(false)
    setAnalysisProgress(0)
    if (audioProcessorRef.current) {
      audioProcessorRef.current.stopAnalysis()
    }
  }

  const getPhaseDescription = () => {
    switch (currentPhase) {
      case "calibrating":
        return "Calibrating audio system..."
      case "emitting":
        return "Emitting sound pulses..."
      case "recording":
        return "Recording chest reverberations..."
      case "analyzing":
        return "Analyzing audio patterns..."
      case "complete":
        return "Analysis complete"
      default:
        return "Ready to start analysis"
    }
  }

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "calibrating":
        return "from-blue-400 to-cyan-400"
      case "emitting":
        return "from-purple-400 to-pink-400"
      case "recording":
        return "from-red-400 to-orange-400"
      case "analyzing":
        return "from-green-400 to-teal-400"
      case "complete":
        return "from-emerald-400 to-cyan-400"
      default:
        return "from-slate-400 to-slate-500"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Lung Analysis</h1>
          <p className="text-white/70 text-lg">Place your phone on your chest and start the analysis</p>
        </div>

        {/* Main Control Panel */}
        <Card className="glass-card border-white/20 shadow-2xl">
          <CardContent className="space-y-8 p-8">
            {/* Status Display */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-6">
                <Badge
                  className={`px-6 py-3 text-lg font-medium bg-gradient-to-r ${getPhaseColor()} text-white border-0 shadow-lg`}
                >
                  {getPhaseDescription()}
                </Badge>
                {isPlaying && (
                  <div className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-green-400 pulse-animation" />
                    <Waves className="h-5 w-5 text-blue-400 pulse-animation" />
                  </div>
                )}
                {isRecording && (
                  <div className="flex items-center gap-2">
                    <Mic className="h-5 w-5 text-red-400 pulse-animation" />
                    <div className="w-3 h-3 bg-red-400 rounded-full pulse-animation"></div>
                  </div>
                )}
              </div>

              {analysisProgress > 0 && (
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="relative">
                    <Progress value={analysisProgress} className="h-3 bg-white/20 border-0" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-75 blur-sm"></div>
                  </div>
                  <p className="text-white/80 font-medium">{analysisProgress}% Complete</p>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-6">
              {currentPhase === "idle" ? (
                <Button
                  onClick={startAnalysis}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium shadow-xl border-0 transition-all duration-300 hover:scale-105"
                >
                  <Play className="h-5 w-5 mr-3" />
                  Start Analysis
                </Button>
              ) : (
                <Button
                  onClick={stopAnalysis}
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-medium shadow-xl border-0 transition-all duration-300 hover:scale-105"
                >
                  <Square className="h-5 w-5 mr-3" />
                  Stop Analysis
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Tabs */}
        <div className="glass-card rounded-2xl border-white/20 shadow-2xl">
          <Tabs defaultValue="waveform" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20 rounded-xl p-2 mb-6">
              <TabsTrigger
                value="waveform"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-white/70 font-medium py-3 rounded-lg transition-all duration-300"
              >
                <Waves className="h-4 w-4 mr-2" />
                Waveform
              </TabsTrigger>
              <TabsTrigger
                value="spectrum"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white text-white/70 font-medium py-3 rounded-lg transition-all duration-300"
              >
                <Activity className="h-4 w-4 mr-2" />
                FFT Spectrum
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-600 data-[state=active]:text-white text-white/70 font-medium py-3 rounded-lg transition-all duration-300"
              >
                <Heart className="h-4 w-4 mr-2" />
                Results
              </TabsTrigger>
            </TabsList>
            <TabsContent value="waveform" className="p-6">
              <WaveformDisplay audioData={audioData} isRecording={isRecording} />
            </TabsContent>
            <TabsContent value="spectrum" className="p-6">
              <FFTDisplay fftData={fftData} />
            </TabsContent>
            <TabsContent value="results" className="p-6">
              <ResultsPanel results={analysisResults} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <AudioProcessor
        ref={audioProcessorRef}
        onAudioData={setAudioData}
        onFFTData={setFFTData}
        isActive={isRecording || isPlaying}
      />
    </DashboardLayout>
  )
}
