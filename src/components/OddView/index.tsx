import React, { useState, useEffect } from "react";
import Candidates from "./Candidates";
import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";
import "./index.scss";

const OddView = ({ setProgressUpdate }: any) => {
    const [candidates, setCandidates] = useState([]);

    return (
        <div className="mb-10 sm:mb-20 oddview px-4 py-8 sm:p-8 flex flex-col items-center w-full border-[1px] border-solid border-[#353945] rounded-3xl" style={{ fontFamily: "Poppins" }}>
            <h2 className="w-full text-center mb-10 text-[#FCFCFD] text-[24px] md:text-[32px] leading-10 font-bold" style={{ fontFamily: "DM Sans" }}>Real-Time USA President 2024 Probabilities</h2>
            <span className="w-full text-center mb-10 text-[#777E90] text-xs font-semibold leading-5">This tool tracks the chances of the next US president in 2024 in real-time.<br/>We obtain live data from financial markets for the highest accuracy possible.</span>
            <div className="w-full mb-10">
                <Candidates initData={candidates} />
                <LineChartComponent initData={candidates} setCandidates={setCandidates} setProgressUpdate={setProgressUpdate} />
                <PieChartComponent initData={candidates} />
            </div>
        </div>
    );
}

export default OddView;