import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { RiskBadge } from '@/components/shared/RiskBadge'
import { PregnancyCase } from '@/types'
import { Calendar, MapPin } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface CaseCardProps {
    case: PregnancyCase
}

export function CaseCard({ case: pregnancyCase }: CaseCardProps) {
    const nextVisit = new Date()
    nextVisit.setDate(nextVisit.getDate() + 7)

    return (
        <Link href={`/asha/case/${pregnancyCase.id}`}>
            <Card className={`p-4 hover:shadow-md transition-shadow border-l-4 ${pregnancyCase.riskLevel === 'high' ? 'border-l-danger' :
                    pregnancyCase.riskLevel === 'moderate' ? 'border-l-warning' :
                        'border-l-success'
                }`}>
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                            {pregnancyCase.motherName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{pregnancyCase.weekPregnant} weeks</span>
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {pregnancyCase.village}
                            </span>
                        </div>
                    </div>
                    <RiskBadge level={pregnancyCase.riskLevel} />
                </div>

                {pregnancyCase.riskLevel === 'high' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                        <p className="text-sm text-red-800 font-medium">
                            ⚠️ High Risk - Elevated BP: 145/92
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Next visit: {formatDate(nextVisit)}</span>
                </div>
            </Card>
        </Link>
    )
}