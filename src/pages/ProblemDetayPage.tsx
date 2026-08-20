import { useState, useMemo } from "react";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@takeoff-ui/react-spar";
import { prKayitlari } from "../mock";
import type { Problem } from "../types";
import { useKayitlar } from "../store/kayitlar";
import { PrStatusBadge } from "../components/PrStatusBadge";
import { PriorityChip } from "../components/PriorityChip";

type TabSekme = "detay" | "kokNeden" | "iliskiliKayitlar";

function getKayitYolu(id: string): string | null {
  if (id.startsWith("BTTH-")) return `/talepler/${id}`;
  if (id.startsWith("PR-")) return `/problemler/${id}`;
  return null;
}

export function ProblemDetayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [aktifTab, setAktifTab] = useState<TabSekme>("detay");

  const { kayitlar } = useKayitlar<Problem>(prKayitlari);

  // URL'deki aktif filtreleri alma
  const urlArama = searchParams.get("arama")?.trim().toLocaleLowerCase("tr") || "";
  const durum = searchParams.get("durum") || "";
  const oncelik = searchParams.get("oncelik") || "";

  // Filtreli liste
  const filtreliKayitlar = useMemo(() => {
    return kayitlar.filter((p) => {
      if (
        urlArama &&
        !p.id.toLocaleLowerCase("tr").includes(urlArama) &&
        !p.baslik.toLocaleLowerCase("tr").includes(urlArama)
      ) {
        return false;
      }
      if (durum && p.durum !== durum) return false;
      if (oncelik && p.oncelik !== oncelik) return false;
      return true;
    });
  }, [kayitlar, urlArama, durum, oncelik]);

  // Mevcut kayıt ve indeks
  const kayitIndex = useMemo(
    () => filtreliKayitlar.findIndex((k) => k.id === id),
    [filtreliKayitlar, id]
  );

  const kayit = kayitlar.find((k) => k.id === id);

  const oncekiKayit = kayitIndex > 0 ? filtreliKayitlar[kayitIndex - 1] : null;
  const sonrakiKayit =
    kayitIndex !== -1 && kayitIndex < filtreliKayitlar.length - 1
      ? filtreliKayitlar[kayitIndex + 1]
      : null;

  const currentSearch = searchParams.toString();
  const listeAdresi = currentSearch ? `/problemler?${currentSearch}` : "/problemler";

  const handleGecis = (targetId: string) => {
    navigate(`/problemler/${targetId}${currentSearch ? `?${currentSearch}` : ""}`);
  };

  if (!kayit) {
    return (
      <div style={styles.container}>
        <p style={{ color: "#dc2626" }}>Problem kaydı bulunamadı.</p>
        <Link to={listeAdresi} style={styles.backLink}>
          ← Liste Sayfasına Dön
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Üst Navigasyon & Aksiyonlar */}
      <div style={styles.navRow}>
        <Link to={listeAdresi} style={styles.backLink}>
          ← Problem Listesine Dön
        </Link>

        {/* Önceki / Sonraki Buton Grubu */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button
            appearance="text"
            disabled={!oncekiKayit}
            onClick={() => oncekiKayit && handleGecis(oncekiKayit.id)}
            style={{
              color: oncekiKayit ? "#2563eb" : "#94a3b8",
              cursor: oncekiKayit ? "pointer" : "not-allowed",
            }}
          >
            ← Önceki
          </Button>

          {filtreliKayitlar.length > 0 && kayitIndex !== -1 && (
            <span style={{ fontSize: 12, color: "#64748b" }}>
              ({kayitIndex + 1} / {filtreliKayitlar.length})
            </span>
          )}

          <span style={{ color: "#cbd5e1" }}>|</span>

          <Button
            appearance="text"
            disabled={!sonrakiKayit}
            onClick={() => sonrakiKayit && handleGecis(sonrakiKayit.id)}
            style={{
              color: sonrakiKayit ? "#2563eb" : "#94a3b8",
              cursor: sonrakiKayit ? "pointer" : "not-allowed",
            }}
          >
            Sonraki →
          </Button>
        </div>
      </div>

      {/* Başlık Kartı */}
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div>
            <div style={styles.idBadge}>{kayit.id}</div>
            <h1 style={styles.title}>{kayit.baslik}</h1>
          </div>
          <div style={styles.badgeGroup}>
            <PriorityChip oncelik={kayit.oncelik} />
            <PrStatusBadge durum={kayit.durum} />
          </div>
        </div>

        <div style={styles.metaRow}>
          <div>
            <strong>Sorumlu:</strong> {kayit.sorumlu || "—"}
          </div>
          <div>
            <strong>Oluşturulma Tarihi:</strong>{" "}
            {new Date(kayit.olusturmaTarihi).toLocaleDateString("tr-TR")}
          </div>
        </div>
      </div>

      {/* Sekme Butonları */}
      <div style={styles.tabContainer}>
        <button
          onClick={() => setAktifTab("detay")}
          style={{
            ...styles.tabButton,
            ...(aktifTab === "detay" ? styles.aktifTab : {}),
          }}
        >
          Detay
        </button>
        <button
          onClick={() => setAktifTab("kokNeden")}
          style={{
            ...styles.tabButton,
            ...(aktifTab === "kokNeden" ? styles.aktifTab : {}),
          }}
        >
          Kök Neden & Çözüm
        </button>
        <button
          onClick={() => setAktifTab("iliskiliKayitlar")}
          style={{
            ...styles.tabButton,
            ...(aktifTab === "iliskiliKayitlar" ? styles.aktifTab : {}),
          }}
        >
          İlişkili Kayıtlar ({kayit.iliskiliKayitlar?.length || 0})
        </button>
      </div>

      {/* Sekme İçerikleri */}
      <div style={styles.card}>
        {aktifTab === "detay" && (
          <div style={styles.sectionGap}>
            <div>
              <h3 style={styles.sectionTitle}>Açıklama</h3>
              <p style={styles.contentText}>{kayit.aciklama || "Açıklama girilmemiş."}</p>
            </div>
            <div>
              <h3 style={styles.sectionTitle}>Etki Analizi</h3>
              <p style={styles.contentText}>{kayit.etki || "Etki bilgisi bulunmuyor."}</p>
            </div>
          </div>
        )}

        {aktifTab === "kokNeden" && (
          <div style={styles.sectionGap}>
            <div>
              <h3 style={styles.sectionTitle}>Kök Neden</h3>
              {kayit.kokNeden ? (
                <p style={styles.contentText}>{kayit.kokNeden}</p>
              ) : (
                <p style={styles.emptyWarningText}>
                  Kök neden analizi henüz tamamlanmadı.
                </p>
              )}
            </div>
            <div>
              <h3 style={styles.sectionTitle}>Geçici Çözüm (Workaround)</h3>
              <p style={styles.contentText}>
                {kayit.geciciCozum || "Geçici çözüm tanımlanmamış."}
              </p>
            </div>
          </div>
        )}

        {aktifTab === "iliskiliKayitlar" && (
          <div>
            <h3 style={styles.sectionTitle}>Bağlantılı Kayıtlar</h3>
            {kayit.iliskiliKayitlar && kayit.iliskiliKayitlar.length > 0 ? (
              <ul style={styles.linkList}>
                {kayit.iliskiliKayitlar.map((relId) => {
                  const yol = getKayitYolu(relId);
                  return (
                    <li key={relId} style={styles.linkListItem}>
                      {yol ? (
                        <Link
                          to={`${yol}${currentSearch ? `?${currentSearch}` : ""}`}
                          style={styles.relLink}
                        >
                          {relId}
                        </Link>
                      ) : (
                        <span style={styles.disabledRelText}>
                          {relId} <small>(Detay sayfası henüz mevcut değil)</small>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p style={styles.contentText}>İlişkili kayıt bulunmuyor.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    padding: "20px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  idBadge: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#64748b",
    marginBottom: "4px",
  },
  title: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
  },
  badgeGroup: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  metaRow: {
    display: "flex",
    gap: "24px",
    fontSize: "14px",
    color: "#475569",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "12px",
  },
  tabContainer: {
    display: "flex",
    gap: "8px",
    borderBottom: "1px solid #e2e8f0",
  },
  tabButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#64748b",
    border: "none",
    borderBottom: "2px solid transparent",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  aktifTab: {
    color: "#2563eb",
    borderBottomColor: "#2563eb",
  },
  sectionGap: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#334155",
    marginTop: 0,
    marginBottom: "8px",
  },
  contentText: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.6",
    margin: 0,
  },
  emptyWarningText: {
    fontSize: "14px",
    color: "#d97706",
    backgroundColor: "#fffbeb",
    border: "1px solid #fef3c7",
    padding: "10px 14px",
    borderRadius: "6px",
    margin: 0,
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  linkListItem: {
    fontSize: "14px",
  },
  relLink: {
    color: "#2563eb",
    fontWeight: 600,
    textDecoration: "none",
  },
  disabledRelText: {
    color: "#64748b",
    fontWeight: 500,
  },
};