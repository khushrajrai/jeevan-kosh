'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '@/components/shared/RiskBadge'
import { ArrowLeft, Phone, MapPin, Calendar, Plus, Activity } from 'lucide-react'
import { PregnancyCase } from '@/types'
import { formatDate } from '@/lib/utils'
import mockCases from '@/data/mockCases.json'

interface CaseDetailProps {
    params: Promise<{ id: string }>
}

export default function CaseDetail({ params }: CaseDetailProps) {
    const router = useRouter()
    const [caseData, setCaseData] = useState<PregnancyCase | null>(null)
    const [caseId, setCaseId] = useState<string>('')

    useEffect(() => {
        params.then(p => setCaseId(p.id))
    }, [params])

    useEffect(() => {
        if (!caseId) return

        const savedCases = localStorage.getItem('pregnancyCases')
        const allCases = savedCases ? JSON.parse(savedCases) : mockCases
        const found = allCases.find((c: PregnancyCase) => c.id === caseId)
        setCaseData(found || null)
    }, [caseId])

    if (!caseData) {
        return <div className="p-4">Loading...</div>
    }

// ... rest of your component code stays the same