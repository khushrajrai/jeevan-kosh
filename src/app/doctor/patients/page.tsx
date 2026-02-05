'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { PatientCard } from '@/components/doctor/PatientCard'
import { Search } from 'lucide-react'
import mockDoctorData from '@/data/mockDoctorData.json'
import { Patient } from '@/types'

export default function AllPatients() {
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState<'all' | 'normal' | 'moderate' | 'high'>('all')

    const { patients } = mockDoctorData

    const filteredPatients = patients.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.village.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filter === 'all' || p.riskLevel === filter
        return matchesSearch && matchesFilter
    })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">All Patients</h1>
                <p className="text-gray-600">{patients.length} total patients under care</p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search by name or village..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
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
                            {f === 'all' && ` (${patients.length})`}
                            {f === 'high' && ` (${patients.filter(p => p.riskLevel === 'high').length})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Patient Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No patients found</p>
                    </div>
                ) : (
                    filteredPatients.map((patient) => (
                        <PatientCard key={patient.id} patient={patient as Patient} />
                    ))
                )}
            </div>
        </div>
    )
}