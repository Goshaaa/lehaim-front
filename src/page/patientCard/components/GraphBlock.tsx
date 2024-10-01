import { useState, useEffect } from 'react';
import * as oncoTestService from '../../../services/OncoTestSerive';
import { AnalyzeDetailedInfo, ChartType, RecommendationData, ChartPage } from '../../../types/CommonTypes';
import RadarChart from '../../chart/RadarChart';
import RecommendationsBlock from '../../recommendations/Recommendations';
import * as recommendationsServise from '../../../services/RecommendationService';


interface Props {
    selectedAnalyzeId?: string;
}

function GraphBlock({ selectedAnalyzeId }: Props) {
    const [analyzeResult, setAnalyzeResult] = useState<AnalyzeDetailedInfo[]>([]);
    const [recommendationData, setRecommendationData] = useState<RecommendationData | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadAllDataGraph = async () => {
            setError("");
            setLoading(true);
            if (selectedAnalyzeId) {
                try {
                    const data = await oncoTestService.getAllOncoTestParams(Number(selectedAnalyzeId));
                    setAnalyzeResult(data);

                    const recommendation: RecommendationData = await recommendationsServise.getRecommendationById(Number(selectedAnalyzeId));
                    setRecommendationData(recommendation);

                } catch (err) {
                    if (err instanceof Error) {
                        setError("Ошибка: " + err.message);
                    } else {
                        setError("Ошибка загрузки: " + err);
                    }
                }
                setLoading(false);
            } else {
                setAnalyzeResult([]);
            }
        }
        loadAllDataGraph();
    }, [selectedAnalyzeId])

    return (
        <div className="container-lg border border-secondary rounded-3 text-secondary p-3 mb-3 clearfix">
            <h3 className="text-center m-3">Графики</h3>
            {analyzeResult.length === 0
                ? <h5 className="text-center m-3">Не выбрано обследование, по которому построить графики</h5>
                : loading ?
                    <div className='container'>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    </div> :
                    <div>
                        <div className='container'>
                            <RadarChart
                                chartType={ChartType.Regeneration_Type}
                                data={analyzeResult}
                                chartPage={ChartPage.Common}
                            />
                            <RecommendationsBlock
                                selectedAnalyzeId={selectedAnalyzeId}
                                recommendations={recommendationData?.REGENERATION}
                            />
                        </div>
                        <div className='container'>
                            <RadarChart
                                chartType={ChartType.Inflammation_Type}
                                data={analyzeResult}
                                chartPage={ChartPage.Common}
                            />
                            <RecommendationsBlock
                                selectedAnalyzeId={selectedAnalyzeId}
                                recommendations={recommendationData?.SYSTEMIC_INFLAMMATION}
                            />
                        </div>
                        <div className='container'>
                            <RadarChart
                                chartType={ChartType.B_Type}
                                data={analyzeResult}
                                chartPage={ChartPage.Common}
                            />
                            <RecommendationsBlock
                                selectedAnalyzeId={selectedAnalyzeId}
                                recommendations={recommendationData?.B_CELL}
                            />
                        </div>
                        <div className='container'>
                            <RadarChart
                                chartType={ChartType.T_Type}
                                data={analyzeResult}
                                chartPage={ChartPage.Common}
                            />
                            <RecommendationsBlock
                                selectedAnalyzeId={selectedAnalyzeId}
                                recommendations={recommendationData?.T_CELL}
                            />
                        </div>
                        <div className='container'>
                            <RadarChart
                                chartType={ChartType.Cytokine_Type}
                                data={analyzeResult}
                                chartPage={ChartPage.Common}
                            />
                            <RecommendationsBlock
                                selectedAnalyzeId={selectedAnalyzeId}
                                recommendations={recommendationData?.CYTOKINE_PAIRS}
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