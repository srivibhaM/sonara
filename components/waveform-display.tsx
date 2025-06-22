"use client"

import { useEffect, useRef } from "react"

interface WaveformDisplayProps {
  audioData: Float32Array | null
  isRecording: boolean
}

export default function WaveformDisplay({ audioData, isRecording }: WaveformDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !audioData) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Create gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
    bgGradient.addColorStop(0, "rgba(15, 23, 42, 0.9)")
    bgGradient.addColorStop(0.5, "rgba(30, 41, 59, 0.8)")
    bgGradient.addColorStop(1, "rgba(15, 23, 42, 0.9)")

    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    // Draw subtle grid
    ctx.strokeStyle = "rgba(148, 163, 184, 0.1)"
    ctx.lineWidth = 1
    ctx.setLineDash([2, 4])

    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i <= 8; i++) {
      const x = (width / 8) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    // Create waveform gradient
    const waveGradient = ctx.createLinearGradient(0, 0, width, 0)
    if (isRecording) {
      waveGradient.addColorStop(0, "#ef4444")
      waveGradient.addColorStop(0.5, "#f97316")
      waveGradient.addColorStop(1, "#eab308")
    } else {
      waveGradient.addColorStop(0, "#3b82f6")
      waveGradient.addColorStop(0.5, "#8b5cf6")
      waveGradient.addColorStop(1, "#06b6d4")
    }

    // Draw waveform with glow effect
    ctx.setLineDash([])
    ctx.shadowColor = isRecording ? "#ef4444" : "#3b82f6"
    ctx.shadowBlur = 10
    ctx.strokeStyle = waveGradient
    ctx.lineWidth = 3
    ctx.beginPath()

    const sliceWidth = width / audioData.length
    let x = 0

    for (let i = 0; i < audioData.length; i++) {
      const v = audioData[i] * 0.5
      const y = (v * height) / 2 + height / 2

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      x += sliceWidth
    }

    ctx.stroke()

    // Draw filled area under waveform
    ctx.shadowBlur = 0
    const fillGradient = ctx.createLinearGradient(0, 0, 0, height)
    if (isRecording) {
      fillGradient.addColorStop(0, "rgba(239, 68, 68, 0.3)")
      fillGradient.addColorStop(1, "rgba(239, 68, 68, 0.05)")
    } else {
      fillGradient.addColorStop(0, "rgba(59, 130, 246, 0.3)")
      fillGradient.addColorStop(1, "rgba(59, 130, 246, 0.05)")
    }

    ctx.fillStyle = fillGradient
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fill()

    // Draw center line
    ctx.strokeStyle = "rgba(148, 163, 184, 0.4)"
    ctx.lineWidth = 1
    ctx.setLineDash([8, 8])
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()
  }, [audioData, isRecording])

  return (
    <div className="w-full space-y-4">
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        className="w-full h-64 rounded-xl border border-white/10 shadow-lg"
      />
      <div className="text-center space-y-2">
        <p className="text-white/80 font-medium">
          {isRecording ? "🔴 Recording chest reverberations..." : "📊 Audio waveform visualization"}
        </p>
        <div className="flex justify-center gap-6 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            <span>Normal Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
            <span>Recording Mode</span>
          </div>
        </div>
      </div>
    </div>
  )
}
