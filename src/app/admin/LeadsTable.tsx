"use client";

import { useState, useTransition } from "react";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/leads";
import { setLeadStatus } from "./actions";

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  contacted: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  quoted: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  won: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  lost: "bg-white/10 text-white/40 border-white/15",
};

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact",
  quote: "Quote",
  discovery: "Discovery",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function fullName(lead: Lead) {
  return [lead.first_name, lead.last_name].filter(Boolean).join(" ") || "—";
}

function StatusSelect({ lead }: { lead: Lead }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      value={lead.status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => {
          setLeadStatus(lead.id, e.target.value);
        })
      }
      onClick={(e) => e.stopPropagation()}
      className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-semibold capitalize outline-none transition disabled:opacity-50 ${STATUS_STYLES[lead.status]}`}
    >
      {LEAD_STATUSES.map((s) => (
        <option key={s} value={s} className="bg-[#111] text-white">
          {s}
        </option>
      ))}
    </select>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div>
      <dt className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">{label}</dt>
      <dd className="mt-0.5 text-sm text-white/80">{value}</dd>
    </div>
  );
}

function LeadRow({ lead }: { lead: Lead }) {
  const [open, setOpen] = useState(false);
  const data = (lead.data ?? {}) as Record<string, unknown>;
  const extra = Object.entries(data).filter(
    ([, v]) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)
  );

  return (
    <>
      <tr
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer border-t border-white/[0.06] transition hover:bg-white/[0.025]"
      >
        <td className="whitespace-nowrap px-4 py-3 text-xs text-white/50">{formatDate(lead.created_at)}</td>
        <td className="px-4 py-3 text-sm font-medium text-white">{fullName(lead)}</td>
        <td className="px-4 py-3">
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs text-white/70">
            {TYPE_LABELS[lead.type] ?? lead.type}
          </span>
        </td>
        <td className="px-4 py-3 text-sm text-white/65">{lead.service || "—"}</td>
        <td className="px-4 py-3 text-sm text-white/65">{lead.budget || "—"}</td>
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <StatusSelect lead={lead} />
        </td>
        <td className="px-4 py-3 text-right text-white/30">{open ? "▾" : "▸"}</td>
      </tr>
      {open && (
        <tr className="border-t border-white/[0.06] bg-black/30">
          <td colSpan={7} className="px-4 py-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Detail
                label="Email"
                value={lead.email ? <a href={`mailto:${lead.email}`} className="text-[#ff7a7f] hover:underline">{lead.email}</a> : null}
              />
              <Detail
                label="Phone"
                value={lead.phone ? <a href={`tel:${lead.phone}`} className="text-[#ff7a7f] hover:underline">{lead.phone}</a> : null}
              />
              {extra.map(([k, v]) => (
                <Detail key={k} label={k} value={Array.isArray(v) ? v.join(", ") : String(v)} />
              ))}
            </div>
            {lead.message && (
              <div className="mt-4">
                <dt className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">Message</dt>
                <dd className="mt-1 whitespace-pre-wrap rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-sm leading-relaxed text-white/75">
                  {lead.message}
                </dd>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-12 text-center text-sm text-white/45">
        No leads match this filter yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.015]">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/35">
            <th className="px-4 py-3 font-display">Date</th>
            <th className="px-4 py-3 font-display">Name</th>
            <th className="px-4 py-3 font-display">Type</th>
            <th className="px-4 py-3 font-display">Service</th>
            <th className="px-4 py-3 font-display">Budget</th>
            <th className="px-4 py-3 font-display">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
