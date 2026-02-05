'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, CheckCircle, RefreshCw } from 'lucide-react'
import { generateOTP } from '@/lib/utils'

export function OTPDisplay() {
    const [otp, setOtp] = useState('')
    const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setOtp(generateOTP())
    }, [])

    useEffect(() => {
        if (timeLeft === 0) return

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    const handleCopy = () => {
        navigator.clipboard.writeText(otp)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleRefresh = () => {
        setOtp(generateOTP())
        setTimeLeft(600)
        setCopied(false)
    }

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
        <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-purple-50">
            <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Share This Code
                </h3>
                <p className="text-sm text-gray-600">
                    Provide this OTP to your doctor for temporary access
                </p>
            </div>

            <div className="bg-white rounded-2xl p-8 mb-6 border-2 border-primary/20">
                <div className="text-5xl font-bold text-gray-900 tracking-widest mb-2">
                    {otp}
                </div>
                <div className={`text-sm font-medium ${timeLeft < 60 ? 'text-danger' : 'text-gray-600'
                    }`}>
                    Valid for {minutes}:{seconds.toString().padStart(2, '0')}
                </div>
            </div>

            <div className="flex gap-3">
                <Button
                    onClick={handleCopy}
                    className="flex-1"
                    variant={copied ? "outline" : "default"}
                >
                    {copied ? (
                        <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Code
                        </>
                    )}
                </Button>
                <Button
                    onClick={handleRefresh}
                    variant="outline"
                    className="px-4"
                >
                    <RefreshCw className="w-4 h-4" />
                </Button>
            </div>
        </Card>
    )
}