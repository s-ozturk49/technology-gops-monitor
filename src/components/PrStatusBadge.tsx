import { Badge } from "@takeoff-ui/react-spar";

export type ProblemDurum =
  | "Yeni"
  | "Kök Neden Analizi"
  | "Kalıcı Çözüm"
  | "Kapandı";

type Props = {
  durum: ProblemDurum | string;
};

const DURUM_VARIANTS: Record<string, "info" | "purple" | "success" | "verified" | "neutral"> = {
  Yeni: "info",
  "Kök Neden Analizi": "purple",
  "Kalıcı Çözüm": "success",
  Kapandı: "verified",
};

export function PrStatusBadge({ durum }: Props) {
  const variant = DURUM_VARIANTS[durum] || "neutral";

  return <Badge variant={variant}>{durum}</Badge>;
}