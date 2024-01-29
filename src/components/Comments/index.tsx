import React, { useEffect } from "react";
import "./index.scss";

const Comments = () => {
    useEffect(() => {
        (function () {
            const d = document;
            const s = d.createElement('script');
            s.src = 'https://electiontracker.disqus.com/embed.js';
            s.setAttribute('data-timestamp', new Date().getTime().toString());
            (d.head || d.body).appendChild(s);
        })();

    }, []);

    return (
        <div className="w-full flex flex-col items-center px-4 mb-10 sm:mb-20">
            <div className="flex flex-col items-center space-y-2 mb-10" style={{ fontFamily: "Lato" }}>
                <h2 className="text-[24px] text-center leading-8 font-bold text-[#DDDDDD]" >Comments</h2>
                <span className="text-[14px] font-normal leading-5 text-[#DDDDDD]">Anything interesting to share? Write a comment.</span>
            </div>
            <div id="disqus_thread" className="w-full mt-8" style={{ fontFamily: "Roboto" }}>
            </div>
        </div>
    );
}

export default Comments;