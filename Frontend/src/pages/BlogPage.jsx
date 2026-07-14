import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { useOrgData } from "../context/OrgDataContext";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import "../styles/page-hero.css";
import "./BlogPage.css";

export default function BlogPage() {
  const { t } = useLanguage();
  const { stories, blogs, events } = useOrgData();
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
          {stories.map((story, i) => (
            <Card className="blog-story-card reveal" key={story._id || story.id} style={{ transitionDelay: `${i * 60}ms` }}>
              {story.image ? (
                <img src={story.image} alt={story.name} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
              ) : (
                <ImagePlaceholder label={story.name} ratio="16 / 10" />
              )}
              <div className="blog-story-card__body">
                <span className="blog-story-card__program">{story.program}</span>
                <h3>{story.name}</h3>
                <p>{story.summary}</p>
              </div>
            </Card>
          ))}
        </div>

        <SectionHeading title="Latest News & Articles" align="left" style={{ marginTop: "48px" }} />
        <div className="blog-stories-grid">
          {blogs.map((post, i) => (
            <Card className="blog-story-card reveal" key={post._id || post.id} style={{ transitionDelay: `${i * 60}ms` }}>
              {post.image ? (
                <img src={post.image} alt={post.title} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
              ) : (
                <ImagePlaceholder label={post.title} ratio="16 / 10" />
              )}
              <div className="blog-story-card__body">
                <span className="blog-story-card__program">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "12px" }}>Published: {new Date(post.publishedDate).toLocaleDateString()}</p>
              </div>
            </Card>
          ))}
        </div>
        {blogs.length === 0 && (
          <div className="blog-empty reveal">
            <p>{t("blog.empty")}</p>
          </div>
        )}
      </Section>

      <Section tone="alt" id="events">
        <SectionHeading title="Upcoming Events" align="left" />
        <div className="blog-stories-grid">
          {events.map((event, i) => (
            <Card className="blog-story-card reveal" key={event._id || event.id} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="blog-story-card__body">
                <span className="blog-story-card__program">{new Date(event.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} at {event.time}</span>
                <h3>{event.title}</h3>
                <p><strong>Venue:</strong> {event.location}</p>
                <p>{event.description}</p>
                {event.registrationDetails && (
                  <p style={{ fontSize: "13px", color: "#10b981", marginTop: "12px" }}>
                    <strong>Details/Register:</strong> {event.registrationDetails}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
        {events.length === 0 && (
          <div className="blog-empty reveal">
            <p>We don't have any events scheduled right now. Follow our social channels for announcements.</p>
          </div>
        )}
      </Section>
    </>
  );
}
