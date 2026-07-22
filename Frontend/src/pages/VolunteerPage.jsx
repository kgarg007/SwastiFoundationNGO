import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { useOrgData } from "../context/OrgDataContext";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import "../styles/page-hero.css";
import "./VolunteerPage.css";

export default function VolunteerPage() {
  const { t } = useLanguage();
  const { volunteerTeam } = useOrgData();
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
          {volunteerTeam && volunteerTeam.map((v, i) => (
            <div className="volunteer-team-card reveal" key={v._id || v.name} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="volunteer-team-card__avatar" aria-hidden="true">
                {v.image ? (
                  <img src={v.image} alt={v.name} />
                ) : (
                  v.name.charAt(0)
                )}
              </div>
              <h3>{v.name}</h3>
              <p>{v.role}</p>
              {v.linkedin && (
                <a 
                  href={v.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="volunteer-team-card__social"
                  title={`Connect with ${v.name} on LinkedIn`}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
