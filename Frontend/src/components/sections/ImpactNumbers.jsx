import { useLanguage } from "../../i18n/LanguageContext";
import { impactStats as fallbackStats } from "../../data/orgData";
import { useOrgData } from "../../context/OrgDataContext";
import { motion } from "framer-motion";
import Section from "../ui/Section";
import ImpactStat from "./ImpactStat";
import "./ImpactNumbers.css";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const iconMapping = ["BookOpen", "HeartPulse", "Home", "Leaf"];
const descMapping = [
  "Quality education and moral guidance.",
  "Essential food for vulnerable families.",
  "Expanding our reach across India.",
  "Health and hygiene sanitation kits."
];

export default function ImpactNumbers() {
  const { t } = useLanguage();
  const { impactStats } = useOrgData();
  const statsToRender = impactStats && impactStats.length > 0 ? impactStats : fallbackStats;

  return (
    <Section tone="deep" className="impact-section">
      <div className="impact-section__bg-glow"></div>
      <div className="container impact-section__inner">
        <div className="impact-section__header">
          <span className="impact-section__eyebrow">{t("nav.impact")}</span>
          <h2 className="impact-section__title">{t("home.impactTitle")}</h2>
          <p className="impact-section__subtitle">{t("home.impactSub")}</p>
        </div>

        <motion.div 
          className="impact-compact-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {statsToRender.map((stat, i) => (
            <ImpactStat 
              key={stat.id}
              stat={stat} 
              icon={iconMapping[i]}
              description={descMapping[i]}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
