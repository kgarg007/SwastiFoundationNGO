import { useMemo, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { useOrgData } from "../context/OrgDataContext";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import CtaBand from "../components/sections/CtaBand";
import "../styles/page-hero.css";
import "./ProgramsPage.css";

export default function ProgramsPage() {
  const { t } = useLanguage();
  const { programs } = useOrgData();
  const [activeCategory, setActiveCategory] = useState("all");
  useReveal([activeCategory]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(programs.map((p) => p.category)));
    return ["all", ...unique];
  }, [programs]);

  const filtered = activeCategory === "all" ? programs : programs.filter((p) => p.category === activeCategory);

  return (
    <>
      <header className="page-hero programs-hero">
        <div className="container">
          <span className="page-hero__eyebrow">{t("nav.programs")}</span>
          <h1 className="page-hero__title">{t("programs.title")}</h1>
          <p className="page-hero__sub">{t("programs.subtitle")}</p>
        </div>
      </header>

      <Section tone="base" className="programs-section">
        <div className="programs-filter" role="group" aria-label="Filter programs by category">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`programs-filter__btn ${activeCategory === cat ? "is-active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat === "all" ? t("programs.filterAll") : cat}
            </button>
          ))}
        </div>

        <div className="programs-list">
          {filtered.map((program, i) => (
            <Card
              as="article"
              id={program._id || program.id}
              className="program-detail-card reveal"
              key={program._id || program.id}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="program-detail-card__media">
                {program.image ? (
                  <img src={program.image} alt={program.name} />
                ) : (
                  <ImagePlaceholder label={program.name} ratio="4 / 3" />
                )}
              </div>
              <div className="program-detail-card__body">
                <span className="program-detail-card__category">{program.category}</span>
                <h2 className="program-detail-card__title">{program.name}</h2>
                {program.locations && program.locations.length > 0 && (
                  <p className="program-detail-card__locations">
                    <strong>{t("programs.locationsLabel")}:</strong> {program.locations.join(", ")}
                  </p>
                )}
                <p className="program-detail-card__desc">{program.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
