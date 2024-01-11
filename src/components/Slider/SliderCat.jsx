// Tenemos que importar useEffect y useState para que haya elementos que se actualicen y cambien dentro de la página
import { useEffect, useState } from "react";
import styles from "../Slider/Slider.module.css";

// Las dos importaciones siguientes son archivos .svg
// que colocamos en dos componentes diferentes para no ensuciar este código
import { IconPlay } from "../Svg/IconPlay.jsx"; 
import { IconDetails } from "../Svg/IconDetails.jsx"; 


//AQUÍ EMPIEZA EL CÓDIGO PARA LA SECCIÓN DEL SLIDER
export const SliderCat = () => {
  
// ANTES DE TODO DEFINIMOS LAS VARIABLES

  // Variable para el SLIDER
  // [sobre qué elemento, lo que queremos que haga] =  
    // elementoArrayImagenesPelis: es cada una de las imágenes que se va a cargar en el slider
    // cargaImagenActual: es lo que queremos que haga con elementoArrayImagenesPelis
    // useState es 0 porque queremos que empiece en la posición 0 de la variable
  const [elementoArrayImagenesPelis, cargaImagenActual] = useState(0);
  
  // Variable para cargar la info de cada película dentro de la sección SLIDER
    // arrayInfoPeli: es la lista de películas que sacamos de la API
    // cargaInfoPeli: es lo que queremos que haga con arrayInfoPeli
    // useState está vacío porque queremos que carge todo
  const [arrayInfoPeli, cargaInfoPeli] = useState([]);
  
    // Variable cantidad = longitud de la lista de películas.
    // el símbolo ? es para que si la propiedad length es indefinida o nula no genere un error
  const cantidad = arrayInfoPeli?.length;
  const urlApi = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=cat-CAT&page=1&sort_by=popularity.desc`;


// FUNCIÓN PARA OBTENER LA INFO DE LA API
  // Este código lo obtenemos de la web de TMDB  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTA1OGUzZjQ5NTc5NjA3M2EyMDYyN2QwMTQwY2NjMyIsInN1YiI6IjY1OTNlYzFiZTYyNzE5NTI3NDRkYzNjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U5UE9gaaJrNJSzZSfZCX-8UWtaV8bFS5_DFe8b0-rZo'
      }
    };
  
    fetch(urlApi, options)
      .then(response => response.json())
      // aquí definimos que contenidos vamos a usar del JSON de la API
      .then(datosPelis => {
        //datosPelis es todo el contenido del JSON
        //results está definido en el json y es el array de películas
        //map es un método para recorrer todo el array
        //datosCadaPeli son los datos que nos da el JSON para cada una de las pelis
        // localStorage.cargaInfoPeli
        cargaInfoPeli(datosPelis.results.map(datosCadaPeli => {
          return {
            id: datosCadaPeli.id,
            urlPoster: `https://image.tmdb.org/t/p/w500${datosCadaPeli.poster_path}`,
            urlBackground: `https://image.tmdb.org/t/p/w500${datosCadaPeli.backdrop_path}`,
            titulo: datosCadaPeli.original_title,
            sinopsis: datosCadaPeli.overview
          };
        }));
      })
      .catch(err => {
        console.error("Error al obtener datos de la API:", err);
      });
  }, [urlApi]);
  // estas últimas llaves están vacías porque queremos que estos datos se carguen 1 vez cuando se carga la página

//FUNCIÓN IF QUE CONFIRMA QUE arrayInfoPeli es un array y no nos provoque errores
  // La exclamación significa NO. || significa OR
  // Si arrayInfoPeli NO es un Array OR si la cantidad del array es 0 no se ejecuta el código del Slider
  if (!Array.isArray(arrayInfoPeli) || cantidad === 0) return null;


// VARIABLES PARA LOS BOTONES DEL SLIDER

  // FUNCIÓN PARA EL BOTÓN DE SIGUIENTE
  // Si el elementoArrayImagenesPeli es igual a la cantidad de imágenes del array -1 regresamos al índice 0
  // si no, le sumamos 1 al índice de la imagen actual, para pasar a la siguiente.
  // (? (si/if...) y :(en caso contrario) se conocen como operador terciario)
  const siguienteImagen = () => {
    cargaImagenActual(elementoArrayImagenesPelis === cantidad - 1 ? 0 : elementoArrayImagenesPelis + 1);
  };

    // FUNCIÓN PARA EL BOTÓN DE ANTERIOR
  const anteriorImagen = () => {
    cargaImagenActual(elementoArrayImagenesPelis === 0 ? cantidad - 1 : elementoArrayImagenesPelis - 1);
  };

// FUNCIÓN PARA ACORTAR LA LONGITUD DE LA SINOPSIS HASTA 250 CARACTERES
  const acortarSinopsis = (sinopsis) => {
    // si existe el elemento sinopsis Y si la longitud de la sinopsis es > 250
    if (sinopsis && sinopsis.length > 250) {
      // el método substring coge un string y devuelve otro string de la longitud definida en ()
      return sinopsis.substring(0, 250) + "...";
    } else {
      return sinopsis;
    }
  }


