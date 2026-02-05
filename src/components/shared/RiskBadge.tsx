import { cn } from '@/lib/utils'
import { RISK_LEVELS } from '@/lib/constants'
import { RiskLevel } from '@/types'

interface RiskBadgeProps {
    level: RiskLevel
    className?: string
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
    const config = RISK_LEVELS[level]

    return (
        <div className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
            config.color,
            className
        )}>
            <span>{config.icon}</span>
            <span>{config.label}</span>
        </div>
    )
}