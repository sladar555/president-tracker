import {Helmet} from "react-helmet";

const NotFound = () => {
    return (
        <div className="bg-white dark:bg-[#141416]">
            <h6 className="border-b-2 border-stone-100 dark:border-stone-800 border-gray-200 w-full"></h6>
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="flex flex-col items-center my-80">
                <p className="py-4 text-[40px] sm:text-[60px] lg:text-[100px] text-[#6C7595] dark:text-[#B1B5C3] leading-10 mb-40" style={{ fontFamily: "Poppins" }} >Page is not found</p>
            </div>
        </div>  
    );
}

export default NotFound;
