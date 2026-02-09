'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '@/components/shared/RiskBadge'
import { ArrowLeft, Phone, MapPin, User, Calendar, Printer } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import mockPatientData from '@/data/mockPatientData.json'

export default function PatientRecordView({ params }: { params: { id: string } }) {
    const router = useRouter()

    const { patient, timeline, vaccinations } = mockPatientData

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">Patient Health Record</h1>
                    <p className="text-sm text-gray-600">Complete medical history</p>
                </div>
                <Button variant="outline" size="sm">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                </Button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    <Card className="p-6">
                        <div className="text-center mb-6">
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="w-12 h-12 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
                            <p className="text-sm text-gray-600">{patient.age} years old</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-600 mb-1">Current Status</p>
                                <RiskBadge level={patient.riskLevel as any} className="w-full justify-center" />
                            </div>

                            <div className="pt-4 border-t space-y-3">
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">Week Pregnant</p>
                                    <p className="font-semibold text-gray-900">{patient.weekPregnant} weeks</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">Expected Delivery</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <p className="font-semibold text-gray-900">{formatDate(patient.expectedDelivery)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-700">{patient.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-700">{patient.village}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-3">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Health Timeline</h3>
                        <div className="space-y-4">
                            {timeline.map((event: any) => (
                                <Card key={event.id} className="p-4 bg-gray-50">
                                    <div className="flex justify-between mb-2">
                                        <h4 className="font-semibold">{event.title}</h4>
                                        <span className="text-sm text-gray-600">{formatDate(event.date)}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{event.description}</p>
                                    {event.provider && (
                                        <p className="text-xs text-gray-600 mt-2">Provider: {event.provider}</p>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}