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


    // useEffect(() => {
    //     console.log("IGFEw222");
    //     if (chartRef.current) {
    //         const ins = chartRef.current.getEchartsInstance();
    //         if (dataUrlHandler) {
    //             dataUrlHandler(ins.getDataURL());
    //         }
    //         // console.log(ins.getDataURL());
    //     }
    // }, [chartRef]);

    const updateChartRef = (chartRef: EChartsInstance | null) => {
        // const ins = chartRef?.getEchartsInstance();
        // console.log("updateChartRef " + ins?.getDataURL());
        // console.log("in updateChartRef");
        // if (dataUrlHandler) {
        //     console.log("in updateChartRef 2" );
        //     dataUrlHandler(ins?.getDataURL());
        // }

        // CurrentCharts[chartType] = e?.getEchartsInstance();
        // console.log(CurrentCharts[chartType])
    }

    const chartReady = (instance: EChartsInstance) => {
        console.log("Chart Ready " + chartType);
        // const dataUrl = instance?.getDataURL();
        // if (dataUrl && dataUrlHandler) {
        //     dataUrlHandler(chartType, dataUrl);
        // }
        // console.log("chartReady " + instance.getDataURL());
        // console.log("chartReady");
        // const ins = chartRef?.current?.getEchartsInstance();
        // const svgDataUrl = instance.getEchartsInstance().getDataURL();
        // console.log("chartReady " + svgDataUrl);


        // const dataUrl = chartRef.current?.getEchartsInstance().getDataURL();
        // if (svgDataUrl && dataUrlHandler) {
        //     dataUrlHandler(svgDataUrl);
        // }
        //console.log(chartRef.current?.getEchartsInstance().getDataURL());
    }

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
                        onChartReady={(ins) => chartReady(ins)}
                        // ref={(e) => { updateChartRef(e) }}
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