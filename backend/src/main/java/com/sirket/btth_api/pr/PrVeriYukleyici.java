package com.sirket.btth_api.pr;

import com.sirket.btth_api.btth.Oncelik;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class PrVeriYukleyici implements CommandLineRunner {

    private final PrRepository prRepository;

    public PrVeriYukleyici(PrRepository prRepository) {
        this.prRepository = prRepository;
    }

    @Override
    public void run(String... args) {
        if (prRepository.count() == 0) {
            List<PrEntity> kayitlar = List.of(
                createPr("PR-2026-0001", 
                        "Ana Veri Merkezinde İklimlendirme Arızası ve Sunucu Kapanmaları",
                        "A Blok veri merkezindeki yedekli klima ünitelerinin eşzamanlı arızalanması sonucu sıcaklık kritik eşiği geçmiş ve sunucular otomatik kapanmıştır.",
                        "Klima soğutma gazı sızıntısı ve ana kumanda panosundaki sensör kalibrasyon hatası.",
                        "Mobil iklimlendirme üniteleri kiralanarak ortama geçici soğutma sağlandı.",
                        "Tüm kurumsal iç sistemler ve web servisleri 45 dakika boyunca hizmet dışı kaldı.",
                        Oncelik.KRITIK, PrDurum.KAPANDI, "BTTH-2026-0005", "Serkan Aydın",
                        "2026-06-12", "2026-06-15", null),

                createPr("PR-2026-0002", 
                        "Lojistik Depo Alanındaki Sürekli Kablosuz Ağ Bağlantı Kopuklukları",
                        "Depo çalışanlarının kullandığı el terminalleri ve barkod okuyucular belirli lokasyonlarda Wi-Fi sinyalini kaybediyor.",
                        "Ağ yoğunluğu ve depoya eklenen yeni metal raf sistemlerinin sinyal sönümlemesi yapması.",
                        "El terminallerinin roaming hassasiyet ayarları düşürüldü ve sabit erişim noktalarına bağlandı.",
                        "Mal kabul ve sevkiyat operasyonlarında %30 gecikme yaşandı.",
                        Oncelik.KRITIK, PrDurum.KALICI_COZUM, "BTTH-2026-0012", "Oğuzhan Şahin",
                        "2026-07-02", null, null),

                createPr("PR-2026-0003", 
                        "Dışa Açık Web Uygulamalarında RCE ve Enjeksiyon Zafiyet Trendi",
                        "Son güvenlik taramalarında dış ağa açık sunucularda yüksek ve kritik seviyeli kod çalıştırma zafiyetleri tespit edildi.",
                        "Eski açık kaynak kütüphane bağımlılıkları ve veri doğrulama (input validation) katmanının yetersizliği.",
                        "WAF (Web Application Firewall) üzerinde katı kural kümeleri (signatures) aktif edildi.",
                        "Kurumsal portal ve müşteri servisleri siber saldırı riski altına girdi.",
                        Oncelik.KRITIK, PrDurum.KAPANDI, "BGVL-2026-0001,BGVL-2026-0003", "Caner Erdem",
                        "2026-06-06", "2026-06-20", null),

                createPr("PR-2026-0004", 
                        "ERP Sisteminde Ay Sonu Kapanış Dönemlerinde Yaşanan Performans Kaybı",
                        "Her ayın son 3 günü Finans ve Operasyon birimleri ERP sisteminde işlem yaparken sistem kilitlenmeleri yaşıyor.",
                        "Veritabanı indekslerinin bozulması ve yetersiz sorgu optimizasyonu.",
                        "Mesai saatleri dışında veritabanı bakım ve indeks yenileme betikleri çalıştırıldı.",
                        "Mali raporlama ve faturalandırma süreçleri 2 gün gecikti.",
                        Oncelik.YUKSEK, PrDurum.KOK_NEDEN_ANALIZI, "BTTH-2026-0003", "Merve Çelik",
                        "2026-06-08", null, null),

                createPr("PR-2026-0005", 
                        "VPN Altyapısında Sürekli Oturum Düşmesi ve Kimlik Doğrulama Hatası",
                        "Uzaktan çalışan kullanıcılar VPN bağlantısı sağlarken sürekli kopma ve yetkisiz erişim hatası alıyor.",
                        "VPN cihazı üzerindeki bellek sızıntısı (memory leak) ve RADIUS sunucu zaman aşımı.",
                        "VPN cihazı her gece otomatik olarak yeniden başlatılıyor.",
                        "Uzaktan çalışan 150+ personelin verimliliği düştü.",
                        Oncelik.KRITIK, PrDurum.KAPANDI, "BTTH-2026-0004,BGVL-2026-0011", "Caner Erdem",
                        "2026-06-26", "2026-07-05", "CVE-2026-0015"),

                createPr("PR-2026-0006", 
                        "Müşteri İlişkileri CRM Portalında Zaman Aşımı ve Bağlantı Hataları",
                        "Çağrı merkezi personelinin kullandığı CRM ekranlarında düzenli aralıklarla oturum sonlanıyor.",
                        "Yük dengeleyici (Load Balancer) üzerindeki 'sticky session' yapılandırma hatası.",
                        "Kullanıcıların oturum zaman aşımı süreleri geçici olarak 2 saat uzatıldı.",
                        "Çağrı karşılama süreleri uzadı, müşteri memnuniyetsizliği oluştu.",
                        Oncelik.YUKSEK, PrDurum.KALICI_COZUM, "BTTH-2026-0009,BGVL-2026-0022", "Merve Çelik",
                        "2026-06-23", null, null),

                createPr("PR-2026-0007", 
                        "Güvenlik Duvarı ve Ağ Cihazlarında Güvensiz SSL/TLS Protokol Kullanımı",
                        "Yapılan ağ taramalarında iç ve dış ağ cihazlarında TLS 1.0 ve TLS 1.1 protokollerinin halen aktif olduğu belirlendi.",
                        "Eski model ağ ekipmanlarının güncel TLS 1.3 standartlarını desteklememesi.",
                        "Erişim sadece belirli yönetim IP'lerine kısıtlandı.",
                        "Kurumsal ağın Man-in-the-Middle (MitM) saldırılarına açık kalması.",
                        Oncelik.ORTA, PrDurum.KOK_NEDEN_ANALIZI, "BGVL-2026-0004", "Oğuzhan Şahin",
                        "2026-06-10", null, null),

                createPr("PR-2026-0008", 
                        "PostgreSQL Test ve Üretim Veritabanlarında Kontrolsüz Disk Doluluğu",
                        "Veritabanı sunucularında WAL ve uygulama loglarının otomatik temizlenmemesi nedeniyle diskler %95 üzeri doluluğa ulaşıyor.",
                        "Log rotasyon (logrotate) betiklerinin durması ve log seviyesinin DEBUG olarak kalması.",
                        "Eski log dosyaları manuel olarak arşivlenip silindi.",
                        "Yazılım geliştirme ekibinin test süreçleri durma noktasına geldi.",
                        Oncelik.YUKSEK, PrDurum.KAPANDI, "BTTH-2026-0020,BGVL-2026-0002", "Merve Çelik",
                        "2026-07-21", "2026-07-25", null),

                createPr("PR-2026-0009", 
                        "IK Portalında Başvuru Formlarında Veritabanı Kayıt Hataları (HTTP 500)",
                        "Aday ve personel değerlendirme formları kaydedilirken sunucu taraflı 500 hatası üretiliyor.",
                        "Özgeçmiş başlığındaki özel karakterlerin SQL/XSS filtresine takılması ve uncaught exception oluşması.",
                        "Metin alanlarındaki özel karakter temizleme kuralları güncellendi.",
                        "İnsan Kaynakları iş alım süreçlerinde veri kaybı yaşandı.",
                        Oncelik.ORTA, PrDurum.KALICI_COZUM, "BTTH-2026-0015,BGVL-2026-0009", "Merve Çelik",
                        "2026-07-09", null, null),

                createPr("PR-2026-0010", 
                        "Active Directory Üzerinde Parola Kilitleme Vakalarında Dönemsel Artış",
                        "Pazartesi sabahları onlarca kullanıcının domain hesabı şifre denemesi limitinden ötürü kilitleniyor.",
                        "Mobil cihazlarda saklanan eski kurumsal e-posta parolalarının arka planda sürekli hatalı istek atması.",
                        "Kullanıcı hesabı kilit açma yetkisi yardım masası (Helpdesk) ekibine devredildi.",
                        "BT Destek ekibine gelen çağrı hacmi %40 arttı.",
                        Oncelik.DUSUK, PrDurum.KAPANDI, "BTTH-2026-0019,BGVL-2026-0008", "Gökhan Kaya",
                        "2026-07-18", "2026-07-22", null),

                createPr("PR-2026-0011", 
                        "E-Fatura Kesim Dönemlerinde Akıllı Kart (e-İmza) Okuyucu Sürücü Uyumsuzlukları",
                        "Muhasebe departmanında e-fatura onaylanırken e-imza token cihazları Windows güncellemeleri sonrası tanınmıyor.",
                        "64-bit Java Runtime ile 32-bit akıllı kart PKCS#11 sürücülerinin çakışması.",
                        "Cihaz sürücüleri ve Java kütüphaneleri manuel olarak uyumlu sürüme düşürüldü (downgrade).",
                        "Faturalandırma operasyonu durdu, ceza riski oluştu.",
                        Oncelik.ORTA, PrDurum.KAPANDI, "BTTH-2026-0011", "Gökhan Kaya",
                        "2026-06-29", "2026-07-02", null),

                createPr("PR-2026-0012", 
                        "Toplantı Odaları Video Konferans ve Projeksiyon Ekipman Arızaları",
                        "Ortak toplantı odalarındaki donanımların kablo kopukluğu, cızırtı ve görüntü aktarmama sorunları artış gösterdi.",
                        "Kullanıcıların HDMI/Type-C dönüştürücüleri zorlayarak takması ve yıpranma.",
                        "Odalar için korumalı kablo kanalları ve sabit dönüştürücü aparatlar yerleştirildi.",
                        "Yönetim kurulu ve müşteri toplantılarında aksamalar meydana geldi.",
                        Oncelik.DUSUK, PrDurum.KOK_NEDEN_ANALIZI, "BTTH-2026-0006,BTTH-2026-0013", "Serkan Aydın",
                        "2026-07-04", null, null),

                createPr("PR-2026-0013", 
                        "Ortak Dosya Sunucusunda (NAS) Yetki Karmaşası ve Güvenlik Riski",
                        "Departmanlar arası paylaşılan klasörlerde yetkisiz erişim ve aşırı kota kullanımı tespit edildi.",
                        "Active Directory grup politikalarının (GPO) zamanla düzensiz oluşturulması ve Everyone grubuna verilen haklar.",
                        "Geniş yetkili klasörler tespit edilerek okuma/yazma izinleri kısıtlandı.",
                        "Hassas kurumsal belgelerin diğer birimlerce görülme riski oluştu.",
                        Oncelik.DUSUK, PrDurum.YENI, "BTTH-2026-0007,BGVL-2026-0012", null,
                        "2026-06-19", null, null),

                createPr("PR-2026-0014", 
                        "Oltalama (Phishing) E-postaları Yoluyla Zararlı Bağlantı Yayılımı",
                        "Son bir ayda personellerin kurumsal e-posta adreslerine sahte fatura ve kargo takipli oltalamalar ulaştı.",
                        "E-posta ağ geçidindeki (Email Gateway) spam ve anti-phishing filtre kütüphanesinin güncel olmaması.",
                        "Şüpheli alan adları ve IP blokları firewall üzerinde elle engellendi.",
                        "Kullanıcıların kimlik bilgilerini kaptırma ve fidye yazılımı (Ransomware) riski.",
                        Oncelik.YUKSEK, PrDurum.KALICI_COZUM, "BTTH-2026-0026,BGVL-2026-0015", "Caner Erdem",
                        "2026-07-06", null, null),

                createPr("PR-2026-0015", 
                        "Kubernetes Prod Altyapısında Yüksek Yetki ve Pod Çökmeleri",
                        "Üretim ortamındaki k8s kümesinde mikrohizmetler anlık yük artışlarında pod restart döngüsüne giriyor.",
                        "Ingress Controller ve container limitlerinin (CPU/Memory limits) yanlış yapılandırılması.",
                        "Pod kaynak limitleri geçici olarak 2 katına çıkarıldı.",
                        "Mikrohizmet mimarisindeki bazı servislerde kısa süreli kesintiler yaşandı.",
                        Oncelik.KRITIK, PrDurum.KOK_NEDEN_ANALIZI, "BGVL-2026-0013", "Merve Çelik",
                        "2026-07-01", null, null),

                createPr("PR-2026-0016", 
                        "Misafir Wi-Fi SMS Portalında Onay Kodu İletim Gecikmeleri",
                        "Şirkete gelen ziyaretçiler misafir ağına bağlanırken SMS doğrulama kodunun gelmediğini bildiriyor.",
                        "SMS entegrasyon sağlayıcısının API uç noktasındaki zaman aşımı ve yüksek yanıt süreleri.",
                        "Yedek SMS entegratörü aktifleştirildi.",
                        "Ziyaretçi ve tedarikçi görüşmelerinde kablosuz erişim aksaklığı yaşandı.",
                        Oncelik.ORTA, PrDurum.KALICI_COZUM, "BTTH-2026-0024", "Caner Erdem",
                        "2026-07-30", null, null),

                createPr("PR-2026-0017", 
                        "Saha Ekibi Tablet Cihazlarında MDM ve Güvenlik Politika Eksikliği",
                        "Satış kadrosuna dağıtılan mobil tabletlerde disk şifrelemenin yapılmadığı ve uygulama kısıtlamasının olmadığı görüldü.",
                        "MDM (Mobile Device Management) lisans atamalarının otomatize edilmemesi ve manuel cihaz kurulumu.",
                        "Sorunlu tabletler toplanarak BitLocker ve MDM politikası elle basıldı.",
                        "Cihazın kaybolması veya çalınması durumunda veri sızıntısı tehlikesi.",
                        Oncelik.YUKSEK, PrDurum.KOK_NEDEN_ANALIZI, "BTTH-2026-0017,BGVL-2026-0024", "Selin Pekcan",
                        "2026-07-13", null, null),

                createPr("PR-2026-0018", 
                        "Santral VOIP Hatlarında Ses Kalitesi Düşüşü ve Cızırtı",
                        "Müşteri hizmetleri ve idari kadronun yaptığı dış hat telefon görüşmelerinde ses cızırtısı yaşanıyor.",
                        "Network üzerindeki QoS (Quality of Service) önceliklendirme kuralının switch güncellemesiyle silinmesi.",
                        "VOIP VLAN trafiğine switchler üzerinde yüksek öncelik kuralı yeniden eklendi.",
                        "Müşteri görüşmelerinde kalite standartları düştü.",
                        Oncelik.DUSUK, PrDurum.KAPANDI, "BTTH-2026-0023", "Oğuzhan Şahin",
                        "2026-07-28", "2026-08-01", null),

                createPr("PR-2026-0019", 
                        "Redis Önbellek Sunucusunun Dış Ağ Trafiğine Açık ve Şifresiz Olması",
                        "Yapılan port taramasında önbellekleme veritabanının herhangi bir kimlik doğrulaması olmaksızın dinlediği tespit edildi.",
                        "Geliştirme ortamından üretime geçerken varsayılan ayarların korunması.",
                        "Güvenlik duvarından Redis portu (6379) dış erişime derhal kapatıldı.",
                        "Oturum verileri ve önbellek bilgilerinin ele geçirilme riski.",
                        Oncelik.KRITIK, PrDurum.KAPANDI, "BGVL-2026-0023", "Caner Erdem",
                        "2026-07-25", "2026-07-27", null),

                createPr("PR-2026-0020", 
                        "PDF Oluşturma Servisinde Bellek Sızıntısı ve SSRF Zafiyeti",
                        "Faturaların PDF formatına dönüştürüldüğü arka plan servisi zaman zaman tüm sunucu kaynağını tüketip kilitleniyor.",
                        "Kullanılan açık kaynak kütüphanedeki bellek yönetimi hatası ve dış URL çağırma yetkisi.",
                        "PDF oluşturma servisi saatlik cron job ile yeniden başlatılıyor.",
                        "E-fatura çıktıları ve sözleşme belgeleri gecikmeli üretiliyor.",
                        Oncelik.YUKSEK, PrDurum.YENI, "BGVL-2026-0025", null,
                        "2026-07-30", null, null),

                createPr("PR-2026-0021", 
                        "ESXi Sanallaştırma Kümesinde Beklenmeyen Node Kapanmaları",
                        "Sanal sunucu altyapısındaki ana fiziksel sunculardan biri mor ekran (PSOD) hatası vererek kapanıyor.",
                        "VMware ESXi giydirme katmanındaki bellek taşması zafiyeti ve eski HBA kart sürücüsü.",
                        "Sorunlu node bakım moduna alınarak sanal makineler diğer node'lara kaydırıldı.",
                        "Sanal sunucularda HA (High Availability) yedekliliği riske girdi.",
                        Oncelik.KRITIK, PrDurum.KALICI_COZUM, "BGVL-2026-0020", "Serkan Aydın",
                        "2026-07-17", null, "CVE-2026-8810"),

                createPr("PR-2026-0022", 
                        "Ana Ağ Güvenlik Duvarında (Fortinet) Anlık Yüksek CPU Tüketimi",
                        "Şirket merkezindeki firewall cihazında işlemci kullanımı %100'e ulaşıp paket kayıplarına yol açıyor.",
                        "FortiOS işletim sistemindeki SSL-VPN daemon bellek sızıntısı arızası.",
                        "Güvenlik duvarı IPS ve SSL-VPN servislerinin bazı alt modülleri pasif edildi.",
                        "Şirket genelinde internet erişiminde ve şubeler arası IPsec tünellerde yavaşlama.",
                        Oncelik.KRITIK, PrDurum.YENI, "BGVL-2026-0028", null,
                        "2026-08-05", null, "CVE-2026-9911"),

                createPr("PR-2026-0023", 
                        "Yazılım Ekibi Bilgisayarlarında Eski Java Runtime ve Güvenlik Açıkları",
                        "Yazılımcı istemcilerinde derleme araçları için kurulmuş güvenlik yaması almamış JRE sürümleri bulundu.",
                        "Geliştiricilerin sistem yönetimi onayı olmaksızın eski bağımlılıkları sistemde tutması.",
                        "Geliştirici bilgisayarlarındaki yerel yetkiler kısıtlandı.",
                        "İç ağda zararlı kod çalıştırılması risk faktörü.",
                        Oncelik.DUSUK, PrDurum.KOK_NEDEN_ANALIZI, "BTTH-2026-0008,BGVL-2026-0021", "Gökhan Kaya",
                        "2026-07-21", null, null),

                createPr("PR-2026-0024", 
                        "NGINX Edge Proxy Üzerinde HTTP Request Smuggling Açığı",
                        "Proxy sunucusu ile arka plan uygulama sunucusu arasındaki header işleme uyumsuzluğu.",
                        "Transfer-Encoding ve Content-Length başlıklarının NGINX tarafında sıkı denetlenmemesi.",
                        "NGINX konfigürasyonuna özel regex engelleme kuralları yazıldı.",
                        "Saldırganların önbellek zehirleme veya yetki baypası yapabilme ihtimali.",
                        Oncelik.YUKSEK, PrDurum.KALICI_COZUM, "BGVL-2026-0018", "Caner Erdem",
                        "2026-07-13", null, "CVE-2026-7002"),

                createPr("PR-2026-0025", 
                        "Lojistik Mobil API Servisinde Mantıksal Yetkilendirme Hataları (IDOR)",
                        "Mobil uygulama servislerinin URL parametrelerindeki ID'leri doğrulamadan veri döndürmesi.",
                        "REST API uç noktalarında nesne düzeyinde erişim kontrolünün (Object Level Authorization) unutulması.",
                        "Mobil API önünde istek geçişlerini kontrol eden ek ara katman (middleware) yazıldı.",
                        "Firma verilerinin rakip veya yetkisiz kişilerce çekilebilme riski.",
                        Oncelik.YUKSEK, PrDurum.KOK_NEDEN_ANALIZI, "BGVL-2026-0017", "Merve Çelik",
                        "2026-07-11", null, "CVE-2026-6188"),

                createPr("PR-2026-0026", 
                        "Sistem İzleme (Grafana) Panolarının Dışarıya Açık Metrik Sızdırması",
                        "Grafana arayüzüne giriş yapmadan tüm sunucu performans verilerinin ve topology bilgisinin okunabilmesi.",
                        "'auth.anonymous' parametresinin 'enabled = true' olarak unutulması.",
                        "Grafana sunucusu tamamen iç ağa çekildi ve anonim giriş kapatıldı.",
                        "Kurumsal altyapı haritasının dışarıya ifşa olması.",
                        Oncelik.ORTA, PrDurum.KAPANDI, "BGVL-2026-0016", "Caner Erdem",
                        "2026-07-08", "2026-07-10", null),

                createPr("PR-2026-0027", 
                        "Kamera Güvenlik Sistemi (NVR) Ağında Tespiti Yapılan Zararlı Ağ Trafiği",
                        "A Blok fiziksel güvenlik kameralarının bağlı olduğu NVR cihazının dış IP'lere trafik basması.",
                        "NVR cihazının varsayılan belleniminde (firmware) gömülü olan komut çalıştırma zafiyeti.",
                        "NVR cihazının internet çıkışı güvenlik duvarından tamamen bloklandı.",
                        "Kamera görüntülerinin dışarıya sızması ve cihazın botnet'e katılması riski.",
                        Oncelik.YUKSEK, PrDurum.YENI, "BGVL-2026-0026", null,
                        "2026-08-02", null, "CVE-2026-9543"),

                createPr("PR-2026-0028", 
                        "Ar-Ge Birimi Çizim Yazılımlarında Lisans Dongle Tanılama Hataları",
                        "Mühendislerin bilgisayarlarındaki donanım kilitlerinin Windows güncellemelerinden sonra çalışmaması.",
                        "USB sürücü imzalama politikaları ve anti-virüs yazılımının lisans servisini engellemesi.",
                        "İlgili sürücü dosyaları anti-virüs istisnalar listesine eklendi.",
                        "Ürün tasarım ve Ar-Ge faaliyetlerinde 1 günlük aksama.",
                        Oncelik.DUSUK, PrDurum.YENI, "BTTH-2026-0027", null,
                        "2026-08-04", null, null),

                createPr("PR-2026-0029", 
                        "Active Directory LDAP Bağlantılarında Şifreleme (TLS) Kullanılmaması",
                        "İç uygulamaların domain sunucusuna bağlanırken 389 portu üzerinden düz metin şifre göndermesi.",
                        "Uygulama bağlantı metinlerinde (connection strings) LDAPS (port 636) yapılandırmasının yapılmaması.",
                        "Ağ anahtarları üzerinde port dinleme korumaları artırıldı.",
                        "İç ağdaki bir saldırganın kullanıcı parolalarını dinleme (sniffing) riski.",
                        Oncelik.ORTA, PrDurum.KOK_NEDEN_ANALIZI, "BGVL-2026-0019", "Oğuzhan Şahin",
                        "2026-07-16", null, null),

                createPr("PR-2026-0030", 
                        "Dış Ağdan Test Sunucularına Kuralsız ve Geçici Port Yönlendirmeleri",
                        "Yazılım testleri için açılan geçici port yönlendirmelerinin test bitiminde kapatılmaması.",
                        "Geçici erişim talepleri için bir zaman aşımı veya otomatik kapatma prosedürünün bulunmaması.",
                        "Tüm geçici yönlendirmeler tespit edilerek manuel olarak kapatıldı.",
                        "Unutulan açık portlar üzerinden iç ağa sızma riski.",
                        Oncelik.ORTA, PrDurum.YENI, "BTTH-2026-0028", null,
                        "2026-08-06", null, null)
            );

            prRepository.saveAll(kayitlar);
        }
    }

    private PrEntity createPr(String id, String baslik, String aciklama, String kokNeden,
                             String geciciCozum, String etki, Oncelik oncelik, PrDurum durum,
                             String iliskiliKayitlar, String sorumlu, String olusturmaTarihi,
                             String kapanisTarihi, String cve) {
        PrEntity entity = new PrEntity();
        entity.setId(id);
        entity.setBaslik(baslik);
        entity.setAciklama(aciklama);
        entity.setKokNeden(kokNeden);
        entity.setGeciciCozum(geciciCozum);
        entity.setEtki(etki);
        entity.setOncelik(oncelik);
        entity.setDurum(durum);
        entity.setIliskiliKayitlar(iliskiliKayitlar);
        entity.setSorumlu(sorumlu);
        entity.setOlusturmaTarihi(olusturmaTarihi != null ? LocalDate.parse(olusturmaTarihi) : null);
        entity.setKapanisTarihi(kapanisTarihi != null ? LocalDate.parse(kapanisTarihi) : null);
        
        // Entity sınıfında cve alanı da eklenirse
        // entity.setCve(cve);
        
        return entity;
    }
}