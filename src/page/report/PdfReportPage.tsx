import { PDFViewer } from '@react-pdf/renderer';
import PatientReport from './PdfReportTemplate';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import RadarChart from '../chart/RadarChart';
import { ChartType, ChartsDataUrl, } from '../../types/CommonTypes';
import * as reportService from '../../services/ReportService';
import * as diagnosisService from '../../services/DiagnosisService';
import { ReportDTO } from '../../services/ReportService';
import { DiagnosisDTO } from '../../services/DiagnosisService';


function PdfReportDemoPage() {
    const [chartData, setChartData] = useState<ChartsDataUrl | null>(null);
    const [reportData, setReportData] = useState<ReportDTO | null>(null);
    const [diagnosisCatalog, setDiagnosisCatalog] = useState<DiagnosisDTO[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { patientId, testId } = useParams();

    useEffect(() => {
        const loadReportData = async () => {
            setLoading(true);
            try {
                const reportData = await reportService.loadPatientReport(patientId!!, Number(testId));
                setReportData(reportData);
                const diagnosis = await diagnosisService.loadAllDiagnosis();
                setDiagnosisCatalog(diagnosis);
            } catch (err) {
                if (err instanceof Error) {
                    setError("Ошибка: " + err.message);
                } else {
                    setError("Ошибка загрузки: " + err);
                }
            }
            setLoading(false);
        }
        loadReportData();
    }, [patientId, testId]);


    const chartDataUrlHandler = (chartType: ChartType, chartDataUrl: string) => {
        if (chartDataUrl) {
            if (chartType === ChartType.Regeneration_Type) {
                setChartData(prevData => ({ ...prevData, ['regenerationChartData']: chartDataUrl }))
            } else if (chartType === ChartType.B_Type) {
                setChartData(prevData => ({ ...prevData, ['bTypeData']: chartDataUrl }))
            } else if (chartType === ChartType.T_Type) {
                setChartData(prevData => ({ ...prevData, ['tTypeData']: chartDataUrl }))
            } else if (chartType === ChartType.Cytokine_Type) {
                setChartData(prevData => ({ ...prevData, ['cytokineTypeData']: chartDataUrl }))
            }
        }
    }

    return (
        <>
            {loading &&
                <div className='container'>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                </div>
            }
            {error &&
                <div className="container">
                    <h3>{error}</h3>
                </div>
            }
            {reportData && (
                <div>
                    <div>
                        <PDFViewer width={'100%'} height={window.innerHeight - 7}>
                            <PatientReport reportData={reportData} chartData={chartData} diagnosisCatalog={diagnosisCatalog} />
                        </PDFViewer>
                    </div>
                    <div style={{ "display": "none" }}>
                        <RadarChart
                            chartType={ChartType.Regeneration_Type}
                            data={reportData.currentResults}
                            dataUrlHandler={chartDataUrlHandler}
                            printMode={true} />
                        <RadarChart
                            chartType={ChartType.B_Type}
                            data={reportData.currentResults}
                            dataUrlHandler={chartDataUrlHandler}
                            printMode={true} />
                        <RadarChart
                            chartType={ChartType.T_Type}
                            data={reportData.currentResults}
                            dataUrlHandler={chartDataUrlHandler}
                            printMode={true} />
                        <RadarChart
                            chartType={ChartType.Cytokine_Type}
                            data={reportData.currentResults}
                            dataUrlHandler={chartDataUrlHandler}
                            printMode={true} />
                    </div>
                </div>
            )
            }
        </>
    )
}

export default PdfReportDemoPage;