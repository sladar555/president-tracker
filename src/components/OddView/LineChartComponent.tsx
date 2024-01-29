import React, { useEffect, useState, useRef } from "react";
import { createChart, ColorType, CrosshairMode, PriceScaleMode } from 'lightweight-charts';

import { dataRanges, dataRangeTexts } from "../../constants";
import Spinner from "../common/Spinner";
import Axios from "axios";
import { timeRange } from "../../constants";

let colorLists = [
    "#CC5BF4",
    "#FEB85B",
    "#7152F3",
    "#00FFFF",
    "#7FFF00",
    "#6495ED",
    "#00FFFF",
    "#006400",
    "#556B2F",
    "#8B0000"
];

const Chart = ({data, currentRangeIndex}: any) => {
    const backgroundColor = "transparent";
	const lineColor = 		"#FFFFFF";
    const textColor = 		"#FFFFFF";
	const areaTopColor = 	"transparent";
	const areaBottomColor = "transparent";
	const gridColor = 		"transparent";

	const chartContainerRef = useRef<HTMLDivElement>(null);

	let gridHeight = 500;

	const getHeightFromWidth = (width: any) => {
		if (width > 700)
			return 500;
		if (width > 500)
			return 350;
		return 250;
	};

    // @ts-ignore
    let timeTickerFormatter = (time, tickMarkType, locale) => {
        const date = new Date(time * 1000);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();

        switch (currentRangeIndex) {
            case 0:
                return `${hour}:${minute}`;
            case 1:
                // if (hour == 0) {
                //     return day;
                // } else {
                    return `${hour}:00`;
                // }
        }
    }

	useEffect(
		() => {
			if (chartContainerRef.current != null) {
				gridHeight = getHeightFromWidth(window.innerWidth);

                let isTimeVisiable = true;
                if (currentRangeIndex > 1) {
                    isTimeVisiable = false;
                }
				const chart = createChart(chartContainerRef.current, {
					layout: {
						background: { type: ColorType.Solid, color: 'transparent' },
						textColor,
						fontSize: 12,
						fontFamily: 'Inter',
					},
					grid: {
						vertLines: { color: gridColor },
						horzLines: { color: gridColor },
					},
					rightPriceScale: {
						visible: false,
						mode: PriceScaleMode.Logarithmic
					},
					leftPriceScale: {
						visible: true,
						alignLabels: false,
						borderVisible: false,
						ticksVisible: false,
						autoScale: false,
                        entireTextOnly: false,
                        invertScale: false
					},
					crosshair: {
						horzLine: {
							visible: false,
							labelVisible: false,
						},
						vertLine: {
							visible: false,
							style: 0,
							width: 2,
							color: 'rgba(32, 38, 46, 0.1)',
							labelVisible: false,
						},
						mode: CrosshairMode.Normal
					},
					handleScale: {
						mouseWheel: false,
                        pinch: false,
						axisPressedMouseMove: false,
						axisDoubleClickReset: false,
					},
                    handleScroll: {
                        mouseWheel: false,
                        pressedMouseMove: false,
                        horzTouchDrag: false,
                        vertTouchDrag: false
                    },
                    overlayPriceScales: {

                    },
                    kineticScroll: {

                    },
                    trackingMode: {

                    },
                    localization: {

                    },
                    watermark: {

                    },
					timeScale: {
						timeVisible: isTimeVisiable,
						secondsVisible: false,
						borderVisible: false,
						ticksVisible: false,
                        // @ts-ignore
                        tickMarkFormatter: (currentRangeIndex == 1)? timeTickerFormatter: undefined
					},
					width: chartContainerRef.current.clientWidth,
					height: gridHeight,
					autoSize: false,
				});
				
                let series = [];
                for (let i = 0; i < data.length; i++) {
                    if (!data[i].active) {
                        continue;
                    }

                    const serie = chart.addAreaSeries({ 
                        priceScaleId: 'left', 
                        lastValueVisible: false,
                        lastPriceAnimation: 0,
                        crosshairMarkerVisible: false,
                        baseLineVisible: false,
                        priceLineColor: "transparent",
                        lineColor: data[i].color, 
                        topColor: areaTopColor, 
                        bottomColor: areaBottomColor,
                    });
    
                    serie.setData(data[i].series);
                    series.push(serie);
                }

				const handleResize = () => {
                    if (chartContainerRef.current) {

						let width = chartContainerRef.current.clientWidth;

						gridHeight = getHeightFromWidth(window.innerWidth);
			
						chart.autoSizeActive();
						chart.applyOptions({ width, height: gridHeight });
						chart.timeScale().fitContent();
                    }
				};

				window.addEventListener('resize', handleResize);

				chart.timeScale().fitContent();

				return () => {
					window.removeEventListener('resize', handleResize);

					chart.remove();
				};
			}
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor, gridColor]
	);

    return (
        <div ref={chartContainerRef} className="w-full h-full rounded-xl">
		</div>
    );
}

