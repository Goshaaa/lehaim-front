import { PDFViewer } from '@react-pdf/renderer';
import PatientReport from './ReportTemplate';
import { useState, useEffect } from 'react';
import RadarChart from '../chart/RadarChart';
import { AnalyzeDetailedInfo, ChartType, ChartsDataUrl, PatientPdfReportData, CatalogItem } from '../../types/CommonTypes';
import * as reportService from '../../services/ReportService';
import * as oncoTestService from '../../services/OncoTestSerive';
import { ReportDTO } from '../../services/ReportService';

function PdfReportDemoPage() {
    const [analyzeResult, setAnalyzeResult] = useState<AnalyzeDetailedInfo[]>([]);
    const [chartData, setChartData] = useState<ChartsDataUrl | null>(null);
    const [pdfReportData, setPdfReportData] = useState<PatientPdfReportData | null>(null)

    const [reportData, setReportData] = useState<ReportDTO | null>(null);
    const [catalogData, setCatalogData] = useState<CatalogItem[] | null>(null);

    useEffect(() => {
        console.log("PdfReportDemoPage chartData changed");
        setPdfReportData(prevData => ({ ...prevData, ['chartData']: chartData }));
        setPdfReportData(prevData => ({ ...prevData, ['firstName']: "Igor" }));
        // setPdfReportData(prevData => ({ ...prevData, ['lastName']: chartData?.regenerationChartData ?? "none" }));
    }, [chartData]);

    useEffect(() => {
        loadReportData();
    }, []);

    const loadReportData = async () => {
        const patientId = '64991c88-39e8-4328-8126-6b6c07db844e';
        const testId = 32
        const reportData = await reportService.loadPatientReport(patientId, testId);
        const catalogData = await oncoTestService.loadOncoTestCatalog();
        setReportData(reportData);
        console.log(JSON.stringify(catalogData));
    }

    const chartDataUrlHandler = (chartType: ChartType, dataUrl: string) => {
        console.log("Invoke chartDataUrlHandler method for " + chartType + " dataUrl.length = " + dataUrl?.length);
        if (dataUrl) {
            if (chartType === ChartType.Regeneration_Type) {
                setChartData(prevData => ({ ...prevData, ['regenerationChartData']: dataUrl }))
            } else if (chartType === ChartType.B_Type) {
                setChartData(prevData => ({ ...prevData, ['bTypeData']: dataUrl }))
            } else if (chartType === ChartType.T_Type) {
                setChartData(prevData => ({ ...prevData, ['tTypeData']: dataUrl }))
            } else if (chartType === ChartType.Cytokine_Type) {
                setChartData(prevData => ({ ...prevData, ['cytokineTypeData']: dataUrl }))
            }
        }
    }



    return (
        <>
            <div>
                {reportData
                    ? <PDFViewer width={800} height={800}>
                        <PatientReport reportData={reportData} />
                    </PDFViewer>
                    : null
                }

            </div>
            <div style={{ visibility: 'hidden' }}>
                <RadarChart
                    chartType={ChartType.Regeneration_Type}
                    data={analyzeResult}
                    dataUrlHandler={chartDataUrlHandler}
                    printMode={true} />
                <RadarChart
                    chartType={ChartType.B_Type}
                    data={analyzeResult}
                    dataUrlHandler={chartDataUrlHandler}
                    printMode={true} />
                <RadarChart
                    chartType={ChartType.T_Type}
                    data={analyzeResult}
                    dataUrlHandler={chartDataUrlHandler}
                    printMode={true} />
                <RadarChart
                    chartType={ChartType.Cytokine_Type}
                    data={analyzeResult}
                    dataUrlHandler={chartDataUrlHandler}
                    printMode={true} />
            </div>
        </>
    )
}

export default PdfReportDemoPage;