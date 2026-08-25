import { Badge } from "@takeoff-ui/react-spar";

export type SeveritySeviye = "Kritik" | "Yüksek" | "Orta" | "Düşük";

type Props = {
  seviye: SeveritySeviye | string;
};

type BadgeVariant = "neutral" | "warning" | "danger" | "dark";

const SEVERITY_VARIANTS: Record<string, BadgeVariant> = {
  Düşük: "neutral",
  Orta: "warning",
  Yüksek: "danger",
  Kritik: "dark",
};

export function SeverityBadge({ seviye }: Props) {
  const variant = SEVERITY_VARIANTS[seviye] || "neutral";

  return <Badge variant={variant}>{seviye}</Badge>;
}