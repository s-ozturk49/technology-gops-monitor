import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Checkbox, Field, Button, Input, Table, Select, type TableColumnDef } from "@takeoff-ui/react-spar";
import { btthKayitlari } from "../mock";
import type { Btth, Oncelik } from "../types";

import { PriorityChip } from "../components/PriorityChip";
import { StatusBadge } from "../components/StatusBadge";

// 1. BİLEŞEN DIŞI SABİTLER VE YARDIMCI FONKSİYONLAR
const oncelikAgirlik: Record<Oncelik, number> = {
  Kritik: 4,
  Yüksek: 3,
  Orta: 2,
  Düşük: 1,
};

const tarihFormat = new Intl.DateTimeFormat("tr-TR");

// Metin arama eşleşme kontrolü
function eslesiyorMu(k: Btth, q: string): boolean {
  return (
    k.id.toLocaleLowerCase("tr").includes(q) ||
    k.baslik.toLocaleLowerCase("tr").includes(q) ||
    k.talepEden.toLocaleLowerCase("tr").includes(q) ||
    k.birim.toLocaleLowerCase("tr").includes(q)
  );
}

// 2. ANA SAYFA BİLEŞENİ
type Props = {
  userName: string;
};

export function TaleplerPage({ userName }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Parametrelerinin Okunması
  const urlArama = searchParams.get("arama") || "";
  const durum = searchParams.get("durum") || "";
  const oncelik = searchParams.get("oncelik") || "";
  const baslangic = searchParams.get("baslangic") || "";
  const bitis = searchParams.get("bitis") || "";
  const sadeceAciklar = searchParams.get("acik") === "true";

  // Arama input'u için yerel state
  const [aramaInput, setAramaInput] = useState(urlArama);

  // Mevcut URL parametrelerinin string hali (ör: "durum=Yeni&oncelik=Kritik")
  const currentSearch = searchParams.toString();

  // Sütun tanımlarını `useMemo` içine alarak dinamik URL arama parametrelerini Link'e ekliyoruz
  const sutunlar = useMemo<TableColumnDef<Btth>[]>(
    () => [
      {
        id: "id",
        header: "Talep No",
        accessor: "id",
        cell: (ctx) => (
          <Link
            to={{
              pathname: `/talepler/${ctx.row.original.id}`,
              search: currentSearch ? `?${currentSearch}` : "",
            }}
            style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}
          >
            {ctx.row.original.id}
          </Link>
        ),
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
    ],
    [currentSearch]
  );

  // URL dışarıdan değiştiğinde yerel input state'ini senkronize et
  useEffect(() => {
    setAramaInput(urlArama);
  }, [urlArama]);

  // URL Güncelleme Yardımcı Fonksiyonu
  const updateParam = (key: string, value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        return next;
      },
      { replace: true }
    );
  };

  // Arama için Debounce Mekanizması -> URL'i günceller
  useEffect(() => {
    const timer = setTimeout(() => {
      updateParam("arama", aramaInput.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [aramaInput]);

  // Aktif Filtre Sayısı Hesabı
  const aktifFiltreSayisi = [
    sadeceAciklar,
    Boolean(urlArama),
    Boolean(durum),
    Boolean(oncelik),
    Boolean(baslangic),
    Boolean(bitis),
  ].filter(Boolean).length;

  // Tüm Filtreleri Temizleme Fonksiyonu
  const filtreleriTemizle = () => {
    setAramaInput("");
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const q = urlArama.trim().toLocaleLowerCase("tr");

  // useMemo ile Zincirleme Filtreleme
  const filtreliKayitlar = useMemo(() => {
    return btthKayitlari
      .filter((k) => !sadeceAciklar || (k.durum !== "Tamamlandı" && k.durum !== "Reddedildi"))
      .filter((k) => !q || eslesiyorMu(k, q))
      .filter((k) => !durum || k.durum === durum)
      .filter((k) => !oncelik || k.oncelik === oncelik)
      .filter((k) => !baslangic || k.olusturmaTarihi >= baslangic)
      .filter((k) => !bitis || k.olusturmaTarihi <= bitis);
  }, [sadeceAciklar, q, durum, oncelik, baslangic, bitis]);

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
            {filtreliKayitlar.length} Kayıt
          </span>
        </div>

        <Button variant="primary">Yeni Talep</Button>
      </div>

      {/* Kullanıcı Karşılama ve Filtre Alanı */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ color: "#475569", fontSize: 16, marginTop: "0", marginBottom: "16px" }}>
          Hoş geldin, <strong>{userName}</strong>!
        </p>

        {/* Filtre Barı Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "16px",
          }}
        >
          {/* Üst Satır: Arama Kutusu ve Checkbox */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px", maxWidth: "420px" }}>
              <Input>
                <Input.Field
                  value={aramaInput}
                  onChange={(e) => setAramaInput(e.target.value)}
                  placeholder="Talep no, başlık, kişi veya birim ara..."
                />
              </Input>
            </div>

            <Field style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Checkbox
                checked={sadeceAciklar}
                onChange={(checked) => updateParam("acik", checked === true ? "true" : "")}
              >
                <Checkbox.Indicator />
              </Checkbox>
              <Field.Label style={{ fontSize: 14, color: "#334155", cursor: "pointer", margin: 0 }}>
                Sadece açık talepler
              </Field.Label>
            </Field>
          </div>

          {/* Alt Satır: Select, Native Date Filtreleri ve Temizle Butonu */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            {/* Durum Select */}
            <div style={{ width: "160px" }}>
              <Select value={durum} onChange={(val) => updateParam("durum", val)}>
                <Select.Trigger placeholder={durum || "Durum seç"} />
                <Select.Content>
                  <Select.Item value="">Tümü</Select.Item>
                  <Select.Item value="Yeni">Yeni</Select.Item>
                  <Select.Item value="İncelemede">İncelemede</Select.Item>
                  <Select.Item value="Onay Bekliyor">Onay Bekliyor</Select.Item>
                  <Select.Item value="Tamamlandı">Tamamlandı</Select.Item>
                  <Select.Item value="Reddedildi">Reddedildi</Select.Item>
                </Select.Content>
              </Select>
            </div>

            {/* Öncelik Select */}
            <div style={{ width: "160px" }}>
              <Select value={oncelik} onChange={(val) => updateParam("oncelik", val)}>
                <Select.Trigger placeholder={oncelik || "Öncelik seç"} />
                <Select.Content>
                  <Select.Item value="">Tümü</Select.Item>
                  <Select.Item value="Kritik">Kritik</Select.Item>
                  <Select.Item value="Yüksek">Yüksek</Select.Item>
                  <Select.Item value="Orta">Orta</Select.Item>
                  <Select.Item value="Düşük">Düşük</Select.Item>
                </Select.Content>
              </Select>
            </div>

            {/* Başlangıç Tarihi */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Başlangıç:</span>
              <input
                type="date"
                value={baslangic}
                onChange={(e) => updateParam("baslangic", e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: 14,
                  color: "#0f172a",
                  backgroundColor: "#ffffff",
                  colorScheme: "light",
                  outline: "none",
                }}
              />
            </div>

            {/* Bitiş Tarihi */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Bitiş:</span>
              <input
                type="date"
                value={bitis}
                onChange={(e) => updateParam("bitis", e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: 14,
                  color: "#0f172a",
                  backgroundColor: "#ffffff",
                  colorScheme: "light",
                  outline: "none",
                }}
              />
            </div>

            {/* Filtreleri Temizle Butonu */}
            {aktifFiltreSayisi > 0 && (
              <Button
                appearance="text"
                onClick={filtreleriTemizle}
                style={{ color: "#ef4444", marginLeft: "auto" }}
              >
                Filtreleri temizle ({aktifFiltreSayisi} filtre aktif)
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tablo */}
      <Table
        data={filtreliKayitlar}
        columns={sutunlar}
        getRowId={(row) => row.id}
        sorting={{}}
        pagination={{ pageSize: 10 }}
        emptyState={
          <div style={{ padding: "32px 16px", textAlign: "center", color: "#64748b" }}>
            <p style={{ margin: "0 0 12px 0", fontSize: "15px" }}>
              Aradığınız kriterlere uygun talep bulunamadı.
            </p>
            {aktifFiltreSayisi > 0 && (
              <Button appearance="text" onClick={filtreleriTemizle} style={{ color: "#2563eb" }}>
                Filtreleri temizle
              </Button>
            )}
          </div>
        }
        striped
      />
    </div>
  );
}