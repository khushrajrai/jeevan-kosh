import { Card } from '@/components/ui/card'
import { CheckCircle, Clock, Calendar } from 'lucide-react'
import { Vaccination } from '@/types'
import { formatDate } from '@/lib/utils'

interface VaccinationCardProps {
    vaccination: Vaccination
}

export function VaccinationCard({ vaccination }: VaccinationCardProps) {
    return (
        <Card className={`p-4 ${vaccination.completed ? 'bg-green-50/50' : 'bg-gray-50'}`}>
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${vaccination.completed
                        ? 'bg-success text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                    {vaccination.completed ? (
                        <CheckCircle className="w-5 h-5" />
                    ) : (
                        <Clock className="w-5 h-5" />
                    )}
                </div>

                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{vaccination.name}</h3>

                    {vaccination.completed ? (
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-success">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-medium">Completed</span>
                            </div>
                            <p className="text-xs text-gray-600">
                                Administered on {formatDate(vaccination.date!)}
                            </p>
                            {vaccination.location && (
                                <p className="text-xs text-gray-500">{vaccination.location}</p>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-warning">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">Due on {formatDate(vaccination.dueDate)}</span>
                            </div>
                            {vaccination.location && (
                                <p className="text-xs text-gray-500">Location: {vaccination.location}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}