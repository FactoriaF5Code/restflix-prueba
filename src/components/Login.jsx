import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Login.css";
import  { useState } from "react";

export const Login = () => {
    const [currentLanguage, setCurrentLanguage] = useState("es");
    return (
        <>

            <Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
            <section className="backgroundLogin">

            </section>
            <Footer currentLanguage={currentLanguage}  />

        </>
    );
};