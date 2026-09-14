import { faqs } from "@/content/site";
import { SectionHeading } from "@/components/paper/SectionHeading";
import { Foliage } from "@/components/paper/Foliage";
import { FaqAccordion } from "@/components/faqs/FaqAccordion";
import { ContactCard } from "@/components/faqs/ContactCard";

export const metadata = { title: `FAQs · Wedding` };

export default function FaqsPage() {
  return (
    <div className="relative">
      <section className="relative pt-28 md:pt-32 pb-2 text-center">
        <Foliage className="top-24 left-4 md:left-16" width={200} opacity={0.85} />
        <SectionHeading eyebrow="You asked" script={faqs.heading} subtitle={faqs.subtitle} />
      </section>
      <FaqAccordion />
      <ContactCard />
    </div>
  );
}
