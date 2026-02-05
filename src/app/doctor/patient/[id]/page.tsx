'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { RiskBadge } from '@/components/shared/RiskBadge'
import { TimelineEvent } from '@/components/patient/TimelineEvent'
import { ArrowLeft, Phone, MapPin, User, Calendar, Printer, Download, Plus } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import mockPatientData from '@/data/mockPatientData.json'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function PatientRecordView({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('timeline')
    const [showDiagnosisModal, setShowDiagnosisModal] = useState(false)
    const [diagnosis, setDiagnosis] = useState('')
    const [prescription, setPrescription] = useState('')

    const { patient, timeline, vaccinations } = mockPatientData

    // Mock vitals trend data
    const vitalsTrend = [
        { date: 'Dec 20', systolic: 115, diastolic: 72, spO2: 99 },
        { date: 'Jan 10', systolic: 116, diastolic: 74, spO2: 98 },
        { date: 'Jan 28', systolic: 118, diastolic: 76, spO2: 98 },
        { date: 'Feb 1', systolic: 118, diastolic: 76, spO2: 98 },
    ]

    const handleSaveDiagnosis = () => {
        // In real app, this would save to backend
        alert('Diagnosis saved successfully! Record updated in patient timeline.')
        setShowDiagnosisModal(false)
        setDiagnosis('')
        setPrescription('')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">Patient Health Record</h1>
                    <p className="text-sm text-gray-600">Complete medical history from ASHA + clinic visits</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Left Sidebar - Patient Info */}
                <div className="lg:col-span-1">
                    <Card className="p-6 sticky top-24">
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

                            <div className="pt-4 border-t">
                                <p className="text-xs text-gray-600 mb-2">ASHA Worker</p>
                                <p className="font-semibold text-gray-900 text-sm">{patient.ashaWorker}</p>
                                <p className="text-xs text-gray-600 mt-1">{patient.ashaPhone}</p>
                            </div>
                        </div>

                        {/* Add Diagnosis Button */}
                        <Dialog open={showDiagnosisModal} onOpenChange={setShowDiagnosisModal}>
                            <DialogTrigger asChild>
                                <Button className="w-full mt-6">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Diagnosis
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Diagnosis</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date
                                        </label>
                                        <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Diagnosis
                                        </label>
                                        <textarea
                                            className="w-full min-h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Enter diagnosis details..."
                                            value={diagnosis}
                                            onChange={(e) => setDiagnosis(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prescription
                                        </label>
                                        <textarea
                                            className="w-full min-h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Enter prescription..."
                                            value={prescription}
                                            onChange={(e) => setPrescription(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Risk Assessment
                                        </label>
                                        <select className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option value="normal">Normal</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="high">High Risk</option>
                                        </select>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <p className="text-xs text-blue-800">
                                            ℹ️ This will be digitally signed and permanently added to the patient's health record
                                        </p>
                                    </div>
                                    <Button onClick={handleSaveDiagnosis} className="w-full">
                                        Save Diagnosis
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="timeline">Timeline</TabsTrigger>
                            <TabsTrigger value="vitals">Vitals</TabsTrigger>
                            <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
                            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                        </TabsList>

                        {/* Timeline Tab */}
                        <TabsContent value="timeline" className="space-y-4 mt-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-900 font-medium mb-1">
                                    📊 Complete History Available
                                </p>
                                <p className="text-sm text-blue-800">
                                    This record includes {timeline.length} events from both ASHA field visits and clinic consultations,
                                    providing a complete picture of maternal health.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {timeline.map((event: any) => (
                                    <TimelineEvent key={event.id} event={event} />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Vitals Tab */}
                        <TabsContent value="vitals" className="space-y-6 mt-6">
                            <Card className="p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Blood Pressure Trend</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={vitalsTrend}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="systolic" stroke="#2563EB" strokeWidth={2} name="Systolic" />
                                        <Line type="monotone" dataKey="diastolic" stroke="#7C3AED" strokeWidth={2} name="Diastolic" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">SpO₂ Trend</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={vitalsTrend}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis domain={[95, 100]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="spO2" stroke="#10B981" strokeWidth={2} name="SpO₂ %" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>

                            <div className="grid md:grid-cols-3 gap-4">
                                {timeline.filter((e: any) => e.vitals).slice(0, 3).map((event: any) => (
                                    <Card key={event.id} className="p-4">
                                        <p className="text-xs text-gray-600 mb-3">{formatDate(event.date)}</p>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-gray-600">Blood Pressure</p>
                                                <p className="font-semibold text-gray-900">
                                                    {event.vitals.bloodPressure.systolic}/{event.vitals.bloodPressure.diastolic}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">SpO₂</p>
                                                <p className="font-semibold text-gray-900">{event.vitals.spO2}%</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Temperature</p>
                                                <p className="font-semibold text-gray-900">{event.vitals.temperature}°F</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-3 italic">
                                            {event.type === 'asha_visit' ? '📡 Recorded by ASHA (IoT device)' : '🏥 Clinic measurement'}
                                        </p>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Vaccinations Tab */}
                        <TabsContent value="vaccinations" className="space-y-4 mt-6">
                            <Card className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-gray-900">Immunization Progress</h3>
                                    <span className="text-sm text-gray-600">
                                        {vaccinations.filter((v: any) => v.completed).length} of {vaccinations.length} completed
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                    <div
                                        className="bg-success h-3 rounded-full transition-all"
                                        style={{ width: `${(vaccinations.filter((v: any) => v.completed).length / vaccinations.length) * 100}%` }}
                                    ></div>
                                </div>
                            </Card>

                            <div className="space-y-3">
                                {vaccinations.map((vaccination: any) => (
                                    <Card key={vaccination.id} className={`p-4 ${vaccination.completed ? 'bg-green-50/50' : ''}`}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{vaccination.name}</h4>
                                                {vaccination.completed ? (
                                                    <p className="text-sm text-success mt-1">
                                                        ✓ Completed on {formatDate(vaccination.date)}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-warning mt-1">
                                                        ⏳ Due on {formatDate(vaccination.dueDate)}
                                                    </p>
                                                )}
                                                {vaccination.location && (
                                                    <p className="text-xs text-gray-600 mt-1">{vaccination.location}</p>
                                                )}
                                            </div>
                                            {vaccination.completed && (
                                                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                                                    <span className="text-white text-lg">✓</span>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        {/* Prescriptions Tab */}
                        <TabsContent value="prescriptions" className="space-y-4 mt-6">
                            {timeline
                                .filter((e: any) => e.prescription)
                                .map((event: any) => (
                                    <Card key={event.id} className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{formatDate(event.date)}</h3>
                                                <p className="text-sm text-gray-600">{event.provider} • {event.location}</p>
                                            </div>
                                            <RiskBadge level={event.riskLevel} className="text-xs" />
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-600 mb-2 font-medium">💊 Prescription</p>
                                            <p className="text-sm text-gray-900">{event.prescription}</p>
                                        </div>
                                        {event.description && (
                                            <div className="mt-4 pt-4 border-t">
                                                <p className="text-xs text-gray-600 mb-1">Diagnosis</p>
                                                <p className="text-sm text-gray-900">{event.description}</p>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}