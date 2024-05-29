import { useState, useEffect, useRef } from 'react';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';

import { AnalyzeDetailedInfo, ChartType } from "../../types/CommonTypes";
import getOptions from './ChartUtil'


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
        setOptions(getOptions(data, chartType, printMode));
    }, [data, chartType]);


    useEffect(() => {
        const dataUrl = chartRef?.current?.getEchartsInstance()?.getDataURL();
        if (dataUrlHandler) {
            dataUrlHandler(chartType, dataUrl);   
        }
    }, [options]);

    return (
        <>
            {options
                ?
                <div>
                    <h4 className='text-center'>{options.title.text}</h4>
                    <ReactECharts
                        option={options}
                        notMerge={true}
                        lazyUpdate={true}
                        // style={{ height: '500px', width: '500px' }}
                        style={printMode ? { height: '700px', width: '700px' } : { height: '700px', width: '100%' }}
                        ref={chartRef}
                        // onEvents={
                        //     {
                        //         'finished': onFinishedCallback,
                        //         'rendered': onRenderedCallback
                        //     }
                        // }
                    />
                </div>

                : null
            }
        </>

    )
}

export default RadarChat;