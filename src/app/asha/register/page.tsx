'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { calculateRisk } from '@/lib/riskCalculator'
import { RiskBadge } from '@/components/shared/RiskBadge'
import { VILLAGES } from '@/lib/constants'
import { PregnancyCase, Vitals, RiskLevel } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export default function RegisterPregnancy() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [riskResult, setRiskResult] = useState<{ level: RiskLevel; recommendation: string } | null>(null)

    // Form data
    const [formData, setFormData] = useState({
        motherName: '',
        age: '',
        village: 'Kheda',
        phone: '',
        expectedDelivery: '',
    })

    const [vitals, setVitals] = useState<Vitals>({
        bloodPressure: { systolic: 120, diastolic: 80 },
        spO2: 98,
        temperature: 98.2,
    })

    const handleNext = () => {
        if (step === 2) {
            // Analyze risk
            setIsAnalyzing(true)
            setTimeout(() => {
                const result = calculateRisk(vitals)
                setRiskResult(result)
                setIsAnalyzing(false)
                setStep(3)
            }, 2000)
        } else {
            setStep(step + 1)
        }
    }

    const handleSubmit = () => {
        const ashaUser = JSON.parse(localStorage.getItem('ashaUser') || '{}')

        const newCase: PregnancyCase = {
            id: `case-${uuidv4().slice(0, 8)}`,
            motherName: formData.motherName,
            age: parseInt(formData.age),
            village: formData.village,
            phone: formData.phone,
            expectedDelivery: formData.expectedDelivery,
            weekPregnant: 8, // Assuming early pregnancy
            riskLevel: riskResult?.level || 'normal',
            ashaWorker: ashaUser.name || 'ASHA Devi',
            ashaPhone: ashaUser.phone || '9876543210',
            createdAt: new Date().toISOString(),
            visits: [
                {
                    id: `visit-${uuidv4().slice(0, 8)}`,
                    date: new Date().toISOString(),
                    type: 'asha',
                    provider: ashaUser.name || 'ASHA Devi',
                    location: formData.village,
                    vitals: vitals,
                    riskLevel: riskResult?.level || 'normal',
                    notes: 'Genesis Record created. First antenatal check-up completed.'
                }
            ]
        }

        // Save to localStorage
        const existingCases = JSON.parse(localStorage.getItem('pregnancyCases') || '[]')
        localStorage.setItem('pregnancyCases', JSON.stringify([newCase, ...existingCases]))

        // Show success and redirect
        router.push(`/asha/case/${newCase.id}`)
    }

    const progressWidth = (step / 3) * 100

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="px-4 py-4 flex items-center gap-4">
                    <button onClick={() => step === 1 ? router.back() : setStep(step - 1)}>
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-lg font-semibold text-gray-900">Register Pregnancy</h1>
                        <p className="text-sm text-gray-600">Step {step} of 3</p>
                    </div>
                </div>
                {/* Progress Bar */}
                <div className="h-1 bg-gray-200">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progressWidth}%` }}
                    />
                </div>
            </div>

            <div className="p-4">
                {/* Step 1: Basic Details */}
                {step === 1 && (
                    <Card className="p-6 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Mother's Details
                            </h2>
                            <p className="text-sm text-gray-600">
                                Basic information for Genesis Record
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <Input
                                    placeholder="Enter mother's name"
                                    value={formData.motherName}
                                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Age *
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Enter age"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Village *
                                </label>
                                <select
                                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={formData.village}
                                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                                >
                                    {VILLAGES.map(village => (
                                        <option key={village} value={village}>{village}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <Input
                                    type="tel"
                                    placeholder="10-digit phone number"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expected Delivery Date *
                                </label>
                                <Input
                                    type="date"
                                    value={formData.expectedDelivery}
                                    onChange={(e) => setFormData({ ...formData, expectedDelivery: e.target.value })}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleNext}
                            className="w-full"
                            disabled={!formData.motherName || !formData.age || !formData.phone || !formData.expectedDelivery}
                        >
                            Next: Record Vitals
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Card>
                )}

                {/* Step 2: Record Vitals */}
                {step === 2 && (
                    <Card className="p-6 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Record Vitals
                            </h2>
                            <p className="text-sm text-gray-600">
                                Measure using IoT device or manual entry
                            </p>
                        </div>

                        {/* IoT Device Status */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                            <div>
                                <p className="text-sm font-medium text-blue-900">📡 IoT Device Connected</p>
                                <p className="text-xs text-blue-700">BLE BP Cuff • SpO₂ Sensor</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Blood Pressure */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Blood Pressure (mmHg)
                                </label>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Systolic</span>
                                            <span className="font-medium">{vitals.bloodPressure.systolic}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="90"
                                            max="180"
                                            value={vitals.bloodPressure.systolic}
                                            onChange={(e) => setVitals({
                                                ...vitals,
                                                bloodPressure: { ...vitals.bloodPressure, systolic: parseInt(e.target.value) }
                                            })}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Diastolic</span>
                                            <span className="font-medium">{vitals.bloodPressure.diastolic}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="60"
                                            max="120"
                                            value={vitals.bloodPressure.diastolic}
                                            onChange={(e) => setVitals({
                                                ...vitals,
                                                bloodPressure: { ...vitals.bloodPressure, diastolic: parseInt(e.target.value) }
                                            })}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SpO2 */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <label className="font-medium text-gray-700">SpO₂ Level (%)</label>
                                    <span className="font-medium">{vitals.spO2}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="85"
                                    max="100"
                                    value={vitals.spO2}
                                    onChange={(e) => setVitals({ ...vitals, spO2: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            {/* Temperature */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <label className="font-medium text-gray-700">Temperature (°F)</label>
                                    <span className="font-medium">{vitals.temperature}°F</span>
                                </div>
                                <input
                                    type="range"
                                    min="96"
                                    max="104"
                                    step="0.1"
                                    value={vitals.temperature}
                                    onChange={(e) => setVitals({ ...vitals, temperature: parseFloat(e.target.value) })}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>
                        </div>

                        <Button onClick={handleNext} className="w-full">
                            Analyze Risk with AI
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Card>
                )}

                {/* Step 3: AI Risk Assessment */}
                {step === 3 && (
                    <Card className="p-6 space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                AI Risk Assessment
                            </h2>
                            <p className="text-sm text-gray-600">
                                On-device analysis completed
                            </p>
                        </div>

                        {isAnalyzing ? (
                            <div className="py-12 text-center">
                                <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-4" />
                                <p className="text-gray-600">Analyzing vitals...</p>
                                <p className="text-sm text-gray-500 mt-2">Using AI risk classification model</p>
                            </div>
                        ) : riskResult && (
                            <>
                                <div className="text-center py-8">
                                    <RiskBadge level={riskResult.level} className="text-lg px-6 py-3" />
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <h3 className="font-semibold text-gray-900">Vitals Summary</h3>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">BP</p>
                                            <p className="font-medium">{vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}</p>
                                            {vitals.bloodPressure.systolic < 140 && vitals.bloodPressure.diastolic < 90 && (
                                                <span className="text-success">✓</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-gray-600">SpO₂</p>
                                            <p className="font-medium">{vitals.spO2}%</p>
                                            {vitals.spO2 >= 95 && <span className="text-success">✓</span>}
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Temp</p>
                                            <p className="font-medium">{vitals.temperature}°F</p>
                                            {vitals.temperature < 100.4 && <span className="text-success">✓</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className={`rounded-lg p-4 ${riskResult.level === 'high' ? 'bg-red-50 border border-red-200' :
                                        riskResult.level === 'moderate' ? 'bg-yellow-50 border border-yellow-200' :
                                            'bg-green-50 border border-green-200'
                                    }`}>
                                    <h3 className="font-semibold mb-2 text-gray-900">Recommendation</h3>
                                    <p className={`text-sm ${riskResult.level === 'high' ? 'text-red-800' :
                                            riskResult.level === 'moderate' ? 'text-yellow-800' :
                                                'text-green-800'
                                        }`}>
                                        {riskResult.recommendation}
                                    </p>
                                </div>

                                <Button onClick={handleSubmit} className="w-full bg-success hover:bg-green-700">
                                    ✓ Create Genesis Record
                                </Button>
                            </>
                        )}
                    </Card>
                )}
            </div>
        </div>
    )
}