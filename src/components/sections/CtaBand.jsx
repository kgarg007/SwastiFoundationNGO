import { useLanguage } from "../../i18n/LanguageContext";
import Button from "../ui/Button";
import "./CtaBand.css";

export default function CtaBand() {
  const { t } = useLanguage();

  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2 className="cta-band__title">{t("home.ctaBandTitle")}</h2>
          <p className="cta-band__sub">{t("home.ctaBandSub")}</p>
        </div>
        <div className="cta-band__actions">
          <Button to="/donate" variant="primary" size="lg">
            {t("home.ctaBandDonate")}
          </Button>
          <Button to="/volunteer" variant="outline" size="lg" className="cta-band__btn-outline">
            {t("home.ctaBandVolunteer")}
          </Button>
        </div>
      </div>
    </section>
  );
}
