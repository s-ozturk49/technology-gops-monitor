import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { Button, Card, Tabs } from "@takeoff-ui/react-spar";
import { btthKayitlari } from "../mock";
import type { Btth } from "../types";
import { StatusBadge } from "../components/StatusBadge";
import { PriorityChip } from "../components/PriorityChip";

const tarihFormat = new Intl.DateTimeFormat("tr-TR");

interface GecmisKaydi {
  tarih: string;
  kullanici: string;
  islem: string;
}

interface EkKaydi {
  ad: string;
  boyutKb: number;
  yuklemeTarihi: string;
}

// Metin arama eşleşme kontrolü (Listeyle aynı mantık)
function eslesiyorMu(k: Btth, q: string): boolean {
  return (
    k.id.toLocaleLowerCase("tr").includes(q) ||
    k.baslik.toLocaleLowerCase("tr").includes(q) ||
    k.talepEden.toLocaleLowerCase("tr").includes(q) ||
    k.birim.toLocaleLowerCase("tr").includes(q)
  );
}

function formatMetin(val?: string | null): string {
  return val && val.trim() !== "" ? val : "—";
}

function formatTarih(val?: string | null): string {
  if (!val) return "—";
  const d = new Date(val);
  return isNaN(d.getTime()) ? "—" : tarihFormat.format(d);
}

