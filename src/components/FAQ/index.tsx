import FAQItem from "./FAQItem";

const answers = [
    {
        question: "How are the probabilities calculated?",
        answer: "Probabilities are derived from financial markets, and then adjusted by removing profit margins to better reflect the true odds as indicated by where money is being placed.",
    },
    {
        question: "Is the data accurate?",
        answer: "The data is accurate in reflecting financial market sentiments; however, financial markets, like all predictive tools, have inherent limitations.",
    },
    {
        question: "Are the chances based on the overall chance of winning the presidency or winning the nomination of their respective parties?",
        answer: "The percentages represent the overall likelihood of a candidate winning the presidency, which inherently considers their chances of securing their party's nomination.",
    },
    {
        question: "How do external events (e.g., debates, scandals, geopolitical events) affect these percentages?",
        answer: "External events, such as debates or scandals, can influence public sentiment and thus may be reflected in the financial markets and, subsequently, the calculated percentages.",
    },
    {
        question: "How often are the probabilities updated. ",
        answer: "The probabilities are refreshed every 5 minutes, ensuring users receive up-to-date information.",
    },
    {
        question: "Do you guarantee the accuracy of the data, are there limitations?",
        answer: `While we endeavor to provide accurate data based on financial markets, no guarantees can be made due to the inherent unpredictability and limitations of these markets. Read our disclaimer.`,
    },
    {
        question: "Are the probabilities biased at all?",
        answer: "The chances presented are not biased by our interpretation or intervention; they are solely derived from financial markets.",
    }
];

const FAQ = () => {
    return (
        <div className="flex flex-col items-center px-4 mb-10 sm:mb-20">
            <h2 className="text-[24px] md:text-[48px] text-center leading-[56px] font-bold text-[#FCFCFD] mb-10" style={{ fontFamily: "DM Sans" }} >Frequently asked questions</h2>
            
            <FAQItem index={"01"} question={answers[0].question} answer={answers[0].answer} />
            <FAQItem index={"02"} question={answers[1].question} answer={answers[1].answer} />
            <FAQItem index={"03"} question={answers[2].question} answer={answers[2].answer} />
            <FAQItem index={"04"} question={answers[3].question} answer={answers[3].answer} />
            <FAQItem index={"05"} question={answers[4].question} answer={answers[4].answer} />
            <FAQItem index={"06"} question={answers[5].question} answer={answers[5].answer} />
            <FAQItem index={"07"} question={answers[6].question} answer={answers[6].answer} />
        </div>
    );
}

export default FAQ;