import { InvitationStage } from "@/components/home/InvitationStage";
import { SentenceCountdown } from "@/components/home/SentenceCountdown";
import { MeetTheCouple } from "@/components/home/MeetTheCouple";
import { DayStrip } from "@/components/home/DayStrip";
import { VenueScene } from "@/components/home/VenueScene";

export default function Home() {
  return (
    <>
      <InvitationStage />
      <div id="details">
        <SentenceCountdown />
        <MeetTheCouple />
        <DayStrip />
        <VenueScene />
      </div>
    </>
  );
}
