import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, Button, Input, Select, Field } from "@takeoff-ui/react-spar";
import type { Btth } from "../types";
import { yeniIdUret } from "../utils/id";

export interface FormDegerleri {
  baslik: string;
  aciklama: string;
  talepEden: string;
  birim: string;
  oncelik: string;
  hedefTarih?: string;
}

interface YeniTalepModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kayitlar?: Btth[];
  duzenlenecekTalep?: Btth | null;
  onEkle?: (yeniTalep: Btth) => void;
  onGuncelle?: (guncellenmisTalep: Btth) => void;
  hideTrigger?: boolean;
}

const BIRIMLER = [
  "Yazılım Geliştirme",
  "Sistem ve Altyapı",
  "Siber Güvenlik",
  "BT Destek",
  "Veri Yönetimi",
];

const ONCELIKLER = ["Düşük", "Orta", "Yüksek", "Kritik"];

export function YeniTalepModal({
  open,
  onOpenChange,
  kayitlar = [],
  duzenlenecekTalep,
  onEkle,
  onGuncelle,
  hideTrigger = false,
}: YeniTalepModalProps) {
  const isEditMode = Boolean(duzenlenecekTalep);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDegerleri>({
    defaultValues: {
      baslik: "",
      aciklama: "",
      talepEden: "",
      birim: "",
      oncelik: "Orta",
      hedefTarih: "",
    },
  });

  // Modal her açıldığında mod durumuna göre form alanlarını doldurur veya temizler
  useEffect(() => {
    if (open) {
      if (duzenlenecekTalep) {
        reset({
          baslik: duzenlenecekTalep.baslik,
          aciklama: duzenlenecekTalep.aciklama,
          talepEden: duzenlenecekTalep.talepEden,
          birim: duzenlenecekTalep.birim,
          oncelik: duzenlenecekTalep.oncelik,
          hedefTarih: duzenlenecekTalep.hedefTarih || "",
        });
      } else {
        reset({
          baslik: "",
          aciklama: "",
          talepEden: "",
          birim: "",
          oncelik: "Orta",
          hedefTarih: "",
        });
      }
    }
  }, [open, duzenlenecekTalep, reset]);

  const handleKapat = () => {
    reset();
    onOpenChange(false);
  };

  function kaydet(degerler: FormDegerleri) {
    if (isEditMode && duzenlenecekTalep) {
      // Düzenleme Senaryosu
      const guncellenmis: Btth = {
        ...duzenlenecekTalep,
        ...degerler,
        oncelik: degerler.oncelik as Btth["oncelik"],
        hedefTarih: degerler.hedefTarih || null,
        gecmis: [
          ...(duzenlenecekTalep.gecmis ?? []),
          {
            tarih: new Date().toISOString(),
            kullanici: "Selim Öztürk",
            islem: "Talep bilgileri güncellendi",
          },
        ],
      };
      onGuncelle?.(guncellenmis);
    } else {
      // Yeni Kayıt Senaryosu
      const yeni: Btth = {
        ...degerler,
        id: yeniIdUret(kayitlar),
        durum: "Yeni",
        atanan: null,
        oncelik: degerler.oncelik as Btth["oncelik"],
        hedefTarih: degerler.hedefTarih || null,
        olusturmaTarihi: new Date().toISOString().slice(0, 10),
        gecmis: [
          {
            tarih: new Date().toISOString(),
            kullanici: "Selim Öztürk",
            islem: "Talep oluşturuldu",
          },
        ],
        ekler: [],
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
          + Yeni Talep
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
            {isEditMode ? `Talebi Düzenle (${duzenlenecekTalep?.id})` : "Yeni Talep"}
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
                  placeholder="Talep başlığını yazınız"
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
                placeholder="Talep detaylarını giriniz"
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

            {/* Birim & Öncelik */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field invalid={!!errors.birim}>
                <Field.Label>Birim</Field.Label>
                <Controller
                  name="birim"
                  control={control}
                  rules={{ required: "Birim seçmelisin" }}
                  render={({ field }) => (
                    <Select value={field.value} onChange={field.onChange}>
                      <Select.Trigger type="button">
                        {field.value || "Birim seç"}
                      </Select.Trigger>
                      <Select.Content
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        {BIRIMLER.map((b) => (
                          <Select.Item key={b} value={b}>
                            {b}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  )}
                />
                {errors.birim && <Field.ErrorMessage>{errors.birim.message}</Field.ErrorMessage>}
              </Field>

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
            </div>

            {/* Talep Eden & Hedef Tarih */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <Field invalid={!!errors.talepEden}>
                <Field.Label>Talep Eden</Field.Label>
                <Input>
                  <Input.Field
                    {...register("talepEden", {
                      required: "Talep eden kişi zorunludur",
                    })}
                    placeholder="Ad Soyad"
                  />
                </Input>
                {errors.talepEden && <Field.ErrorMessage>{errors.talepEden.message}</Field.ErrorMessage>}
              </Field>

              <Field invalid={!!errors.hedefTarih}>
                <Field.Label>Hedef Tarih</Field.Label>
                <input
                  type="date"
                  {...register("hedefTarih", {
                    validate: (v) =>
                      !v ||
                      v >= new Date().toISOString().slice(0, 10) ||
                      "Hedef tarih geçmişte olamaz",
                  })}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: errors.hedefTarih ? "1px solid #ef4444" : "1px solid #cbd5e1",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
                {errors.hedefTarih && <Field.ErrorMessage>{errors.hedefTarih.message}</Field.ErrorMessage>}
              </Field>
            </div>
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