// A PARTIR DE AQUÍ EMPIEZA EL CÓDIGO DE LO QUEREMOS QUE NOS MUESTRE
  return (
    // Las clases se añaden de forma diferente porque se utiliza module.css
    // Esto hace que si existe en otro css una clase container no va a crear conflicto con este
    // En la consola del navegador se ve cómo automáticamente se le ha añadido un sufijo a esta clase "_container_hkavt_1"
    <section className={styles.carruselPrincipal}>
      
      {/* Abrimos llaves {} porque estamos añadiendo js 
          ponemos una condición: si la imagen de la peli NO ES IGUAL AL ÍNDICE 0 DEL ARRAY
          && significa Y. revisa la condición anterior y si es verdadera ejecuta el código*/}
      {elementoArrayImagenesPelis !== 0 && (
        // onClick es un evento. Si hacemos clic ejecuta la función anteriorImagen
        <button className={styles.sliderflechaLeft} onClick={anteriorImagen}>
          ❮
        </button>
      )}  

      <div className={styles.container}>
        
        {/* El siguiente div está añadiendo una imagen de background*/}
        <div className={styles.backgroundMovie}
            // además de una clase le añadimos un estilo en línea para poder llamar a la API para obtener la imagen de fondo
            // {{ ... }} las primeras llaves son para decir que estamos añadiendo JS, las segundas son para definir un objeto 
            // backgroundImage: "url()" es la manera en la que se añaden imágenes de fondo en CSS
            // url("+ ... +") estamos construyendo una cadena por concatenación, suma de elementos
            // Accedemos al elemento del que queremos coger la info (array[indiceDelArray]
                                                                                      // "?" previene errores
                                                                                          // urlBackground es la variable para la dirección de la imagen
            style={{backgroundImage: "url(" + (arrayInfoPeli[elementoArrayImagenesPelis]?.urlBackground) + ")"}}        
          />
        
        {/* En este DIV añadimos el contenido del SLIDER*/}
        <div className={styles.imagenesCarrusel}>
          {/* con el método map le decimos que recorra el array de pelis tomando como argumentos imagen e index */}
          {arrayInfoPeli.map((imagen, index) => {
            return (
              // se crea un nuevo div para cada elemento del array.
              // La propiedad key es importante en React para identificar de manera única cada elemento de una lista. Como cada peli tiene un id se utiliza imagen.id como clave
              <div
                  key={imagen.id}
                  className={(() => {
                    // si el elemento del array es igual al index aplica las clases .slide y .active que juegan con la opacidad
                    // si no aplica solo la clase styles.slide
                    // " " el espacio en blanco entre los dos styles es para separar ambos estilos y que se puedan interpretar como dos elementos diferentes
                    if (elementoArrayImagenesPelis === index) {
                      return styles.slide + " " + styles.active;
                    } else {
                      return styles.slide;
                    }
                  })()}
                >
                  {/* Dentro del DIV ponemos una condición 
                      si elementoArrayImagenesPelis es igual al índice actual (index),
                      se muestra un elemento img con src establecido en imagen.urlPoster
                      y alt con el título de la peli.
                      Si la condición no se cumple, no se muestra nada. */}
                  {elementoArrayImagenesPelis === index && <img src={imagen.urlPoster} alt={imagen.titulo} />}
                </div>
              );
          })}
        </div>
        
        {/* En este DIV va la ficha con los detalles de la peli*/}
        <div className={styles.detallesPeli}>
          <div className={styles.etiquetaEstreno}>
            <img src="public\imgs\restflix-sofa.png" alt="icono sofa restflix" />
            <div className={styles.estrenoRestflix}>ESTRENA RESTFLIX</div>
          </div>
          
          {/* Para coger el título de la peli desde la API
                array de pelis [posición en el array]
                "?" para evitar errores, 
                .titulo para coger el contenido titulo
                || "Título de la película no disponible", si no hay título nos devuelve el texto "Título película" */}
          <h1>{arrayInfoPeli[elementoArrayImagenesPelis]?.titulo || "Título de la película no disponible"}</h1>
          
          {/* Para mostrar la sinopsis
                aplicamos la función acortarSinopsis y llamamos al elemento sinopsis igual que hicimos con el título */}
          <p className={styles.sinopsisClass}>{acortarSinopsis(arrayInfoPeli[elementoArrayImagenesPelis]?.sinopsis || "Sinopsis de la película no disponible")}</p>
          
          {/* En este DIV van los botones de reproducir y más información*/}
          <div className={styles.buttonsInfo}>
            <button className={styles.buttonPlay}>
              {/* Metemos los iconos .svg como Componentes de React para no ensuciar el código */}
              <IconPlay />
              REPRODUIR
            </button>
            <button className={styles.buttonDetails}>
              <IconDetails />
              MÉS INFORMACIÓ
            </button>
          </div>

        </div>
      </div>
      
      {/* Botón de pasar a la siguiente película del slider*/}
      <button className={styles.sliderflechaRigth} onClick={siguienteImagen}>
        ❯
      </button>
      
    </section>
  );
};
