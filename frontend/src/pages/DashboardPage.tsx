import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge } from "@takeoff-ui/react-spar";
import { useKayitlar } from "../store/kayitlar";
import { btthKayitlari, bgvlKayitlari, prKayitlari } from "../mock";
import type { Btth, Bgvl, Problem, BtthDurum } from "../types";

// Modüllere Göre Sayfa Yönlendirme Yardımcı Fonksiyonu
function kayitYolu(id: string): string {
  if (id.startsWith("BTTH")) return `/talepler/${id}`;
  if (id.startsWith("BGVL")) return `/zafiyetler`;
  if (id.startsWith("PR")) return `/problemler/${id}`;
  return "/";
}

// Modül ve Duruma Göre Badge Variant Eşlemesi
function durumVariantGetir(modul: "BTTH" | "BGVL" | "PR", durum: string) {
  if (modul === "BTTH") {
    switch (durum) {
      case "Yeni": return "info";
      case "İncelemede": return "warning";
      case "Onay Bekliyor": return "purple";
      case "Tamamlandı": return "success";
      case "Reddedildi": return "danger";
      default: return "neutral";
    }
  }

  if (modul === "PR") {
    switch (durum) {
      case "Yeni": return "info";
      case "Kök Neden Analizi": return "purple";
      case "Kalıcı Çözüm": return "success";
      case "Kapandı": return "verified";
      default: return "neutral";
    }
  }

  if (modul === "BGVL") {
    switch (durum) {
      case "Açık": return "danger";
      case "Doğrulandı": return "warning";
      case "Yanlış Pozitif": return "purple";
      case "Kapandı": return "success";
      default: return "neutral";
    }
  }

  return "neutral";
}

// BTTH Durum Rozet Renkleri
const DURUM_RENKLERI: Record<BtthDurum, string> = {
  Yeni: "#2563eb",
  İncelemede: "#d97706",
  "Onay Bekliyor": "#7c3aed",
  Tamamlandı: "#16a34a",
  Reddedildi: "#dc2626",
};

// Modül Rozet Stilleri
const MODUL_ROZET_STILLERI: Record<
  "BTTH" | "BGVL" | "PR",
  { bg: string; color: string; border: string }
