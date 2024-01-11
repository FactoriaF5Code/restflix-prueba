import { useEffect, useState } from "react";
import styles from "../Slider/Slider.module.css";
import { IconPlay } from "../Svg/IconPlay.jsx";
import { IconDetails } from "../Svg/IconDetails.jsx";
import { translations } from "../Languages.jsx";

export const Slider = ({ currentLanguage }) => {
  const translatedTexts = translations[currentLanguage];

  const [elementoArrayImagenesPelis, cargaImagenActual] = useState(0);

  const [arrayInfoPeli, cargaInfoPeli] = useState([]);

  const cantidad = arrayInfoPeli?.length;
  const urlApi = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${currentLanguage}&page=1&sort_by=popularity.desc`;

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTA1OGUzZjQ5NTc5NjA3M2EyMDYyN2QwMTQwY2NjMyIsInN1YiI6IjY1OTNlYzFiZTYyNzE5NTI3NDRkYzNjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U5UE9gaaJrNJSzZSfZCX-8UWtaV8bFS5_DFe8b0-rZo",
      },
    };

    fetch(urlApi, options)
      .then((response) => response.json())
      .then((datosPelis) => {
        cargaInfoPeli(
          datosPelis.results.map((datosCadaPeli) => {
            return {
              id: datosCadaPeli.id,
              urlPoster: `https://image.tmdb.org/t/p/w500${datosCadaPeli.poster_path}`,
              urlBackground: `https://image.tmdb.org/t/p/w500${datosCadaPeli.backdrop_path}`,
              titulo: datosCadaPeli.original_title,
              sinopsis: datosCadaPeli.overview,
            };
          })
        );
      })
      .catch((err) => {
        console.error("Error al obtener datos de la API:", err);
      });
  }, [urlApi, currentLanguage]);

  if (!Array.isArray(arrayInfoPeli) || cantidad === 0) return null;

  const siguienteImagen = () => {
    cargaImagenActual(
      elementoArrayImagenesPelis === cantidad - 1
        ? 0
        : elementoArrayImagenesPelis + 1
    );
  };

  const anteriorImagen = () => {
    cargaImagenActual(
      elementoArrayImagenesPelis === 0
        ? cantidad - 1
        : elementoArrayImagenesPelis - 1
    );
  };

  const acortarSinopsis = (sinopsis) => {
    if (sinopsis && sinopsis.length > 250) {
      return sinopsis.substring(0, 250) + "...";
    } else {
      return sinopsis;
    }
  };

  return (
    <section className={styles.carruselPrincipal}>
      {elementoArrayImagenesPelis !== 0 && (
        <button className={styles.sliderflechaLeft} onClick={anteriorImagen}>
          ❮
        </button>
      )}

      <div className={styles.container}>
        <div
          className={styles.backgroundMovie}
          style={{
            backgroundImage:
              "url(" +
              arrayInfoPeli[elementoArrayImagenesPelis]?.urlBackground +
              ")",
          }}
        />

        <div className={styles.imagenesCarrusel}>
          {arrayInfoPeli.map((imagen, index) => {
            return (
              <div
                key={imagen.id}
                className={(() => {
                  if (elementoArrayImagenesPelis === index) {
                    return styles.slide + " " + styles.active;
                  } else {
                    return styles.slide;
                  }
                })()}
              >
                {elementoArrayImagenesPelis === index && (
                  <img src={imagen.urlPoster} alt={imagen.titulo} />
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.detallesPeli}>
          <div className={styles.etiquetaEstreno}>
            <img
              src="public\imgs\restflix-sofa.png"
              alt="icono sofa restflix"
            />
            <div className={styles.estrenoRestflix}>
              {translatedTexts.estreno}
            </div>
          </div>

          <h1>
            {arrayInfoPeli[elementoArrayImagenesPelis]?.titulo ||
              "Título de la película no disponible"}
          </h1>
          <p className={styles.sinopsisClass}>
            {acortarSinopsis(
              arrayInfoPeli[elementoArrayImagenesPelis]?.sinopsis ||
                "Sinopsis de la película no disponible"
            )}
          </p>

          <div className={styles.buttonsInfo}>
            <button className={styles.buttonPlay}>
              <IconPlay />
              {translatedTexts.reproducir}
            </button>
            <button className={styles.buttonDetails}>
              <IconDetails />
              {translatedTexts.info}
            </button>
          </div>
        </div>
      </div>

      <button className={styles.sliderflechaRigth} onClick={siguienteImagen}>
        ❯
      </button>
    </section>
  );
};
