import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { useOrgData } from "../context/OrgDataContext";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import ArticleModal from "../components/ui/ArticleModal";
import "../styles/page-hero.css";
import "./BlogPage.css";

export default function BlogPage() {
  const { t } = useLanguage();
  const { stories, blogs, events } = useOrgData();
  const [selectedItem, setSelectedItem] = useState(null);
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
              <div 
                className="blog-story-card__media"
                onClick={() => setSelectedItem(story)}
              >
                {story.image ? (
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                ) : (
                  <ImagePlaceholder label={story.name} />
                )}
              </div>
              <div className="blog-story-card__body">
                <span className="blog-story-card__program">{story.program}</span>
                <h3 onClick={() => setSelectedItem(story)}>{story.name}</h3>
                <p className="blog-story-card__excerpt">{story.summary}</p>
                <div className="blog-story-card__footer">
                  <span className="blog-story-card__date">Success Story</span>
                  <button 
                    className="blog-story-card__read-btn"
                    onClick={() => setSelectedItem(story)}
                  >
                    Read Story &rarr;
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading title="Latest News & Articles" align="left" />
        <div className="blog-stories-grid">
          {blogs.map((post, i) => (
            <Card className="blog-story-card reveal" key={post._id || post.id} style={{ transitionDelay: `${i * 60}ms` }}>
              <div 
                className="blog-story-card__media"
                onClick={() => setSelectedItem(post)}
              >
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                ) : (
                  <ImagePlaceholder label={post.title} />
                )}
              </div>
              <div className="blog-story-card__body">
                <span className="blog-story-card__program">{post.category}</span>
                <h3 onClick={() => setSelectedItem(post)}>{post.title}</h3>
                <p className="blog-story-card__excerpt">{post.excerpt}</p>
                <div className="blog-story-card__footer">
                  <span className="blog-story-card__date">
                    Published: {new Date(post.publishedDate).toLocaleDateString()}
                  </span>
                  <button 
                    className="blog-story-card__read-btn"
                    onClick={() => setSelectedItem(post)}
                  >
                    Read Article &rarr;
                  </button>
                </div>
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

      <Section tone="base" id="events">
        <SectionHeading title="Upcoming Events" align="left" />
        <div className="blog-stories-grid">
          {events.map((event, i) => (
            <Card className="blog-story-card reveal" key={event._id || event.id} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="blog-story-card__body">
                <span className="blog-story-card__program">{new Date(event.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} at {event.time}</span>
                <h3>{event.title}</h3>
                <p style={{ fontWeight: 600, color: "#1e293b", marginBottom: "6px" }}>Venue: {event.location}</p>
                <p className="blog-story-card__excerpt" style={{ minHeight: "auto" }}>{event.description}</p>
                {event.registrationDetails && (
                  <div className="blog-story-card__footer" style={{ borderTop: "none", paddingTop: "0" }}>
                    <span style={{ fontSize: "13px", color: "#10b981", fontWeight: 600 }}>
                      Details/Register: {event.registrationDetails}
                    </span>
                  </div>
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

      {selectedItem && (
        <ArticleModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </>
  );
}

