import type { Oncelik } from "../types/btth";

// Öncelik seviyelerine göre renk eşleşmeleri
const renkler: Record<Oncelik, string> = {
  "Düşük": "#64748b",   // Slate Gray
  "Orta": "#d97706",    // Amber / Turuncu
  "Yüksek": "#ea580c",  // Koyu Turuncu
  "Kritik": "#991b1b",  // Koyu Kırmızı
};

export function PriorityChip({ oncelik }: { oncelik: Oncelik }) {
  return (
    <span
      style={{
        backgroundColor: renkler[oncelik],
        color: "white",
        padding: "2px 8px",
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 500,
        display: "inline-block",
      }}
    >
      {oncelik}
    </span>
  );
}