export const RISK_LEVELS = {
    normal: { label: 'Normal', color: 'bg-success text-white', icon: '🟢' },
    moderate: { label: 'Moderate', color: 'bg-warning text-white', icon: '🟡' },
    high: { label: 'High Risk', color: 'bg-danger text-white', icon: '🔴' },
} as const

export const EVENT_TYPES = {
    asha_visit: { label: 'ASHA Home Visit', color: 'border-l-success' },
    doctor_visit: { label: 'Doctor Visit', color: 'border-l-primary' },
    vaccination: { label: 'Vaccination', color: 'border-l-purple-500' },
    genesis: { label: 'Genesis Record', color: 'border-l-yellow-500' },
} as const

export const VILLAGES = [
    'Kheda', 'Raipur', 'Bhopal', 'Indore', 'Dewas', 'Ujjain'
]