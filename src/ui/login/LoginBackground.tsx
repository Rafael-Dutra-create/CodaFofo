import {ReactNode} from "react";


export default function LoginBackground({ children }: { children: ReactNode }) {
    return(
        <div className="flex h-screen w-screen bg-[url(/img/bg-login.png)]">
            <div className="
                m-auto w-full h-full
                bg-[#ffffff80]
                mask-t-from-60%
                shadow-none
                md:bg-white
                md:h-[50%] md:w-[50%]
                md:rounded-tr-3xl md:rounded-bl-3xl
                md:rounded-tl-sm md:rounded-br-sm
                md:shadow
                md:mask-t-from-100%
            ">
                {children}
            </div>
        </div>
    )
}