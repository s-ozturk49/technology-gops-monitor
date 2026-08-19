import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Checkbox, Field, Button, Input, Table, Select, type TableColumnDef } from "@takeoff-ui/react-spar";
import { btthKayitlari } from "../mock";
import type { Btth, Oncelik } from "../types";
import { useKayitlar } from "../store/kayitlar";

import { PriorityChip } from "../components/PriorityChip";
import { StatusBadge } from "../components/StatusBadge";
import { YeniTalepModal } from "../components/YeniTalepModal";

const ONCELIK_AGIRLIK: Record<Oncelik, number> = {
  Kritik: 4,
  Yüksek: 3,
  Orta: 2,
  Düşük: 1,
};

const TARIH_FORMATTER = new Intl.DateTimeFormat("tr-TR");

function eslesiyorMu(k: Btth, q: string): boolean {
  if (!q) return true;
  return (
    k.id.toLocaleLowerCase("tr").includes(q) ||
    k.baslik.toLocaleLowerCase("tr").includes(q) ||
    k.talepEden.toLocaleLowerCase("tr").includes(q) ||
    k.birim.toLocaleLowerCase("tr").includes(q)
  );
}

type Props = {
  userName: string;
};

export function TaleplerPage({ userName }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Dinamik Kayıtlar Hook Entegrasyonu
  const { kayitlar, ekle: handleTalepEkle } = useKayitlar<Btth>(btthKayitlari);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL Query Parametreleri
  const urlArama = searchParams.get("arama") || "";
  const durum = searchParams.get("durum") || "";
  const oncelik = searchParams.get("oncelik") || "";
  const baslangic = searchParams.get("baslangic") || "";
  const bitis = searchParams.get("bitis") || "";
  const sadeceAciklar = searchParams.get("acik") === "true";

  const [aramaInput, setAramaInput] = useState(urlArama);
  const currentSearch = searchParams.toString();

  // Kolon Tanımları
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
        accessor: (row) => ONCELIK_AGIRLIK[row.oncelik],
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
        cell: (ctx) => TARIH_FORMATTER.format(new Date(ctx.row.original.olusturmaTarihi)),
        sortable: true,
      },
    ],
    [currentSearch]
  );

  // URL'den Arama Input'una Senkronizasyon
  useEffect(() => {
    setAramaInput(urlArama);
  }, [urlArama]);

  // URL Parametre Güncelleme Yardımcısı
  const updateParam = useCallback(
    (key: string, value: string) => {
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
    },
    [setSearchParams]
  );

  // Input Arama Debounce (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (aramaInput !== urlArama) {
        updateParam("arama", aramaInput);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [aramaInput, urlArama, updateParam]);

  const aktifFiltreSayisi = [
    sadeceAciklar,
    Boolean(urlArama.trim()),
    Boolean(durum),
    Boolean(oncelik),
    Boolean(baslangic),
    Boolean(bitis),
  ].filter(Boolean).length;

  const filtreleriTemizle = useCallback(() => {
    setAramaInput("");
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // Filtreleme Mantığı
  const filtreliKayitlar = useMemo(() => {
    const q = urlArama.trim().toLocaleLowerCase("tr");

    return kayitlar.filter((k) => {
      if (sadeceAciklar && (k.durum === "Tamamlandı" || k.durum === "Reddedildi")) {
        return false;
      }
      if (q && !eslesiyorMu(k, q)) {
        return false;
      }
      if (durum && k.durum !== durum) {
        return false;
      }
      if (oncelik && k.oncelik !== oncelik) {
        return false;
      }

      const kayitTarihiStr = k.olusturmaTarihi.slice(0, 10);

      if (baslangic && kayitTarihiStr < baslangic) {
        return false;
      }
      if (bitis && kayitTarihiStr > bitis) {
        return false;
      }

      return true;
    });
  }, [kayitlar, sadeceAciklar, urlArama, durum, oncelik, baslangic, bitis]);

  return (
    <div>
      {/* Üst Başlık & Ekleme Butonu */}
      <div style={styles.headerRow}>
        <div style={styles.titleGroup}>
          <h1 style={styles.title}>Talepler (BTTH)</h1>
          <span style={styles.countBadge}>{filtreliKayitlar.length} Kayıt</span>
        </div>

        <YeniTalepModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          kayitlar={kayitlar}
          onEkle={handleTalepEkle}
        />
      </div>

      {/* Kullanıcı Karşılama ve Filtre Alanı */}
      <div style={{ marginBottom: "24px" }}>
        <p style={styles.welcomeText}>
          Hoş geldin, <strong>{userName}</strong>!
        </p>

        {/* Filtre Barı */}
        <div style={styles.filterContainer}>
          {/* Üst Satır: Arama Kutusu ve Checkbox */}
          <div style={styles.flexRow}>
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
              <Field.Label style={styles.checkboxLabel}>Sadece açık talepler</Field.Label>
            </Field>
          </div>

          {/* Alt Satır: Select, Tarih Filtreleri ve Temizle Butonu */}
          <div style={styles.flexRow}>
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

            {/* Tarih Seçiciler */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={styles.datePickerGroup}>
                <label htmlFor="baslangic-tarih" style={styles.dateLabel}>
                  Başlangıç:
                </label>
                <input
                  id="baslangic-tarih"
                  type="date"
                  value={baslangic}
                  onChange={(e) => updateParam("baslangic", e.target.value)}
                  style={styles.dateInput}
                />
              </div>

              <div style={styles.datePickerGroup}>
                <label htmlFor="bitis-tarih" style={styles.dateLabel}>
                  Bitiş:
                </label>
                <input
                  id="bitis-tarih"
                  type="date"
                  value={bitis}
                  onChange={(e) => updateParam("bitis", e.target.value)}
                  style={styles.dateInput}
                />
              </div>
            </div>

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

// Stil Nesneleri
const styles = {
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap" as const,
    gap: "12px",
  },
  titleGroup: { display: "flex", alignItems: "center", gap: "12px" },
  title: { fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 },
  countBadge: {
    fontSize: 14,
    fontWeight: 600,
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    padding: "4px 10px",
    borderRadius: "16px",
  },
  welcomeText: { color: "#475569", fontSize: 16, marginTop: 0, marginBottom: "16px" },
  filterContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    borderTop: "1px solid #e2e8f0",
    paddingTop: "16px",
  },
  flexRow: { display: "flex", gap: "12px", flexWrap: "wrap" as const, alignItems: "center" },
  checkboxLabel: { fontSize: 14, color: "#334155", cursor: "pointer", margin: 0 },
  datePickerGroup: { display: "flex", alignItems: "center", gap: "6px" },
  dateLabel: { fontSize: 13, color: "#64748b", whiteSpace: "nowrap" as const },
  dateInput: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: 14,
    color: "#0f172a",
    backgroundColor: "#ffffff",
    colorScheme: "light",
    outline: "none",
  },
};