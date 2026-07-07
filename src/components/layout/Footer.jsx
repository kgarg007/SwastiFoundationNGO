import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { orgInfo } from "../../data/orgData";
import { Facebook, Instagram, Youtube } from "../ui/icons";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col footer__col--brand">
          <div className="footer__brand">
            <span className="footer__brand-mark" aria-hidden="true">स्व</span>
            <span className="footer__brand-text">{orgInfo.name}</span>
          </div>
          <p className="footer__tagline">{orgInfo.tagline}</p>
          <p className="footer__blurb">{t("footer.aboutBlurb")}</p>
          <p className="footer__reg">
            {t("footer.registered")} · {orgInfo.registrationNumber}
          </p>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">{t("footer.quickLinks")}</h3>
          <ul className="footer__links">
            <li><Link to="/about">{t("nav.about")}</Link></li>
            <li><Link to="/programs">{t("nav.programs")}</Link></li>
            <li><Link to="/impact">{t("nav.impact")}</Link></li>
            <li><Link to="/stories">{t("nav.blog")}</Link></li>

          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">{t("footer.getInvolved")}</h3>
          <ul className="footer__links">
            <li><Link to="/donate">{t("nav.donate")}</Link></li>
            <li><Link to="/volunteer">{t("nav.volunteer")}</Link></li>

          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">{t("footer.contactUs")}</h3>
          <address className="footer__address">
            <p>{orgInfo.officeAddress}</p>
            <p>
              <a href={`mailto:${orgInfo.email}`}>{orgInfo.email}</a>
            </p>
            <p>
              <a href={`tel:+91${orgInfo.phone}`}>+91 {orgInfo.phone}</a>
            </p>
          </address>
          <h3 className="footer__heading footer__heading--social">{t("footer.followUs")}</h3>
          <div className="footer__social">
            <a href="https://www.facebook.com/Swastifoundationngo?mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
              <Facebook className="footer__social-icon" />
            </a>
            <a href="https://www.instagram.com/swastifoundationngo?igsh=cHc2aXZ6N2M2ZGw1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
              <Instagram className="footer__social-icon" />
            </a>
            <a href="https://www.youtube.com/@swastifoundationngo4639" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer__social-link">
              <Youtube className="footer__social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} {orgInfo.name}. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
