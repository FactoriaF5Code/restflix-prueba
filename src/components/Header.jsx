import { Link } from "react-router-dom";
import { translations } from "./Languages.jsx";
import "./Header.css";
import "../index.css";
import { IconSearch } from "./Svg/IconSearch.jsx";
import { IconLanguage } from "./Svg/IconLanguage.jsx";


export const Header = ({ currentLanguage, setCurrentLanguage }) => {

  const translatedTexts = translations[currentLanguage];

  return (
    <header>
      <nav className="mainMenu">
        <div className="mainNav">
          <img src="public/imgs/LOGO_RESTFLIX.png" alt="Logotipo Filmin" />
        </div>
        <div className="mainNav">
          <a href="#">{translatedTexts.inicio}</a>
          <a href="#">{translatedTexts.series}</a>
          <a href="#">{translatedTexts.peliculas}</a>
          <a href="#">{translatedTexts.novedades}</a>
          <a href="#">{translatedTexts.explorar}</a>
        </div>
        <div className="secondaryNav">
          <button className="suscriptionButton">
            <Link to="/login">{translatedTexts.suscribete}</Link>
          </button>
          <button className="searchButton">
            <IconSearch />
          </button>
          <div className="selectLanguage">
            <div className="iconWorld">
              <IconLanguage />
            </div>
            <nav>
              <ul className="language">
                <li>
                  <Link to="/" onClick={() => setCurrentLanguage("es")}>
                    ESP
                  </Link>
                </li>

                <li>
                  <Link to="/de" onClick={() => setCurrentLanguage("de")}>
                    DE
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};