const Menu = ({data, handler}: any) => {

    const Item = ({info, active, color, handler}: any) => {
        return (
            <div className={(active)? "opacity-100 hover:opacity-50 w-full text-[14px] font-medium leading-5 text-[#F7FBFA] flex flex-row items-center": "opacity-50 hover:opacity-100 w-full text-[14px] leading-5 text-[#F7FBFA] flex flex-row items-center"} style={{ fontFamily: "Poppins", cursor: "pointer" }} onClick={() => handler(info.name)}>
                <div className="rounded-full w-[10px] h-[10px] mr-4" style={{ backgroundColor: color }}></div>
                <span>{info.name}</span>
            </div>
        );
    }
    return (
        <div className="w-full flex flex-col font-medium" style={{ fontFamily: "Poppins" }}>
            <div className="w-full space-y-2 mb-2">
                {
                    data.map((item: any, index: number) => {
                        if (index * 2 < data.length)
                            return <Item key={index} info={item} active={data[index].active} color={data[index].color} handler={handler} />
                    })
                }
            </div>
            <div className="w-full space-y-2">
                {
                    data.map((item: any, index: number) => {
                        if (index * 2 >= data.length)
                            return <Item key={index} info={item} active={data[index].active} color={data[index].color} handler={handler} />
                    })
                }
            </div>
        </div>
    );
}

const BtnRange = ({info, active, setRange}: any) => {
    return (
        <a href="#" aria-label={dataRanges[1] + "electionTracker"} onClick={setRange} className={(active) ? "text-[#23262F] bg-[#E6E8EC] rounded-2xl p-1 text-[14px] leading-4 font-bold": "hover:text-[#FFFFFF] text-[#777E90] bg-transparent p-1 text-[14px] leading-4 font-bold"} style={{ fontFamily: "DM Sans" }}>
            {info}
        </a>
    );
}

// let isLoad = false;
// let isUpdate = false;

