import { useState, useEffect, useRef } from 'react';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';

import { AnalyzeDetailedInfo, ChartType } from "../../types/CommonTypes";
import getOptions, { isGraphFilled } from './ChartUtil'


interface Props {
    chartType: ChartType;
    data: AnalyzeDetailedInfo[],
    dataUrlHandler?: Function,
    printMode?: boolean
}

function RadarChat({ chartType, data, dataUrlHandler, printMode = false }: Props) {
    const [options, setOptions] = useState<any>(null);
    const chartRef = useRef<ReactECharts>(null);


    useEffect(() => {
        const opt = getOptions(data, chartType, printMode)
        if (isGraphFilled(opt)) {
            setOptions(opt);
        } else {
            setOptions("");
        }
    }, [data, chartType]);


    useEffect(() => {
        const dataUrl = chartRef?.current?.getEchartsInstance()?.getConnectedDataURL({ type: "png" });
        if (dataUrlHandler) {
            setTimeout(() => {
                dataUrlHandler(chartType, dataUrl);
            }, 1000);
        }
    }, [options]);


    return (
        <>
            {options
                ?
                <div>
                    <h4 className='text-center m-3'>{options.title.text}</h4>
                    <ReactECharts
                        option={options}
                        notMerge={true}
                        lazyUpdate={false}
                        style={printMode ? { height: '700px', width: '700px' } : { height: '500px', width: '100%' }}
                        ref={chartRef}
                    />
                </div>

                : null
            }
        </>

    )
}

export default RadarChat;