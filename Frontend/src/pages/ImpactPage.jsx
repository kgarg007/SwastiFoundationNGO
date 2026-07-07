import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { impactStats, successStories } from "../data/orgData";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import ImpactStat from "../components/sections/ImpactStat";
import CtaBand from "../components/sections/CtaBand";
import "../styles/page-hero.css";
import "./ImpactPage.css";

export default function ImpactPage() {
  const { t } = useLanguage();
  useReveal();

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">{t("nav.impact")}</span>
          <h1 className="page-hero__title">{t("impact.title")}</h1>
          <p className="page-hero__sub">{t("impact.subtitle")}</p>
        </div>
      </header>

      <Section tone="deep">
        <div className="impact-page-stats">
          {impactStats.map((stat) => (
            <ImpactStat key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </Section>



      <Section tone="alt" id="stories">
        <SectionHeading title={t("impact.storiesTitle")} />
        <div className="full-stories">
          {successStories.map((story, i) => (
            <Card className="full-story-card reveal" key={story.id} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="full-story-card__media">
                <ImagePlaceholder label={story.name} ratio="4 / 5" />
              </div>
              <div className="full-story-card__body">
                <span className="full-story-card__program">{story.program}</span>
                <h3>{story.name}</h3>
                <p>{story.story}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
