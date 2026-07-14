import { useLanguage } from "../../i18n/LanguageContext";
import { useOrgData } from "../../context/OrgDataContext";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import Button from "../ui/Button";
import "./StoriesPreview.css";

export default function StoriesPreview() {
  const { t } = useLanguage();
  const { stories } = useOrgData();

  return (
    <Section tone="base">
      <SectionHeading
        eyebrow={t("nav.blog")}
        title={t("home.storiesTitle")}
        subtitle={t("home.storiesSub")}
      />
      <div className="stories-grid">
        {stories.map((story, i) => (
          <Card className="story-card reveal" key={story._id || story.id} style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="story-card__media">
              {story.image ? (
                <img src={story.image} alt={story.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <ImagePlaceholder label={story.name} ratio="1 / 1" />
              )}
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
