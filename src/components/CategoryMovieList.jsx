import "./MovieLists.css";
import { Movie } from "./Movie.jsx";
import { useEffect, useState } from "react";
import { translations } from "./Languages.jsx";


export const CategoryMovieList = ({ currentLanguage, url, icon, categoryTitle }) => {
    const translatedTexts = translations[currentLanguage];

    const [viewMovies, setMovies] = useState([]);

    useEffect(() => {

    fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
        })
        .catch((error) => {
            console.error("Error al obtener datos de la API:", error);
        });
    }, [currentLanguage, url]);

    return (
        <>
            <main className="galleryMovies">
                <div className="listTitle">
                    <img className="iconTitle" src={icon} alt="icono terror" />
                    <h2 className="listTitleH2">{categoryTitle}</h2>
                    <div className="moreHover">
                        <button>{translatedTexts.ver}
                            <svg id="arrowRight" width="12" height="8">
                                <path className="st0" d="M11.8,0.3c-0.4-0.4-1-0.5-1.4-0.1L5.9,4.1L1.7,0.3c-0.4-0.4-1-0.3-1.4,0.1c-0.4,0.4-0.3,1,0.1,1.4l4.9,4.4
                                c0.2,0.2,0.4,0.3,0.7,0.3c0.2,0,0.5-0.1,0.7-0.2l5.1-4.4C12.1,1.4,12.1,0.8,11.8,0.3z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="movieList">
                        {viewMovies.map((movie, index) => (
                        <Movie key={index} film={movie} />
                        ))}
                </div>
            </main>
            
        </>
    );
};
