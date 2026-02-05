'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { TimelineEvent } from '@/components/patient/TimelineEvent'
import mockPatientData from '@/data/mockPatientData.json'
import { TimelineEvent as TimelineEventType } from '@/types'

export default function PatientTimeline() {
    const router = useRouter()
    const [filter, setFilter] = useState<'all' | 'asha_visit' | 'doctor_visit' | 'vaccination'>('all')

    const { timeline } = mockPatientData

    const filteredTimeline = filter === 'all'
        ? timeline
        : timeline.filter(e => e.type === filter)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <button onClick={() => router.back()}>
                                <ArrowLeft className="w-6 h-6 text-gray-600" />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900">Health Timeline</h1>
                        </div>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            PDF
                        </Button>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all'
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All ({timeline.length})
                        </button>
                        <button
                            onClick={() => setFilter('asha_visit')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'asha_visit'
                                    ? 'bg-success text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            ASHA Visits
                        </button>
                        <button
                            onClick={() => setFilter('doctor_visit')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'doctor_visit'
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Doctor Visits
                        </button>
                        <button
                            onClick={() => setFilter('vaccination')}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'vaccination'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Vaccinations
                        </button>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="p-4">
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                    <div className="space-y-6">
                        {filteredTimeline.map((event, index) => (
                            <div key={event.id} className="relative">
                                {/* Timeline dot */}
                                <div className="absolute left-4 top-4 w-4 h-4 bg-white border-4 border-primary rounded-full z-10"></div>

                                {/* Event card with left margin */}
                                <div className="ml-12">
                                    <TimelineEvent event={event as TimelineEventType} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {filteredTimeline.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No events found for this filter</p>
                    </div>
                )}
            </div>
        </div>
    )
}