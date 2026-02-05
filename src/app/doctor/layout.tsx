'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Users, BarChart3, User, LogOut } from 'lucide-react'
import { Heart } from 'lucide-react'

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/doctor/login'

    if (isLoginPage) {
        return <>{children}</>
    }

    const navItems = [
        { href: '/doctor/dashboard', icon: Home, label: 'Dashboard' },
        { href: '/doctor/patients', icon: Users, label: 'Patients' },
        { href: '/doctor/analytics', icon: BarChart3, label: 'Analytics' },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <Heart className="w-8 h-8 text-primary" />
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Jeevan Kosh</h1>
                                <p className="text-xs text-gray-600">Doctor Portal</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isActive
                                                ? 'bg-primary text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </Link>
                                )
                            })}
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium text-gray-900">Dr. Rajesh Mehta</p>
                                <p className="text-xs text-gray-600">City Hospital Indore</p>
                            </div>
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? 'text-primary' : 'text-gray-500'
                                    }`}
                            >
                                <item.icon className="w-6 h-6 mb-1" />
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}