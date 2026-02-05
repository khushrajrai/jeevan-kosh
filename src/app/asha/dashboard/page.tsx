'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StatsCard } from '@/components/asha/StatsCard'
import { CaseCard } from '@/components/asha/CaseCard'
import { Heart, AlertTriangle, Activity, Clock, Plus, Bell } from 'lucide-react'
import { PregnancyCase } from '@/types'
import mockCases from '@/data/mockCases.json'

export default function AshaDashboard() {
    const router = useRouter()
    const [ashaUser, setAshaUser] = useState<any>(null)
    const [cases, setCases] = useState<PregnancyCase[]>([])

    useEffect(() => {
        const user = localStorage.getItem('ashaUser')
        if (!user) {
            router.push('/asha/login')
            return
        }
        setAshaUser(JSON.parse(user))

        // Load cases from localStorage or use mock data
        const savedCases = localStorage.getItem('pregnancyCases')
        setCases(savedCases ? JSON.parse(savedCases) : mockCases)
    }, [router])

    if (!ashaUser) return null

    const highRiskCount = cases.filter(c => c.riskLevel === 'high').length
    const totalPregnancies = cases.length
    const visitsToday = 5 // Mock
    const pendingFollowups = 4 // Mock

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Welcome, {ashaUser.name} 👋
                            </h1>
                            <p className="text-sm text-gray-600">Serving: {ashaUser.village} Village</p>
                        </div>
                        <button className="relative p-2 text-gray-600 hover:text-primary">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <StatsCard
                        icon={Heart}
                        value={totalPregnancies}
                        label="Pregnancies"
                        color="text-primary"
                    />
                    <StatsCard
                        icon={AlertTriangle}
                        value={highRiskCount}
                        label="High Risk"
                        color="text-danger"
                    />
                    <StatsCard
                        icon={Activity}
                        value={visitsToday}
                        label="Visits Today"
                        color="text-success"
                    />
                    <StatsCard
                        icon={Clock}
                        value={pendingFollowups}
                        label="Pending"
                        color="text-warning"
                    />
                </div>

                {/* Primary Action */}
                <Link href="/asha/register">
                    <Button className="w-full h-14 text-lg bg-primary hover:bg-primary-dark">
                        <Plus className="w-6 h-6 mr-2" />
                        Register New Pregnancy
                    </Button>
                </Link>

                {/* Secondary Action */}
                <Link href="/asha/cases">
                    <Button variant="outline" className="w-full h-12">
                        📋 View All Cases ({totalPregnancies})
                    </Button>
                </Link>

                {/* Recent Cases */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Recent Cases
                    </h2>
                    <div className="space-y-3">
                        {cases.slice(0, 3).map((pregnancyCase) => (
                            <CaseCard key={pregnancyCase.id} case={pregnancyCase} />
                        ))}
                    </div>
                </div>

                {/* Tips Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">💡 Today's Tip</h3>
                    <p className="text-sm text-blue-800">
                        Monitor BP closely in third trimester. Values above 140/90 need immediate doctor referral.
                    </p>
                </div>
            </div>
        </div>
    )
}