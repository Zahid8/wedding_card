import { story } from "@/content/site";
import { SectionHeading } from "@/components/paper/SectionHeading";
import { Foliage } from "@/components/paper/Foliage";
import { CoupleCards } from "@/components/story/CoupleCards";
import { Timeline } from "@/components/story/Timeline";
import { Quote } from "@/components/story/Quote";

export const metadata = { title: `Our Story · ${story.heading}` };

export default function OurStoryPage() {
  return (
    <div className="relative">
      <section className="relative pt-28 md:pt-32 pb-2 text-center">
        <Foliage className="top-24 right-4 md:right-16" width={200} flip opacity={0.85} />
        <SectionHeading eyebrow="Our journey" script={story.heading} subtitle={story.subtitle} />
      </section>
      <CoupleCards />
      <Timeline />
      <Quote />
    </div>
  );
}
