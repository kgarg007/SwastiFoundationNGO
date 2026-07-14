import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { useOrgData } from "../context/OrgDataContext";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import Section from "../components/ui/Section";
import "../styles/page-hero.css";
import "./GalleryPage.css";

export default function GalleryPage() {
  const { t } = useLanguage();
  const { gallery } = useOrgData();
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
        {gallery && gallery.length > 0 ? (
          <div className="gallery-grid">
            {gallery.map((img, i) => (
              <div className="gallery-grid__item reveal" key={img._id} style={{ transitionDelay: `${(i % 6) * 40}ms` }}>
                <img src={img.imageUrl} alt={`Gallery item ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "8px" }} />
              </div>
            ))}
          </div>
        ) : (
          <p className="gallery-empty-note">{t("gallery.empty")}</p>
        )}
      </Section>
    </>
  );
}
