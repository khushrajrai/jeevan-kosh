import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Activity, Shield, Users, TrendingUp, CheckCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">Jeevan Kosh</span>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#problem" className="text-gray-600 hover:text-primary">Problem</a>
              <a href="#solution" className="text-gray-600 hover:text-primary">Solution</a>
              <a href="#impact" className="text-gray-600 hover:text-primary">Impact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-purple-600 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Breaking the Chain of Fragmented Maternal Care
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                One health record. From pregnancy to adulthood. Powered by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/asha/login">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Try ASHA Demo
                  </Button>
                </Link>
                <Link href="/patient/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white">
                    Try Patient Demo
                  </Button>
                </Link>
                <Link href="/doctor/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white">
                    Try Doctor Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <Activity className="w-24 h-24 mx-auto mb-4 text-white" />
                  <p className="text-lg">Real-time health monitoring across the continuum of care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              The Crisis of Fragmented Data
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Maternal and child healthcare in India is dangerously fragmented, leading to preventable deaths
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12 text-danger" />,
                title: 'Lost Patient Data',
                description: 'Medical records scattered across hospitals. Paper cards easily lost. Patients can\'t remember complex histories.'
              },
              {
                icon: <Activity className="w-12 h-12 text-warning" />,
                title: 'ASHA Worker Burden',
                description: 'Frontline workers buried in manual paperwork. Vital field data never reaches doctors. No digital tools.'
              },
              {
                icon: <Shield className="w-12 h-12 text-danger" />,
                title: 'Missed High-Risk Cases',
                description: 'Pre-eclampsia detected too late. No AI-assisted early warning. Preventable maternal and infant deaths.'
              }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="solution" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How Jeevan Kosh Works
            </h2>
            <p className="text-xl text-gray-600">
              Three integrated portals. One seamless continuum of care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'ASHA Registers',
                description: 'ASHA worker creates Genesis Record using IoT kit. AI analyzes vitals in real-time.',
                color: 'bg-success'
              },
              {
                step: 2,
                title: 'Patient Owns Data',
                description: 'Complete health history in secure digital wallet. Share via OTP when needed.',
                color: 'bg-primary'
              },
              {
                step: 3,
                title: 'Doctor Accesses',
                description: 'Full visibility into ASHA field data + clinic history. Informed diagnosis every time.',
                color: 'bg-purple-600'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className={`${item.color} text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300" style={{ width: 'calc(100% - 4rem)', left: 'calc(50% + 2rem)' }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section id="impact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Projected Impact
            </h2>
            <p className="text-xl text-gray-600">
              Data-driven outcomes from pilot deployment
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '1,247', label: 'Patients Registered', icon: Users },
              { number: '89', label: 'High-Risk Detected Early', icon: Shield },
              { number: '12', label: 'Maternal Lives Saved (est.)', icon: Heart },
              { number: '94%', label: 'Data Completeness', icon: CheckCircle }
            ].map((item, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                <item.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="text-4xl font-bold text-gray-900 mb-2">{item.number}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">Jeevan Kosh</span>
              </div>
              <p className="text-gray-400">
                Team Jeevan Kosh - VIT Bhopal University<br />
                Maternal & Child Health Solutions Hackathon 2026
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Try Demo Access</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/asha/login">
                  <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">
                    ASHA Portal
                  </Button>
                </Link>
                <Link href="/patient/login">
                  <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">
                    Patient Portal
                  </Button>
                </Link>
                <Link href="/doctor/login">
                  <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">
                    Doctor Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 Jeevan Kosh. Built for social impact.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}