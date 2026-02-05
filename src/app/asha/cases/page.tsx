'use client'

import { useEffect, useState } from 'react'
import { CaseCard } from '@/components/asha/CaseCard'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PregnancyCase } from '@/types'
import mockCases from '@/data/mockCases.json'

export default function AllCases() {
    const router = useRouter()
    const [cases, setCases] = useState<PregnancyCase[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState<'all' | 'normal' | 'moderate' | 'high'>('all')

    useEffect(() => {
        const savedCases = localStorage.getItem('pregnancyCases')
        setCases(savedCases ? JSON.parse(savedCases) : mockCases)
    }, [])

    const filteredCases = cases.filter(c => {
        const matchesSearch = c.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.village.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filter === 'all' || c.riskLevel === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="px-4 py-4">
                    <div className="flex items-center gap-4 mb-4">
                        <button onClick={() => router.back()}>
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-900">All Cases</h1>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            placeholder="Search by name or village..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                        {['all', 'normal', 'moderate', 'high'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === f
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                                {f === 'all' && ` (${cases.length})`}
                                {f === 'high' && ` (${cases.filter(c => c.riskLevel === 'high').length})`}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cases List */}
            <div className="p-4 space-y-3">
                {filteredCases.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No cases found</p>
                    </div>
                ) : (
                    filteredCases.map((pregnancyCase) => (
                        <CaseCard key={pregnancyCase.id} case={pregnancyCase} />
                    ))
                )}
            </div>
        </div>
    )
}