export function TalepDetayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const sekme = searchParams.get("sekme") || "detay";

  // URL'deki Filtre Parametrelerini Oku
  const urlArama = searchParams.get("arama") || "";
  const durum = searchParams.get("durum") || "";
  const oncelik = searchParams.get("oncelik") || "";
  const baslangic = searchParams.get("baslangic") || "";
  const bitis = searchParams.get("bitis") || "";
  const sadeceAciklar = searchParams.get("acik") === "true";

  // Liste için filtre parametrelerini koruma (sekme harici)
  const listeParams = new URLSearchParams(searchParams);
  listeParams.delete("sekme");
  const listeSearchString = listeParams.toString();

  // 1. FILTRELENMİŞ LİSTEYİ HESAPLA
  const q = urlArama.trim().toLocaleLowerCase("tr");

  const filtreliKayitlar = useMemo(() => {
    return btthKayitlari
      .filter((k) => !sadeceAciklar || (k.durum !== "Tamamlandı" && k.durum !== "Reddedildi"))
      .filter((k) => !q || eslesiyorMu(k, q))
      .filter((k) => !durum || k.durum === durum)
      .filter((k) => !oncelik || k.oncelik === oncelik)
      .filter((k) => !baslangic || k.olusturmaTarihi >= baslangic)
      .filter((k) => !bitis || k.olusturmaTarihi <= bitis);
  }, [sadeceAciklar, q, durum, oncelik, baslangic, bitis]);

  // Sekme değişimi
  const handleSekmeChange = (yeniSekme: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("sekme", yeniSekme);
        return next;
      },
      { replace: true }
    );
  };

  // Taleplere geri dön
  const handleTaleplereDon = () => {
    navigate({
      pathname: "/talepler",
      search: listeSearchString ? `?${listeSearchString}` : "",
    });
  };

  // Önceki / Sonraki talep geçişi
  const handleTalepGecis = (hedefId: string) => {
    const targetParams = new URLSearchParams(searchParams);
    targetParams.set("sekme", sekme);

    navigate({
      pathname: `/talepler/${hedefId}`,
      search: `?${targetParams.toString()}`,
    });
  };

  // 2. MEVCUT KAYDI VE ÖNCEKİ/SONRAKİ KAYITLARI FİLTRELENMİŞ LİSTE ÜZERİNDEN BUL
  const currentIndex = filtreliKayitlar.findIndex((k) => k.id === id);
  
  // Kayıt filtrelenmiş listede bulunamadıysa ham veriden bak (direkt URL yazılıp gelinme ihtimaline karşı)
  const talep = currentIndex !== -1 ? filtreliKayitlar[currentIndex] : btthKayitlari.find((k) => k.id === id);

  const oncekiTalep = currentIndex > 0 ? filtreliKayitlar[currentIndex - 1] : null;
  const sonrakiTalep =
    currentIndex !== -1 && currentIndex < filtreliKayitlar.length - 1
      ? filtreliKayitlar[currentIndex + 1]
      : null;

  // KAYIT BULUNAMADI DURUMU
  if (!talep) {
    return (
      <div
        style={{
          maxWidth: "500px",
          margin: "60px auto",
          padding: "32px",
          textAlign: "center",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
          Kayıt bulunamadı
        </h2>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px", lineHeight: "1.5" }}>
          "<strong>{id || "—"}</strong>" numaralı talep sistemde yok.
        </p>
        <Button variant="secondary" onClick={handleTaleplereDon}>
          Taleplere dön
        </Button>
      </div>
    );
  }

  const atananKisi = (talep as Record<string, unknown>).atanan as string | undefined;
  const hedefTarihi = (talep as Record<string, unknown>).hedefTarih as string | undefined;
  const gecmisListesi = ((talep as Record<string, unknown>).gecmis as GecmisKaydi[]) || [];
  const eklerListesi = ((talep as Record<string, unknown>).ekler as EkKaydi[]) || [];

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* 1. Üst Navigasyon Barı */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Button
          appearance="text"
          onClick={handleTaleplereDon}
          style={{ paddingLeft: 0, color: "#2563eb", cursor: "pointer" }}
        >
          ← Taleplere dön
        </Button>

        {/* Önceki / Sonraki Buton Grubu */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Button
            appearance="text"
            disabled={!oncekiTalep}
            onClick={() => oncekiTalep && handleTalepGecis(oncekiTalep.id)}
            style={{
              color: oncekiTalep ? "#2563eb" : "#94a3b8",
              cursor: oncekiTalep ? "pointer" : "not-allowed",
            }}
          >
            ← Önceki
          </Button>

          {/* Aktif Filtre Bilgisi Göstergesi (Opsiyonel görsel destek) */}
          {filtreliKayitlar.length > 0 && currentIndex !== -1 && (
            <span style={{ fontSize: 12, color: "#64748b" }}>
              ({currentIndex + 1} / {filtreliKayitlar.length})
            </span>
          )}

          <span style={{ color: "#cbd5e1" }}>|</span>
          <Button
            appearance="text"
            disabled={!sonrakiTalep}
            onClick={() => sonrakiTalep && handleTalepGecis(sonrakiTalep.id)}
            style={{
              color: sonrakiTalep ? "#2563eb" : "#94a3b8",
              cursor: sonrakiTalep ? "pointer" : "not-allowed",
            }}
          >
            Sonraki →
          </Button>
        </div>
      </div>

      {/* Detay Kartları ve Sekme Alanları */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "16px" }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {talep.id}
          </span>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: "4px 0 12px 0" }}>
            {talep.baslik}
          </h1>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <StatusBadge durum={talep.durum} />
            <PriorityChip oncelik={talep.oncelik} />
          </div>
        </div>

        <Button variant="secondary">Düzenle</Button>
      </div>

      <Card style={{ marginTop: "24px", padding: "20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          <div>
            <span style={{ fontSize: 13, color: "#64748b", display: "block", marginBottom: "4px" }}>Talep Eden</span>
            <strong style={{ fontSize: 15, color: "#0f172a" }}>{formatMetin(talep.talepEden)}</strong>
          </div>
          <div>
            <span style={{ fontSize: 13, color: "#64748b", display: "block", marginBottom: "4px" }}>Birim</span>
            <strong style={{ fontSize: 15, color: "#0f172a" }}>{formatMetin(talep.birim)}</strong>
          </div>
          <div>
            <span style={{ fontSize: 13, color: "#64748b", display: "block", marginBottom: "4px" }}>Atanan</span>
            <strong style={{ fontSize: 15, color: "#0f172a" }}>{formatMetin(atananKisi)}</strong>
          </div>
          <div>
            <span style={{ fontSize: 13, color: "#64748b", display: "block", marginBottom: "4px" }}>Oluşturma</span>
            <strong style={{ fontSize: 15, color: "#0f172a" }}>{formatTarih(talep.olusturmaTarihi)}</strong>
          </div>
          <div>
            <span style={{ fontSize: 13, color: "#64748b", display: "block", marginBottom: "4px" }}>Hedef Tarih</span>
            <strong style={{ fontSize: 15, color: "#0f172a" }}>{formatTarih(hedefTarihi)}</strong>
          </div>
        </div>
      </Card>

      <div style={{ marginTop: "24px" }}>
        <Tabs value={sekme} onValueChange={handleSekmeChange}>
          <Tabs.List>
            <Tabs.Trigger value="detay">Detay</Tabs.Trigger>
            <Tabs.Trigger value="gecmis">Geçmiş</Tabs.Trigger>
            <Tabs.Trigger value="ekler">Ekler</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="detay">
            <Card style={{ marginTop: "16px", padding: "20px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: "8px" }}>Açıklama</h3>
              <p style={{ color: "#334155", fontSize: 15, lineHeight: "1.6" }}>{formatMetin(talep.aciklama)}</p>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="gecmis">
            <Card style={{ marginTop: "16px", padding: "20px" }}>
              {gecmisListesi.length === 0 ? (
                <p style={{ color: "#64748b", fontStyle: "italic" }}>Bu talebe ait henüz bir geçmiş kaydı bulunmamaktadır.</p>
              ) : (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {gecmisListesi.map((g, index) => (
                    <li key={index} style={{ padding: "12px 0", borderBottom: index !== gecmisListesi.length - 1 ? "1px solid #e2e8f0" : "none" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <strong style={{ fontSize: 14, color: "#0f172a" }}>{g.kullanici}</strong>
                        <span style={{ fontSize: 12, color: "#64748b" }}>{formatTarih(g.tarih)}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 14, color: "#334155" }}>{g.islem}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </Tabs.Content>

          <Tabs.Content value="ekler">
            <Card style={{ marginTop: "16px", padding: "20px" }}>
              {eklerListesi.length === 0 ? (
                <p style={{ color: "#64748b", fontStyle: "italic" }}>Bu talebe eklenmiş herhangi bir dosya bulunmamaktadır.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {eklerListesi.map((ek, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: "6px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                      <div>
                        <strong style={{ display: "block", fontSize: 14, color: "#0f172a", marginBottom: "2px" }}>{ek.ad}</strong>
                        <span style={{ fontSize: 12, color: "#64748b" }}>{ek.boyutKb} KB • {formatTarih(ek.yuklemeTarihi)}</span>
                      </div>
                      <Button variant="secondary" size="small">İndir</Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}