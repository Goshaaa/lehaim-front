import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

import { AnalyzeDetailedInfo, ChartType } from "../../types/CommonTypes";
import getOptions from './ChartUtil'


interface Props {
    chartType: ChartType;
    data: AnalyzeDetailedInfo[]
}

function RadarChat({ chartType, data }: Props) {
    const [options, setOptions] = useState<any>(null);

    useEffect(() => {
        setOptions(getOptions(data, chartType))
    }, [data, chartType]);

    return (
        <>
            {options
                ?
                <ReactECharts
                    option={options}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    style={{ height: '800px', width: '100%' }}
                />
                : null
            }
        </>

    )
}

export default RadarChat;