import { useState } from "react";
import { btthKayitlari } from "../mock";
import type { Btth } from "../types";

// Geçici: state App seviyesinde tutulur. Yarın Context'e taşıyacağız.
export function useBtthDeposu() {
  const [kayitlar, setKayitlar] = useState<Btth[]>(btthKayitlari);

  function ekle(yeni: Btth) {
    setKayitlar((oncekiler) => [yeni, ...oncekiler]);
  }

  return { kayitlar, ekle };
}