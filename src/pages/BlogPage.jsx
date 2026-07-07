import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { successStories, blogPosts, events } from "../data/orgData";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import "../styles/page-hero.css";
import "./BlogPage.css";

export default function BlogPage() {
  const { t } = useLanguage();
  useReveal();

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">{t("nav.blog")}</span>
          <h1 className="page-hero__title">{t("blog.title")}</h1>
          <p className="page-hero__sub">{t("blog.subtitle")}</p>
        </div>
      </header>

      <Section tone="base">
        <SectionHeading title={t("impact.storiesTitle")} align="left" />
        <div className="blog-stories-grid">
          {successStories.map((story, i) => (
            <Card className="blog-story-card reveal" key={story.id} style={{ transitionDelay: `${i * 60}ms` }}>
              <ImagePlaceholder label={story.name} ratio="16 / 10" />
              <div className="blog-story-card__body">
                <span className="blog-story-card__program">{story.program}</span>
                <h3>{story.name}</h3>
                <p>{story.summary}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* TODO: Fetch blog posts from backend/CMS API */}
        {blogPosts.length === 0 && (
          <div className="blog-empty reveal">
            <p>{t("blog.empty")}</p>
          </div>
        )}
      </Section>

      <Section tone="alt" id="events">
        <SectionHeading title="Upcoming Events" align="left" />
        {/* TODO: Fetch upcoming/past events from backend/CMS API.
            Requirements document defines this as its own section but
            specifies no event content yet — render schedule, location,
            and registration details here once available. */}
        {events.length === 0 && (
          <div className="blog-empty reveal">
            <p>We don't have any events scheduled right now. Follow our social channels for announcements.</p>
          </div>
        )}
      </Section>
    </>
  );
}
