import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { volunteers } from "../data/orgData";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import "../styles/page-hero.css";
import "./VolunteerPage.css";

export default function VolunteerPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  useReveal();

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Connect Backend API — submit volunteer sign-up form
    setSubmitted(true);
  }

  return (
    <>
      <header className="page-hero volunteer-hero">
        <div className="container">
          <span className="page-hero__eyebrow">{t("nav.volunteer")}</span>
          <h1 className="page-hero__title">{t("volunteer.title")}</h1>
          <p className="page-hero__sub">{t("volunteer.subtitle")}</p>
        </div>
      </header>

      <Section tone="base" className="volunteer-section">
        <div className="volunteer-intro">
          <div className="volunteer-intro__why reveal">
            <h2>{t("volunteer.whyVolunteer")}</h2>
            <ul className="volunteer-benefits">
              {t("volunteer.benefits").map((benefit, i) => (
                <li key={i}>
                  <span className="volunteer-benefits__bullet" aria-hidden="true">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <form className="volunteer-form reveal" onSubmit={handleSubmit}>
            <h2>{t("volunteer.formTitle")}</h2>
            <label className="form-field">
              <span>{t("common.name")} <em>*{t("common.required")}</em></span>
              <input type="text" name="name" required autoComplete="name" />
            </label>
            <label className="form-field">
              <span>{t("common.email")} <em>*{t("common.required")}</em></span>
              <input type="email" name="email" required autoComplete="email" />
            </label>
            <label className="form-field">
              <span>{t("common.phone")}</span>
              <input type="tel" name="phone" autoComplete="tel" />
            </label>
            <label className="form-field">
              <span>Role you're applying for</span>
              <input type="text" name="role" />
            </label>
            <label className="form-field">
              <span>{t("common.message")}</span>
              <textarea name="message" rows="4" />
            </label>
            <div className="volunteer-form__upload">
              {/* TODO: Implement resume/CV file upload to backend storage */}
              <span className="volunteer-form__upload-label">Resume / CV</span>
              <div className="volunteer-form__upload-box">Upload coming soon</div>
            </div>
            <Button type="submit" variant="primary" size="md">
              {t("common.submit")}
            </Button>
            {submitted && (
              <p className="volunteer-form__success" role="status">
                Thank you! We'll be in touch soon.
              </p>
            )}
          </form>
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading title={t("volunteer.teamTitle")} />
        <div className="volunteer-team-grid">
          {volunteers.map((v, i) => (
            <div className="volunteer-team-card reveal" key={v.name} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="volunteer-team-card__avatar" aria-hidden="true">
                {v.name.charAt(0)}
              </div>
              <h3>{v.name}</h3>
              <p>{v.role}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
