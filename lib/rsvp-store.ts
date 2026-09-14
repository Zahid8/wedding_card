import type { RsvpInput } from "./rsvp-schema";

type StoreResult = { ok: true } | { ok: false; error: string };

async function saveSupabase(data: RsvpInput): Promise<StoreResult | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_RSVP_TABLE || "rsvps";
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify([
        {
          name: data.name,
          phone: data.phone || null,
          attending: data.attending,
          guests: data.guests,
          dietary: data.dietary || null,
        },
      ]),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `Supabase error: ${res.status} ${text.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: `Supabase network error: ${(e as Error).message}` };
  }
}

async function saveWebhook(data: RsvpInput): Promise<StoreResult | null> {
  const hook = process.env.RSVP_WEBHOOK_URL;
  if (!hook) return null;
  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "wedding-site",
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });
    if (!res.ok) return { ok: false, error: `Webhook error: ${res.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: `Webhook network error: ${(e as Error).message}` };
  }
}

export async function saveRsvp(data: RsvpInput): Promise<StoreResult> {
  const supa = await saveSupabase(data);
  if (supa) return supa;
  const hook = await saveWebhook(data);
  if (hook) return hook;
  // No backend configured — accept and log so the site still deploys cleanly.
  // The submission is recorded to server logs and returned as success so the
  // couple's guests never see an error on a fresh Vercel deploy.
  console.log("[rsvp]", JSON.stringify({ at: new Date().toISOString(), ...data }));
  return { ok: true };
}
