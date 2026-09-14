import { schedule } from "@/content/site";
import { SectionHeading } from "@/components/paper/SectionHeading";
import { Foliage } from "@/components/paper/Foliage";
import { SaveTheDate } from "@/components/schedule/SaveTheDate";
import { EventList } from "@/components/schedule/EventList";
import { DressCode } from "@/components/schedule/DressCode";

export const metadata = { title: `Schedule · Wedding` };

export default function SchedulePage() {
  return (
    <div className="relative">
      <section className="relative pt-28 md:pt-32 pb-2 text-center">
        <Foliage className="top-28 left-4 md:left-16" width={180} opacity={0.85} />
        <SectionHeading eyebrow="Order of the day" script={schedule.heading} subtitle={schedule.subtitle} />
      </section>
      <SaveTheDate />
      <EventList />
      <DressCode />
    </div>
  );
}
