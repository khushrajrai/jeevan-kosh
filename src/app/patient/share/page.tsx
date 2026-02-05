'use client'

import { ArrowLeft, Shield, Clock, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { OTPDisplay } from '@/components/patient/OTPDisplay'
import { formatDate } from '@/lib/utils'

export default function ShareRecords() {
    const router = useRouter()

    const accessHistory = [
        {
            id: 1,
            doctor: 'Dr. Rajesh Mehta',
            hospital: 'City Hospital Indore',
            date: '2026-02-01',
            time: '10:30 AM'
        },
        {
            id: 2,
            doctor: 'Dr. Priya Kumar',
            hospital: 'District Hospital Bhopal',
            date: '2026-01-20',
            time: '2:15 PM'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()}>
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900">Share Records</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Info Banner */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="flex gap-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-1">🔒 Secure Access</h3>
                            <p className="text-sm text-blue-800">
                                Your records are encrypted and only accessible with your permission.
                                Each OTP is valid for 10 minutes only.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* OTP Display */}
                <OTPDisplay />

                {/* How It Works */}
                <Card className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">How It Works</h3>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                1
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Share the OTP</p>
                                <p className="text-sm text-gray-600">
                                    Provide the 6-digit code to your doctor
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                2
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Doctor Enters Code</p>
                                <p className="text-sm text-gray-600">
                                    Doctor accesses your records through their portal
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                3
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Temporary Access</p>
                                <p className="text-sm text-gray-600">
                                    Doctor can view your complete health history
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                4
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Updated Records</p>
                                <p className="text-sm text-gray-600">
                                    New diagnosis is automatically added to your timeline
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Access History */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Recent Access History
                    </h3>
                    <div className="space-y-3">
                        {accessHistory.map((access) => (
                            <Card key={access.id} className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Eye className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{access.doctor}</p>
                                        <p className="text-sm text-gray-600">{access.hospital}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatDate(access.date)} at {access.time}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}