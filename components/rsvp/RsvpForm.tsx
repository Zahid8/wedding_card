"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { rsvpCopy, site } from "@/content/site";
import { rsvpSchema, type RsvpInput } from "@/lib/rsvp-schema";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [values, setValues] = useState<RsvpInput>({
    name: "",
    phone: "",
    attending: "accept",
    guests: "1",
    dietary: "",
    hp: "",
  });

  const set = <K extends keyof RsvpInput>(k: K, v: RsvpInput[K]) =>
    setValues((s) => ({ ...s, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = rsvpSchema.safeParse(values);
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message ?? "Please check the form.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        setErrorMsg(body.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStatus("error");
    }
  }

  if (status === "success") {
    const msg =
      values.attending === "accept"
        ? rsvpCopy.success.accept(values.name || "friend")
        : rsvpCopy.success.decline(values.name || "friend");
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="paper-card torn-top torn-bottom p-10 md:p-14 text-center relative overflow-hidden"
      >
        <img aria-hidden src="/masks/olive-branch.svg" alt="" className="mx-auto w-32 opacity-80" />
        <p className="font-script text-4xl md:text-5xl text-[color:var(--color-bark)] mt-6 leading-tight">
          {msg}
        </p>
        <p className="tracked-label mt-6">With love, {site.couple.groomShort} &amp; {site.couple.brideShort}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="paper-card torn-top torn-bottom p-8 md:p-12 space-y-8">
      <input
        type="text"
        name="hp"
        aria-hidden
        tabIndex={-1}
        value={values.hp || ""}
        onChange={(e) => set("hp", e.target.value)}
        autoComplete="off"
        className="hidden"
      />

      <Field label={`${rsvpCopy.fields.name.label} *`}>
        <input
          type="text"
          required
          placeholder={rsvpCopy.fields.name.placeholder}
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className="w-full bg-transparent border-0 border-b border-[color:var(--color-tan)]/70 focus:border-[color:var(--color-bark)] focus:outline-none py-2 font-serif text-lg text-[color:var(--color-bark)] placeholder:text-[color:var(--color-tan)]/70"
        />
      </Field>

      <Field label={rsvpCopy.fields.phone.label}>
        <input
          type="tel"
          placeholder={rsvpCopy.fields.phone.placeholder}
          value={values.phone || ""}
          onChange={(e) => set("phone", e.target.value)}
          className="w-full bg-transparent border-0 border-b border-[color:var(--color-tan)]/70 focus:border-[color:var(--color-bark)] focus:outline-none py-2 font-serif text-lg text-[color:var(--color-bark)] placeholder:text-[color:var(--color-tan)]/70"
        />
      </Field>

      <Field label={`${rsvpCopy.fields.attending.label} *`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {[
            { value: "accept", label: "Joyfully Accept" },
            { value: "decline", label: "Regretfully Decline" },
          ].map((opt) => {
            const active = values.attending === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => set("attending", opt.value as RsvpInput["attending"])}
                className={cn(
                  "relative torn-top torn-bottom py-5 px-4 font-serif uppercase tracking-[0.22em] text-sm transition-colors",
                  active
                    ? "bg-[color:var(--color-coral)]/20 text-[color:var(--color-bark)] border border-[color:var(--color-coral)]"
                    : "bg-[color:var(--color-paper)]/70 text-[color:var(--color-ink)]/75 border border-[color:var(--color-tan)]/50 hover:border-[color:var(--color-bark)]/60",
                )}
              >
                <span className="inline-flex items-center gap-2 justify-center w-full">
                  {active && <Check size={16} strokeWidth={1.5} className="text-[color:var(--color-coral)]" />}
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </Field>

      <Field label={`${rsvpCopy.fields.guests.label} *`}>
        <div className="flex flex-wrap gap-2 mt-2">
          {rsvpCopy.guestOptions.map((opt) => {
            const active = values.guests === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => set("guests", opt.value as RsvpInput["guests"])}
                className={cn(
                  "px-4 py-2 font-serif text-sm tracking-[0.14em] uppercase transition-colors border",
                  active
                    ? "bg-[color:var(--color-bark)] text-[color:var(--color-paper)] border-[color:var(--color-bark)]"
                    : "bg-transparent text-[color:var(--color-bark)] border-[color:var(--color-tan)]/60 hover:border-[color:var(--color-bark)]",
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label={rsvpCopy.fields.dietary.label}>
        <textarea
          rows={3}
          placeholder={rsvpCopy.fields.dietary.placeholder}
          value={values.dietary || ""}
          onChange={(e) => set("dietary", e.target.value)}
          className="w-full bg-[color:var(--color-paper)]/60 border border-[color:var(--color-tan)]/40 focus:border-[color:var(--color-bark)] focus:outline-none py-3 px-4 font-serif text-[color:var(--color-bark)] placeholder:text-[color:var(--color-tan)]/70 resize-none"
        />
      </Field>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm font-serif italic text-[color:var(--color-coral)]"
          >
            {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="stamp-btn stamp-btn-coral w-full md:w-auto justify-center disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : rsvpCopy.submit}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="tracked-label">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
