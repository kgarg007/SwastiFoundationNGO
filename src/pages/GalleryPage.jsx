import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import Section from "../components/ui/Section";
import "../styles/page-hero.css";
import "./GalleryPage.css";

// TODO: Replace with actual NGO gallery images/videos fetched from backend/CMS.
const galleryRatios = ["4/3", "1/1", "3/4", "1/1", "4/3", "3/4", "1/1", "4/3", "3/4"];

export default function GalleryPage() {
  const { t } = useLanguage();
  useReveal();

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <span className="page-hero__eyebrow">{t("nav.gallery")}</span>
          <h1 className="page-hero__title">{t("gallery.title")}</h1>
          <p className="page-hero__sub">{t("gallery.subtitle")}</p>
        </div>
      </header>

      <Section tone="base">
        <div className="gallery-grid">
          {galleryRatios.map((ratio, i) => (
            <div className="gallery-grid__item reveal" key={i} style={{ transitionDelay: `${(i % 6) * 40}ms` }}>
              <ImagePlaceholder label={`Gallery photo ${i + 1}`} ratio={ratio.replace("/", " / ")} />
            </div>
          ))}
        </div>
        <p className="gallery-empty-note">{t("gallery.empty")}</p>
      </Section>
    </>
  );
}
