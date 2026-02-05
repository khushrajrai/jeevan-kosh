'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PatientCard } from '@/components/doctor/PatientCard'
import { Users, Shield, Heart, CheckCircle, Search, Key, AlertTriangle } from 'lucide-react'
import mockDoctorData from '@/data/mockDoctorData.json'
import { Patient } from '@/types'

export default function DoctorDashboard() {
    const router = useRouter()
    const [doctorUser, setDoctorUser] = useState<any>(null)
    const [otpInput, setOtpInput] = useState('')
    const [showOtpModal, setShowOtpModal] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem('doctorUser')
        if (!user) {
            router.push('/doctor/login')
            return
        }
        setDoctorUser(JSON.parse(user))
    }, [router])

    if (!doctorUser) return null

    const { patients, analytics } = mockDoctorData
    const recentPatients = patients.slice(0, 3)
    const highRiskPatients = patients.filter(p => p.riskLevel === 'high')

    const handleOtpAccess = () => {
        if (otpInput.length === 6) {
            // Simulate OTP verification - in demo, any 6-digit OTP works
            router.push('/doctor/patient/patient-001')
            setShowOtpModal(false)
            setOtpInput('')
        }
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {doctorUser.name}
                </h1>
                <p className="text-gray-600">{doctorUser.hospital} • {doctorUser.specialty}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                            <p className="text-3xl font-bold text-gray-900">{analytics.totalPatients}</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Users className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Under your care</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">High-Risk Detected</p>
                            <p className="text-3xl font-bold text-gray-900">{analytics.highRiskDetected}</p>
                        </div>
                        <div className="p-3 bg-danger/10 rounded-lg">
                            <Shield className="w-6 h-6 text-danger" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Early intervention cases</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Lives Saved (est.)</p>
                            <p className="text-3xl font-bold text-gray-900">{analytics.livesSaved}</p>
                        </div>
                        <div className="p-3 bg-success/10 rounded-lg">
                            <Heart className="w-6 h-6 text-success" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Through early detection</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Data Complete</p>
                            <p className="text-3xl font-bold text-gray-900">{analytics.dataCompleteness}%</p>
                        </div>
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">Record completeness</p>
                </Card>
            </div>

            {/* OTP Access Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-50">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary rounded-lg">
                        <Key className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Access Patient Records
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Enter the 6-digit OTP provided by the patient to view their complete health history
                        </p>
                        <div className="flex gap-3">
                            <Input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otpInput}
                                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="max-w-xs text-center text-xl tracking-widest"
                                maxLength={6}
                            />
                            <Button
                                onClick={handleOtpAccess}
                                disabled={otpInput.length !== 6}
                            >
                                Access Records
                            </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Demo: Any 6-digit code works (try: 123456)
                        </p>
                    </div>
                </div>
            </Card>

            {/* High Risk Alerts */}
            {highRiskPatients.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-danger" />
                        <h2 className="text-xl font-semibold text-gray-900">
                            High-Risk Patients ({highRiskPatients.length})
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {highRiskPatients.map((patient) => (
                            <PatientCard key={patient.id} patient={patient as Patient} />
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Patients */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Patients</h2>
                    <Link href="/doctor/patients">
                        <Button variant="outline" size="sm">View All</Button>
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentPatients.map((patient) => (
                        <PatientCard key={patient.id} patient={patient as Patient} />
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
                <Link href="/doctor/analytics">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <h3 className="font-semibold text-gray-900 mb-2">📊 View Analytics</h3>
                        <p className="text-sm text-gray-600">
                            Comprehensive insights and trends
                        </p>
                    </Card>
                </Link>
                <Link href="/doctor/patients">
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <h3 className="font-semibold text-gray-900 mb-2">👥 All Patients</h3>
                        <p className="text-sm text-gray-600">
                            Browse complete patient list
                        </p>
                    </Card>
                </Link>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="font-semibold text-gray-900 mb-2">📅 Today's Schedule</h3>
                    <p className="text-sm text-gray-600">
                        8 appointments scheduled
                    </p>
                </Card>
            </div>
        </div>
    )
}