'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, FolderOpen, User } from 'lucide-react'

export default function AshaLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/asha/login'

    if (isLoginPage) {
        return <>{children}</>
    }

    const navItems = [
        { href: '/asha/dashboard', icon: Home, label: 'Home' },
        { href: '/asha/cases', icon: FolderOpen, label: 'Cases' },
        { href: '/asha/profile', icon: User, label: 'Profile' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {children}

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
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