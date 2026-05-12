import { useState } from "react";

const EVENT_TYPES = {
  "Quote Accepted":    { color: "#0a6636", bg: "#e0f5ec", dot: "#22a86e" },
  "Quote Submitted":   { color: "#0b4f6e", bg: "#e0f0f8", dot: "#2e8fb0" },
  "Builders Assigned": { color: "#7a3e00", bg: "#fdeede", dot: "#e07a10" },
  "Project Submitted": { color: "#0b4f6e", bg: "#e0f0f8", dot: "#2e8fb0" },
};

const LEGEND = [
  { label: "Quote",    dot: "#22a86e" },
  { label: "Project",  dot: "#2e8fb0" },
  { label: "Builders", dot: "#e07a10" },
];

const ITEMS_PER_PAGE = 8;

const ALL_EVENTS = [
  { date: "08 May 2026", time: "16:42", type: "Quote Accepted",    detail: "Client accepted QUO-2026-0001 from Henry's construction TN — R 42 791,50 (incl. VAT)." },
  { date: "08 May 2026", time: "14:41", type: "Quote Submitted",   detail: "Henry's construction TN submitted QUO-2026-0001 — R 42 791,50 (incl. VAT)." },
  { date: "08 May 2026", time: "13:45", type: "Builders Assigned", detail: "2 builder(s) invited to quote: Naidoo Building Projects, Henry's construction TN." },
  { date: "08 May 2026", time: "13:44", type: "Project Submitted", detail: 'Project "Modern Family Home Extension" submitted for admin review.' },
  { date: "08 May 2026", time: "13:44", type: "Project Submitted", detail: 'Project "Modern Family Home Extension" submitted for admin review.' },
  { date: "08 May 2026", time: "13:31", type: "Project Submitted", detail: 'Project "Modern Family Home Extension" submitted for admin review.' },
  { date: "08 May 2026", time: "13:18", type: "Builders Assigned", detail: "5 builder(s) invited: Naidoo Building Projects, Molefe Developments, EV Bou, DCP Builders, Henry's construction TN." },
  { date: "08 May 2026", time: "13:17", type: "Project Submitted", detail: 'Project "Modern Family Home Extension" submitted for admin review.' },
  { date: "07 May 2026", time: "11:05", type: "Quote Submitted",   detail: "Molefe Developments submitted QUO-2026-0002 — R 38 500,00 (incl. VAT)." },
  { date: "07 May 2026", time: "10:30", type: "Builders Assigned", detail: "3 builder(s) invited to quote: Molefe Developments, EV Bou, DCP Builders." },
  { date: "07 May 2026", time: "09:15", type: "Project Submitted", detail: 'Project "Modern Family Home Extension" submitted for admin review.' },
  { date: "06 May 2026", time: "15:00", type: "Quote Accepted",    detail: "Client accepted QUO-2026-0002 from Molefe Developments — R 38 500,00 (incl. VAT)." },
];

function Badge({ type }) {
  const style = EVENT_TYPES[type] ?? { color: "#555", bg: "#eee" };
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 10,
      fontSize: 10,
      fontWeight: 700,
      whiteSpace: "nowrap",
      background: style.bg,
      color: style.color,
    }}>
      {type}
    </span>
  );
}

export default function ActivityTimeline() {
  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  const totalPages = Math.ceil(ALL_EVENTS.length / ITEMS_PER_PAGE);
  const pageEvents = ALL_EVENTS.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div style={{
      fontFamily: "'Trebuchet MS', sans-serif",
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      overflow: "hidden",
      maxWidth: 860,
      margin: "24px auto",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    }}>

      {/* Header */}
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid #efefef",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Activity Timeline</span>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {LEGEND.map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.dot }} />
              <span style={{ fontSize: 10, color: "#888" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#fafafa", borderBottom: "1px solid #efefef" }}>
            {["Time", "Event", "Detail"].map((h) => (
              <th key={h} style={{
                padding: "8px 14px",
                textAlign: "left",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#aaa",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageEvents.map((event, i) => {
            const isEven = i % 2 === 0;
            const isHovered = hoveredRow === i;
            return (
              <tr
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  borderBottom: "1px solid #f5f5f5",
                  background: isHovered ? "#eef5ff" : isEven ? "#fff" : "#fafafa",
                  transition: "background 0.1s",
                }}
              >
                {/* Time */}
                <td style={{ padding: "9px 14px", width: 110, verticalAlign: "top", whiteSpace: "nowrap" }}>
                  <span style={{ display: "block", fontSize: 10, color: "#bbb" }}>{event.date}</span>
                  <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#666" }}>{event.time}</span>
                </td>

                {/* Badge */}
                <td style={{ padding: "9px 14px", width: 140, verticalAlign: "top" }}>
                  <Badge type={event.type} />
                </td>

                {/* Detail */}
                <td style={{ padding: "9px 14px", fontSize: 11, color: "#555", lineHeight: 1.5, verticalAlign: "top" }}>
                  {event.detail}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer / Pagination */}
      <div style={{
        padding: "10px 16px",
        borderTop: "1px solid #efefef",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 11, color: "#aaa" }}>
          Page {page} of {totalPages}
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              fontSize: 11,
              padding: "4px 12px",
              border: "1px solid #ddd",
              borderRadius: 4,
              background: page === 1 ? "#f5f5f5" : "#fff",
              color: page === 1 ? "#ccc" : "#555",
              cursor: page === 1 ? "default" : "pointer",
            }}
          >
            ← Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              fontSize: 11,
              padding: "4px 12px",
              border: "1px solid #ddd",
              borderRadius: 4,
              background: page === totalPages ? "#f5f5f5" : "#fff",
              color: page === totalPages ? "#ccc" : "#555",
              cursor: page === totalPages ? "default" : "pointer",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
