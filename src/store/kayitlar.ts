import { useState } from "react";

export function useKayitlar<T extends { id: string }>(kaynak: T[]) {
  const [kayitlar, setKayitlar] = useState<T[]>(kaynak);

  function ekle(yeni: T) {
    setKayitlar((oncekiler) => [yeni, ...oncekiler]);
  }

  return { kayitlar, ekle };
}