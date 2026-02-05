'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Heart, Mail, Lock } from 'lucide-react'

export default function DoctorLogin() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            localStorage.setItem('doctorUser', JSON.stringify({
                id: 'doctor-001',
                name: 'Dr. Rajesh Mehta',
                email: email,
                hospital: 'City Hospital Indore',
                specialty: 'Obstetrics & Gynecology'
            }))
            router.push('/doctor/dashboard')
        }, 1000)
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
                        Doctor's Portal
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="email"
                                placeholder="doctor@hospital.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                            <strong>Demo Mode:</strong> Use any credentials
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                            Email: doctor@demo.com | Password: password
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!email || !password || isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login to Portal'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </a>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Secure access to patient health records
                </div>
            </Card>
        </div>
    )
}