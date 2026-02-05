'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '@/components/shared/RiskBadge'
import { ArrowLeft, Phone, MapPin, Calendar, Plus, Activity } from 'lucide-react'
import { PregnancyCase } from '@/types'
import { formatDate } from '@/lib/utils'
import mockCases from '@/data/mockCases.json'

export default function CaseDetail({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [caseData, setCaseData] = useState<PregnancyCase | null>(null)

    useEffect(() => {
        const savedCases = localStorage.getItem('pregnancyCases')
        const allCases = savedCases ? JSON.parse(savedCases) : mockCases
        const found = allCases.find((c: PregnancyCase) => c.id === params.id)
        setCaseData(found || null)
    }, [params.id])

    if (!caseData) {
        return <div className="p-4">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="px-4 py-4 flex items-center gap-4">
                    <button onClick={() => router.back()}>
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">Case Details</h1>
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Patient Info Card */}
                <Card className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{caseData.motherName}</h2>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                                <span>{caseData.age} years</span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {caseData.village}
                                </span>
                            </div>
                        </div>
                        <RiskBadge level={caseData.riskLevel} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                        <div>
                            <p className="text-sm text-gray-600">Week Pregnant</p>
                            <p className="text-lg font-semibold">{caseData.weekPregnant} weeks</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Expected Delivery</p>
                            <p className="text-lg font-semibold">{formatDate(caseData.expectedDelivery)}</p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{caseData.phone}</span>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <Button className="w-full">
                    <Plus className="w-5 h-5 mr-2" />
                    Record New Visit
                </Button>

                {/* Visit Timeline */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Visit History</h3>
                    <div className="space-y-3">
                        {caseData.visits.map((visit) => (
                            <Card key={visit.id} className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${visit.type === 'asha' ? 'bg-success/10' :
                                            visit.type === 'doctor' ? 'bg-primary/10' :
                                                'bg-purple-100'
                                        }`}>
                                        <Activity className={`w-5 h-5 ${visit.type === 'asha' ? 'text-success' :
                                                visit.type === 'doctor' ? 'text-primary' :
                                                    'text-purple-600'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {visit.type === 'asha' ? 'ASHA Home Visit' :
                                                        visit.type === 'doctor' ? 'Doctor Consultation' :
                                                            'Vaccination'}
                                                </p>
                                                <p className="text-sm text-gray-600">{formatDate(visit.date)}</p>
                                            </div>
                                            {visit.riskLevel && <RiskBadge level={visit.riskLevel} className="text-xs" />}
                                        </div>

                                        {visit.vitals && (
                                            <div className="bg-gray-50 rounded-lg p-3 mt-2">
                                                <p className="text-xs text-gray-600 mb-2">Vitals Recorded</p>
                                                <div className="grid grid-cols-3 gap-2 text-sm">
                                                    <div>
                                                        <p className="text-gray-600">BP</p>
                                                        <p className="font-medium">{visit.vitals.bloodPressure.systolic}/{visit.vitals.bloodPressure.diastolic}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">SpO₂</p>
                                                        <p className="font-medium">{visit.vitals.spO2}%</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-600">Temp</p>
                                                        <p className="font-medium">{visit.vitals.temperature}°F</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {visit.notes && (
                                            <p className="text-sm text-gray-600 mt-2">{visit.notes}</p>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Vaccination Checklist */}
                <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Vaccinations</h3>
                    <div className="space-y-2">
                        {['TT1', 'TT2', 'TT Booster'].map((vaccine, idx) => (
                            <div key={vaccine} className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${idx < 2 ? 'bg-success text-white' : 'bg-gray-200 text-gray-400'
                                    }`}>
                                    {idx < 2 ? '✓' : ''}
                                </div>
                                <span className={idx < 2 ? 'text-gray-900' : 'text-gray-500'}>
                                    {vaccine} {idx < 2 ? '- Completed' : '- Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}