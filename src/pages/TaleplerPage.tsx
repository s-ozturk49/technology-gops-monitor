import { useState } from "react";
import { RecordCard } from "../components/RecordCard";
import { Checkbox, Field } from "@takeoff-ui/react-spar";
import { btthKayitlari } from "../mock";

type Props = {
  userName: string;
};

export function TaleplerPage({ userName }: Props) {
  const [sadeceAciklar, setSadeceAciklar] = useState(false);

  // Açık talepler: Tamamlandı ve Reddedildi olmayanlar
  const filtrelenmisTalepler = sadeceAciklar
    ? btthKayitlari.filter(
        (t) => t.durum !== "Tamamlandı" && t.durum !== "Reddedildi"
      )
    : btthKayitlari;

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

          {/* TakeoffUI Compound Checkbox Alanı */}
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