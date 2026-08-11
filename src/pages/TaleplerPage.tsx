import { useState } from "react";
import type { Btth } from "../types/btth";
import { RecordCard } from "../components/RecordCard";

const talepler: Btth[] = [
  {
    id: "BTTH-2026-0001",
    baslik: "Yeni kullanıcı hesabı açılması",
    talepEden: "Ayşe Yıldız",
    birim: "İnsan Kaynakları",
    oncelik: "Orta",
    durum: "Tamamlandı",
    olusturmaTarihi: "2026-08-03",
  },
  {
    id: "BTTH-2026-0002",
    baslik: "Yeni kullanıcı hesabı açılması",
    talepEden: "Ahmet Akgül",
    birim: "İnsan Kaynakları",
    oncelik: "Düşük",
    durum: "Yeni",
    olusturmaTarihi: "2026-08-03",
  },
  {
    id: "BTTH-2026-0003",
    baslik: "Yeni kullanıcı hesabı açılması",
    talepEden: "Ali Veli",
    birim: "İnsan Kaynakları",
    oncelik: "Yüksek",
    durum: "Yeni",
    olusturmaTarihi: "2026-08-03",
  },
  {
    id: "BTTH-2026-0004",
    baslik: "Yeni kullanıcı hesabı açılması",
    talepEden: "Fatma Karagül",
    birim: "İnsan Kaynakları",
    oncelik: "Yüksek",
    durum: "Yeni",
    olusturmaTarihi: "2026-08-03",
  },
  {
    id: "BTTH-2026-0005",
    baslik: "Yeni kullanıcı hesabı açılması",
    talepEden: "Zehra Kara",
    birim: "İnsan Kaynakları",
    oncelik: "Orta",
    durum: "Yeni",
    olusturmaTarihi: "2026-08-03",
  },
];

type Props = {
  userName: string;
};

export function TaleplerPage({ userName }: Props) {
  const [sadeceAciklar, setSadeceAciklar] = useState(false);

  const filtrelenmisTalepler = sadeceAciklar
    ? talepler.filter((t) => t.durum !== "Tamamlandı")
    : talepler;

  return (
    <div>
      {/* Sayfa Üst Başlık & Filtre Alanı */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 8px 0" }}>
          Talepler
        </h1>
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
            Mevcut Talepler ({filtrelenmisTalepler.length})
          </h2>

          {/* Checkbox Alanı */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: 14,
              color: "#334155",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={sadeceAciklar}
              onChange={(e) => setSadeceAciklar(e.target.checked)}
              style={{ cursor: "pointer" }}
            />
            Sadece açık talepler
          </label>
        </div>
      </div>

      {/* Kartların Listesi */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "16px",
        }}
      >
        {filtrelenmisTalepler.map((item) => (
          <RecordCard key={item.id} record={item} />
        ))}
      </div>
    </div>
  );
}