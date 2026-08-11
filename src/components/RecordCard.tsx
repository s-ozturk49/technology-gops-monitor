import { Card } from '@takeoff-ui/react-spar';
import type { Btth } from "../types/btth";
import { StatusBadge } from "./StatusBadge";
import { PriorityChip } from "./PriorityChip";

export function RecordCard({ record }: { record: Btth }) {
  return (
    <Card>
      {/* Üst Kısım: Rozetler & Tarih */}
      <Card.Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <PriorityChip oncelik={record.oncelik} />
          <StatusBadge durum={record.durum} />
        </div>
        <span style={{ fontSize: 12, color: "#64748b" }}>
          {record.olusturmaTarihi}
        </span>
      </Card.Header>

      {/* Orta Kısım: ID & Başlık */}
      <Card.Body>
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
        <Card.Title style={{ margin: "4px 0 0 0", fontSize: 16, fontWeight: 600 }}>
          {record.baslik}
        </Card.Title>
      </Card.Body>

      {/* Alt Kısım: Talep Eden & Birim */}
      <Card.Footer
        style={{
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
      </Card.Footer>
    </Card>
  );
}