'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Shield, Heart, CheckCircle, TrendingUp, Download, Calendar } from 'lucide-react'
import mockDoctorData from '@/data/mockDoctorData.json'
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

export default function DoctorAnalytics() {
    const { analytics } = mockDoctorData

    const COLORS = {
        normal: '#10B981',
        moderate: '#F59E0B',
        high: '#EF4444'
    }

    const riskDistributionData = [
        { name: 'Normal', value: analytics.riskDistribution.normal, color: COLORS.normal },
        { name: 'Moderate', value: analytics.riskDistribution.moderate, color: COLORS.moderate },
        { name: 'High Risk', value: analytics.riskDistribution.high, color: COLORS.high }
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
                    <p className="text-gray-600">Comprehensive insights and health trends</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Last 30 Days
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                            <p className="text-4xl font-bold text-gray-900">{analytics.totalPatients.toLocaleString()}</p>
                            <p className="text-xs text-success mt-2 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                +12% from last month
                            </p>
                        </div>
                        <div className="p-3 bg-primary/20 rounded-lg">
                            <Users className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-primary/20">
                        <p className="text-xs text-gray-600">Registered pregnancies</p>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-danger/5 to-danger/10 border-danger/20">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">High-Risk Detected</p>
                            <p className="text-4xl font-bold text-gray-900">{analytics.highRiskDetected}</p>
                            <p className="text-xs text-danger mt-2 flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                Early intervention critical
                            </p>
                        </div>
                        <div className="p-3 bg-danger/20 rounded-lg">
                            <Shield className="w-6 h-6 text-danger" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-danger/20">
                        <p className="text-xs text-gray-600">AI-flagged cases</p>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Lives Saved (est.)</p>
                            <p className="text-4xl font-bold text-gray-900">{analytics.livesSaved}</p>
                            <p className="text-xs text-success mt-2 flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                Through early detection
                            </p>
                        </div>
                        <div className="p-3 bg-success/20 rounded-lg">
                            <Heart className="w-6 h-6 text-success" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-success/20">
                        <p className="text-xs text-gray-600">Maternal & infant mortality reduction</p>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Data Completeness</p>
                            <p className="text-4xl font-bold text-gray-900">{analytics.dataCompleteness}%</p>
                            <p className="text-xs text-purple-700 mt-2 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Excellent quality
                            </p>
                        </div>
                        <div className="p-3 bg-purple-300 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-purple-700" />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-purple-300">
                        <p className="text-xs text-gray-600">Complete health records</p>
                    </div>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Risk Distribution Pie Chart */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Risk Distribution</h3>
                        <p className="text-sm text-gray-600">Patient categorization by risk level</p>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={riskDistributionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {riskDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        {riskDistributionData.map((item) => (
                            <div key={item.name} className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                                </div>
                                <p className="text-xs text-gray-600">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Monthly Trend Line Chart */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Monthly Registration Trend</h3>
                        <p className="text-sm text-gray-600">New pregnancies registered over time</p>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={analytics.monthlyTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis
                                dataKey="month"
                                stroke="#6B7280"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#6B7280"
                                style={{ fontSize: '12px' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#2563EB"
                                strokeWidth={3}
                                dot={{ fill: '#2563EB', r: 5 }}
                                activeDot={{ r: 7 }}
                                name="Pregnancies"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-success font-medium">+18% growth</span>
                        <span className="text-gray-600">compared to previous period</span>
                    </div>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid gap-6">
                {/* Top Risk Factors Bar Chart */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Top Risk Factors</h3>
                        <p className="text-sm text-gray-600">Most common health concerns identified</p>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analytics.topRiskFactors} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis type="number" stroke="#6B7280" style={{ fontSize: '12px' }} />
                            <YAxis
                                type="category"
                                dataKey="name"
                                stroke="#6B7280"
                                style={{ fontSize: '12px' }}
                                width={120}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Bar
                                dataKey="count"
                                fill="#2563EB"
                                radius={[0, 8, 8, 0]}
                                name="Cases"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Impact Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">89%</h3>
                    <p className="text-sm text-gray-600 mb-1">Early Detection Rate</p>
                    <p className="text-xs text-gray-500">High-risk cases identified before complications</p>
                </Card>

                <Card className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">5.2</h3>
                    <p className="text-sm text-gray-600 mb-1">Avg. Visits per Patient</p>
                    <p className="text-xs text-gray-500">Combined ASHA + doctor consultations</p>
                </Card>

                <Card className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
                    <p className="text-sm text-gray-600 mb-1">Vaccination Coverage</p>
                    <p className="text-xs text-gray-500">Complete immunization schedule adherence</p>
                </Card>
            </div>

            {/* Geographic Distribution */}
            <Card className="p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Geographic Distribution</h3>
                    <p className="text-sm text-gray-600">Patient distribution across villages</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { village: 'Kheda', patients: 342, risk: 'normal' },
                        { village: 'Raipur', patients: 298, risk: 'high' },
                        { village: 'Bhopal', patients: 256, risk: 'normal' },
                        { village: 'Indore', patients: 189, risk: 'moderate' },
                        { village: 'Dewas', patients: 162, risk: 'normal' },
                    ].map((area) => (
                        <div
                            key={area.village}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div>
                                <p className="font-semibold text-gray-900">{area.village}</p>
                                <p className="text-sm text-gray-600">{area.patients} patients</p>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${area.risk === 'high' ? 'bg-danger' :
                                    area.risk === 'moderate' ? 'bg-warning' :
                                        'bg-success'
                                }`}></div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Key Insights */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Key Insights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">✅ Strengths</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• High data completeness (94%) enables informed decisions</li>
                            <li>• Strong ASHA-doctor integration improving outcomes</li>
                            <li>• Excellent vaccination coverage (98%)</li>
                            <li>• AI-powered early detection preventing complications</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">⚠️ Areas for Focus</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Hypertension is the leading risk factor (45 cases)</li>
                            <li>• Raipur village has higher high-risk concentration</li>
                            <li>• 89 high-risk cases need close monitoring</li>
                            <li>• Anemia cases (32) require nutritional intervention</li>
                        </ul>
                    </div>
                </div>
            </Card>

            {/* System Performance */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance Indicators</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-700">IoT Device Integration</span>
                            <span className="font-semibold text-gray-900">96%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-700">AI Model Accuracy</span>
                            <span className="font-semibold text-gray-900">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-700">Patient OTP Access Rate</span>
                            <span className="font-semibold text-gray-900">88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-700">Data Sync Success</span>
                            <span className="font-semibold text-gray-900">99%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-success h-2 rounded-full" style={{ width: '99%' }}></div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}