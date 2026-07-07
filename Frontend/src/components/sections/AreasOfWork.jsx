import { useLanguage } from "../../i18n/LanguageContext";
import { areasOfWork } from "../../data/orgData";
import { iconMap } from "../ui/icons";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import "./AreasOfWork.css";

export default function AreasOfWork() {
  const { t } = useLanguage();

  return (
    <Section tone="base">
      <SectionHeading
        eyebrow={t("nav.about")}
        title={t("home.areasTitle")}
        subtitle={t("home.areasSub")}
      />
      <div className="areas-grid">
        {areasOfWork.map((area, i) => {
          const Icon = iconMap[area.icon];
          return (
            <div className="areas-grid__item reveal" key={area.id} style={{ transitionDelay: `${i * 40}ms` }}>
              <span className="areas-grid__icon">{Icon && <Icon />}</span>
              <span className="areas-grid__label">{area.name}</span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
