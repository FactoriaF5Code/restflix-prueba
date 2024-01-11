import "./Movie.css";
import "../index.css";
import PropTypes from "prop-types";

export const Movie = ({ film }) => {
  return (
    <article className="moviePoster">
      <div className="titulo-peli">
        <p>{film.title}</p>
        </div>
      <img
        src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`}
        alt={film.title}
      />
    </article>
  );
};

Movie.propTypes = {
    film: PropTypes.shape({
    backdrop_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
