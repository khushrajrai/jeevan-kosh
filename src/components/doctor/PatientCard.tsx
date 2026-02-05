import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '@/components/shared/RiskBadge'
import { Patient } from '@/types'
import { Calendar, MapPin, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface PatientCardProps {
    patient: Patient
}

export function PatientCard({ patient }: PatientCardProps) {
    return (
        <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                            {patient.name.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                            <span>{patient.age} years</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {patient.village}
                            </span>
                        </div>
                    </div>
                </div>
                <RiskBadge level={patient.riskLevel} />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 pt-3 border-t">
                <div>
                    <p className="text-xs text-gray-600">Week Pregnant</p>
                    <p className="text-sm font-semibold text-gray-900">{patient.weekPregnant} weeks</p>
                </div>
                <div>
                    <p className="text-xs text-gray-600">Expected Delivery</p>
                    <p className="text-sm font-semibold text-gray-900">{formatDate(patient.expectedDelivery)}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <Link href={`/doctor/patient/${patient.id}`} className="flex-1">
                    <Button variant="default" className="w-full" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Records
                    </Button>
                </Link>
            </div>
        </Card>
    )
}