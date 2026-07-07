import { useLanguage } from "../../i18n/LanguageContext";
import "./ValuesStrip.css";

export default function ValuesStrip() {
  const { t } = useLanguage();

  return (
    <div className="values-strip" role="note">
      <div className="container values-strip__inner">
        <span className="values-strip__hi">{t("home.valuesStripTitle")}</span>
        <span className="values-strip__divider" aria-hidden="true" />
        <span className="values-strip__en">{t("home.valuesStripSub")}</span>
      </div>
    </div>
  );
}
