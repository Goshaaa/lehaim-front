import { PDFViewer } from '@react-pdf/renderer';
import PatientReport from './ReportTemplate';
import { useState, useEffect } from 'react';
import RadarChart from '../chart/RadarChart';
import { AnalyzeDetailedInfo, ChartType } from '../../types/CommonTypes';

function PdfReportDemoPage() {
    const [analyzeResult, setAnalyzeResult] = useState<AnalyzeDetailedInfo[]>([]);
    const [chartDataUrl, setchartDataUrl] = useState<string | null>(null);


    const chartDataUrlHandler = (dataUrl: string) => {
        setchartDataUrl(dataUrl);
    }

    return (
        <>
            <div>
                <PDFViewer width={800} height={800}>
                    <PatientReport chartDataUrl={chartDataUrl} />
                </PDFViewer>
            </div>
            <div style={{ visibility: 'hidden' }}>
                <RadarChart
                    chartType={ChartType.Regeneration_Type}
                    data={analyzeResult}
                    dataUrlHandler={chartDataUrlHandler} />
            </div>

            {/* {chartDataUrl
                ?
                <div>
                    <PDFViewer width={800} height={600}>
                        <PatientReport chartDataUrl={chartDataUrl} />
                    </PDFViewer>
                </div>
                :
                // <div style={{ visibility: 'hidden'}}>
                <RadarChart
                    chartType={ChartType.Regeneration_Type}
                    data={analyzeResult}
                    dataUrlHandler={chartDataUrlHandler} />
                // </div>
            } */}


        </>
    )
}

export default PdfReportDemoPage;