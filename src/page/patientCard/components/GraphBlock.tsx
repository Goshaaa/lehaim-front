import { useState, useEffect } from 'react';
import * as oncoTestService from '../../../services/OncoTestSerive';
import { AnalyzeDetailedInfo, ChartType } from '../../../types/CommonTypes';
import RadarChat from '../../chart/RadarChart';


interface Props {
    selectedAnayzeId?: string;
}

function GraphBlock({ selectedAnayzeId }: Props) {
    const [analyzeResult, setAnalyzeResult] = useState<AnalyzeDetailedInfo[]>([]);
    const [error, setError] = useState("");

    const loadAllOncoTestParams = async () => {
        setError("");
        if (selectedAnayzeId) {
            try {
                const data = await oncoTestService.getAllOncoTestParams(Number(selectedAnayzeId));
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

    useEffect(() => {
        loadAllOncoTestParams();
    }, [selectedAnayzeId])

    return (
        <div className="container-lg border border-secondary rounded-3 text-secondary p-3 mb-3 clearfix">
            <h3 className="text-center m-3">Графики</h3>
            {analyzeResult.length === 0
                ? <h5 className="text-center m-3">Не выбрано обследование, по которому построить графики</h5>
                : <div>
                    <div className='container'>
                        <RadarChat
                            chartType={ChartType.Regeneration_Type}
                            data={analyzeResult}
                        />
                    </div>
                    <div className='container'>
                        <RadarChat
                            chartType={ChartType.B_Type}
                            data={analyzeResult}
                        />
                    </div>
                    <div className='container'>
                        <RadarChat
                            chartType={ChartType.T_Type}
                            data={analyzeResult}
                        />
                    </div>
                    <div className='container'>
                        <RadarChat
                            chartType={ChartType.Cytokine_Type}
                            data={analyzeResult}
                        />
                    </div>

                </div>
            }
        </div>
    );
}

export default GraphBlock;