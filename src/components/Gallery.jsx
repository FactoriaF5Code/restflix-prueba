import "./Gallery.css";
import "../App.css";
import { CategoryMovieList } from "./CategoryMovieList.jsx";
import { translations } from "./Languages.jsx";
import iconTerror from "/imgs/terror.svg";
import iconComedy from "/imgs/comedy.svg";
import iconThriller from "/imgs/thriller.svg";


export const Gallery = ({ currentLanguage }) => {
    const apiKey = "ca058e3f495796073a20627d0140ccc3";
    const terrorUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&language=${currentLanguage}`;
    const comedyUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&language=${currentLanguage}`;
    const thrillerUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53&language=${currentLanguage}`;
    const translatedTexts = translations[currentLanguage];

return (
    <main className = "mainGallery">
        <CategoryMovieList
            currentLanguage={currentLanguage}
            url={terrorUrl}
            icon={iconTerror}
            categoryTitle={translatedTexts.terror} />
        <CategoryMovieList
            currentLanguage={currentLanguage}
            url={comedyUrl}
            icon={iconComedy}
            categoryTitle={translatedTexts.comedia} />
        <CategoryMovieList
            currentLanguage={currentLanguage}
            url={thrillerUrl}
            icon={iconThriller}
            categoryTitle={translatedTexts.thriller} />
    </main>
    );
};