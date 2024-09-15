import { useState, useEffect } from 'react';
import * as oncoTestService from '../../../services/OncoTestSerive';
import { AnalyzeDetailedInfo, ChartType, ChartType2 } from '../../../types/CommonTypes';
import RadarChart from '../../chart/RadarChart';
import RecommendationsBlock from '../../recommendations/Recommendations';


interface Props {
    selectedAnalyzeId?: string;
}

function GraphBlock({ selectedAnalyzeId }: Props) {
    const [analyzeResult, setAnalyzeResult] = useState<AnalyzeDetailedInfo[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAllOncoTestParams = async () => {
            setError("");
            if (selectedAnalyzeId) {
                try {
                    const data = await oncoTestService.getAllOncoTestParams(Number(selectedAnalyzeId));
                    setAnalyzeResult(data);
                } catch (err) {
                    if (err instanceof Error) {
                        setError("Ошибка: " + err.message);
                    } else {
                        setError("Ошибка загрузки: " + err);
                    }
                }
            } else {
                setAnalyzeResult([]);
            }
        }
        loadAllOncoTestParams();
    }, [selectedAnalyzeId])

    return (
        <div className="container-lg border border-secondary rounded-3 text-secondary p-3 mb-3 clearfix">
            <h3 className="text-center m-3">Графики</h3>
            {analyzeResult.length === 0
                ? <h5 className="text-center m-3">Не выбрано обследование, по которому построить графики</h5>
                : <div>
                    <div className='container'>
                        <RadarChart
                            chartType={ChartType.Regeneration_Type}
                            data={analyzeResult}
                        />
                    </div>
                    <div className='container'>
                        <RecommendationsBlock
                            selectedAnalyzeId={selectedAnalyzeId}
                            chartType={ChartType2.Regeneration_Type}
                        />
                    </div>
                    <div className='container'>
                        <RadarChart
                            chartType={ChartType.Inflammation_Type}
                            data={analyzeResult}
                        />
                        {/* <div className='container'>
                            <RecommendationsBlock
                                selectedAnalyzeId={selectedAnalyzeId}
                                chartType={ChartType2.Inflammation_Type}
                            />
                        </div> */}
                    </div>
                    <div className='container'>
                        <RadarChart
                            chartType={ChartType.B_Type}
                            data={analyzeResult}
                        />
                    </div>
                    {/* <div className='container'>
                        <RecommendationsBlock 
                            selectedAnalyzeId={selectedAnalyzeId}
                            chartType={ChartType2.B_Type}
                        />
                    </div> */}
                    <div className='container'>
                        <RadarChart
                            chartType={ChartType.T_Type}
                            data={analyzeResult}
                        />
                    </div>
                    {/* <div className='container'>
                        <RecommendationsBlock 
                            selectedAnalyzeId={selectedAnalyzeId}
                            chartType={ChartType2.T_Type}
                        />
                    </div> */}
                    <div className='container'>
                        <RadarChart
                            chartType={ChartType.Cytokine_Type}
                            data={analyzeResult}
                        />
                    </div>
                    <div className='container'>
                        <RecommendationsBlock
                            selectedAnalyzeId={selectedAnalyzeId}
                            chartType={ChartType2.Cytokine_Type}
                        />
                    </div>

                </div>
            }
            {error &&
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            }
        </div>
    );
}

export default GraphBlock;