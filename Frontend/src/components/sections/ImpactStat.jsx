import { motion } from "framer-motion";
import { useCountUp } from "../../hooks/useCountUp";
import { iconMap } from "../ui/icons";
import "./ImpactNumbers.css";


const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ImpactStat({ stat, icon, description }) {
  const [ref, displayValue] = useCountUp(stat.value);
  const IconComponent = iconMap[icon];

  return (
    <motion.div 
      className="impact-card" 
      variants={itemVariants}
      ref={ref}
    >
      <div className="impact-card__icon-wrapper">
        {IconComponent && <IconComponent className="impact-card__icon" />}
      </div>
      <div className="impact-card__content">
        <span className="impact-card__value">
          {displayValue.toLocaleString("en-IN")}
          {stat.suffix}
        </span>
        <h3 className="impact-card__label">{stat.label}</h3>
        {description && <p className="impact-card__desc">{description}</p>}
      </div>
    </motion.div>
  );
}
