import { useLanguage } from "../../i18n/LanguageContext";
import { successStories } from "../../data/orgData";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import Button from "../ui/Button";
import "./StoriesPreview.css";

export default function StoriesPreview() {
  const { t } = useLanguage();

  return (
    <Section tone="base">
      <SectionHeading
        eyebrow={t("nav.blog")}
        title={t("home.storiesTitle")}
        subtitle={t("home.storiesSub")}
      />
      <div className="stories-grid">
        {successStories.map((story, i) => (
          <Card className="story-card reveal" key={story.id} style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="story-card__media">
              <ImagePlaceholder label={story.name} ratio="1 / 1" />
            </div>
            <div className="story-card__body">
              <span className="story-card__program">{story.program}</span>
              <h3 className="story-card__name">{story.name}</h3>
              <p className="story-card__summary">{story.summary}</p>
              <Button to="/impact#stories" variant="ghost" size="sm">
                {t("common.readMore")} →
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
