package com.sirket.btth_api.btth;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class VeriYukleyici implements CommandLineRunner {

    private final BtthRepository btthRepo;

    public VeriYukleyici(BtthRepository btthRepo) {
        this.btthRepo = btthRepo;
    }

    @Override
    public void run(String... args) {
        // Çift yüklemeyi engeller
        if (btthRepo.count() > 0) {
            return;
        }

        List<BtthEntity> veriler = List.of(
            new BtthEntity("BTTH-2026-0001", "Yeni Personel E-posta ve Domain Hesabı Oluşturulması", "İnsan Kaynaklarına yeni katılan uzman yardımcısı için Active Directory ve MS 365 e-posta lisansı tanımlanması talep edilmektedir.", "Selin Yılmaz", "İnsan Kaynakları", Oncelik.ORTA, BtthDurum.TAMAMLANDI, "Caner Erdem", LocalDate.of(2026, 6, 2), LocalDate.of(2026, 6, 5)),
            new BtthEntity("BTTH-2026-0002", "Finans Departmanı İçin Ekstra Monitör ve Docking Station", "Yıl sonu mali kapanış çalışmaları nedeniyle iki adet 27 inç monitör ve uyumlu docking station talep ediliyor.", "Murat Öztürk", "Finans", Oncelik.DUSUK, BtthDurum.TAMAMLANDI, "Gökhan Kaya", LocalDate.of(2026, 6, 4), LocalDate.of(2026, 6, 10)),
            new BtthEntity("BTTH-2026-0003", "ERP Sistemi Stok Modülü Yetki Yükseltme", "Depo nakil işlemlerinin onaylanabilmesi için kullanıcı hesabına stok düzeltme yetkisinin eklenmesi gerekiyor.", "Burak Demir", "Operasyon", Oncelik.YUKSEK, BtthDurum.INCELEMEDE, "Merve Çelik", LocalDate.of(2026, 6, 7), LocalDate.of(2026, 6, 12)),
            new BtthEntity("BTTH-2026-0004", "VPN Erişim İzni ve Mobil Doğrulama (MFA) Kurulumu", "Saha ziyaretleri sırasında kurumsal sistemlere güvenli erişim için VPN hesabı ve MFA tanımlaması isteniyor.", "Deniz Arslan", "Pazarlama", Oncelik.ORTA, BtthDurum.ONAY_BEKLIYOR, "Oğuzhan Şahin", LocalDate.of(2026, 6, 10), LocalDate.of(2026, 6, 15)),
            new BtthEntity("BTTH-2026-0005", "Ana Sunucu Odası Klima Arızası ve Sıcaklık Artışı", "A Blok -1 kat sunucu odasındaki hassas klima ünitesi alarm veriyor, ortam sıcaklığı 28 dereceye yükseldi.", "Hakan Tekin", "Sistem Yönetimi", Oncelik.KRITIK, BtthDurum.TAMAMLANDI, "Serkan Aydın", LocalDate.of(2026, 6, 12), LocalDate.of(2026, 6, 12)),
            new BtthEntity("BTTH-2026-0006", "Toplantı Odası Projektör Lamba Değişimi", "3. kat büyük toplantı odasındaki görüntü aktarım cihazı renk kayması yapıyor ve görüntü vermiyor.", "Ece Koç", "Pazarlama", Oncelik.DUSUK, BtthDurum.REDDEDILDI, "Gökhan Kaya", LocalDate.of(2026, 6, 15), null),
            new BtthEntity("BTTH-2026-0007", "Hukuk Birimi Taranmış Belge Arşivi Disk Alanı Artırımı", "Ortak dosya sunucusundaki Hukuk klasörü kota sınırına ulaştı. Ek 500 GB depolama alanı tanımlanması rica olunur.", "Ayşe Varol", "Hukuk", Oncelik.ORTA, BtthDurum.INCELEMEDE, "Caner Erdem", LocalDate.of(2026, 6, 18), LocalDate.of(2026, 6, 25)),
            new BtthEntity("BTTH-2026-0008", "Yazılımcı Dizüstü Bilgisayarı RAM Takviyesi", "Docker ve yerel derleme araçları çalışırken 16 GB RAM yetersiz kalıyor, 32 GB yükseltmesi talep edilmektedir.", "Kaan Yıldız", "Yazılım Geliştirme", Oncelik.YUKSEK, BtthDurum.ONAY_BEKLIYOR, "Selin Pekcan", LocalDate.of(2026, 6, 20), LocalDate.of(2026, 6, 28)),
            new BtthEntity("BTTH-2026-0009", "Müşteri İlişkileri CRM Yazılımı Bağlantı Kesintisi", "Call center ekibi müşteri arama ekranlarında her 10 dakikada bir oturum kapatma hatası alıyor.", "Gamze Polat", "Müşteri İlişkileri", Oncelik.YUKSEK, BtthDurum.INCELEMEDE, "Merve Çelik", LocalDate.of(2026, 6, 22), LocalDate.of(2026, 6, 24)),
            new BtthEntity("BTTH-2026-0010", "Satış Temsilcisi İçin Kurumsal Akıllı Telefon ve Hat", "Saha kadrosuna yeni başlayan satış yöneticisi için şirket hattı ve mobil cihaz tedariği.", "Cem Aksoy", "Satış", Oncelik.ORTA, BtthDurum.YENI, null, LocalDate.of(2026, 6, 25), null),
            new BtthEntity("BTTH-2026-0011", "Muhasebe E-Fatura e-İmza Sürücü Güncellemesi", "GİB portalına fatura yüklerken akıllı kart okuyucu sürücü hatası alınıyor, faturalar kesilemiyor.", "Zeynep Güneş", "Finans", Oncelik.KRITIK, BtthDurum.TAMAMLANDI, "Gökhan Kaya", LocalDate.of(2026, 6, 28), LocalDate.of(2026, 6, 28)),
            new BtthEntity("BTTH-2026-0012", "Depo Kablosuz Barkod Okuyucu Bağlantı Problemi", "Lojistik toplama alanındaki 3 adet el terminali Wi-Fi ağından sürekli düşüyor.", "Emre Korkmaz", "Lojistik", Oncelik.KRITIK, BtthDurum.INCELEMEDE, "Oğuzhan Şahin", LocalDate.of(2026, 7, 1), LocalDate.of(2026, 7, 3)),
            new BtthEntity("BTTH-2026-0013", "Toplantı Odası Video Konferans Mikrofon Arızası", "Yönetim katındaki toplantı odası ses barı karşı tarafa cızırtılı ses iletiyor.", "Ahmet Bilgin", "İdari İşler", Oncelik.ORTA, BtthDurum.TAMAMLANDI, "Serkan Aydın", LocalDate.of(2026, 7, 3), LocalDate.of(2026, 7, 6)),
            new BtthEntity("BTTH-2026-0014", "Lisanssız Grafik Tasarım Yazılımı Kurulum Talebi", "İnternetten indirilen ücretsiz sürüm video düzenleme yazılımının bilgisayara kurulması talebi.", "Gizem Şen", "Pazarlama", Oncelik.DUSUK, BtthDurum.REDDEDILDI, "Selin Pekcan", LocalDate.of(2026, 7, 5), null),
            new BtthEntity("BTTH-2026-0015", "IK Portalında İş Başvurusu Formu Kaydetme Hatası", "Aday değerlendirme formunda 500 hatası alınıyor, ik veritabanına kayıt atılamıyor.", "Selin Yılmaz", "İnsan Kaynakları", Oncelik.YUKSEK, BtthDurum.ONAY_BEKLIYOR, "Merve Çelik", LocalDate.of(2026, 7, 8), LocalDate.of(2026, 7, 12)),
            new BtthEntity("BTTH-2026-0016", "Yaz Stajyer Grubu İçin Geçici İnternet ve PC Erişimi", "15 Temmuz'da başlayacak 6 stajyer için kısıtlı misafir profili ve PC kurulumu yapılması.", "Selin Yılmaz", "İnsan Kaynakları", Oncelik.DUSUK, BtthDurum.YENI, null, LocalDate.of(2026, 7, 10), null),
            new BtthEntity("BTTH-2026-0017", "Saha Satış Ekibine Tablet Tedariği ve MDM Profil Ataması", "Yeni dağıtılacak 10 adet tablet için Mobile Device Management (MDM) politikalarının uygulanması.", "Cem Aksoy", "Satış", Oncelik.YUKSEK, BtthDurum.ONAY_BEKLIYOR, "Selin Pekcan", LocalDate.of(2026, 7, 12), LocalDate.of(2026, 7, 20)),
            new BtthEntity("BTTH-2026-0018", "Kişisel Akıllı Telefona Kurumsal Posta Hesabı Tanımlama", "Şirket politikasına aykırı şekilde şahsi cihaza Outlook senkronizasyonu talebi.", "Volkan Eraslan", "Operasyon", Oncelik.DUSUK, BtthDurum.REDDEDILDI, "Caner Erdem", LocalDate.of(2026, 7, 15), null),
            new BtthEntity("BTTH-2026-0019", "Şifre Hatalı Girme Nedeniyle Kilitlenen AD Hesabı Unblock", "Sisteme 3 kez üst üste hatalı parola girildiği için kilitlenen kullanıcı hesabının açılması.", "Ayşe Varol", "Hukuk", Oncelik.KRITIK, BtthDurum.TAMAMLANDI, "Gökhan Kaya", LocalDate.of(2026, 7, 17), LocalDate.of(2026, 7, 17)),
            new BtthEntity("BTTH-2026-0020", "PostgreSQL Test Veritabanı Alan Doluluğu Temizliği", "Log tablolarının şişmesi nedeniyle test sunucusundaki disk %98 doluluğa ulaştı.", "Kaan Yıldız", "Yazılım Geliştirme", Oncelik.YUKSEK, BtthDurum.INCELEMEDE, "Merve Çelik", LocalDate.of(2026, 7, 20), LocalDate.of(2026, 7, 23)),
            new BtthEntity("BTTH-2026-0021", "Lojistik Birimi İrsaliye Yazıcısı Toner Değişimi", "Depo çıkış bankosundaki endüstriyel nokta vuruşlu ve lazer yazıcının silik basması.", "Emre Korkmaz", "Lojistik", Oncelik.DUSUK, BtthDurum.TAMAMLANDI, "Serkan Aydın", LocalDate.of(2026, 7, 22), LocalDate.of(2026, 7, 23)),
            new BtthEntity("BTTH-2026-0022", "İş Zekası (BI) Raporlama Panosu Yetki Talebi", "Yeni atanan Finans Yöneticisinin PowerBI üzerindeki Nakit Akış panolarını görme yetkisi.", "Murat Öztürk", "Finans", Oncelik.ORTA, BtthDurum.YENI, null, LocalDate.of(2026, 7, 25), null),
            new BtthEntity("BTTH-2026-0023", "Santral Dış Hat Yönlendirme ve Dahili Numara Değişimi", "Müşteri Hizmetleri ekibindeki masa değişimi nedeniyle dahili numaranın yeni RJ45 portuna taşınması.", "Gamze Polat", "Müşteri İlişkileri", Oncelik.DUSUK, BtthDurum.TAMAMLANDI, "Oğuzhan Şahin", LocalDate.of(2026, 7, 27), LocalDate.of(2026, 7, 29)),
            new BtthEntity("BTTH-2026-0024", "Misafir Wi-Fi Ağı SMS Doğrulama Sayfası Hatası", "Ziyaretçilerin bağlandığı captive portal sayfasında SMS onay kodu cep telefonlarına ulaşmıyor.", "Ahmet Bilgin", "İdari İşler", Oncelik.ORTA, BtthDurum.INCELEMEDE, "Caner Erdem", LocalDate.of(2026, 7, 29), LocalDate.of(2026, 8, 2)),
            new BtthEntity("BTTH-2026-0025", "Bulut Depolama Üzerinde Ortak Proje Klasörü Kurulumu", "Yeni Lansman Kampanyası için dış ajans ile güvenli dosya paylaşım klasörü oluşturulması.", "Deniz Arslan", "Pazarlama", Oncelik.ORTA, BtthDurum.ONAY_BEKLIYOR, "Selin Pekcan", LocalDate.of(2026, 7, 31), LocalDate.of(2026, 8, 5)),
            new BtthEntity("BTTH-2026-0026", "E-posta Ortamında Şüpheli Oltalama İletisi Bildirimi", "'Fatura Detayı' başlığıyla gelen ve zararlı bağlantı içeren sahte e-postanın incelenmesi.", "Zeynep Güneş", "Finans", Oncelik.KRITIK, BtthDurum.TAMAMLANDI, "Caner Erdem", LocalDate.of(2026, 8, 2), LocalDate.of(2026, 8, 2)),
            new BtthEntity("BTTH-2026-0027", "Çizim Programı Donanım Lisansı (Dongle) Tanınmama Sorunu", "Ar-Ge mühendisinin bilgisayarına takılı USB lisans anahtarı güncellenmiş Windows sürümünde çalışmıyor.", "Tarkan Soylu", "Ar-Ge", Oncelik.YUKSEK, BtthDurum.ONAY_BEKLIYOR, "Gökhan Kaya", LocalDate.of(2026, 8, 3), LocalDate.of(2026, 8, 7)),
            new BtthEntity("BTTH-2026-0028", "Dış Mimaride Test Sunucusuna Port Yönlendirme Talebi", "Mobil uygulama testi için dış ağdan test ortamındaki 8443 portuna geçici erişim yetkisi.", "Kaan Yıldız", "Yazılım Geliştirme", Oncelik.YUKSEK, BtthDurum.YENI, null, LocalDate.of(2026, 8, 5), null),
            new BtthEntity("BTTH-2026-0029", "Yeni Yönetim Kurulu Üyesi İçin Şifrelenmiş VIP Laptop", "Yönetim kuruluna katılan üye için BitLocker aktif edilmiş, güvenliği artırılmış laptop hazırlanması.", "Selin Yılmaz", "İnsan Kaynakları", Oncelik.KRITIK, BtthDurum.YENI, null, LocalDate.of(2026, 8, 6), null),
            new BtthEntity("BTTH-2026-0030", "Şirket İçi Eğitim Salonu Kulaklık Temini", "Online akademide kullanılmak üzere 20 adet gürültü önleyici kulaklık satın alım talebi.", "Selin Yılmaz", "İnsan Kaynakları", Oncelik.DUSUK, BtthDurum.REDDEDILDI, "Serkan Aydın", LocalDate.of(2026, 8, 7), null)
        );

        btthRepo.saveAll(veriler);
    }
}