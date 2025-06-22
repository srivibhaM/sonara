"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Minimize2, Maximize2, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface AIChatProps {
  analysisResults?: any
  isVisible: boolean
  onClose: () => void
}

export function AIChat({ analysisResults, isVisible, onClose }: AIChatProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (analysisResults && messages.length === 0) {
      // Initial AI message based on results
      const initialMessage = getInitialAIMessage(analysisResults)
      setMessages([
        {
          id: "1",
          content: initialMessage,
          sender: "ai",
          timestamp: new Date(),
        },
      ])
    }
  }, [analysisResults, messages.length])

  const getInitialAIMessage = (results: any) => {
    if (!results)
      return "Hey there! I'm Echo, your friendly Sonara health assistant! 🤖 I'm here to help you understand your lung health analysis. What would you like to know?"

    const health = results.overallHealth?.toLowerCase()
    const confidence = results.confidence

    if (health === "normal" && confidence >= 85) {
      return `Hey there! 🎉 Echo here with some great news about your lung analysis! Everything looks pretty normal with ${confidence}% confidence. 

**What this means for you:**
• Your breathing patterns are looking healthy and regular
• We didn't spot any concerning patterns
• You're doing great with your respiratory health!

**Keep it up by:**
• Staying active and keeping those lungs working
• Maybe check in with us monthly to keep track
• No need to worry - you're in good shape!

Got any questions about what we found? I'm here to help! 😊`
    } else if (health === "normal" && confidence < 85) {
      return `Hi! Echo here! 👋 Your analysis shows normal results, though with moderate confidence (${confidence}%). This could be due to environmental factors or positioning during the test.

**What this means:**
• Results suggest normal lung function
• Lower confidence may indicate test conditions weren't optimal
• Consider retaking the test in a quiet environment

**Next steps:**
• Try another analysis in 24-48 hours
• Ensure proper phone placement on chest
• No immediate medical concern indicated

How can I help clarify your results?`
    } else if (health === "warning") {
      return `Hey there, Echo here! 🤖 Your analysis indicates some patterns that might need a bit of attention, with ${confidence}% confidence.

**What I'm seeing:**
• Some acoustic patterns are a bit different from typical normal ranges
• This doesn't necessarily mean anything serious is wrong
• It might be worth getting a professional opinion

**What I'd suggest:**
• Maybe chat with a healthcare provider in the next week or two
• Keep an eye on any symptoms like shortness of breath or persistent cough
• Try another analysis in a few days to see if anything changes

**Remember:** I'm just a screening tool, not a doctor! A healthcare professional can give you the real scoop.

What questions do you have about these results?`
    } else {
      return `Hi! I'm Echo, your Sonara health buddy! 🤖 I'm here to help you understand your lung health analysis results and figure out what to do next. What's on your mind?`
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, analysisResults)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string, results: any) => {
    const input = userInput.toLowerCase()

    if (input.includes("echo") || input.includes("who are you") || input.includes("what are you")) {
      return `Hey! I'm Echo! 🤖 I'm your friendly AI health assistant here at Sonara. Think of me as your personal lung health buddy!

**What I do:**
• Help you understand your analysis results
• Answer questions about lung health
• Guide you on when to see a doctor
• Provide tips for staying healthy
• Chat with you about any concerns

I'm here 24/7 to help make sense of your health data and keep you informed. What would you like to know? 😊`
    }

    if (input.includes("urgent") || input.includes("emergency") || input.includes("serious")) {
      return `Based on your current results, there's **no indication of an emergency**. However, if you're experiencing:

• Severe shortness of breath
• Chest pain
• Persistent coughing with blood
• Sudden breathing difficulties

**Seek immediate medical attention** by calling emergency services.

For your current results, routine follow-up with a healthcare provider is appropriate. Would you like guidance on what to discuss with your doctor?`
    }

    if (input.includes("doctor") || input.includes("medical") || input.includes("physician")) {
      return `Here's what I recommend regarding medical consultation:

**When to see a doctor:**
• If you have concerning symptoms (persistent cough, shortness of breath)
• For routine respiratory health check-ups
• If you have risk factors (smoking history, family history)

**What to bring to your appointment:**
• Your Sonara analysis results
• List of any respiratory symptoms
• Current medications
• Questions about lung health

**Questions to ask your doctor:**
• "What do these acoustic patterns mean for my health?"
• "Should I be concerned about any specific findings?"
• "How often should I monitor my lung health?"

Would you like help preparing specific questions for your healthcare provider?`
    }

    if (input.includes("normal") || input.includes("good") || input.includes("healthy")) {
      return `Your normal results are encouraging! Here's what this means:

**Positive indicators:**
• Regular breathing patterns detected
• No concerning acoustic abnormalities
• Lung function appears within normal ranges

**Maintaining lung health:**
• Continue regular exercise (cardio is especially beneficial)
• Avoid smoking and secondhand smoke
• Practice deep breathing exercises
• Stay hydrated and maintain good air quality at home

**Ongoing monitoring:**
• Monthly Sonara check-ins can track trends
• Annual medical check-ups are still important
• Be aware of any changes in breathing or symptoms

Keep up the great work with your health! Any other questions about maintaining optimal lung function?`
    }

    if (input.includes("worry") || input.includes("scared") || input.includes("anxious")) {
      return `I totally understand that health results can make you feel anxious! Let me help ease your mind:

**Important reminders:**
• Sonara is a screening tool, not a diagnostic device
• Many factors can affect results (positioning, environment, etc.)
• Most lung health issues are manageable when caught early

**Your current situation:**
• The analysis provides helpful insights for monitoring
• No immediate emergency indicators were detected
• You're being proactive about your health, which is awesome!

**Managing health anxiety:**
• Focus on what you can control (lifestyle, regular monitoring)
• Talk about concerns with healthcare professionals
• Remember that early detection leads to better outcomes

**Next steps:**
• Continue regular monitoring
• Maintain healthy habits
• Consult with a doctor for professional evaluation

You're taking positive steps for your health, and that's something to be proud of! What specific concerns can I help address? 💙`
    }

    if (input.includes("accuracy") || input.includes("reliable") || input.includes("trust")) {
      return `Great question about accuracy and reliability! Let me be totally honest with you:

**About Sonara's technology:**
• Uses advanced acoustic analysis and FFT algorithms
• Designed as a screening and monitoring tool
• Best used alongside, not instead of, medical care

**Factors affecting accuracy:**
• Proper phone placement on chest
• Quiet environment during testing
• Consistent testing conditions
• Individual anatomical differences

**What I can and can't do:**
• I'm not a replacement for medical diagnosis
• Results should be interpreted by healthcare professionals
• Environmental factors can influence readings

**Best practices:**
• Use consistently for trend monitoring
• Combine with regular medical check-ups
• Discuss results with your healthcare provider

The technology is designed to help you stay informed about your lung health trends. What other questions do you have about the analysis process?`
    }

    // Default response
    return `Hey! Echo here! 🤖 I'm your friendly Sonara health buddy, and I'm here to help you understand your lung health!

I can chat with you about:
• **What your results mean** - Let's break it down together
• **When to see a doctor** - I'll help you figure out next steps
• **Staying healthy** - Tips to keep your lungs happy
• **Any worries** - Let's talk through your concerns
• **How accurate this is** - I'll be honest about what we can and can't tell

What's on your mind? Ask me anything! 💬`
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed ${
        isMinimized ? "bottom-4 right-4 w-80 h-16" : "bottom-4 right-4 w-96 h-[600px]"
      } z-50 transition-all duration-300 ease-in-out`}
    >
      <Card className="glass-card border-white/20 shadow-2xl h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-sm">Echo - AI Assistant</CardTitle>
              {!isMinimized && (
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">Online</Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-hidden p-4">
              <div className="h-full overflow-y-auto space-y-4 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-white/10 text-white border border-white/20"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white/10 text-white border border-white/20 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Echo about your results..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export function AIChatButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 left-4 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl z-40 p-0"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  )
}
