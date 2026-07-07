import { useLanguage } from "../../i18n/LanguageContext";
import { programs } from "../../data/orgData";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import Button from "../ui/Button";
import "./FeaturedPrograms.css";

export default function FeaturedPrograms() {
  const { t } = useLanguage();
  const featured = programs.slice(0, 3);

  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow={t("nav.programs")}
        title={t("home.programsTitle")}
        subtitle={t("home.programsSub")}
      />
      <div className="programs-grid">
        {featured.map((program, i) => (
          <Card className="program-card reveal" key={program.id} style={{ transitionDelay: `${i * 60}ms` }}>
            <ImagePlaceholder label={program.name} ratio="16 / 10" />
            <div className="program-card__body">
              <span className="program-card__category">{program.category}</span>
              <h3 className="program-card__title">{program.name}</h3>
              <p className="program-card__desc">{program.description}</p>
              <Button to={`/programs#${program.id}`} variant="ghost" size="sm">
                {t("common.readMore")} →
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="programs-grid__cta">
        <Button to="/programs" variant="outline">
          {t("common.viewAll")}
        </Button>
      </div>
    </Section>
  );
}
