'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, User, Phone, MapPin, LogOut } from 'lucide-react'

export default function AshaProfile() {
    const router = useRouter()
    const ashaUser = JSON.parse(localStorage.getItem('ashaUser') || '{}')

    const handleLogout = () => {
        localStorage.removeItem('ashaUser')
        router.push('/asha/login')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="px-4 py-4 flex items-center gap-4">
                    <button onClick={() => router.back()}>
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
                </div>
            </div>

            <div className="p-4 space-y-4">
                <Card className="p-6 text-center">
                    <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-12 h-12 text-success" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{ashaUser.name}</h2>
                    <p className="text-sm text-gray-600">ASHA Worker</p>
                </Card>

                <Card className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{ashaUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{ashaUser.village} Village</span>
                    </div>
                </Card>

                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    )
}