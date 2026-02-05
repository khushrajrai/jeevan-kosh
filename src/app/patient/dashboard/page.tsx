'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RiskBadge } from '@/components/shared/RiskBadge'
import { HealthSummary } from '@/components/patient/HealthSummary'
import { Bell, Calendar, Share2, Clock, Syringe, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import mockPatientData from '@/data/mockPatientData.json'

export default function PatientDashboard() {
    const router = useRouter()
    const [patientUser, setPatientUser] = useState<any>(null)

    useEffect(() => {
        const user = localStorage.getItem('patientUser')
        if (!user) {
            router.push('/patient/login')
            return
        }
        setPatientUser(JSON.parse(user))
    }, [router])

    if (!patientUser) return null

    const { patient, timeline, vaccinations, upcomingReminders } = mockPatientData
    const latestVitals = timeline.find(e => e.vitals)?.vitals
    const completedVaccinations = vaccinations.filter(v => v.completed).length
    const totalVaccinations = vaccinations.length

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Welcome, {patient.name} 👋
                            </h1>
                            <p className="text-sm text-gray-600">{patient.village} Village</p>
                        </div>
                        <button className="relative p-2 text-gray-600 hover:text-primary">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Current Pregnancy Status */}
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-50 border-primary/20">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Current Pregnancy</p>
                            <h2 className="text-3xl font-bold text-gray-900">
                                Week {patient.weekPregnant}
                            </h2>
                        </div>
                        <RiskBadge level={patient.riskLevel as any} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Expected Delivery</span>
                            <span className="font-semibold text-gray-900">{formatDate(patient.expectedDelivery)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">ASHA Worker</span>
                            <span className="font-semibold text-gray-900">{patient.ashaWorker}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                            <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${(patient.weekPregnant / 40) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-600 text-center">
                            {40 - patient.weekPregnant} weeks remaining
                        </p>
                    </div>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/patient/share">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2">
                            <Share2 className="w-6 h-6 text-primary" />
                            <span className="text-sm">Share Records</span>
                        </Button>
                    </Link>
                    <Link href="/patient/vaccinations">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2">
                            <Syringe className="w-6 h-6 text-success" />
                            <span className="text-sm">Vaccinations</span>
                        </Button>
                    </Link>
                </div>

                {/* Latest Vitals */}
                {latestVitals && (
                    <HealthSummary
                        vitals={latestVitals}
                        date={formatDate(timeline[0].date)}
                    />
                )}

                {/* Upcoming Reminders */}
                <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Upcoming Reminders</h3>
                        <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        {upcomingReminders.slice(0, 3).map((reminder) => (
                            <div
                                key={reminder.id}
                                className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0"
                            >
                                <div className={`p-2 rounded-lg ${reminder.type === 'vaccination' ? 'bg-purple-100' :
                                        reminder.type === 'visit' ? 'bg-green-100' :
                                            'bg-blue-100'
                                    }`}>
                                    {reminder.type === 'vaccination' ? (
                                        <Syringe className="w-4 h-4 text-purple-600" />
                                    ) : reminder.type === 'visit' ? (
                                        <Calendar className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 text-sm">{reminder.title}</p>
                                    <p className="text-xs text-gray-600 mt-1">{formatDate(reminder.date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Vaccination Progress */}
                <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Vaccination Progress</h3>
                        <span className="text-sm text-gray-600">
                            {completedVaccinations} of {totalVaccinations}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                            className="bg-success h-3 rounded-full transition-all"
                            style={{ width: `${(completedVaccinations / totalVaccinations) * 100}%` }}
                        ></div>
                    </div>
                    <Link href="/patient/vaccinations">
                        <Button variant="link" className="text-sm p-0 h-auto">
                            View full schedule →
                        </Button>
                    </Link>
                </Card>

                {/* Quick Timeline Access */}
                <Link href="/patient/timeline">
                    <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Health Timeline</h3>
                                <p className="text-sm text-gray-600">
                                    {timeline.length} events recorded
                                </p>
                            </div>
                            <Clock className="w-8 h-8 text-primary" />
                        </div>
                    </Card>
                </Link>
            </div>
        </div>
    )
}