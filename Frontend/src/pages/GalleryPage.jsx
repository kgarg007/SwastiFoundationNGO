import { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useReveal } from "../hooks/useReveal";
import { useOrgData } from "../context/OrgDataContext";
import Section from "../components/ui/Section";
import "../styles/page-hero.css";
import "./GalleryPage.css";

export default function GalleryPage() {
  const { t } = useLanguage();
  const { gallery } = useOrgData();
  const [activeImgIndex, setActiveImgIndex] = useState(null);
  useReveal();

  useEffect(() => {
    if (activeImgIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveImgIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    // Lock body scroll
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImgIndex]);

  const handleNext = () => {
    setActiveImgIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveImgIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

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
            {gallery.map((img, i) => {
              const ratioStr = img.ratio ? img.ratio.replace("/", " / ") : "1 / 1";
              return (
                <div
                  className="gallery-grid__item reveal"
                  key={img._id}
                  style={{
                    aspectRatio: ratioStr,
                    transitionDelay: `${(i % 6) * 40}ms`
                  }}
                  onClick={() => setActiveImgIndex(i)}
                >
                  <div className="gallery-grid__card">
                    <img
                      src={img.imageUrl}
                      alt={`Gallery item ${i + 1}`}
                      className="gallery-grid__img"
                    />
                    <div className="gallery-grid__overlay">
                      <span className="gallery-grid__zoom-icon">🔍</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="gallery-empty-note">{t("gallery.empty")}</p>
        )}
      </Section>

      {activeImgIndex !== null && gallery[activeImgIndex] && (
        <div
          className="gallery-lightbox"
          onClick={() => setActiveImgIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="gallery-lightbox__close"
            onClick={() => setActiveImgIndex(null)}
            aria-label="Close modal"
          >
            ✕
          </button>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[activeImgIndex].imageUrl}
              alt={`Gallery item ${activeImgIndex + 1}`}
              className="gallery-lightbox__img"
            />
            <div className="gallery-lightbox__caption">
              Image {activeImgIndex + 1} of {gallery.length}
            </div>
          </div>

          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}

