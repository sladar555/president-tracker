import IconTelegram from "../../assets/icons/Telegram.png";
import IconCalendar from "../../assets/icons/Calendar.png";
import "./index.scss";

const TelegramLink = ({pos}: any) => {
    return (
        <div className="tglink mb-10 md:mb-20 h-[136px] py-6 px-4 md:px-10 md:py-12 flex flex-col items-center md:flex-row md:justify-between w-full border-[1px] border-solid border-[#353945] rounded-3xl cursor-pointer" style={{ fontFamily: "Poppins" }}>
            <a href="https://t.me/presidenttracker" aria-label={"LinkTelegram" + pos} className="flex flex-row items-center space-x-2" target="_blank">
                <img src={IconTelegram} aria-label="IconTelegram" className="w-8 h-8" />
                <h1 className="text-[#FCFCFD] leading-8 text-[24px] md:text-[28px] font-semibold">Election Tracker</h1>
            </a>
            <div className="flex flex-row items-center space-x-2 mt-6 md:mt-0">
                <img src={IconCalendar} aria-label="IconCalendar" className="w-8 h-8" />
                <span className="text-[#FCFCFD] text-sm	font-semibold leading-8">Tuesday, November 5, 2024</span>
            </div>
        </div>
    );
}

export default TelegramLink;