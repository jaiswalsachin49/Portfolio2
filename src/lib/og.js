// Shared layout for generated social preview images (1200×630).
export const ogSize = { width: 1200, height: 630 };

export function OgCard({ kicker, title, subtitle, chips = [] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0a0a0a",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#a1a1aa" }}>
        <div style={{ width: 14, height: 14, borderRadius: 999, background: "#fb7a2c" }} />
        {kicker}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{title}</div>
        <div style={{ marginTop: 20, fontSize: 34, color: "#a1a1aa", lineHeight: 1.3 }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        {chips.map((c) => (
          <div
            key={c}
            style={{
              display: "flex",
              padding: "10px 20px",
              border: "1px solid #333",
              borderRadius: 12,
              fontSize: 24,
              color: "#e4e4e7",
              background: "#111",
            }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
