import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import "../styles/page-hero.css";
import "./DonatePage.css";

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

const ALLOCATION = [
  { label: "Education programs", pct: 35 },
  { label: "Healthcare & wellness", pct: 25 },
  { label: "Livelihood & skill development", pct: 20 },
  { label: "Environment & welfare initiatives", pct: 20 },
];

export default function DonatePage() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("once");
  const [status, setStatus] = useState(null); // null | "success" | "failure"
  useReveal();

  const effectiveAmount = customAmount ? Number(customAmount) : amount;

  function handlePay(e) {
    e.preventDefault();
    // TODO: Integrate Razorpay Payment Gateway
    // Dummy handler — simulates success for now.
    setStatus("success");
  }

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">{t("nav.donate")}</span>
          <h1 className="page-hero__title">{t("donate.title")}</h1>
          <p className="page-hero__sub">{t("donate.subtitle")}</p>
        </div>
      </header>

      <Section tone="base">
        <div className="donate-layout">
          <form className="donate-card reveal" onSubmit={handlePay}>
            {status === "success" ? (
              <div className="donate-result donate-result--success" role="status">
                <span className="donate-result__icon" aria-hidden="true">✓</span>
                <h2>{t("donate.successTitle")}</h2>
                <p>{t("donate.successBody")}</p>
                <Button variant="outline" onClick={() => setStatus(null)}>
                  {t("common.backToHome")}
                </Button>
              </div>
            ) : status === "failure" ? (
              <div className="donate-result donate-result--failure" role="alert">
                <span className="donate-result__icon" aria-hidden="true">!</span>
                <h2>{t("donate.failureTitle")}</h2>
                <p>{t("donate.failureBody")}</p>
                <Button variant="primary" onClick={() => setStatus(null)}>
                  {t("common.submit")}
                </Button>
              </div>
            ) : (
              <>
                <div className="donate-frequency" role="group" aria-label="Donation frequency">
                  <button
                    type="button"
                    className={`donate-frequency__btn ${frequency === "once" ? "is-active" : ""}`}
                    onClick={() => setFrequency("once")}
                  >
                    {t("donate.frequencyOnce")}
                  </button>
                  <button
                    type="button"
                    className={`donate-frequency__btn ${frequency === "monthly" ? "is-active" : ""}`}
                    onClick={() => setFrequency("monthly")}
                  >
                    {t("donate.frequencyMonthly")}
                  </button>
                </div>

                <h2 className="donate-card__title">{t("donate.amountTitle")}</h2>
                <div className="donate-amounts">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      className={`donate-amounts__btn ${amount === preset && !customAmount ? "is-active" : ""}`}
                      onClick={() => {
                        setAmount(preset);
                        setCustomAmount("");
                      }}
                    >
                      ₹{preset.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
                <label className="form-field donate-custom-amount">
                  <span>{t("donate.customAmount")}</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="₹ Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </label>

                <div className="donate-name-fields">
                  <label className="form-field">
                    <span>{t("common.name")}</span>
                    <input type="text" name="name" autoComplete="name" />
                  </label>
                  <label className="form-field">
                    <span>{t("common.email")}</span>
                    <input type="email" name="email" autoComplete="email" />
                  </label>
                </div>

                <Button type="submit" variant="primary" size="lg" className="donate-card__cta">
                  {t("donate.proceedToPay")} — ₹{effectiveAmount.toLocaleString("en-IN")}
                  {frequency === "monthly" ? "/mo" : ""}
                </Button>
                <p className="donate-tax-note">{t("donate.taxNote")}</p>
              </>
            )}
          </form>

          <div className="donate-sidebar">
            <div className="donate-upi-card reveal">
              <h3>{t("donate.upiTitle")}</h3>
              {/* TODO: Replace with actual NGO UPI QR code */}
              <div className="donate-upi-card__qr" aria-label="UPI QR code placeholder">
                <span>QR</span>
              </div>
              <p>{t("donate.upiNote")}</p>
            </div>

            <div className="donate-allocation reveal">
              <h3>{t("donate.whyDonate")}</h3>
              <ul className="donate-allocation__list">
                {ALLOCATION.map((item) => (
                  <li key={item.label}>
                    <div className="donate-allocation__row">
                      <span>{item.label}</span>
                      <span className="donate-allocation__pct">{item.pct}%</span>
                    </div>
                    <div className="donate-allocation__bar">
                      <div className="donate-allocation__bar-fill" style={{ width: `${item.pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