> = {
  BTTH: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  BGVL: { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
  PR: { bg: "#f5f3ff", color: "#6d28d9", border: "#ddd6fe" },
};

type SonKayitItem = {
  id: string;
  baslik: string;
  modul: "BTTH" | "BGVL" | "PR";
  tarih: string;
  durum: string;
};

export function DashboardPage() {
  const navigate = useNavigate();

  // Store'lardan verilerin çekilmesi
  const { kayitlar: talepler } = useKayitlar<Btth>(btthKayitlari);
  const { kayitlar: zafiyetler } = useKayitlar<Bgvl>(bgvlKayitlari);
  const { kayitlar: problemler } = useKayitlar<Problem>(prKayitlari);

  // KPI Metrikleri
  const acikTaleplerSayisi = useMemo(
    () =>
      talepler.filter(
        (t) => t.durum !== "Tamamlandı" && t.durum !== "Reddedildi"
      ).length,
    [talepler]
  );

  const kritikZafiyetlerSayisi = useMemo(
    () =>
      zafiyetler.filter(
        (z) => z.kritiklik === "Kritik" && z.durum !== "Kapandı"
      ).length,
    [zafiyetler]
  );

  const acikZafiyetlerSayisi = useMemo(
    () => zafiyetler.filter((z) => z.durum !== "Kapandı").length,
    [zafiyetler]
  );

  const acikProblemlerSayisi = useMemo(
    () => problemler.filter((p) => p.durum !== "Kapandı").length,
    [problemler]
  );

  // Grafik Verisi: Durum bazlı talep dağılımı
  const durumDagilimi = useMemo(() => {
    const sayaclar: Record<BtthDurum, number> = {
      Yeni: 0,
      İncelemede: 0,
      "Onay Bekliyor": 0,
      Tamamlandı: 0,
      Reddedildi: 0,
    };

    talepler.forEach((k) => {
      if (sayaclar[k.durum] !== undefined) {
        sayaclar[k.durum]++;
      }
    });

    const toplam = talepler.length || 1;

    return (Object.keys(sayaclar) as BtthDurum[]).map((durum) => ({
      durum,
      adet: sayaclar[durum],
      yuzde: Math.round((sayaclar[durum] / toplam) * 100),
      renk: DURUM_RENKLERI[durum],
    }));
  }, [talepler]);

  // Son 5 Kayıt (Harmanlanmış ve Tarihe Göre Sıralı)
  const sonKayitlar = useMemo<SonKayitItem[]>(() => {
    const btthList: SonKayitItem[] = talepler.map((t) => ({
      id: t.id,
      baslik: t.baslik,
      modul: "BTTH",
      tarih: t.olusturmaTarihi,
      durum: t.durum,
    }));

    const bgvlList: SonKayitItem[] = zafiyetler.map((z) => ({
      id: z.id,
      baslik: z.baslik,
      modul: "BGVL",
      tarih: z.tespitTarihi,
      durum: z.durum,
    }));

    const prList: SonKayitItem[] = problemler.map((p) => ({
      id: p.id,
      baslik: p.baslik,
      modul: "PR",
      tarih: p.olusturmaTarihi,
      durum: p.durum,
    }));

    return [...btthList, ...bgvlList, ...prList]
      .sort(
        (a, b) => new Date(b.tarih).getTime() - new Date(a.tarih).getTime()
      )
      .slice(0, 5);
  }, [talepler, zafiyetler, problemler]);

  const kpiKartlari = [
    {
      baslik: "Açık Talepler",
      deger: acikTaleplerSayisi,
      renk: "#2563eb",
      yonlendirme: "/talepler?durum=Yeni",
    },
    {
      baslik: "Kritik Zafiyetler",
      deger: kritikZafiyetlerSayisi,
      renk: "#dc2626",
      yonlendirme: "/zafiyetler?kritiklik=Kritik",
    },
    {
      baslik: "Açık Zafiyetler",
      deger: acikZafiyetlerSayisi,
      renk: "#d97706",
      yonlendirme: "/zafiyetler",
    },
    {
      baslik: "Açık Problemler",
      deger: acikProblemlerSayisi,
      renk: "#7c3aed",
      yonlendirme: "/problemler",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Sayfa Başlığı */}
      <div style={styles.header}>
        <h1 style={styles.title}>Genel Bakış</h1>
      </div>

      {/* KPI Kartları Izgarası */}
      <div style={styles.kpiGrid}>
        {kpiKartlari.map((kart) => (
          <div
            key={kart.baslik}
            onClick={() => navigate(kart.yonlendirme)}
            style={styles.cardWrapper}
          >
            <Card style={styles.card}>
              <div style={styles.cardContent}>
                <span style={styles.cardTitle}>{kart.baslik}</span>
                <span style={{ ...styles.cardValue, color: kart.renk }}>
                  {kart.deger}
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Orta Alan: Grafik ve Son Kayıtlar */}
      <div style={styles.contentGrid}>
        {/* Talep Durum Dağılımı Grafiği */}
        <Card style={styles.sectionCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.sectionTitle}>Talep Durum Dağılımı (BTTH)</h2>
            <span style={styles.sectionSubtitle}>
              Toplam {talepler.length} talep kaydı
            </span>
          </div>

          <div style={styles.chartBody}>
            {durumDagilimi.map((item) => (
              <div
                key={item.durum}
                style={styles.chartRow}
                onClick={() => navigate(`/talepler?durum=${item.durum}`)}
                title={`${item.durum} durumundaki talepleri göster`}
              >
                <div style={styles.rowLabelGroup}>
                  <span
                    style={{ ...styles.colorDot, backgroundColor: item.renk }}
                  />
                  <span style={styles.rowLabel}>{item.durum}</span>
                </div>

                <div style={styles.barContainer}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${item.yuzde}%`,
                      backgroundColor: item.renk,
                    }}
                  />
                </div>

                <div style={styles.rowStats}>
                  <span style={styles.statCount}>{item.adet}</span>
                  <span style={styles.statPercent}>%{item.yuzde}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Son 5 Kayıt Listesi */}
        <Card style={styles.sectionCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.sectionTitle}>Son Kayıtlar</h2>
            <span style={styles.sectionSubtitle}>
              Tüm modüllerden en son oluşturulan 5 kayıt
            </span>
          </div>

          <div style={styles.recentList}>
            {sonKayitlar.map((kayit) => {
              const rozetStili = MODUL_ROZET_STILLERI[kayit.modul];
              return (
                <div
                  key={kayit.id}
                  style={styles.recentRow}
                  onClick={() => navigate(kayitYolu(kayit.id))}
                  title={`${kayit.id} detayına git`}
                >
                  <div style={styles.recentLeft}>
                    <span
                      style={{
                        ...styles.modulBadge,
                        backgroundColor: rozetStili.bg,
                        color: rozetStili.color,
                        borderColor: rozetStili.border,
                      }}
                    >
                      {kayit.modul}
                    </span>
                    <div style={styles.recentTitleGroup}>
                      <span style={styles.recentId}>{kayit.id}</span>
                      <span style={styles.recentTitle}>{kayit.baslik}</span>
                    </div>
                  </div>

                  <div style={styles.recentRight}>
                    <span style={styles.recentDate}>{kayit.tarih}</span>
                    <Badge variant={durumVariantGetir(kayit.modul, kayit.durum)}>
                      {kayit.durum}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  cardWrapper: {
    cursor: "pointer",
  },
  card: {
    padding: "20px",
    height: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#64748b",
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1,
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "24px",
  },
  sectionCard: {
    padding: "24px",
    display: "flex",
    flexDirection: "column" as const,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#64748b",
  },
  chartBody: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  chartRow: {
    display: "grid",
    gridTemplateColumns: "130px 1fr 70px",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  rowLabelGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  colorDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#334155",
  },
  barContainer: {
    height: "10px",
    backgroundColor: "#f1f5f9",
    borderRadius: "5px",
    overflow: "hidden",
    width: "100%",
  },
  barFill: {
    height: "100%",
    borderRadius: "5px",
    transition: "width 0.3s ease",
  },
  rowStats: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "6px",
  },
  statCount: {
    fontSize: 13,
    fontWeight: 700,
    color: "#0f172a",
  },
  statPercent: {
    fontSize: 12,
    color: "#64748b",
    width: "32px",
    textAlign: "right" as const,
  },
  recentList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  recentRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    border: "1px solid #f1f5f9",
    cursor: "pointer",
    gap: "12px",
  },
  recentLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0,
  },
  modulBadge: {
    fontSize: "11px",
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: "4px",
    border: "1px solid",
    flexShrink: 0,
  },
  recentTitleGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "2px",
    minWidth: 0,
  },
  recentId: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#64748b",
  },
  recentTitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#0f172a",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  recentRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexShrink: 0,
  },
  recentDate: {
    fontSize: "12px",
    color: "#94a3b8",
  },
};