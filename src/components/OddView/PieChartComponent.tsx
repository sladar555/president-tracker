import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({active, payload, label}: any) => {
    if (active) {
        return (
            <div className="text-white">
                <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
            </div>
        );
    } else {
        return null;
    }
};  

const PieChartBody = ({dataSeries}: any) => {
    const [data, setData] = useState([{
        name: "Empty",
        value: 100,
        color: "grey"
    }]);

    useEffect(() => {
        if (dataSeries == null) {
            return;
        }

        let newData = [];
        let total: number = 0;
        for (let i = 0; i < dataSeries.length; i++) {
            if (dataSeries[i].active) {
                newData.push({
                    name: dataSeries[i].name,
                    value: parseFloat(dataSeries[i].probability.toFixed(3)),
                    color: dataSeries[i].color
                });
                total += dataSeries[i].probability;
            }
        }    
        if (total != 100) {
            total = parseFloat((100 - total).toFixed(3));
            newData.push({
                name: "Others",
                value: total,
                color: "grey"
            });
        }

        setData(newData);
    }, [dataSeries]);

    const [width, setWidth] = useState(0);
    const [radius, setRadius] = useState(0);

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setWidth(350);
            setRadius(120);
        } else {
            setWidth(300);
            setRadius(100);
        }
    };

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
      <PieChart width={width} height={width}>
        <Pie
            data={data}
            cx={width / 2}
            cy={width / 2}
            innerRadius={radius - 35}
            outerRadius={radius}
            fill="black"
            paddingAngle={0}
            dataKey="value"
            label
        >
            {
                data.map((entry: any, index: any) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))
            }
        </Pie>
        <Tooltip content={<CustomTooltip active={true} />} />
      </PieChart>
    );
};

const Menu = ({data, handler}: any) => {
    const Item = ({info, active, color, handler}: any) => {
        return (
            <div className={(active)? "opacity-100 hover:opacity-50 w-full font-medium text-[14px] leading-5 text-[#F7FBFA] flex flex-row justify-between items-center": "opacity-50 hover:opacity-100 w-full text-[14px] leading-5 text-[#F7FBFA] flex flex-row justify-between items-center"} style={{ fontFamily: "Poppins", cursor: "pointer" }} onClick={() => handler(info.name)}>
                <div className="flex flex-row items-center">
                    <div className="ml-3 rounded-full w-[10px] h-[10px] mr-4" style={{ backgroundColor: color }}></div>
                    <span className="mr-7">{info.name}</span>
                </div>
                <span className="">{info.probability.toFixed(3) + "%"}</span>
            </div>
        );
    }
    return (
        <div className="w-full flex justify-center md:justify-start items-center min-w-[250px] p-4">
            <div className="flex flex-col font-medium" style={{ fontFamily: "Poppins" }}>
                <div className="md:w-full space-y-2 mb-2">
                    {
                        data.map((item: any, index: number) => {
                            if (index * 2 < data.length)
                                return <Item key={index} info={item} active={data[index].active} color={data[index].color} handler={handler} />
                        })
                    }
                </div>
                <div className="md:w-full space-y-2">
                    {
                        data.map((item: any, index: number) => {
                            if (index * 2 >= data.length)
                                return <Item key={index} info={item} active={data[index].active} color={data[index].color} handler={handler} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

const PieChartComponent = ({ initData }: any) => {
    const [data, setData] = useState(initData);

    useEffect(() => {
        if (!initData) {
            return;
        }

        setData(initData);
    }, [initData]);
    
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

    return (
        <div className="w-full flex flex-col items-center" style={{ fontFamily: "Poppins" }}>
            <h3 className="mb-8 text-[#E2E2E2] leading-8 text-[24px] font-bold">Real-Time Probabilities</h3>
            <div className="w-full bg-[#131313] rounded-xl flex flex-col items-center p-4" style={{ background: "rgba(19, 19, 19, 0.5)" }}>
                <div className="w-full flex flex-col md:flex-row justify-center">
                    <div className="mb-4 md:mb-0 flex justify-center w-full md:justify-end">
                        <PieChartBody dataSeries={data} />
                    </div>
                    <div className="px-2 flex justify-center w-full md:justify-start">
                        <Menu data={data} handler={setSerie} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PieChartComponent;