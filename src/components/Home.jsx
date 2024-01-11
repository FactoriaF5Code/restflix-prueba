import { useState } from "react";
import { Header } from "./Header";
import { Slider } from "./Slider/Slider";
import { Gallery } from "./Gallery";
import { Footer } from "./Footer";

export const Home = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");

  return (
    <>
      <Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />

      <Slider currentLanguage={currentLanguage} />

      <Gallery currentLanguage={currentLanguage} />

      <Footer currentLanguage={currentLanguage}  />

    </>
  );
};