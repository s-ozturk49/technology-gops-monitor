import type { CSSProperties } from "react";

export type SeveritySeviye = "Kritik" | "Yüksek" | "Orta" | "Düşük";

type Props = {
  seviye: SeveritySeviye | string;
};

const SEVERITY_STYLES: Record<string, CSSProperties> = {
  Kritik: {
    backgroundColor: "#fef2f2",
    color: "#991b1b",
    borderColor: "#fecaca",
  },
  Yüksek: {
    backgroundColor: "#fff7ed",
    color: "#c2410c",
    borderColor: "#fed7aa",
  },
  Orta: {
    backgroundColor: "#fefce8",
    color: "#a16207",
    borderColor: "#fef08a",
  },
  Düşük: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    borderColor: "#e2e8f0",
  },
};

const DEFAULT_STYLE: CSSProperties = {
  backgroundColor: "#f8fafc",
  color: "#64748b",
  borderColor: "#cbd5e1",
};

export function SeverityBadge({ seviye }: Props) {
  const customStyle = SEVERITY_STYLES[seviye] || DEFAULT_STYLE;

  return (
    <span style={{ ...styles.badge, ...customStyle }}>
      <span style={{ ...styles.dot, backgroundColor: customStyle.color }} />
      {seviye}
    </span>
  );
}

const styles = {
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600,
    border: "1px solid",
    whiteSpace: "nowrap" as const,
    lineHeight: "1.4",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
  },
};