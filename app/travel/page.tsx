import { travel } from "@/content/site";
import { SectionHeading } from "@/components/paper/SectionHeading";
import { Foliage } from "@/components/paper/Foliage";
import { VenueCard } from "@/components/travel/VenueCard";
import { GettingThere } from "@/components/travel/GettingThere";
import { Hotels } from "@/components/travel/Hotels";
import { Assistance } from "@/components/travel/Assistance";

export const metadata = { title: `Travel · Wedding` };

export default function TravelPage() {
  return (
    <div className="relative">
      <section className="relative pt-28 md:pt-32 pb-2 text-center">
        <Foliage className="top-24 right-4 md:right-16" width={190} flip opacity={0.85} />
        <SectionHeading eyebrow="How to get there" script={travel.heading} subtitle={travel.subtitle} />
      </section>
      <VenueCard />
      <GettingThere />
      <Hotels />
      <Assistance />
    </div>
  );
}
