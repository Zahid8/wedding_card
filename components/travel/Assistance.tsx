import { site, travel } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Phone, MessageCircle } from "lucide-react";

export function Assistance() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-8">
      <Reveal>
        <div className="p-10 md:p-14 text-center torn-top torn-bottom" style={{ background: "linear-gradient(180deg, rgba(220,201,176,0.55), rgba(220,201,176,0.18))" }}>
          <span className="tracked-label">Assistance</span>
          <h3 className="font-serif uppercase tracking-[0.28em] text-[color:var(--color-bark)] text-xl md:text-2xl mt-3">
            {travel.assistance.title}
          </h3>
          <p className="font-serif italic text-[color:var(--color-ink)]/85 mt-4 max-w-xl mx-auto">
            {travel.assistance.body}
          </p>
          {site.contactPhoneTel ? (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a href={`tel:${site.contactPhoneTel}`} className="stamp-btn stamp-btn-coral">
                <Phone size={14} strokeWidth={1.5} /> {site.contactPhone}
              </a>
              <a href={`https://wa.me/${site.contactPhoneTel.replace("+", "")}`} target="_blank" rel="noreferrer" className="stamp-btn stamp-btn-ghost">
                <MessageCircle size={14} strokeWidth={1.5} /> WhatsApp
              </a>
            </div>
          ) : (
            <p className="tracked-label mt-6">Contact details coming soon</p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
