import { site } from "@/content/site";

function fmt(dateIso: string) {
  const d = new Date(dateIso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    "00Z"
  );
}

function esc(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildIcs() {
  const couple = `${site.couple.groomShort} & ${site.couple.brideShort}`;
  const stamp = fmt(new Date().toISOString());
  const vevents = site.events.flatMap((ev) => {
    const end = new Date(new Date(ev.iso).getTime() + 4 * 60 * 60 * 1000).toISOString();
    return [
      "BEGIN:VEVENT",
      `UID:${site.slug}-${ev.id}-${new Date(ev.iso).getTime()}@wedding`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${fmt(ev.iso)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${esc(`${couple} — ${ev.name}`)}`,
      `LOCATION:${esc(`${ev.venue.name}, ${ev.venue.line1}, ${ev.venue.line2}`)}`,
      `DESCRIPTION:${esc(`${ev.desc}. With love, we invite you to celebrate with us.`)}`,
      "END:VEVENT",
    ];
  });
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${couple}//Wedding//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...vevents,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
