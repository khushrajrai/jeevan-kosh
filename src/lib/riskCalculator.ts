interface Vitals {
    bloodPressure: { systolic: number; diastolic: number }
    spO2: number
    temperature: number
}

export function calculateRisk(vitals: Vitals): {
    level: 'normal' | 'moderate' | 'high'
    recommendation: string
} {
    const { bloodPressure, spO2, temperature } = vitals

    // High risk conditions
    if (bloodPressure.systolic >= 140 || bloodPressure.diastolic >= 90) {
        return {
            level: 'high',
            recommendation: 'Urgent: Possible pre-eclampsia. Immediate doctor consultation required.'
        }
    }

    if (spO2 < 92) {
        return {
            level: 'high',
            recommendation: 'Critical: Low oxygen saturation. Immediate medical attention needed.'
        }
    }

    if (temperature >= 100.4) {
        return {
            level: 'high',
            recommendation: 'Fever detected. Risk of infection. Doctor consultation needed.'
        }
    }

    // Moderate risk conditions
    if (bloodPressure.systolic >= 130 || bloodPressure.diastolic >= 85) {
        return {
            level: 'moderate',
            recommendation: 'Borderline high BP. Monitor closely. Follow-up in 1 week.'
        }
    }

    if (spO2 < 95) {
        return {
            level: 'moderate',
            recommendation: 'Slightly low oxygen. Monitor and ensure adequate rest.'
        }
    }

    // Normal
    return {
        level: 'normal',
        recommendation: 'All vitals within normal range. Continue regular monitoring. Next check-up in 2 weeks.'
    }
}