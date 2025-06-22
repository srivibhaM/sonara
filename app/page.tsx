"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Waves, Shield, Zap, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { LungsIcon } from "@/components/lungs-icon"

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    {
      icon: <Waves className="h-8 w-8" />,
      title: "Advanced Sound Analysis",
      description: "Uses sophisticated FFT algorithms to analyze chest reverberations and detect lung irregularities.",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Non-Invasive Detection",
      description: "No special hardware required - just your smartphone's speaker and microphone.",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-Time Processing",
      description: "Instant analysis with immediate results and health recommendations.",
      gradient: "from-green-400 to-teal-400",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health Monitoring",
      description: "Track your lung health over time with detailed analytics and trends.",
      gradient: "from-red-400 to-orange-400",
    },
  ]

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

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
                <LungsIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white">Sonara</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center py-20 px-6 max-w-6xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-blue-400/20 to-purple-400/20 text-blue-300 border-blue-400/30 px-4 py-2">
            🚀 Revolutionary Health Technology
          </Badge>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Check Your Lungs
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Easy Way
            </span>
          </h1>

          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Sonara makes it super simple to keep an eye on your lung health. Just use your phone - no fancy equipment
            needed! We'll listen to your breathing and give you friendly insights about how you're doing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium shadow-xl border-0 transition-all duration-300 hover:scale-105"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-black bg-white/90 hover:bg-white/80 px-8 py-4 text-lg font-medium"
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            >
              <Play className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>

          <div className="text-center py-8">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">How does it work?</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Simply place your phone on your chest, and let Sonara listen to your breathing patterns. Our AI analyzes
                the sounds to give you insights about your lung health - it's that easy! Think of it as having a
                friendly health companion right in your pocket.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why You'll Love Sonara</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We've made checking your lung health as easy as taking a selfie - here's how we do it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass-card border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 relative w-fit`}>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-full blur-lg opacity-75`}
                    ></div>
                    <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70 text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Give It a Try?</h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of people who are already keeping track of their lung health with Sonara
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium shadow-xl border-0 transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
                  <LungsIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white">Sonara</span>
            </div>
            <p className="text-white/60 mb-4">Advanced acoustic lung health monitoring technology</p>
            <p className="text-white/40 text-sm">
              © 2024 Sonara. All rights reserved. This app is for informational purposes only.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
