export type Oncelik = "Düşük" | "Orta" | "Yüksek" | "Kritik";

// ---- BTTH — Yeni Talep ----
export type BtthDurum =
  | "Yeni"
  | "İncelemede"
  | "Onay Bekliyor"
  | "Tamamlandı"
  | "Reddedildi";

export type GecmisKaydi = {
  tarih: string; // "2026-08-05T14:30:00"
  kullanici: string;
  islem: string; // "Durum 'Yeni' → 'İncelemede' olarak değiştirildi"
};

export type Ek = {
  ad: string; // "ekran-goruntusu.png"
  boyutKb: number;
  yuklemeTarihi: string;
};

export type Btth = {
  id: string; // "BTTH-2026-0001"
  baslik: string;
  aciklama: string;
  talepEden: string;
  birim: string;
  oncelik: Oncelik;
  durum: BtthDurum;
  atanan: string | null;
  olusturmaTarihi: string; // "2026-08-03"
  hedefTarih: string | null;
  gecmis?: GecmisKaydi[];
  ekler?: Ek[];
};

// ---- BGVL — Zafiyet ----
export type Kritiklik = "Kritik" | "Yüksek" | "Orta" | "Düşük";
export type BgvlDurum = "Açık" | "Doğrulandı" | "Yanlış Pozitif" | "Kapandı";
export type BgvlKaynak = "Tarama" | "Pentest" | "Bildirim";

export type Bgvl = {
  id: string; // "BGVL-2026-0001"
  baslik: string;
  aciklama: string;
  cve: string | null; // "CVE-2026-1234"
  cvssSkoru: number; // 0.0 - 10.0
  kritiklik: Kritiklik;
  etkilenenVarlik: string; // "web-sunucu-03"
  kaynak: BgvlKaynak;
  durum: BgvlDurum;
  tespitTarihi: string;
  slaTarihi: string;
  sorumlu: string | null;
};

// ---- PR — Problem ----
export type PrDurum = "Yeni" | "Kök Neden Analizi" | "Kalıcı Çözüm" | "Kapandı";

export type Problem = {
  id: string; // "PR-2026-0001"
  baslik: string;
  aciklama: string;
  kokNeden: string | null;
  geciciCozum: string | null;
  etki: string;
  oncelik: Oncelik;
  durum: PrDurum;
  iliskiliKayitlar: string[]; // ["BTTH-2026-0004", "BGVL-2026-0002"]
  sorumlu: string | null;
  olusturmaTarihi: string;
  kapanisTarihi: string | null;
};