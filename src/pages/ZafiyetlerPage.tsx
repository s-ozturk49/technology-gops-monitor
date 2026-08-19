import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Table } from "@takeoff-ui/react-spar";
import { bgvlKayitlari } from "../mock";
import type { Bgvl } from "../types";
import { useKayitlar } from "../store/kayitlar";
import { FiltreCubugu, type FiltreTanimi } from "../components/FiltreCubugu";
import { getBgvlSutunlar } from "../config/bgvlSutunlar";

const filtreTanimlari: FiltreTanimi[] = [
  {
    tip: "arama",
    anahtar: "arama",
    placeholder: "Zafiyet no, başlık, CVE veya varlık ara...",
  },
  {
    tip: "secim",
    anahtar: "durum",
    etiket: "Durum",
    secenekler: ["Açık", "Doğrulandı", "Yanlış Pozitif", "Kapandı"],
  },
  {
    tip: "secim",
    anahtar: "kritiklik",
    etiket: "Kritiklik",
    secenekler: ["Kritik", "Yüksek", "Orta", "Düşük"],
  },
];

function eslesiyorMu(k: Bgvl, q: string): boolean {
  if (!q) return true;
  return (
    k.id.toLocaleLowerCase("tr").includes(q) ||
    k.baslik.toLocaleLowerCase("tr").includes(q) ||
    (k.cve && k.cve.toLocaleLowerCase("tr").includes(q)) ||
    k.etkilenenVarlik.toLocaleLowerCase("tr").includes(q)
  );
}

export function ZafiyetlerPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Store & Veri
  const { kayitlar } = useKayitlar<Bgvl>(bgvlKayitlari);

  // URL Query Parametreleri
  const urlArama = searchParams.get("arama") || "";
  const durum = searchParams.get("durum") || "";
  const kritiklik = searchParams.get("kritiklik") || "";

  // Debounce için yerel arama durumu
  const [aramaInput, setAramaInput] = useState(urlArama);
  const currentSearch = searchParams.toString();

  // Tablo Kolonları
  const sutunlar = useMemo(() => getBgvlSutunlar(currentSearch), [currentSearch]);

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

  // Filtreleme ve Varsayılan Sıralama (CVSS skoruna göre azalan: En yüksek CVSS en üstte)
  const filtreliKayitlar = useMemo(() => {
    const q = urlArama.trim().toLocaleLowerCase("tr");

    const sonuclar = kayitlar.filter((k) => {
      if (q && !eslesiyorMu(k, q)) {
        return false;
      }
      if (durum && k.durum !== durum) {
        return false;
      }
      if (kritiklik && k.kritiklik !== kritiklik) {
        return false;
      }
      return true;
    });

    // Varsayılan Sıralama: CVSS Skoruna göre azalan (Örn: 10.0 -> 8.7 -> 5.4 ...)
    return sonuclar.sort((a, b) => b.cvssSkoru - a.cvssSkoru);
  }, [kayitlar, urlArama, durum, kritiklik]);

  // Filtre Değerleri Objesi
  const filtreDegerleri = useMemo(
    () => ({
      arama: aramaInput,
      durum,
      kritiklik,
    }),
    [aramaInput, durum, kritiklik]
  );

  return (
    <div style={styles.container}>
      {/* Üst Başlık */}
      <div style={styles.headerRow}>
        <div style={styles.titleGroup}>
          <h1 style={styles.title}>BGVL Zafiyet Yönetimi</h1>
          <span style={styles.countBadge}>{filtreliKayitlar.length} Kayıt</span>
        </div>
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
            Aradığınız kriterlere uygun zafiyet kaydı bulunamadı.
          </div>
        }
        striped
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