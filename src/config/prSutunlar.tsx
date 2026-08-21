import { Link } from "react-router-dom";
import type { TableColumnDef } from "@takeoff-ui/react-spar";
import type { Problem } from "../types";
import { PriorityChip } from "../components/PriorityChip";
import { PrStatusBadge } from "../components/PrStatusBadge";

export function getPrSutunlar(currentSearch?: string): TableColumnDef<Problem>[] {
  const bugun = Date.now();

  return [
    {
      id: "id",
      header: "Problem No",
      accessor: "id",
      cell: (ctx) => (
        <Link
          to={{
            pathname: `/problemler/${ctx.row.original.id}`,
            search: currentSearch ? `?${currentSearch}` : "",
          }}
          style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}
        >
          {ctx.row.original.id}
        </Link>
      ),
      sortable: true,
    },
    { id: "baslik", header: "Başlık", accessor: "baslik", sortable: true },
    {
      id: "oncelik",
      header: "Öncelik",
      accessor: (row) => ({ Kritik: 4, Yüksek: 3, Orta: 2, Düşük: 1 }[row.oncelik]),
      cell: (ctx) => <PriorityChip oncelik={ctx.row.original.oncelik} />,
      sortable: true,
    },
    {
      id: "durum",
      header: "Durum",
      accessor: "durum",
      cell: (ctx) => <PrStatusBadge durum={ctx.row.original.durum} />,
      sortable: true,
    },
    { id: "sorumlu", header: "Sorumlu", accessor: (row) => row.sorumlu ?? "—" },
    {
      id: "acikGun",
      header: "Açık Gün Sayısı",
      accessor: (row) => Math.floor((bugun - new Date(row.olusturmaTarihi).getTime()) / 86_400_000),
      cell: (ctx) => {
        const gun = Math.floor((bugun - new Date(ctx.row.original.olusturmaTarihi).getTime()) / 86_400_000);
        const uzunSure = gun > 30 && ctx.row.original.durum !== "Kapandı";
        return <span style={{ color: uzunSure ? "#dc2626" : undefined, fontWeight: uzunSure ? 600 : undefined }}>{gun}</span>;
      },
      sortable: true,
    },
  ];
}