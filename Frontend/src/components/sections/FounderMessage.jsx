import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { useOrgData } from "../../context/OrgDataContext";
import Section from "../ui/Section";
import "./FounderMessage.css";

export default function FounderMessage() {
  const { t } = useLanguage();
  const { founderMessage } = useOrgData();

  const quote = founderMessage.letter && founderMessage.letter.length > 1 ? founderMessage.letter[1] : "";
  const bodyText = founderMessage.letter && founderMessage.letter.length > 2 ? founderMessage.letter[2] : "";

  return (
    <Section tone="alt">
      <div className="founder-message reveal">
        <div className="founder-message__portrait">
          {/* TODO: Replace with actual NGO image */}
          <div className="founder-message__placeholder" aria-hidden="true">
            <span>"</span>
          </div>
        </div>
        <div className="founder-message__content">
          <span className="founder-message__eyebrow">{t("home.founderTitle")}</span>
          {quote && <p className="founder-message__quote">{quote}</p>}
          {bodyText && <p className="founder-message__body">{bodyText}</p>}
          <div className="founder-message__sign">
            <p className="founder-message__closing">{founderMessage.closing}</p>
            <p className="founder-message__name">{founderMessage.founderName}</p>
            <p className="founder-message__role">{founderMessage.founderTitle}</p>
          </div>
          <Link to="/about#founders-desk" className="founder-message__link">
            {t("common.readMore")} →
          </Link>
        </div>
      </div>
    </Section>
  );
}
