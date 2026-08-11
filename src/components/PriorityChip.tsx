import { Badge } from '@takeoff-ui/react-spar';
import type { Oncelik } from "../types/btth";

// Öncelik seviyelerini kütüphanenin Badge variant'larına eşliyoruz
const variantMap: Record<Oncelik, "neutral" | "warning" | "danger" | "dark"> = {
  "Düşük": "neutral",  // Gri
  "Orta": "warning",   // Turuncu/Sarı
  "Yüksek": "danger",   // Kırmızı
  "Kritik": "dark",     // Koyu/Siyah (veya yine "danger")
};

export function PriorityChip({ oncelik }: { oncelik: Oncelik }) {
  const variant = variantMap[oncelik] ?? "neutral";

  return (
    <Badge variant={variant}>
      {oncelik}
    </Badge>
  );
}