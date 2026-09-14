import { buildIcs } from "@/lib/ics";
import { site } from "@/content/site";

export const runtime = "nodejs";

export async function GET() {
  return new Response(buildIcs(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${site.slug}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
