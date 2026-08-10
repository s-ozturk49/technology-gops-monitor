import type { BtthDurum } from "../types/btth";

const renkler: Record<BtthDurum, string> = {
  Yeni: "#2563eb",
  İncelemede: "#d97706",
  "Onay Bekliyor": "#7c3aed",
  Tamamlandı: "#16a34a",
  Reddedildi: "#dc2626",
};

export function StatusBadge({ durum }: { durum: BtthDurum }) {
  // Tanımsız bir durum gelirse çökmemesi için varsayılan renk (örn: gri)
  const arkaPlanRengi = renkler[durum] ?? "#6b7280";

  return (
    <span
      style={{
        backgroundColor: arkaPlanRengi,
        color: "white",
        padding: "2px 8px",
        borderRadius: 12,
        fontSize: 12,
        display: "inline-block",
      }}
    >
      {durum}
    </span>
  );
}