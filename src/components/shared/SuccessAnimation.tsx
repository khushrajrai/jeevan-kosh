'use client'

import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'

export function SuccessAnimation({ message }: { message: string }) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 3000)
        return () => clearTimeout(timer)
    }, [])

    if (!show) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4 animate-scale-in">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle className="w-12 h-12 text-success" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    )
}