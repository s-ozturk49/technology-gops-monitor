export type Oncelik = "Düşük" | "Orta" | "Yüksek" | "Kritik";

export type BtthDurum =
  | "Yeni"
  | "İncelemede"
  | "Onay Bekliyor"
  | "Tamamlandı"
  | "Reddedildi";

export type Btth = {
  id: string;
  baslik: string;
  talepEden: string;
  birim: string;
  oncelik: Oncelik;
  durum: BtthDurum;
  olusturmaTarihi: string; // "2026-08-10"
};