import { useLanguage } from "../../i18n/LanguageContext";
import { impactStats } from "../../data/orgData";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import ImpactStat from "./ImpactStat";
import "./ImpactNumbers.css";

export default function ImpactNumbers() {
  const { t } = useLanguage();

  return (
    <Section tone="deep">
      <SectionHeading
        eyebrow={t("nav.impact")}
        title={t("home.impactTitle")}
        subtitle={t("home.impactSub")}
      />
      <div className="impact-numbers-grid">
        {impactStats.map((stat) => (
          <ImpactStat key={stat.id} value={stat.value} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>
    </Section>
  );
}
