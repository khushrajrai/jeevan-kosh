'use client'

import { ArrowLeft, Download, Bell, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { VaccinationCard } from '@/components/patient/VaccinationCard'
import mockPatientData from '@/data/mockPatientData.json'
import { Vaccination } from '@/types'

export default function PatientVaccinations() {
    const router = useRouter()
    const { vaccinations } = mockPatientData

    const completedCount = vaccinations.filter(v => v.completed).length
    const totalCount = vaccinations.length
    const progressPercent = (completedCount / totalCount) * 100

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()}>
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900">Vaccination Schedule</h1>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Progress Card */}
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <div className="text-center mb-4">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">
                            {completedCount} of {totalCount}
                        </h2>
                        <p className="text-gray-600">Vaccinations Completed</p>
                    </div>

                    <div className="w-full bg-white/50 rounded-full h-3 mb-4">
                        <div
                            className="bg-success h-3 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" size="sm">
                            <Bell className="w-4 h-4 mr-2" />
                            Reminders On
                        </Button>
                        <Button variant="outline" className="flex-1" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Certificate
                        </Button>
                    </div>
                </Card>

                {/* Next Due */}
                {vaccinations.find(v => !v.completed) && (
                    <Card className="p-4 bg-yellow-50 border-yellow-200">
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-yellow-600 mt-1" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Next Due</h3>
                                <p className="text-sm text-gray-700">
                                    {vaccinations.find(v => !v.completed)?.name}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Scheduled for {new Date(vaccinations.find(v => !v.completed)!.dueDate).toLocaleDateString('en-IN', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Vaccination List */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">All Vaccinations</h2>
                    <div className="space-y-3">
                        {vaccinations.map((vaccination) => (
                            <VaccinationCard key={vaccination.id} vaccination={vaccination as Vaccination} />
                        ))}
                    </div>
                </div>

                {/* Info Box */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Important Information</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Carry your physical vaccination card to appointments</li>
                        <li>• Notify ASHA worker if you miss a scheduled vaccine</li>
                        <li>• Report any side effects immediately</li>
                    </ul>
                </Card>
            </div>
        </div>
    )
}