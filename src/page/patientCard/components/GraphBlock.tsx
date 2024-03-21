import { useState, useEffect } from 'react';
import { ApiHost } from '../../../config';
import { AnalyzeDetailedInfo, ChartType } from '../../../types/CommonTypes';
import RadarChat from '../../chart/RadarChart';


interface Props {
    selectedAnayzeId?: string;
}

function GraphBlock({ selectedAnayzeId }: Props) {
    const [analyzeResult, setAnalyzeResult] = useState<AnalyzeDetailedInfo[]>([]);
    // const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedAnayzeId) {
            fetch(ApiHost + '/results/' + selectedAnayzeId + "/all", {
                method: "GET"
            })
                .then(resp => resp.json())
                .then(data => {
                    setAnalyzeResult(data);
                },
                    (error) => {
                        // setError(error.message);
                    })
        }
    }, [selectedAnayzeId])

    return (
        <div className="container-lg border border-secondary rounded-3 text-secondary p-3 mb-3 clearfix">
            <h3 className="text-center m-3">Графики</h3>
            {analyzeResult.length === 0
                ? <h5 className="text-center m-3">Не выбраны результаты анализов, по которым построить графики</h5>
                : <div>
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