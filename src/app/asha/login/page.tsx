'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Heart, Phone } from 'lucide-react'

export default function AshaLogin() {
    const router = useRouter()
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        if (phone.length === 10) {
            setIsLoading(true)
            // Simulate API call
            setTimeout(() => {
                localStorage.setItem('ashaUser', JSON.stringify({
                    name: 'ASHA Devi',
                    phone: phone,
                    village: 'Kheda'
                }))
                router.push('/asha/dashboard')
            }, 1000)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-success to-green-600 flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-success/10 p-4 rounded-full">
                            <Heart className="w-12 h-12 text-success" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        ASHA Mobile Assistant
                    </h1>
                    <p className="text-gray-600">
                        Empowering frontline health workers
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
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
                            <strong>Demo Mode:</strong> Use any 10-digit phone number
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                            Try: 9876543210
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-success hover:bg-green-700"
                        disabled={phone.length !== 10 || isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Part of Jeevan Kosh Ecosystem
                </div>
            </Card>
        </div>
    )
}