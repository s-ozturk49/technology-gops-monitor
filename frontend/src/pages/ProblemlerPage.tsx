import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Table, Button } from "@takeoff-ui/react-spar";
import { prKayitlari } from "../mock";
import type { Problem, Oncelik } from "../types";
import { useKayitlar } from "../store/kayitlar";
import { FiltreCubugu, type FiltreTanimi } from "../components/FiltreCubugu";
import { getPrSutunlar } from "../config/prSutunlar";
import { YeniProblemModal } from "../components/YeniProblemModal";

const ONCELIK_AGIRLIK: Record<Oncelik, number> = {
  Kritik: 4,
  Yüksek: 3,
  Orta: 2,
  Düşük: 1,
};

const filtreTanimlari: FiltreTanimi[] = [
  {
    tip: "arama",
    anahtar: "arama",
    placeholder: "Problem no veya başlık ara...",
  },
  {
    tip: "secim",
    anahtar: "durum",
    etiket: "Durum",
    secenekler: ["Yeni", "Kök Neden Analizi", "Kalıcı Çözüm", "Kapandı"],
  },
  {
    tip: "secim",
    anahtar: "oncelik",
    etiket: "Öncelik",
    secenekler: ["Kritik", "Yüksek", "Orta", "Düşük"],
  },
];

function eslesiyorMu(p: Problem, q: string): boolean {
  if (!q) return true;
  return (
    p.id.toLocaleLowerCase("tr").includes(q) ||
    p.baslik.toLocaleLowerCase("tr").includes(q)
  );
}

export function ProblemlerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalAcik, setModalAcik] = useState(false);

  // Store & Veri
  const { kayitlar, ekle } = useKayitlar<Problem>(prKayitlari);

  // URL Query Parametreleri
  const urlArama = searchParams.get("arama") || "";
  const durum = searchParams.get("durum") || "";
  const oncelik = searchParams.get("oncelik") || "";

  // Debounce için yerel arama durumu
  const [aramaInput, setAramaInput] = useState(urlArama);

  // Tablo Kolonları
  const sutunlar = useMemo(
    () => getPrSutunlar(searchParams.toString()),
    [searchParams]
  );

  // URL Arama Senkronizasyonu
  useEffect(() => {
    setAramaInput(urlArama);
  }, [urlArama]);

  // URL Parametre Güncelleme
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

  // Arama Debounce (300ms)
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

  // Filtreleme ve Varsayılan Sıralama (Öncelik ağırlığına göre azalan: Kritik en üstte)
  const filtreliKayitlar = useMemo(() => {
    const q = urlArama.trim().toLocaleLowerCase("tr");

    const sonuclar = kayitlar.filter((p) => {
      if (q && !eslesiyorMu(p, q)) {
        return false;
      }
      if (durum && p.durum !== durum) {
        return false;
      }
      if (oncelik && p.oncelik !== oncelik) {
        return false;
      }
      return true;
    });

    return sonuclar.sort(
      (a, b) => ONCELIK_AGIRLIK[b.oncelik] - ONCELIK_AGIRLIK[a.oncelik]
    );
  }, [kayitlar, urlArama, durum, oncelik]);

  // Filtre Değerleri Objesi
  const filtreDegerleri = useMemo(
    () => ({
      arama: aramaInput,
      durum,
      oncelik,
    }),
    [aramaInput, durum, oncelik]
  );

  return (
    <div style={styles.container}>
      {/* Üst Başlık */}
      <div style={styles.headerRow}>
        <div style={styles.titleGroup}>
          <h1 style={styles.title}>Problem Yönetimi (PR)</h1>
          <span style={styles.countBadge}>{filtreliKayitlar.length} Kayıt</span>
        </div>
        <Button variant="primary" onClick={() => setModalAcik(true)}>
          + Yeni Problem
        </Button>
      </div>

      {/* Filtre Çubuğu */}
      <div style={styles.filterContainer}>
        <FiltreCubugu
          tanimlar={filtreTanimlari}
          degerler={filtreDegerleri}
          onDegisiklik={handleFiltreDegisiklik}
        />
      </div>

      {/* Tablo */}
      <Table
        data={filtreliKayitlar}
        columns={sutunlar}
        getRowId={(row) => row.id}
        pagination={{ pageSize: 10 }}
        emptyState={
          <div style={{ padding: "32px 16px", textAlign: "center", color: "#64748b" }}>
            Aradığınız kriterlere uygun problem kaydı bulunamadı.
          </div>
        }
        striped
      />

      {/* Yeni Problem Modalı */}
      <YeniProblemModal
        open={modalAcik}
        onOpenChange={setModalAcik}
        kayitlar={kayitlar}
        onEkle={ekle}
        hideTrigger
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  countBadge: {
    fontSize: 14,
    fontWeight: 600,
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    padding: "4px 10px",
    borderRadius: "16px",
  },
  filterContainer: {
    borderTop: "1px solid #e2e8f0",
    paddingTop: "16px",
  },
};