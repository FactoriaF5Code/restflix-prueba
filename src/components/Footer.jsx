import "./Footer.css";
import "../index.css";
import { TwitterLogo } from "./Svg/twitterLogo.jsx";
import { InstagramLogo } from "./Svg/InstagramLogo.jsx";
import { LinkedinLogo } from "./Svg/LinkedinLogo.jsx";
import { PinterestLogo } from "./Svg/PinterestLogo.jsx";
import { translations } from "./Languages.jsx";

export const Footer = ({ currentLanguage }) => {
    
    const translatedTexts = translations[currentLanguage];

    return (
        <footer>
            <section className="footerMenu">
                <nav className="socialMedia">
                    <a href="https://twitter.com/filmin">
                        <TwitterLogo />
                    </a>
                    <a href="https://www.instagram.com/enfilmin/">
                        <InstagramLogo />
                    </a>
                    <a href="https://www.linkedin.com/company/filmin">
                        <LinkedinLogo />
                    </a>
                    <a href="https://www.pinterest.com/enfilmin">
                        <PinterestLogo />
                    </a>
                </nav>
                <nav className="footerNav">
                    <a href="#">{translatedTexts.privacidad}</a>
                    <a href="#">{translatedTexts.preferencias}</a>
                    <a href="#">{translatedTexts.uso}</a>
                    <a href="#">{translatedTexts.ayuda}</a>
                </nav>
            </section>
            <section className="teamMembers">
                {translatedTexts.team}
            </section>
        </footer>
    );
};