import { InvitationStage } from "@/components/home/InvitationStage";
import { SentenceCountdown } from "@/components/home/SentenceCountdown";
import { MeetTheCouple } from "@/components/home/MeetTheCouple";
import { DayStrip } from "@/components/home/DayStrip";
import { VenueScene } from "@/components/home/VenueScene";
import { ContentsList } from "@/components/home/ContentsList";
import { RsvpBand } from "@/components/home/RsvpBand";

export default function Home() {
  return (
    <>
      <InvitationStage />
      <div id="details">
        <SentenceCountdown />
        <MeetTheCouple />
        <DayStrip />
        <VenueScene />
        <ContentsList />
        <RsvpBand />
      </div>
    </>
  );
}
