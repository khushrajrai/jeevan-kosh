export type RiskLevel = 'normal' | 'moderate' | 'high'
export type EventType = 'asha_visit' | 'doctor_visit' | 'vaccination' | 'genesis'

export interface Vitals {
    bloodPressure: { systolic: number; diastolic: number }
    spO2: number
    temperature: number
}

export interface Visit {
    id: string
    date: string
    type: 'asha' | 'doctor' | 'vaccination'
    vitals?: Vitals
    riskLevel?: RiskLevel
    notes?: string
    provider?: string
    location?: string
}

export interface PregnancyCase {
    id: string
    motherName: string
    age: number
    village: string
    phone: string
    expectedDelivery: string
    weekPregnant: number
    riskLevel: RiskLevel
    ashaWorker: string
    ashaPhone: string
    visits: Visit[]
    createdAt: string
}

export interface TimelineEvent {
    id: string
    date: string
    type: EventType
    title: string
    description: string
    provider?: string
    location?: string
    vitals?: Vitals
    riskLevel?: RiskLevel
    prescription?: string
}

export interface Vaccination {
    id: string
    name: string
    completed: boolean
    date?: string
    dueDate: string
    location?: string
}

export interface Patient {
    id: string
    name: string
    age: number
    village: string
    phone: string
    photo?: string
    weekPregnant: number
    expectedDelivery: string
    riskLevel: RiskLevel
    ashaWorker: string
    ashaPhone: string
    timeline: TimelineEvent[]
    vaccinations: Vaccination[]
}