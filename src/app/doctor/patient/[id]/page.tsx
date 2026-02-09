interface PatientRecordProps {
    params: Promise<{ id: string }>
}

export default function PatientRecordView({ params }: PatientRecordProps) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('timeline')
    const [showDiagnosisModal, setShowDiagnosisModal] = useState(false)
    const [diagnosis, setDiagnosis] = useState('')
    const [prescription, setPrescription] = useState('')
    const [patientId, setPatientId] = useState<string>('')

    useEffect(() => {
        params.then(p => setPatientId(p.id))
    }, [params])

// ... rest of component