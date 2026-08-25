import { Input, Select } from "@takeoff-ui/react-spar";

export type FiltreTanimi =
  | { tip: "arama"; anahtar: string; placeholder: string }
  | { tip: "secim"; anahtar: string; etiket: string; secenekler: string[] }
  | { tip: "tarihAraligi"; anahtar: string; etiket: string };

export type FiltreDegerleri = Record<string, string>;

type Props = {
  tanimlar: FiltreTanimi[];
  degerler: FiltreDegerleri;
  onDegisiklik: (anahtar: string, yeni: string) => void;
};

export function FiltreCubugu({ tanimlar, degerler, onDegisiklik }: Props) {
  return (
    <div style={styles.container}>
      {tanimlar.map((t) => {
        if (t.tip === "arama") {
          return (
            <div key={t.anahtar} style={styles.aramaWrapper}>
              <Input>
                <Input.Field
                  placeholder={t.placeholder}
                  value={degerler[t.anahtar] ?? ""}
                  onChange={(e) => onDegisiklik(t.anahtar, e.target.value)}
                />
              </Input>
            </div>
          );
        }

        if (t.tip === "secim") {
          const seciliDeger = degerler[t.anahtar];
          
          // Seçilen değer varsa ekranda onu, yoksa varsayılan etiketini gösterir
          const gorunenMetin = seciliDeger ? seciliDeger : t.etiket;

          return (
            <div key={t.anahtar} style={styles.selectWrapper}>
              <Select
                value={seciliDeger ?? ""}
                onChange={(v) => onDegisiklik(t.anahtar, v ?? "")}
              >
                <Select.Trigger placeholder={gorunenMetin}>
                  {gorunenMetin}
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="">Tümü ({t.etiket})</Select.Item>
                  {t.secenekler.map((s) => (
                    <Select.Item key={s} value={s}>
                      {s}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>
          );
        }

        return (
          <div key={t.anahtar} style={styles.datePickerGroup}>
            <label htmlFor={`filtre-${t.anahtar}`} style={styles.dateLabel}>
              {t.etiket}:
            </label>
            <input
              id={`filtre-${t.anahtar}`}
              type="date"
              value={degerler[t.anahtar] ?? ""}
              onChange={(e) => onDegisiklik(t.anahtar, e.target.value)}
              style={styles.dateInput}
            />
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap" as const,
    alignItems: "center",
  },
  aramaWrapper: {
    flex: "1 1 300px",
    maxWidth: "420px",
  },
  selectWrapper: {
    width: "180px",
  },
  datePickerGroup: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  dateLabel: {
    fontSize: 13,
    color: "#64748b",
    whiteSpace: "nowrap" as const,
  },
  dateInput: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: 14,
    color: "#0f172a",
    backgroundColor: "#ffffff",
    colorScheme: "light",
    outline: "none",
  },
};