import { useReveal } from "../hooks/useReveal";
import Hero from "../components/sections/Hero";
import ValuesStrip from "../components/sections/ValuesStrip";
import AreasOfWork from "../components/sections/AreasOfWork";
import FeaturedPrograms from "../components/sections/FeaturedPrograms";
import ImpactNumbers from "../components/sections/ImpactNumbers";
import StoriesPreview from "../components/sections/StoriesPreview";
import FounderMessage from "../components/sections/FounderMessage";
import PartnersStrip from "../components/sections/PartnersStrip";
import CtaBand from "../components/sections/CtaBand";

export default function HomePage() {
  useReveal();

  return (
    <>
      <Hero />
      <ValuesStrip />
      <AreasOfWork />
      <FeaturedPrograms />
      <ImpactNumbers />
      <StoriesPreview />
      <FounderMessage />
      <PartnersStrip />
      <CtaBand />
    </>
  );
}
