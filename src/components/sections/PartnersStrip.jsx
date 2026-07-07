import { useLanguage } from "../../i18n/LanguageContext";
import { corporatePartners } from "../../data/orgData";
import "./PartnersStrip.css";

export default function PartnersStrip() {
  const { t } = useLanguage();
  const all = [
    ...corporatePartners.companies,
    ...corporatePartners.schools,
    ...corporatePartners.colleges,
  ];

  return (
    <div className="partners-strip">
      <div className="container">
        <p className="partners-strip__label">{t("home.partnersTitle")}</p>
        <div className="partners-strip__row">
          {all.map((name) => (
            <span className="partners-strip__item" key={name}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
