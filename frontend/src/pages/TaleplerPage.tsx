import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Checkbox, Field, Button, Table, type TableColumnDef } from "@takeoff-ui/react-spar";
import { btthKayitlari } from "../mock";
import type { Btth, Oncelik } from "../types";
import { useKayitlar } from "../store/kayitlar";
import { FiltreCubugu, type FiltreTanimi } from "../components/FiltreCubugu";

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

// Config-Driven Filtre Tanımları
const filtreTanimlari: FiltreTanimi[] = [
  { tip: "arama", anahtar: "arama", placeholder: "Talep no, başlık, kişi veya birim ara..." },
  {
    tip: "secim",
    anahtar: "durum",
    etiket: "Durum seç",
    secenekler: ["Yeni", "İncelemede", "Onay Bekliyor", "Tamamlandı", "Reddedildi"],
  },
  {
    tip: "secim",
    anahtar: "oncelik",
    etiket: "Öncelik seç",
    secenekler: ["Düşük", "Orta", "Yüksek", "Kritik"],
  },
  { tip: "tarihAraligi", anahtar: "baslangic", etiket: "Başlangıç" },
  { tip: "tarihAraligi", anahtar: "bitis", etiket: "Bitiş" },
];

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

  // Kayıtlar Store
  const { kayitlar, ekle: handleTalepEkle } = useKayitlar<Btth>(btthKayitlari);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL Query Parametreleri
  const urlArama = searchParams.get("arama") || "";
  const durum = searchParams.get("durum") || "";
  const oncelik = searchParams.get("oncelik") || "";
  const baslangic = searchParams.get("baslangic") || "";
  const bitis = searchParams.get("bitis") || "";
  const sadeceAciklar = searchParams.get("acik") === "true";

  // Arama input'u için yerel durum (Debounce için)
  const [aramaInput, setAramaInput] = useState(urlArama);
  const currentSearch = searchParams.toString();

  // Tablo Kolon Tanımları
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

  // Filtre Değişikliği Yönlendiricisi
  const handleFiltreDegisiklik = useCallback(
    (anahtar: string, yeniDeger: string) => {
      if (anahtar === "arama") {
        setAramaInput(yeniDeger);
      } else {
        updateParam(anahtar, yeniDeger);
      }
    },
    [updateParam]
  );

  // Aktif Filtre Sayısı ve Temizleme
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

  // Filtre Çubuğu İçin Değerler Objesi
  const filtreDegerleri = useMemo(
    () => ({
      arama: aramaInput,
      durum,
      oncelik,
      baslangic,
      bitis,
    }),
    [aramaInput, durum, oncelik, baslangic, bitis]
  );

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

        {/* Filtre Alanı */}
        <div style={styles.filterContainer}>
          <div style={styles.filterRow}>
            {/* Config-Driven Ortak Filtre Çubuğu */}
            <FiltreCubugu
              tanimlar={filtreTanimlari}
              degerler={filtreDegerleri}
              onDegisiklik={handleFiltreDegisiklik}
            />

            {/* Ek Filtre Elemanları: Sadece Açıklar Checkbox */}
            <Field style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Checkbox
                checked={sadeceAciklar}
                onChange={(checked) => updateParam("acik", checked === true ? "true" : "")}
              >
                <Checkbox.Indicator />
              </Checkbox>
              <Field.Label style={styles.checkboxLabel}>Sadece açık talepler</Field.Label>
            </Field>

            {/* Temizle Butonu */}
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
  filterRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  checkboxLabel: { fontSize: 14, color: "#334155", cursor: "pointer", margin: 0 },
};