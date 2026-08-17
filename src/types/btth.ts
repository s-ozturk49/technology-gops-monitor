export type Oncelik = "Düşük" | "Orta" | "Yüksek" | "Kritik";

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
  id: string;
  baslik: string;
  talepEden: string;
  birim: string;
  oncelik: Oncelik;
  durum: BtthDurum;
  olusturmaTarihi: string; // "2026-08-10"
  aciklama?: string;
  atanan?: string | null;
  hedefTarih?: string | null;
  gecmis?: GecmisKaydi[];
  ekler?: Ek[];
};