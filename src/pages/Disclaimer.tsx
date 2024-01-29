import {Helmet} from "react-helmet";
import { BiChevronsLeft } from "react-icons/bi";
import "./Disclaimer.scss";

const Disclaimer = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center pt-10 bg-[#141416]">
            <h1 className="text-[#FCFCFD] text-[60px] text-center font-bold underline-offset-8 animate-pulse"><u>Disclaimer</u></h1>
            <a href="/" className="width-[80px] height-[80px]"><BiChevronsLeft size={60} className="text-[#FCFCFD] hyper-link"/></a>
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="text-[#FCFCFD] text-[20px] space-y-10 w-full lg:w-[1000px] px-10 pt-10 pb-20 text-center">
                <p className="">
                    The probabilities and data presented on this website are primarily derived from financial markets. By adjusting these market odds to remove inherent profit margins, we aim to depict a clearer picture of the public's willingness to place money on specific outcomes. 
                </p>
                <p className="">
                    While we make every effort to ensure the accuracy of the data and its reflection of current sentiments, financial markets, like all predictive tools, have inherent limitations. This data should be understood as a representation of market sentiment and not as definitive predictions of future outcomes. Events such as debates, scandals, geopolitical shifts, and other external factors can influence public sentiment and, consequently, may be reflected in the financial markets and the calculated percentages.
                </p>

                <p className="">
                    The percentages displayed represent the cumulative likelihood of a candidate not only securing their party's nomination but also winning the presidency. Our platform updates these probabilities every 5 minutes to provide users with the most current information. However, despite our commitment to accuracy, we cannot guarantee the complete reliability or predictiveness of the data. 
                </p>
                <p className="">
                    Users are encouraged to exercise discretion and, if necessary, seek professional advice when interpreting or making decisions based on the content provided here. This website and its operators are not responsible for any decisions made or actions taken based on the information presented.
                </p>
                <p className="">
                    As always, it's a good idea to consult with legal counsel to ensure that your disclaimer adequately addresses the specific risks and nuances of your website and its content.
                </p>
            </div>
        </div>
    );
}

export default Disclaimer;