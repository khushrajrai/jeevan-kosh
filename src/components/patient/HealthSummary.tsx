import { Card } from '@/components/ui/card'
import { Activity } from 'lucide-react'
import { Vitals } from '@/types'

interface HealthSummaryProps {
    vitals: Vitals
    date: string
}

export function HealthSummary({ vitals, date }: HealthSummaryProps) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Latest Vitals</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <p className="text-xs text-gray-600 mb-1">Blood Pressure</p>
                    <p className="text-lg font-bold text-gray-900">
                        {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
                    </p>
                    <p className="text-xs text-gray-500">mmHg</p>
                </div>
                <div>
                    <p className="text-xs text-gray-600 mb-1">SpO₂</p>
                    <p className="text-lg font-bold text-gray-900">{vitals.spO2}%</p>
                    <p className="text-xs text-gray-500">oxygen</p>
                </div>
                <div>
                    <p className="text-xs text-gray-600 mb-1">Temperature</p>
                    <p className="text-lg font-bold text-gray-900">{vitals.temperature}°F</p>
                    <p className="text-xs text-gray-500">normal</p>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Recorded on {date}</p>
        </Card>
    )
}