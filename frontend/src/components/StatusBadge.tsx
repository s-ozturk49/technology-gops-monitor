import { Badge } from '@takeoff-ui/react-spar';
import type { BtthDurum } from "../types";

// Türkçe durum isimlerini kütüphanenin Badge variant'larına eşliyoruz
const variantMap: Record<BtthDurum, "info" | "warning" | "purple" | "success" | "danger"> = {
  Yeni: "info",
  İncelemede: "warning",
  "Onay Bekliyor": "purple",
  Tamamlandı: "success",
  Reddedildi: "danger",
};

export function StatusBadge({ durum }: { durum: BtthDurum }) {
  // Tanımsız bir durum gelirse varsayılan olarak "neutral" veya "info" varyantını kullanır
  const variant = variantMap[durum] ?? "neutral";

  return (
    <Badge variant={variant}>
      {durum}
    </Badge>
  );
}