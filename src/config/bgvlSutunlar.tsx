import type { TableColumnDef } from "@takeoff-ui/react-spar";
import type { Bgvl, Kritiklik } from "../types";
import { SeverityBadge } from "../components/SeverityBadge";

const KRITIKLIK_AGIRLIK: Record<Kritiklik, number> = {
  Kritik: 4,
  Yüksek: 3,
  Orta: 2,
  Düşük: 1,
};

const TARIH_FORMATTER = new Intl.DateTimeFormat("tr-TR");

export function getBgvlSutunlar(currentSearch: string): TableColumnDef<Bgvl>[] {
  const bugun = new Date().toISOString().slice(0, 10);

  return [
    {
      id: "id",
      header: "Zafiyet No",
      accessor: "id",
      sortable: true,
    },
    {
      id: "baslik",
      header: "Başlık",
      accessor: "baslik",
      sortable: true,
    },
    {
      id: "cve",
      header: "CVE",
      accessor: (row) => row.cve ?? "—",
      cell: (ctx) => ctx.row.original.cve || "—",
      sortable: true,
    },
    {
      id: "cvssSkoru",
      header: "CVSS",
      accessor: "cvssSkoru",
      cell: (ctx) => ctx.row.original.cvssSkoru.toFixed(1),
      sortable: true,
    },
    {
      id: "kritiklik",
      header: "Kritiklik",
      accessor: (row) => KRITIKLIK_AGIRLIK[row.kritiklik],
      cell: (ctx) => <SeverityBadge seviye={ctx.row.original.kritiklik} />,
      sortable: true,
    },
    {
      id: "etkilenenVarlik",
      header: "Etkilenen Varlık",
      accessor: "etkilenenVarlik",
      sortable: true,
    },
    {
      id: "durum",
      header: "Durum",
      accessor: "durum",
      cell: (ctx) => ctx.row.original.durum,
    },
    {
      id: "slaTarihi",
      header: "SLA Tarihi",
      accessor: "slaTarihi",
      cell: (ctx) => {
        const kayit = ctx.row.original;
        const slaStr = kayit.slaTarihi.slice(0, 10);
        const gecikmisMi = kayit.durum !== "Kapandı" && slaStr < bugun;
        const formatliTarih = TARIH_FORMATTER.format(new Date(kayit.slaTarihi));

        return (
          <div style={styles.slaCell}>
            <span>{formatliTarih}</span>
            {gecikmisMi && <span style={styles.gecikmisBadge}>Gecikmiş</span>}
          </div>
        );
      },
      sortable: true,
    },
  ];
}

const styles = {
  slaCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  gecikmisBadge: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fca5a5",
    fontSize: "11px",
    fontWeight: 600,
    padding: "2px 6px",
    borderRadius: "4px",
    lineHeight: "1.2",
  },
};