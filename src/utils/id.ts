import type { Btth } from "../types";

export function yeniIdUret(kayitlar: Btth[]): string {
  const buYil = new Date().getFullYear(); // 2026
  const prefix = `BTTH-${buYil}-`;

  // Yalnızca mevcut yıla ait ve beklenen formatta olan ID'lerdeki sayıları çek
  const numaralar = kayitlar
    .map((k) => k.id)
    .filter((id) => id && id.startsWith(prefix))
    .map((id) => parseInt(id.replace(prefix, ""), 10))
    .filter((num) => !isNaN(num));

  const enBuyuk = numaralar.length > 0 ? Math.max(...numaralar) : 0;
  const yeniSira = (enBuyuk + 1).toString().padStart(4, "0");

  return `${prefix}${yeniSira}`;
}