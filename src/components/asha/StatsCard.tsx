import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
    icon: LucideIcon
    value: string | number
    label: string
    color?: string
}

export function StatsCard({ icon: Icon, value, label, color = 'text-primary' }: StatsCardProps) {
    return (
        <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
                    <div className="text-sm text-gray-600">{label}</div>
                </div>
                <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </Card>
    )
}