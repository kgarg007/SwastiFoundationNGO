import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

import Button from "../ui/Button";
import "./Header.css";

const NAV_ITEMS = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "programs", path: "/programs" },
  { key: "gallery", path: "/gallery" },
  { key: "impact", path: "/impact" },
  { key: "volunteer", path: "/volunteer" },
  { key: "blog", path: "/stories" },
];

export default function Header() {
  const { t, language, setLanguage, languages } = useLanguage();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="container header__inner">
        <Link to="/" className="header__brand" onClick={() => setIsMenuOpen(false)}>
          <img src="/images/logo.png" className="header__brand-mark" alt="Swasti Foundation Logo" />
          <span className="header__brand-text">
            Swasti Foundation
          </span>
        </Link>

        <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`} aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `header__nav-link ${isActive ? "is-active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="header__nav-actions header__nav-actions--mobile">
            <Button to="/donate" variant="primary" size="sm" onClick={() => setIsMenuOpen(false)}>
              {t("nav.donate")}
            </Button>
          </div>
        </nav>

        <div className="header__actions">
          <div className="header__lang" role="group" aria-label={t("language.label")}>
            {languages.map((lng) => (
              <button
                key={lng.code}
                className={`header__lang-btn ${language === lng.code ? "is-active" : ""}`}
                onClick={() => setLanguage(lng.code)}
                aria-pressed={language === lng.code}
              >
                {lng.label}
              </button>
            ))}
          </div>



          <Button to="/donate" variant="primary" size="sm" className="header__donate-btn">
            {t("nav.donate")}
          </Button>

          <button
            className={`header__menu-toggle ${isMenuOpen ? "is-open" : ""}`}
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
