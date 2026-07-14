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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useReveal();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSubmitted(false);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      role: formData.get("role"),
      message: formData.get("message"),
    };

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

    try {
      const response = await fetch(`${apiBaseUrl}/regis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      e.target.reset();
    } 
    catch (err) {
      setErrorMsg(err.message);
    } 
    finally {
      setLoading(false);
    }
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
              <span>{t("common.phone")} <em>*{t("common.required")}</em></span>
              <input type="tel" name="phone" required autoComplete="tel" />
            </label>
            <label className="form-field">
              <span>Role you're applying for <em>*{t("common.required")}</em></span>
              <input type="text" name="role" required />
            </label>
            <label className="form-field">
              <span>{t("common.message")}</span>
              <textarea name="message" rows="4" />
            </label>
            <Button type="submit" variant="primary" size="md" disabled={loading}>
              {loading ? "Submitting..." : t("common.submit")}
            </Button>
            {errorMsg && (
              <p className="volunteer-form__error" role="alert">
                {errorMsg}
              </p>
            )}
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
