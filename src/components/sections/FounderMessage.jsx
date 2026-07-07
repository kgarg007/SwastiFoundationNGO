import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { founderMessage } from "../../data/orgData";
import Section from "../ui/Section";
import "./FounderMessage.css";

export default function FounderMessage() {
  const { t } = useLanguage();

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
          <p className="founder-message__quote">{founderMessage.letter[1]}</p>
          <p className="founder-message__body">{founderMessage.letter[2]}</p>
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
