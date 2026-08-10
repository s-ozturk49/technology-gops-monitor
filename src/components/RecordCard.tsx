import type { Btth } from "../types/btth";
import { StatusBadge } from "./StatusBadge";
import { PriorityChip } from "./PriorityChip";

export function RecordCard({ record }: { record: Btth }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        padding: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Üst Kısım: Rozetler & Tarih */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <PriorityChip oncelik={record.oncelik} />
          <StatusBadge durum={record.durum} />
        </div>
        <span style={{ fontSize: 12, color: "#64748b" }}>
          {record.olusturmaTarihi}
        </span>
      </div>

      {/* Orta Kısım: Başlık & ID */}
      <div>
        <span
          style={{
            fontSize: 11,
            color: "#94a3b8",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          #{record.id}
        </span>
        <h3
          style={{
            margin: "4px 0 0 0",
            fontSize: 16,
            fontWeight: 600,
            color: "#0f172a",
          }}
        >
          {record.baslik}
        </h3>
      </div>

      {/* Alt Kısım: Talep Eden & Birim */}
      <div
        style={{
          borderTop: "1px solid #f1f5f9",
          paddingTop: "8px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: "#475569",
        }}
      >
        <div>
          <strong style={{ fontWeight: 500 }}>Talep Eden:</strong>{" "}
          {record.talepEden}
        </div>
        <div>
          <strong style={{ fontWeight: 500 }}>Birim:</strong> {record.birim}
        </div>
      </div>
    </div>
  );
}