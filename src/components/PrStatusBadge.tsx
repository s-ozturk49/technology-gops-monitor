import type { CSSProperties } from "react";

export type ProblemDurum =
  | "Yeni"
  | "Kök Neden Analizi"
  | "Kalıcı Çözüm"
  | "Kapandı";

type Props = {
  durum: ProblemDurum | string;
};

const DURUM_STYLES: Record<string, CSSProperties> = {
  Yeni: {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    borderColor: "#bfdbfe",
  },
  "Kök Neden Analizi": {
    backgroundColor: "#faf5ff",
    color: "#7e22ce",
    borderColor: "#e9d5ff",
  },
  "Kalıcı Çözüm": {
    backgroundColor: "#f0fdf4",
    color: "#15803d",
    borderColor: "#bbf7d0",
  },
  Kapandı: {
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

export function PrStatusBadge({ durum }: Props) {
  const customStyle = DURUM_STYLES[durum] || DEFAULT_STYLE;

  return (
    <span style={{ ...styles.badge, ...customStyle }}>
      <span style={{ ...styles.dot, backgroundColor: customStyle.color }} />
      {durum}
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