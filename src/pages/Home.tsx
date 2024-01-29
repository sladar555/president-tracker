import { useState, useEffect } from "react";

import TelegramLink from "../components/TelegramLink";
import OddView from "../components/OddView";
import FAQ from "../components/FAQ";
import Comments from "../components/Comments";

import Logo from "../assets/images/img.png";
import Clock from "../assets/icons/Clock.png";
import {Helmet} from "react-helmet";

const ProgressBar = ({ progressUpdate }: any) => {
    return (
        <div className="w-full rounded-full h-1 mb-1 bg-stone-800">
            <div className="h-1 rounded-full bg-[#58BD7D]" style={{width: progressUpdate}}></div>
        </div>
    )
}
const Home = () => {
    const [ progressUpdate, setProgressUpdate ] = useState("0%");

    return (
        <div className="bg-[#141416] min-w-[360px] flex flex-col items-center">
            <ProgressBar progressUpdate={progressUpdate} />
            <Helmet>
                <title>Election Tracker - Real-Time Statistics</title>
                <meta name="description" content="Track the Election Statistics in real-time in United States." />
            </Helmet>
            <div className="text-[#58C27D] mb-0 flex flex-row space-x-2 items-center">
                <img src={Clock} aria-label="ClockIcon" className="w-6 h-6"/>
                <h2 className="text-[12px] leading-3 font-bold" style={{ fontFamily: "Poppins" }}>Probabilities are updated every 3 minutes</h2>
            </div>
            
            <div className="flex flex-col items-center w-full relative pt-0 h-[400px] bg-[#141416]">
                <div className="w-full xl:w-[1240px] 2xl:w-[1520px] h-[282px]">
                    <img src={Logo} aria-label="LogoImage2XL" className="w-full h-full rounded-[24px]" style={{ objectFit: "cover" }} />
                </div>

                <div className="absolute top-[260px] items-center flex-col justify-center px-10 xl:mx-auto w-full xl:w-[1120px] 2xl:w-[1440px] min-w-[300px]">
                    <TelegramLink pos={"up"} />
                </div>
            </div>
            <div className="items-center flex-col justify-center mt-5 mx-0 sm:px-10 xl:mx-auto w-full xl:w-[1120px] 2xl:w-[1440px] min-w-[300px]">
                <OddView setProgressUpdate={setProgressUpdate} />
                <FAQ />
                <Comments />
            </div>
            <div className="items-center flex-col justify-center px-10 xl:mx-auto w-full xl:w-[1120px] 2xl:w-[1440px] min-w-[300px]">
                <TelegramLink pos={"down"} />
            </div>
        </div>
    )
}

export default Home;
