'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Heart, Phone, Lock } from 'lucide-react'

export default function PatientLogin() {
    const router = useRouter()
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [step, setStep] = useState<'phone' | 'otp'>('phone')
    const [isLoading, setIsLoading] = useState(false)

    const handleSendOTP = (e: React.FormEvent) => {
        e.preventDefault()
        if (phone.length === 10) {
            setIsLoading(true)
            setTimeout(() => {
                setStep('otp')
                setIsLoading(false)
            }, 1000)
        }
    }

    const handleVerifyOTP = (e: React.FormEvent) => {
        e.preventDefault()
        if (otp.length === 6) {
            setIsLoading(true)
            setTimeout(() => {
                localStorage.setItem('patientUser', JSON.stringify({
                    id: 'patient-001',
                    name: 'Priya Sharma',
                    phone: phone,
                    village: 'Kheda'
                }))
                router.push('/patient/dashboard')
            }, 1000)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Heart className="w-12 h-12 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Jeevan Kosh
                    </h1>
                    <p className="text-gray-600">
                        Your Health Wallet
                    </p>
                </div>

                {step === 'phone' ? (
                    <form onSubmit={handleSendOTP} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    type="tel"
                                    placeholder="Enter 10-digit phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-800">
                                <strong>Demo Mode:</strong> Use any phone number
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                Try: 9876543210
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={phone.length !== 10 || isLoading}
                        >
                            {isLoading ? 'Sending OTP...' : 'Send OTP'}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enter OTP
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="pl-10 text-center text-2xl tracking-widest"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                OTP sent to {phone}
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-800">
                                <strong>Demo Mode:</strong> Any 6-digit OTP works
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                Try: 123456
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={otp.length !== 6 || isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Verify & Login'}
                        </Button>

                        <button
                            type="button"
                            onClick={() => setStep('phone')}
                            className="w-full text-sm text-gray-600 hover:text-primary"
                        >
                            Change phone number
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center text-sm text-gray-500">
                    Part of Jeevan Kosh Ecosystem
                </div>
            </Card>
        </div>
    )
}