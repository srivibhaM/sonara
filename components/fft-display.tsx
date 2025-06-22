"use client"

import { useEffect, useRef } from "react"

interface FFTDisplayProps {
  fftData: Float32Array | null
}

export default function FFTDisplay({ fftData }: FFTDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !fftData) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Create dark gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
    bgGradient.addColorStop(0, "rgba(15, 23, 42, 1)")
    bgGradient.addColorStop(0.5, "rgba(30, 41, 59, 0.9)")
    bgGradient.addColorStop(1, "rgba(15, 23, 42, 1)")

    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    // Draw frequency spectrum bars
    const barWidth = (width / fftData.length) * 2.5
    let x = 0

    for (let i = 0; i < fftData.length / 2; i++) {
      const barHeight = Math.max(1, (fftData[i] + 140) * 2) // Normalize dB values

      // Create gradient for each bar based on frequency range
      const barGradient = ctx.createLinearGradient(0, height - barHeight, 0, height)

      if (i < fftData.length / 8) {
        // Low frequencies - Blue to Cyan
        barGradient.addColorStop(0, "#06b6d4")
        barGradient.addColorStop(1, "#0891b2")
      } else if (i < fftData.length / 4) {
        // Mid frequencies - Purple to Pink
        barGradient.addColorStop(0, "#8b5cf6")
        barGradient.addColorStop(1, "#a855f7")
      } else {
        // High frequencies - Pink to Red
        barGradient.addColorStop(0, "#ec4899")
        barGradient.addColorStop(1, "#ef4444")
      }

      // Add glow effect
      ctx.shadowColor = i < fftData.length / 8 ? "#06b6d4" : i < fftData.length / 4 ? "#8b5cf6" : "#ec4899"
      ctx.shadowBlur = 8

      ctx.fillStyle = barGradient
      ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight)

      x += barWidth
    }

    // Remove shadow for text
    ctx.shadowBlur = 0

    // Draw frequency labels with better styling
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.font = "14px Inter, sans-serif"
    ctx.fontWeight = "500"

    const labels = [
      { text: "0 Hz", x: 20 },
      { text: "1 kHz", x: width / 4 },
      { text: "2 kHz", x: width / 2 },
      { text: "4 kHz", x: (3 * width) / 4 },
    ]

    labels.forEach((label) => {
      ctx.fillText(label.text, label.x, height - 15)
    })

    // Draw amplitude scale
    const amplitudeLabels = [
      { text: "-140 dB", y: 25 },
      { text: "-70 dB", y: height / 2 },
      { text: "0 dB", y: height - 35 },
    ]

    amplitudeLabels.forEach((label) => {
      ctx.fillText(label.text, 15, label.y)
    })
  }, [fftData])

  return (
    <div className="w-full space-y-6">
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        className="w-full h-64 rounded-xl border border-white/10 shadow-lg"
      />

      <div className="space-y-4">
        <p className="text-center text-white/80 font-medium">🎵 Fast Fourier Transform - Frequency domain analysis</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg"></div>
              <span className="text-white font-medium">Low Frequencies</span>
            </div>
            <p className="text-white/70 text-xs">0-500 Hz: Deep chest resonance patterns</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
              <span className="text-white font-medium">Mid Frequencies</span>
            </div>
            <p className="text-white/70 text-xs">500-2000 Hz: Lung tissue characteristics</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-red-500 rounded-full shadow-lg"></div>
              <span className="text-white font-medium">High Frequencies</span>
            </div>
            <p className="text-white/70 text-xs">2000+ Hz: Surface reflections</p>
          </div>
        </div>
      </div>
    </div>
  )
}
