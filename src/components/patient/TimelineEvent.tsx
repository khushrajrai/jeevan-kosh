import { Card } from '@/components/ui/card'
import { RiskBadge } from '@/components/shared/RiskBadge'
import { TimelineEvent as TimelineEventType } from '@/types'
import { Activity, Stethoscope, Syringe, Star, MapPin } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface TimelineEventProps {
    event: TimelineEventType
}

export function TimelineEvent({ event }: TimelineEventProps) {
    const getIcon = () => {
        switch (event.type) {
            case 'asha_visit': return <Activity className="w-5 h-5 text-success" />
            case 'doctor_visit': return <Stethoscope className="w-5 h-5 text-primary" />
            case 'vaccination': return <Syringe className="w-5 h-5 text-purple-600" />
            case 'genesis': return <Star className="w-5 h-5 text-yellow-500" />
            default: return <Activity className="w-5 h-5 text-gray-400" />
        }
    }

    const getBgColor = () => {
        switch (event.type) {
            case 'asha_visit': return 'bg-success/10'
            case 'doctor_visit': return 'bg-primary/10'
            case 'vaccination': return 'bg-purple-100'
            case 'genesis': return 'bg-yellow-100'
            default: return 'bg-gray-100'
        }
    }

    return (
        <Card className="p-4">
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getBgColor()}`}>
                    {getIcon()}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                        </div>
                        {event.riskLevel && <RiskBadge level={event.riskLevel} className="text-xs" />}
                    </div>

                    <p className="text-sm text-gray-700 mb-2">{event.description}</p>

                    {event.provider && (
                        <div className="text-xs text-gray-600 mb-2">
                            <span className="font-medium">Provider:</span> {event.provider}
                        </div>
                    )}

                    {event.location && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                        </div>
                    )}

                    {event.vitals && (
                        <div className="bg-gray-50 rounded-lg p-3 mt-3">
                            <p className="text-xs text-gray-600 mb-2 font-medium">Vitals Recorded</p>
                            <div className="grid grid-cols-3 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-600 text-xs">BP</p>
                                    <p className="font-semibold text-gray-900">
                                        {event.vitals.bloodPressure.systolic}/{event.vitals.bloodPressure.diastolic}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-xs">SpO₂</p>
                                    <p className="font-semibold text-gray-900">{event.vitals.spO2}%</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-xs">Temp</p>
                                    <p className="font-semibold text-gray-900">{event.vitals.temperature}°F</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {event.prescription && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                            <p className="text-xs text-blue-900 font-medium mb-1">💊 Prescription</p>
                            <p className="text-sm text-blue-800">{event.prescription}</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}