const LineChartComponent = ({ initData, setCandidates, setProgressUpdate }: any) => {
    const [data, setData] = useState(initData);
    const [updatedtime, setUpdatedtime] = useState(new Date().getTime());
    const [currentRangeIndex, setCurrentRangeIndex] = useState(2);
    const [isFetching, setIsFetching] = useState(false);
    const [remainedUpdateTime, setRemainedUpdateTime] = useState(timeRange - Math.floor((new Date().getTime() - new Date(updatedtime).getTime()) / 1000) - 20);

    const queryData = async (currentRangeIndex: any) => {
        console.log("queryData", currentRangeIndex, dataRanges[currentRangeIndex]);
    
        try {
            setIsFetching(true);
            let res = await Axios.get(`${import.meta.env.VITE_SERVER_URL}/api/election/getTopCandidates`);
            if (!res.data.candidates) {
                setIsFetching(false);
                return;
            }
    
            let candidates = res.data.candidates;
            let nicknames: any = [];
            for (let i = 0; i < candidates.length; i++) {
                nicknames.push(candidates[i].nickname);
            }
            nicknames = nicknames.join("@");
    
            let result = await Axios.get(`${import.meta.env.VITE_SERVER_URL}/api/election/getInitDataSeries?nicknames=${nicknames}&range=${dataRanges[currentRangeIndex]}`);
            let dataSeries = result.data.dataSeries;
    
            console.log("updatedTime", result.data.updatedTime);
            setUpdatedtime(result.data.updatedTime);
    
            let data = [];
            for (let i = 0; i < candidates.length; i++) {
                data.push({
                    name: candidates[i].name,
                    nickname: candidates[i].nickname,
                    avatar: candidates[i].avatar,
                    probability: candidates[i].probability,
                    color: colorLists[i],
                    active: false,
                    series: (dataSeries[i]) ? dataSeries[i].data: []
                });
            }
    
            data[0].active = true;
    
            if (data.length > 3) {
                data[1].active = true;
                data[2].active = true;
            }
    
            setIsFetching(false);
            setCandidates(data);
        } catch (error) {
            console.log("queryData", error);
            setIsFetching(false);
        }
        // isLoad = true;
    }

    const setSerie = (name: any) => {
        let newData = [];
        let activeNum = 0;

        for (let i = 0; i < data.length; i++) {
            if (data[i].active) {
                activeNum++;
            }
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i].name == name) {
                let newItem = {...data[i]};

                if (activeNum == 1 && data[i].active == true) {
                    newData.push({...data[i]});
                } else {
                    newItem.active = !newItem.active;
                    newData.push(newItem);    
                }
            } else {
                newData.push({...data[i]});
            }
        }

        setData(newData);
    }

    const setRange = (e: any) => {
        for (let i = 0; i < dataRangeTexts.length; i++) {
            if (dataRangeTexts[i] == e.target.text) {
                console.log("setRange", e.target.text);
                setCurrentRangeIndex(i);
                queryData(i);
                break;
            }
        }
    }

    useEffect(() => {
        setRemainedUpdateTime(timeRange - Math.floor((new Date().getTime() - new Date(updatedtime).getTime()) / 1000) - 20);
    }, [updatedtime]);

    useEffect(() => {
        const interval = setInterval(async () => {
            let newtime = remainedUpdateTime - 1;

            if (remainedUpdateTime % 3 == 0) {
                setProgressUpdate(Math.floor((timeRange - remainedUpdateTime) / 1.8) + "%");
            }

            if (newtime == 0) {
                if (isFetching) {
                    return;
                }
                await queryData(currentRangeIndex);
                setRemainedUpdateTime(timeRange);
            }
            else {
                setRemainedUpdateTime(newtime);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [remainedUpdateTime]);

    useEffect(() => {
        if (!initData) {
            return;
        }

        setData(initData);
    }, [initData]);
    
    useEffect(() => {
        queryData(currentRangeIndex);
    }, []);

    // useEffect(() => {
    //     if (isLoad) {
    //         if (isUpdate) {
    //             let element: any = document.getElementById("lineChart");
    //             element.scrollIntoView({ behavior: 'smooth' });                    
    //         } else {
    //             isUpdate = true;
    //         }
    //     }
    // }, [isFetching]);

    return (
        <div className="w-full flex flex-col items-center mb-10" style={{ fontFamily: "Poppins" }} id="lineChart">
            <h3 className="mb-8 text-[#E2E2E2] leading-8 text-[24px] font-bold" style={{ fontFamily: "Poppins" }}>USA President 2024 Probability History</h3>
            <div className="w-full rounded-xl flex flex-col items-center p-4" style={{ background: "rgba(19, 19, 19, 0.5)" }}>
                <div className="space-x-4 mb-8">
                    {
                        dataRangeTexts.map((item: any, index: number) => {
                            return <BtnRange key={index} info={item} active={(index == currentRangeIndex) ? true: false} setRange={setRange} />
                        })
                    }
                </div>
                <div className="w-full flex flex-col sm:flex-row items-center">
                    <div className="w-full sm:w-4/5 mb-4 sm:mb-0">
                        <Chart data={data} currentRangeIndex={currentRangeIndex} />
                    </div>
                    <div className="w-full sm:w-1/5 px-2">
                        <Menu data={data} handler={setSerie} />
                    </div>
                </div>
                <Spinner visible={isFetching} />
            </div>
        </div>
    );
}

export default LineChartComponent;