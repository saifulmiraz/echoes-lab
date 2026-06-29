"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Check, ArrowUpRight } from "lucide-react";
import { pricing } from "@/lib/pricing";

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-primary placeholder:text-muted transition-colors focus:border-signal-cyan/40 focus:outline-none focus:ring-1 focus:ring-signal-cyan/40";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please email me directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl2 border border-signal-cyan/30 bg-surface/60 p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-signal-cyan/15 text-signal-cyan">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-primary">Signal received</h3>
        <p className="mt-2 max-w-sm text-sm text-secondary">
          Thanks — I&apos;ll come back to you within one business day with the right plan or a
          tailored quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl2 border border-line bg-surface/40 p-6 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-secondary">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-secondary">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} placeholder="you@business.com.au" />
        </div>
        <div>
          <label htmlFor="business" className="mb-1.5 block text-sm text-secondary">
            Business <span className="text-muted">(optional)</span>
          </label>
          <input id="business" name="business" autoComplete="organization" className={inputCls} placeholder="Business name" />
        </div>
        <div>
          <label htmlFor="project" className="mb-1.5 block text-sm text-secondary">
            What do you need?
          </label>
          <select id="project" name="project" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Choose a build
            </option>
            {pricing.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm text-secondary">
          A bit about the project
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${inputCls} resize-none`}
          placeholder="What you're building, rough budget, and any deadline."
        />
      </div>

      {/* Honeypot — hidden from people, catches bots. */}
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-signal-magenta">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:shadow-[0_0_40px_-6px_rgba(0,229,255,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Request a quote
            <ArrowUpRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
