import { useLanguage } from "../../i18n/LanguageContext";
import { orgInfo, impactStats } from "../../data/orgData";
import Button from "../ui/Button";
import "./Hero.css";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Hero() {
  const { t } = useLanguage();
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">{t("home.heroEyebrow")}</span>
          <h1 className="hero__headline">
            <span className="hero__headline-hi">{orgInfo.tagline}</span>
          </h1>
          <p className="hero__translation">"{orgInfo.taglineTranslation}"</p>
          <p className="hero__sub">{t("home.heroSub")}</p>
          <div className="hero__ctas">
            <Button to="/donate" variant="primary" size="lg">
              {t("home.ctaDonate")}
            </Button>
            <Button to="/programs" variant="outline" size="lg">
              {t("home.ctaPrograms")}
            </Button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-frame">
            {/* TODO: Replace with actual NGO image */}
            <div className="hero__image-placeholder">
              <span aria-hidden="true">⛰</span>
            </div>
          </div>

          {/* Signature device: a "field notes" ledger strip — reinforces
              transparency (a core value) instead of decorative stat cards. */}
          <div className="hero__ledger" aria-label="Field notes summary">
            <div className="hero__ledger-header">
              <span className="hero__ledger-title">{t("home.ledgerTitle")}</span>
              <span className="hero__ledger-date">
                {t("home.ledgerUpdated")}: {today}
              </span>
            </div>
            <dl className="hero__ledger-rows">
              {impactStats.slice(0, 3).map((stat) => (
                <div className="hero__ledger-row" key={stat.id}>
                  <dt>{stat.label}</dt>
                  <dd>
                    {stat.value.toLocaleString("en-IN")}{stat.suffix}
                  </dd>
                </div>
              ))}
              <div className="hero__ledger-row hero__ledger-row--meta">
                <dt>Est.</dt>
                <dd>{formatDate(orgInfo.foundedDate)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
