import React, { useEffect, useState } from "react";
import "./Candidates.scss";

const Candidates = ({ initData }: any) => {
    const [candidates, setCandidates] = useState(initData);
    const [totalWidth, setTotalWidth] = useState(window.innerWidth);

    const handleResize = () => {
        if (window.innerWidth > 1536) {
            setTotalWidth(1440);
        } else if (window.innerWidth > 1280) {
            setTotalWidth(1280);
        } else {
            setTotalWidth(window.innerWidth / 2);
        }
    };

    window.addEventListener('resize', handleResize);    

    useEffect(() => {
        handleResize();
    }, []);

    useEffect(() => {
        if (!initData) {
            return;
        }
        
        setCandidates(initData);
    }, [initData]);

    const Candidate = ({ info, unit }: any) => {
        return (
            <div className="candidate-container rounded-xl p-2 text-[#FFFFFF]" style={{ fontFamily: "Poppins", background: "rgba(19, 19, 19, 0.5)" }}>
                <div className="z-1 flex flex-col sm:flex-row justify-between">
                    <div className="flex flex-row items-center space-x-2 justify-start">
                        <img src={info.avatar} aria-label={info.name + "Avatar"} className="w-[64px] h-[64px] rounded-xl candidate-avatar" />
                        <span className="leading-6 text-[18px] font-bold candidate-name">{info.name}</span>
                    </div>
                    <div className="mt-2 flex flex-row items-center space-x-2 justify-end sm:relative">
                        <div className="hidden sm:block h-1 rounded-full bg-[#F49B5B] rounded-[30px] h-[12px] sm:absolute sm:right-[150px]" style={{width: info.probability * unit / 100}}></div>
                        <span className="leading-5 text-[24px] font-bold candidate-probability">{info.probability.toFixed(3)}%</span>
                        <div className="block sm:hidden h-1 rounded-full bg-[#F49B5B] rounded-[30px] h-[12px] sm:absolute sm:right-[150px]" style={{width: info.probability * unit / 100}}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mb-10">
            <div className="w-full sm:mb-5 sm:flex sm:justify-between hidden sm:block text-[#777E90] text-[14px] leading-4 font-bold" style={{ fontFamily: "DM Sans" }}>
                <span>Candidate</span>
                <span>Probability</span>
            </div>
            <div className="flex flex-col space-y-2">
                {
                    candidates.map((item: any, index: number) => {
                        return <Candidate key={index} info={item} unit={totalWidth} /> 
                    })
                }
            </div>
        </div>
    );
}

export default Candidates;