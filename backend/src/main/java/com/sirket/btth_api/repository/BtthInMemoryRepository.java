package com.sirket.btth_api.repository;

import com.sirket.btth_api.btth.BtthDto; 
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class BtthInMemoryRepository {

    private final Map<String, BtthDto> veriler = new ConcurrentHashMap<>();
    private final AtomicInteger sayac = new AtomicInteger(0);

    @PostConstruct
    void baslangicVerisi() {
        kaydet(new BtthDto(
            yeniId(),
            "Üretim Veritabanı Disk Artırımı",
            "DB sunucusundaki doluluk %92 seviyesine ulaştı, acil disk alanı tanımı gerekiyor.",
            "Ahmet Yılmaz",
            "Altyapı ve Sistem",
            "KRITIK",
            "INCELEMEDE",
            "Mehmet Demir",
            LocalDate.of(2026, 8, 15),
            LocalDate.of(2026, 8, 27)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "Yeni Personel E-Posta ve VPN Hesabı",
            "İK departmanına yeni katılan 3 uzman için kurum e-postası ve VPN erişimleri.",
            "Zeynep Kaya",
            "İnsan Kaynakları",
            "ORTA",
            "TAMAMLANDI",
            "Caner Şahin",
            LocalDate.of(2026, 8, 18),
            LocalDate.of(2026, 8, 20)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "ERP Fatura Modülü Hata Düzeltmesi",
            "KDV 0 tutarlı faturaların GİB entegrasyonunda hata vermesi sorunu.",
            "Mustafa Çelik",
            "Finans",
            "YUKSEK",
            "ONAY_BEKLIYOR",
            "Elif Öztürk",
            LocalDate.of(2026, 8, 20),
            LocalDate.of(2026, 8, 28)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "Güvenlik Duvarı Port Kural Güncellemesi",
            "Test ortamındaki yeni mikroservis için 8085 portunun dışa açılması.",
            "Burak Aydın",
            "Siber Güvenlik",
            "YUKSEK",
            "YENI",
            "Henüz Atanmadı",
            LocalDate.of(2026, 8, 24),
            LocalDate.of(2026, 8, 29)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "Donanım Yenileme Talebi (Laptop)",
            "Tasarım ekibi için 32 GB RAM'li Mac Studio / Workstation talebi.",
            "Selin Aksoy",
            "Pazarlama",
            "DUSUK",
            "INCELEMEDE",
            "Mehmet Demir",
            LocalDate.of(2026, 8, 10),
            LocalDate.of(2026, 9, 5)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "Veritabanı İndeks Optimizasyonu",
            "Raporlama sorgularındaki 45 saniyelik gecikmeyi düşürmek için eksik indekslerin atılması.",
            "Emre Yıldız",
            "Yazılım Geliştirme",
            "ORTA",
            "TAMAMLANDI",
            "Elif Öztürk",
            LocalDate.of(2026, 8, 12),
            LocalDate.of(2026, 8, 19)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "Mobil Uygulama Push Bildirim Entegrasyonu",
            "iOS ve Android tarafında Firebase Cloud Messaging altyapısının güncellenmesi.",
            "Deniz Arslan",
            "Dijital Kanallar",
            "YUKSEK",
            "INCELEMEDE",
            "Caner Şahin",
            LocalDate.of(2026, 8, 21),
            LocalDate.of(2026, 9, 2)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "Haftalık Olağanüstü Durum (DR) Yedekleme Testi",
            "İkincil veri merkezindeki yedeklerden felaket senaryosu geri yükleme testi.",
            "Ahmet Yılmaz",
            "Altyapı ve Sistem",
            "DUSUK",
            "TAMAMLANDI",
            "Mehmet Demir",
            LocalDate.of(2026, 8, 14),
            LocalDate.of(2026, 8, 15)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "Şirket Dışı IP Geçici Yetkilendirme",
            "Dış danışmanlık firmasına 3 gün süreliğine dev ortamına erişim izni.",
            "Kaan Sever",
            "Operasyon",
            "ORTA",
            "REDDEDILDI",
            "Burak Aydın",
            LocalDate.of(2026, 8, 22),
            LocalDate.of(2026, 8, 23)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "E-Fatura Lisans Sunucusu Yenileme",
            "Süresi dolmak üzere olan SSL sertifikalarının ve lisans anahtarlarının yüklenmesi.",
            "Mustafa Çelik",
            "Muhasebe",
            "KRITIK",
            "ONAY_BEKLIYOR",
            "Mehmet Demir",
            LocalDate.of(2026, 8, 23),
            LocalDate.of(2026, 8, 26)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "Monitör ve Docking Station Talebi",
            "Saha satış yöneticisi için ek çift ekran kurulum donanımı.",
            "Gözde Yılmaz",
            "Satış",
            "DUSUK",
            "YENI",
            "Henüz Atanmadı",
            LocalDate.of(2026, 8, 25),
            LocalDate.of(2026, 9, 1)
        ));

        kaydet(new BtthDto(
            yeniId(),
            "CI/CD Pipeline Derleme Süresi İyileştirmesi",
            "Jenkins/GitHub Actions derleme sürelerinin Docker önbelleği kullanılarak düşürülmesi.",
            "Emre Yıldız",
            "DevOps",
            "YUKSEK",
            "INCELEMEDE",
            "Caner Şahin",
            LocalDate.of(2026, 8, 24),
            LocalDate.of(2026, 9, 10)
        ));
    }

    public List<BtthDto> hepsi() { 
        return List.copyOf(veriler.values()); 
    }

    public Optional<BtthDto> bul(String id) { 
        return Optional.ofNullable(veriler.get(id)); 
    }

    public BtthDto kaydet(BtthDto kayit) { 
        veriler.put(kayit.id(), kayit); 
        return kayit; 
    }

    public boolean sil(String id) { 
        return veriler.remove(id) != null; 
    }

    public String yeniId() {
        return "BTTH-2026-%04d".formatted(sayac.incrementAndGet());
    }
}