import React from "react";
import LoginBackground from "@/ui/login/LoginBackground";


export default  function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <LoginBackground>
                {children}
            </LoginBackground>
        </>
    )
}