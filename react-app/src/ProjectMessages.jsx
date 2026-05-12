import { useState } from "react";

const BADGE_STYLES = {
  QUOTE:    { color: "#4a1e8a", bg: "#f0eafd" },
  DECISION: { color: "#0a6636", bg: "#e0f5ec" },
  MATCH:    { color: "#0b4f6e", bg: "#e0f0f8" },
  SYSTEM:   { color: "#5a5a5a", bg: "#f0f0f0" },
};

const INITIAL_MESSAGES = [
  { id: 1,  read: false, badge: "QUOTE",    date: "11 May 2026, 14:31", title: "New Quote Submitted",           body: "Naidoo Building Projects has submitted QUO-2026-0002 totalling R 102 189,00 (incl. VAT). Log in to review it." },
  { id: 2,  read: false, badge: "DECISION", date: "8 May 2026, 16:42",  title: "You Accepted a Quote",          body: 'You accepted QUO-2026-0001 — R 42 791,50 (incl. VAT) from Henry\'s construction TN for "Modern Family Home Extension". The project will now proceed to the next stage.' },
  { id: 3,  read: false, badge: "QUOTE",    date: "8 May 2026, 14:41",  title: "New Quote Submitted",           body: "Henry's construction TN has submitted QUO-2026-0001 totalling R 42 791,50 (incl. VAT). Log in to review it." },
  { id: 4,  read: false, badge: "MATCH",    date: "8 May 2026, 13:45",  title: "Builders Assigned to Your Project", body: '2 builder(s) have been invited to quote on "Modern Family Home Extension": Naidoo Building Projects, Henry\'s construction TN.' },
  { id: 5,  read: true,  badge: "SYSTEM",   date: "8 May 2026, 13:44",  title: "Project Submitted Successfully", body: 'Your project "Modern Family Home Extension" has been submitted and is under review.' },
  { id: 6,  read: true,  badge: "SYSTEM",   date: "8 May 2026, 13:44",  title: "Project Submitted Successfully", body: 'Your project "Modern Family Home Extension" has been submitted and is under review.' },
  { id: 7,  read: true,  badge: "SYSTEM",   date: "8 May 2026, 13:31",  title: "Project Submitted Successfully", body: 'Your project "Modern Family Home Extension" has been submitted and is under review.' },
  { id: 8,  read: true,  badge: "MATCH",    date: "8 May 2026, 13:18",  title: "Builders Assigned to Your Project", body: '5 builder(s) have been invited to quote on "Modern Family Home Extension": Naidoo Building Projects, Molefe Developments, EV Bou, DCP Builders, Henry\'s construction TN.' },
  { id: 9,  read: true,  badge: "SYSTEM",   date: "8 May 2026, 13:18",  title: "Project Submitted Successfully", body: 'Your project "Modern Family Home Extension" has been submitted and is under review.' },
];

const ITEMS_PER_PAGE = 6;

function Badge({ type }) {
  const s = BADGE_STYLES[type] ?? { color: "#555", bg: "#eee" };
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: "0.08em",
      background: s.bg,
      color: s.color,
    }}>
      {type}
    </span>
  );
}

function UnreadDot() {
  return (
    <div style={{
      width: 7, height: 7,
      borderRadius: "50%",
      background: "#3a7bd5",
      flexShrink: 0,
      marginTop: 2,
    }} />
  );
}

export default function ProjectMessages() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all"); // "all" | "unread"

  const filtered = filter === "unread"
    ? messages.filter((m) => !m.read)
    : messages;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const unreadCount = messages.filter((m) => !m.read).length;

  function handleSelect(id) {
    setSelected((prev) => (prev === id ? null : id));
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  }

  function markAllRead() {
    setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
  }

  return (
    <div style={{
      fontFamily: "'Trebuchet MS', sans-serif",
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      overflow: "hidden",
      maxWidth: 680,
      margin: "24px auto",
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
    }}>

      {/* Header */}
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid #efefef",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>Project Activity</span>
          {unreadCount > 0 && (
            <span style={{
              fontSize: 10, fontWeight: 700,
              background: "#3a7bd5", color: "#fff",
              borderRadius: 10, padding: "2px 7px",
            }}>
              {unreadCount} unread
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Filter toggle */}
          <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #e0e0e0" }}>
            {["all", "unread"].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setPage(1); }}
                style={{
                  padding: "4px 10px",
                  fontSize: 10,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: filter === f ? "#3a7bd5" : "#fff",
                  color: filter === f ? "#fff" : "#888",
                  textTransform: "capitalize",
                }}
              >
                {f}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{
                fontSize: 10, fontWeight: 600,
                color: "#3a7bd5", background: "none",
                border: "none", cursor: "pointer", padding: 0,
              }}
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Message rows */}
      <div>
        {paged.length === 0 && (
          <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 12, color: "#aaa" }}>
            No messages to show.
          </div>
        )}
        {paged.map((msg, i) => {
          const isSelected = selected === msg.id;
          const isEven = i % 2 === 0;
          return (
            <div
              key={msg.id}
              onClick={() => handleSelect(msg.id)}
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid #f0f0f0",
                background: isSelected
                  ? "#eef5ff"
                  : msg.read
                  ? (isEven ? "#fff" : "#fafafa")
                  : (isEven ? "#f7f9ff" : "#f2f6ff"),
                cursor: "pointer",
                transition: "background 0.12s",
              }}
            >
              {/* Top row: badge + date + unread dot */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {!msg.read && <UnreadDot />}
                  <Badge type={msg.badge} />
                </div>
                <span style={{ fontSize: 10, color: "#bbb", whiteSpace: "nowrap" }}>{msg.date}</span>
              </div>

              {/* Title */}
              <div style={{
                fontSize: 12,
                fontWeight: msg.read ? 600 : 700,
                color: msg.read ? "#555" : "#1a1a1a",
                marginBottom: isSelected ? 6 : 0,
                paddingLeft: !msg.read ? 15 : 0,
              }}>
                {msg.title}
              </div>

              {/* Body — shown when selected */}
              {isSelected && (
                <div style={{
                  fontSize: 11,
                  color: "#666",
                  lineHeight: 1.55,
                  paddingLeft: !msg.read ? 15 : 0,
                  marginTop: 2,
                }}>
                  {msg.body}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: "9px 16px",
        borderTop: "1px solid #efefef",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 11, color: "#aaa" }}>
          Page {page} of {Math.max(1, totalPages)}
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              fontSize: 11, padding: "3px 10px",
              border: "1px solid #ddd", borderRadius: 4,
              background: page === 1 ? "#f5f5f5" : "#fff",
              color: page === 1 ? "#ccc" : "#555",
              cursor: page === 1 ? "default" : "pointer",
            }}
          >
            ← Prev
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            style={{
              fontSize: 11, padding: "3px 10px",
              border: "1px solid #ddd", borderRadius: 4,
              background: (page === totalPages || totalPages === 0) ? "#f5f5f5" : "#fff",
              color: (page === totalPages || totalPages === 0) ? "#ccc" : "#555",
              cursor: (page === totalPages || totalPages === 0) ? "default" : "pointer",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
