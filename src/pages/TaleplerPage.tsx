import { useState } from "react";
import { Checkbox, Field, Button, Table, type TableColumnDef } from "@takeoff-ui/react-spar";
import { btthKayitlari } from "../mock";
import type { Btth, Oncelik } from "../types";

import { PriorityChip } from "../components/PriorityChip";
import { StatusBadge } from "../components/StatusBadge";

// 1. BILEŞEN DIŞI SABİTLER
const oncelikAgirlik: Record<Oncelik, number> = {
  Kritik: 4,
  Yüksek: 3,
  Orta: 2,
  Düşük: 1,
};

const tarihFormat = new Intl.DateTimeFormat("tr-TR");

const sutunlar: TableColumnDef<Btth>[] = [
  {
    id: "id",
    header: "Talep No",
    accessor: "id",
    sortable: true,
  },
  {
    id: "baslik",
    header: "Başlık",
    accessor: "baslik",
    sortable: true,
  },
  {
    id: "talepEden",
    header: "Talep Eden",
    accessor: "talepEden",
  },
  {
    id: "birim",
    header: "Birim",
    accessor: "birim",
  },
  {
    id: "oncelik",
    header: "Öncelik",
    accessor: (row) => oncelikAgirlik[row.oncelik],
    cell: (ctx) => <PriorityChip oncelik={ctx.row.original.oncelik} />,
    sortable: true,
  },
  {
    id: "durum",
    header: "Durum",
    accessor: "durum",
    cell: (ctx) => <StatusBadge durum={ctx.row.original.durum} />,
  },
  {
    id: "olusturmaTarihi",
    header: "Oluşturma",
    accessor: "olusturmaTarihi",
    cell: (ctx) => tarihFormat.format(new Date(ctx.row.original.olusturmaTarihi)),
    sortable: true,
  },
];

// 2. ANA SAYFA BİLEŞENİ
type Props = {
  userName: string;
};

export function TaleplerPage({ userName }: Props) {
  const [sadeceAciklar, setSadeceAciklar] = useState(false);

  // Açık talepler filtrelemesi
  const filtrelenmisTalepler = sadeceAciklar
    ? btthKayitlari.filter(
        (t) => t.durum !== "Tamamlandı" && t.durum !== "Reddedildi"
      )
    : btthKayitlari;

  return (
    <div>
      {/* Üst Başlık & Sağ Buton Alanı */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Talepler (BTTH)
          </h1>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#64748b",
              backgroundColor: "#f1f5f9",
              padding: "4px 10px",
              borderRadius: "16px",
            }}
          >
            {filtrelenmisTalepler.length} Kayıt
          </span>
        </div>

        <Button variant="primary">Yeni Talep</Button>
      </div>

      {/* Kullanıcı Karşılama ve Filtre Alanı */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ color: "#475569", fontSize: 16, marginTop: "0", marginBottom: "16px" }}>
          Hoş geldin, <strong>{userName}</strong>!
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "16px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#334155", margin: 0 }}>
            Mevcut Talepler
          </h2>

          <Field style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Checkbox
              checked={sadeceAciklar}
              onChange={(checked) => setSadeceAciklar(checked === true)}
            >
              <Checkbox.Indicator />
            </Checkbox>
            <Field.Label style={{ fontSize: 14, color: "#334155", cursor: "pointer", margin: 0 }}>
              Sadece açık talepler
            </Field.Label>
          </Field>
        </div>
      </div>

      {/* 3. ADIM 3 PROPLARI EKLENMİŞ GÜNCEL TABLE BİLEŞENİ */}
      <Table
        data={filtrelenmisTalepler}
        columns={sutunlar}
        getRowId={(row) => row.id}
        sorting={{}}
        pagination={{ pageSize: 10 }}
        emptyState={<div style={{ padding: "24px", textAlign: "center", color: "#64748b" }}>Kayıt bulunamadı.</div>}
        striped
      />
    </div>
  );
}