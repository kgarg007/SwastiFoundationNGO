import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { useOrgData } from "../../context/OrgDataContext";
import Section from "../ui/Section";
import "./FounderMessage.css";

export default function FounderMessage() {
  const { t } = useLanguage();
  const { founderMessage } = useOrgData();

  const letterParagraphs = (founderMessage.letter || [])
    .flatMap(p => p.split(/\r?\n/))
    .map(p => p.trim())
    .filter(Boolean);

  const quote = letterParagraphs.length > 1 ? letterParagraphs[1] : "";
  const bodyText = letterParagraphs.length > 2 ? letterParagraphs[2] : "";

  return (
    <Section tone="alt">
      <div className="founder-message reveal">
        <div className="founder-message__portrait">
          {founderMessage.founderImage ? (
            <img src={founderMessage.founderImage} alt={founderMessage.founderName} className="founder-message__img" />
          ) : (
            <div className="founder-message__placeholder" aria-hidden="true">
              <span>"</span>
            </div>
          )}
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
