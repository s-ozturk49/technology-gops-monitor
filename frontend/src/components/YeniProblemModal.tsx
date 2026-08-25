import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, Button, Input, Select, Field } from "@takeoff-ui/react-spar";
import type { Problem, Oncelik } from "../types";
import { yeniIdUret } from "../utils/id";

export interface ProblemFormDegerleri {
  baslik: string;
  aciklama: string;
  etki: string;
  oncelik: string;
  sorumlu?: string;
  iliskiliKayitlarStr?: string;
}

interface YeniProblemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kayitlar?: Problem[];
  duzenlenecekProblem?: Problem | null;
  onEkle?: (yeniProblem: Problem) => void;
  onGuncelle?: (guncellenmisProblem: Problem) => void;
  hideTrigger?: boolean;
}

const ONCELIKLER: Oncelik[] = ["Düşük", "Orta", "Yüksek", "Kritik"];

export function YeniProblemModal({
  open,
  onOpenChange,
  kayitlar = [],
  duzenlenecekProblem,
  onEkle,
  onGuncelle,
  hideTrigger = false,
}: YeniProblemModalProps) {
  const isEditMode = Boolean(duzenlenecekProblem);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProblemFormDegerleri>({
    defaultValues: {
      baslik: "",
      aciklama: "",
      etki: "",
      oncelik: "Orta",
      sorumlu: "",
      iliskiliKayitlarStr: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (duzenlenecekProblem) {
        reset({
          baslik: duzenlenecekProblem.baslik,
          aciklama: duzenlenecekProblem.aciklama,
          etki: duzenlenecekProblem.etki || "",
          oncelik: duzenlenecekProblem.oncelik,
          sorumlu: duzenlenecekProblem.sorumlu || "",
          iliskiliKayitlarStr: duzenlenecekProblem.iliskiliKayitlar?.join(", ") || "",
        });
      } else {
        reset({
          baslik: "",
          aciklama: "",
          etki: "",
          oncelik: "Orta",
          sorumlu: "",
          iliskiliKayitlarStr: "",
        });
      }
    }
  }, [open, duzenlenecekProblem, reset]);

  const handleKapat = () => {
    reset();
    onOpenChange(false);
  };

  function kaydet(degerler: ProblemFormDegerleri) {
    const iliskiliKayitlar = degerler.iliskiliKayitlarStr
      ? degerler.iliskiliKayitlarStr
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    if (isEditMode && duzenlenecekProblem) {
      const guncellenmis: Problem = {
        ...duzenlenecekProblem,
        baslik: degerler.baslik,
        aciklama: degerler.aciklama,
        etki: degerler.etki,
        oncelik: degerler.oncelik as Oncelik,
        sorumlu: degerler.sorumlu || null,
        iliskiliKayitlar,
      };
      onGuncelle?.(guncellenmis);
    } else {
      const yeni: Problem = {
        id: yeniIdUret(kayitlar, "PR"),
        baslik: degerler.baslik,
        aciklama: degerler.aciklama,
        etki: degerler.etki,
        durum: "Yeni",
        oncelik: degerler.oncelik as Oncelik,
        sorumlu: degerler.sorumlu || null,
        olusturmaTarihi: new Date().toISOString().slice(0, 10),
        kapanisTarihi: null,
        kokNeden: null,
        geciciCozum: null,
        iliskiliKayitlar,
      };
      onEkle?.(yeni);
    }

    reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val) reset();
        onOpenChange(val);
      }}
    >
      {!hideTrigger && !isEditMode && (
        <Dialog.Trigger as={Button} variant="primary">
          + Yeni Problem
        </Dialog.Trigger>
      )}

      <Dialog.Overlay />

      <Dialog.Panel
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        style={{
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Dialog.Header>
          <Dialog.Title>
            {isEditMode ? `Problemi Düzenle (${duzenlenecekProblem?.id})` : "Yeni Problem"}
          </Dialog.Title>
        </Dialog.Header>

        <form
          onSubmit={(e) => {
            const nativeEvent = e.nativeEvent as SubmitEvent;
            const submitter = nativeEvent.submitter as HTMLButtonElement | null;

            if (submitter && submitter.type !== "submit") {
              e.preventDefault();
              return;
            }

            handleSubmit(kaydet)(e);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            flex: 1,
          }}
        >
          <Dialog.Body
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              overflowY: "auto",
              paddingRight: "4px",
              flex: 1,
            }}
          >
            {/* Başlık */}
            <Field invalid={!!errors.baslik}>
              <Field.Label>Başlık</Field.Label>
              <Input>
                <Input.Field
                  {...register("baslik", {
                    required: "Başlık zorunludur",
                    minLength: { value: 5, message: "Başlık en az 5 karakter olmalı" },
                    maxLength: { value: 120, message: "Başlık en fazla 120 karakter olabilir" },
                  })}
                  placeholder="Problem başlığını yazınız"
                />
              </Input>
              {errors.baslik && <Field.ErrorMessage>{errors.baslik.message}</Field.ErrorMessage>}
            </Field>

            {/* Açıklama */}
            <Field invalid={!!errors.aciklama}>
              <Field.Label>Açıklama</Field.Label>
              <textarea
                {...register("aciklama", {
                  required: "Açıklama zorunludur",
                  minLength: { value: 10, message: "Açıklama en az 10 karakter olmalı" },
                })}
                rows={3}
                placeholder="Problem detaylarını giriniz"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: errors.aciklama ? "1px solid #ef4444" : "1px solid #cbd5e1",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              {errors.aciklama && <Field.ErrorMessage>{errors.aciklama.message}</Field.ErrorMessage>}
            </Field>

            {/* Etki */}
            <Field invalid={!!errors.etki}>
              <Field.Label>Etki</Field.Label>
              <textarea
                {...register("etki", {
                  required: "Etki analizi zorunludur",
                })}
                rows={2}
                placeholder="Problemin sistemler ve iş süreçleri üzerindeki etkisini belirtiniz"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: errors.etki ? "1px solid #ef4444" : "1px solid #cbd5e1",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              {errors.etki && <Field.ErrorMessage>{errors.etki.message}</Field.ErrorMessage>}
            </Field>

            {/* Öncelik & Sorumlu */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field invalid={!!errors.oncelik}>
                <Field.Label>Öncelik</Field.Label>
                <Controller
                  name="oncelik"
                  control={control}
                  rules={{ required: "Öncelik seçmelisin" }}
                  render={({ field }) => (
                    <Select value={field.value} onChange={field.onChange}>
                      <Select.Trigger type="button">
                        {field.value || "Öncelik seç"}
                      </Select.Trigger>
                      <Select.Content
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {ONCELIKLER.map((o) => (
                          <Select.Item key={o} value={o}>
                            {o}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  )}
                />
                {errors.oncelik && <Field.ErrorMessage>{errors.oncelik.message}</Field.ErrorMessage>}
              </Field>

              <Field invalid={!!errors.sorumlu}>
                <Field.Label>Sorumlu (Opsiyonel)</Field.Label>
                <Input>
                  <Input.Field
                    {...register("sorumlu")}
                    placeholder="Ad Soyad"
                  />
                </Input>
              </Field>
            </div>

            {/* İlişkili Kayıtlar */}
            <Field invalid={!!errors.iliskiliKayitlarStr}>
              <Field.Label>İlişkili Kayıtlar (Opsiyonel)</Field.Label>
              <Input>
                <Input.Field
                  {...register("iliskiliKayitlarStr")}
                  placeholder="Örn: BTTH-2024-001, PR-2024-002"
                />
              </Input>
            </Field>
          </Dialog.Body>

          <Dialog.Footer style={{ flexShrink: 0 }}>
            <Dialog.Close>
              <Button appearance="text" type="button" onClick={handleKapat}>
                İptal
              </Button>
            </Dialog.Close>
            <Button type="submit" variant="primary">
              {isEditMode ? "Güncelle" : "Kaydet"}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}