import React, { useState } from "react";
import CaretDirection from "./CaretDirection";
import "./FAQItem.scss";

const Answer = ({ index, answer }: any) => (
    (index != "06")? 
            answer
        : 
            <p>While we endeavor to provide accurate data based on financial markets, no guarantees can be made due to the inherent unpredictability and limitations of these markets. Read our <a href="/disclaimer" className="text-[#00FF00]">disclaimer</a>.</p>
)

const FAQItem = ({ index, question, answer }: any) => {
    const [active, setActive] = useState(false);

    const toggleHandler = (e: any) => {
        e.preventDefault();
        setActive(!active);
    }

    return (
        <div className="flex-col w-full sm:w-[560px] cursor-pointer faq-item" style={{ fontFamily: "Poppins" }} >
            <div className="w-full py-4 flex flex-row justify-between space-x-4 mb-4" onClick={toggleHandler}>
                <div className="flex flex-row justify-between space-x-4">
                    <span className="text-[#777E90] text-[16px] leading-6 font-medium faq-item-idx">{index}</span>
                    <span className="text-[#FCFCFD] text-[16px] leading-6 font-medium faq-item-question">{ question }</span>
                </div>
                <div className="min-w-[24px]">
                    <CaretDirection arrangeDir={active} />
                </div>
            </div>
            {
                (active == false && index == "07") ? null : <h3 className="w-full h-0.5 rounded-full bg-[#292B2B] mb-2"></h3>
            }
            {
                (active)? 
                    <div className="w-full py-4 pl-8 mb-2 text-[#777E90] text-[14px] leading-6">
                        <Answer index={index} answer={answer} />
                    </div>: null
            }
        </div>
    );
}

export default FAQItem;