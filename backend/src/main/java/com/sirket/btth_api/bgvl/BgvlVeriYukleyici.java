package com.sirket.btth_api.bgvl;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class BgvlVeriYukleyici implements CommandLineRunner {

    private final BgvlRepository bgvlRepository;

    public BgvlVeriYukleyici(BgvlRepository bgvlRepository) {
        this.bgvlRepository = bgvlRepository;
    }

    @Override
    public void run(String... args) {
        if (bgvlRepository.count() == 0) {
            List<BgvlEntity> kayitlar = List.of(
                createBgvl("BGVL-2026-0001", "Web Sunucusunda Remote Code Execution (RCE) Zafiyeti", 
                           "Dışa açık web sunucusunda kullanılan kütüphanedeki deserialization hatası nedeniyle uzaktan kod çalıştırılabilir.", 
                           "CVE-2026-1102", 9.8, Kritiklik.KRITIK, "web-prod-app-01", BgvlKaynak.PENTEST, 
                           BgvlDurum.KAPANDI, "2026-06-01", "2026-06-03", "Caner Erdem"),

                createBgvl("BGVL-2026-0002", "PostgreSQL Veritabanı Varsayılan Parola Kullanımı", 
                           "Test ortamındaki veritabanı sunucusunda 'postgres' kullanıcısının parolası değiştirilmemiş.", 
                           null, 7.5, Kritiklik.YUKSEK, "db-test-node-02", BgvlKaynak.TARAMA, 
                           BgvlDurum.KAPANDI, "2026-06-03", "2026-06-10", "Merve Çelik"),

                createBgvl("BGVL-2026-0003", "Müşteri Portalı SQL Injection Açıktan Faydalanma", 
                           "Arama parametresine gönderilen tırnak karakteri ile veritabanı sorguları manipüle edilebiliyor.", 
                           "CVE-2026-2041", 8.9, Kritiklik.YUKSEK, "portal-ext-web-01", BgvlKaynak.PENTEST, 
                           BgvlDurum.DOGRULANDI, "2026-06-05", "2026-06-12", "Merve Çelik"),

                createBgvl("BGVL-2026-0004", "Eski SSL/TLS Protokollerinin (TLS 1.0/1.1) Etkin Olması", 
                           "Güvenlik duvarı yönetim arayüzünde güvensiz şifreleme protokolleri aktif durumda.", 
                           null, 4.3, Kritiklik.ORTA, "fw-perimeter-01", BgvlKaynak.TARAMA, 
                           BgvlDurum.KAPANDI, "2026-06-08", "2026-07-08", "Oğuzhan Şahin"),

                createBgvl("BGVL-2026-0005", "API Gateway Üzerinde Rate Limiting Eksikliği", 
                           "Mikrohizmet kapısında istek sınırı olmaması sebebiyle kaba kuvvet (brute-force) ve DoS saldırılarına açık.", 
                           null, 5.3, Kritiklik.ORTA, "api-gateway-01", BgvlKaynak.BILDIRIM, 
                           BgvlDurum.ACIK, "2026-06-11", "2026-07-11", null),

                createBgvl("BGVL-2026-0006", "Apache Log4j Hassas Bilgi Sızdırma Zafiyeti", 
                           "Raporlama servisindeki eski loglama kütüphanesi sunucu ortam değişkenlerinin sızmasına yol açıyor.", 
                           "CVE-2026-3120", 7.2, Kritiklik.YUKSEK, "report-srv-02", BgvlKaynak.TARAMA, 
                           BgvlDurum.YANLIS_POZITIF, "2026-06-14", "2026-06-21", "Caner Erdem"),

                createBgvl("BGVL-2026-0007", "Alan Adı DNS Zone Transfer Açığı", 
                           "İç DNS sunucusunun yetkisiz istemcilere tüm alan adı kayıtlarını aktarmasına izin veriliyor.", 
                           null, 5.0, Kritiklik.ORTA, "dns-int-node-01", BgvlKaynak.PENTEST, 
                           BgvlDurum.KAPANDI, "2026-06-16", "2026-07-16", "Serkan Aydın"),

                createBgvl("BGVL-2026-0008", "Active Directory Kerberoasting Saldırı Yüzeyi", 
                           "Service Principal Name (SPN) tanımlı servis hesaplarında zayıf parola kullanımı tespit edildi.", 
                           null, 6.5, Kritiklik.ORTA, "ad-dc-01", BgvlKaynak.PENTEST, 
                           BgvlDurum.DOGRULANDI, "2026-06-18", "2026-07-18", "Oğuzhan Şahin"),

                createBgvl("BGVL-2026-0009", "IK İntranet Sayfasında Stored XSS (Cross-Site Scripting)", 
                           "Profil güncelleme alanındaki özgeçmiş başlığına eklenen zararlı JavaScript kodları diğer kullanıcılarca çalıştırılıyor.", 
                           "CVE-2026-4011", 6.1, Kritiklik.ORTA, "ik-intranet-web", BgvlKaynak.BILDIRIM, 
                           BgvlDurum.KAPANDI, "2026-06-20", "2026-07-20", "Merve Çelik"),

                createBgvl("BGVL-2026-0010", "SSH Servisinde Zayıf Algoritma ve Anahtar Destekleri", 
                           "Linux uygulama sunucularında CBC modlu şifreleme ve zayıf MAC algoritmaları aktif kalmış.", 
                           null, 2.6, Kritiklik.DUSUK, "app-linux-core-03", BgvlKaynak.TARAMA, 
                           BgvlDurum.ACIK, "2026-06-23", "2026-08-23", null),

                createBgvl("BGVL-2026-0011", "VPN Gateway Yetkisiz Oturum Açma Baypası", 
                           "Uzaktan erişim cihazındaki kimlik doğrulama modülünde kritik tampon bellek taşması zafiyeti.", 
                           "CVE-2026-0015", 9.6, Kritiklik.KRITIK, "vpn-gateway-main", BgvlKaynak.BILDIRIM, 
                           BgvlDurum.DOGRULANDI, "2026-06-25", "2026-06-27", "Caner Erdem"),

                createBgvl("BGVL-2026-0012", "Yedekleme Sunucusu Paylaşım Klasörü Yetkisiz Erişim", 
                           "SMB ağ paylaşımında 'Everyone' grubuna okuma ve yazma yetkisi verildiği belirlendi.", 
                           null, 7.5, Kritiklik.YUKSEK, "backup-nas-01", BgvlKaynak.TARAMA, 
                           BgvlDurum.KAPANDI, "2026-06-27", "2026-07-04", "Serkan Aydın"),

                createBgvl("BGVL-2026-0013", "Kubernetes Ingress Controller Yetki Yükseltme", 
                           "Kök yetkisi olmayan konteynırların küme düzeyinde yetki kazanmasına imkan tanıyan yapılandırma hatası.", 
                           "CVE-2026-5512", 8.8, Kritiklik.YUKSEK, "k8s-prod-cluster", BgvlKaynak.PENTEST, 
                           BgvlDurum.ACIK, "2026-06-30", "2026-07-07", "Merve Çelik"),

                createBgvl("BGVL-2026-0014", "Web Uygulamasında HTTP Strict Transport Security (HSTS) Eksikliği", 
                           "Tarayıcıların sadece HTTPS üzerinden bağlanmasını zorunlu kılan HSTS başlığı yanıtlarda dönmüyor.", 
                           null, 3.8, Kritiklik.DUSUK, "pazarlama-landing-web", BgvlKaynak.TARAMA, 
                           BgvlDurum.YANLIS_POZITIF, "2026-07-02", "2026-09-02", "Selin Pekcan"),

                createBgvl("BGVL-2026-0015", "E-posta Sunucusunda Open Relay Yapılandırması", 
                           "Dış IP adreslerinden gelen e-postaların kimlik doğrulaması olmaksızın iletilmesine izin veriliyor.", 
                           null, 7.3, Kritiklik.YUKSEK, "mail-relay-01", BgvlKaynak.PENTEST, 
                           BgvlDurum.KAPANDI, "2026-07-05", "2026-07-12", "Oğuzhan Şahin"),

                createBgvl("BGVL-2026-0016", "Grafana Panosunda Yetkisiz Metrik Okuma", 
                           "İzleme panosuna 'anonymous' erişim kapatılmadığı için sistem performans metrikleri dışarıya sızıyor.", 
                           null, 5.3, Kritiklik.ORTA, "monitor-grafana-01", BgvlKaynak.TARAMA, 
                           BgvlDurum.DOGRULANDI, "2026-07-07", "2026-08-07", "Caner Erdem"),

                createBgvl("BGVL-2026-0017", "Lojistik Mobil Uygulamasında Insecure Direct Object Reference (IDOR)", 
                           "İrsaliye sorgulama uç noktasındaki ID parametresi değiştirilerek diğer firmaların sevkiyat detayları görüntülenebiliyor.", 
                           "CVE-2026-6188", 8.1, Kritiklik.YUKSEK, "mobile-api-prod", BgvlKaynak.PENTEST, 
                           BgvlDurum.ACIK, "2026-07-10", "2026-07-17", "Merve Çelik"),

                createBgvl("BGVL-2026-0018", "NGINX Web Sunucusunda HTTP Request Smuggling", 
                           "Ön sunucu ile arka plan uygulama sunucusu arasındaki Content-Length ve Transfer-Encoding uyumsuzluğu.", 
                           "CVE-2026-7002", 7.4, Kritiklik.YUKSEK, "edge-proxy-02", BgvlKaynak.BILDIRIM, 
                           BgvlDurum.DOGRULANDI, "2026-07-12", "2026-07-19", "Caner Erdem"),

                createBgvl("BGVL-2026-0019", "Domain Controller Dizin Hizmetinde LDAP Unencrypted Bind", 
                           "İstemcilerin SSL/TLS şifrelemesi olmadan düz metin (plaintext) LDAP sorgusu yapmasına izin veriliyor.", 
                           null, 4.8, Kritiklik.ORTA, "ad-dc-02", BgvlKaynak.TARAMA, 
                           BgvlDurum.ACIK, "2026-07-15", "2026-08-15", null),

                createBgvl("BGVL-2026-0020", "VMware ESXi Sunucusunda Heap Overflow Zafiyeti", 
                           "Sanal sunucu altyapısındaki giydirme servisinde uzaktan kod çalıştırmaya imkan tanıyan bellek hatası.", 
                           "CVE-2026-8810", 9.8, Kritiklik.KRITIK, "esxi-node-04", BgvlKaynak.BILDIRIM, 
                           BgvlDurum.KAPANDI, "2026-07-17", "2026-07-19", "Serkan Aydın"),

                createBgvl("BGVL-2026-0021", "Geliştirici İstemci Bilgisayarında Güncellenmemiş Java Runtime (JRE)", 
                           "Yazılım ekibindeki bir personelin bilgisayarında bilinen zafiyetler içeren eski JRE sürümü çalışıyor.", 
                           "CVE-2026-1922", 3.1, Kritiklik.DUSUK, "clt-dev-win11-09", BgvlKaynak.TARAMA, 
                           BgvlDurum.KAPANDI, "2026-07-20", "2026-09-20", "Gökhan Kaya"),

                createBgvl("BGVL-2026-0022", "CRM Portalında Cross-Site Request Forgery (CSRF)", 
                           "Kullanıcı e-posta değiştirme formunda anti-CSRF token doğrulaması yapılmıyor.", 
                           null, 5.4, Kritiklik.ORTA, "crm-web-app", BgvlKaynak.PENTEST, 
                           BgvlDurum.YANLIS_POZITIF, "2026-07-22", "2026-08-22", "Selin Pekcan"),

                createBgvl("BGVL-2026-0023", "Redis Önbellek Sunucusu Şifresiz Dış Erişime Açık", 
                           "Performans artırımı için kurulan Redis servisinde 'requirepass' parametresi tanımlanmamış.", 
                           null, 9.1, Kritiklik.KRITIK, "cache-redis-01", BgvlKaynak.TARAMA, 
                           BgvlDurum.DOGRULANDI, "2026-07-25", "2026-07-27", "Caner Erdem"),

                createBgvl("BGVL-2026-0024", "Saha Tablet Cihazlarında Disk Şifreleme (BitLocker) Pasif", 
                           "Satış temsilcilerine dağıtılan tabletlerde yerel verilerin çalınmasına karşı cihaz şifrelemesi kapatılmış.", 
                           null, 4.6, Kritiklik.ORTA, "tab-saha-group-01", BgvlKaynak.TARAMA, 
                           BgvlDurum.ACIK, "2026-07-27", "2026-08-27", null),

                createBgvl("BGVL-2026-0025", "Fatura PDF Oluşturma Servisinde Server-Side Request Forgery (SSRF)", 
                           "HTML-to-PDF kütüphanesi kullanıcı tarafından sağlanan harici resim URL'lerine kısıtlamasız istek atıyor.", 
                           "CVE-2026-9201", 8.6, Kritiklik.YUKSEK, "pdf-gen-service", BgvlKaynak.PENTEST, 
                           BgvlDurum.ACIK, "2026-07-29", "2026-08-05", "Merve Çelik"),

                createBgvl("BGVL-2026-0026", "Kamera Güvenlik Sistemi NVR Cihazında Komut Enjeksiyonu", 
                           "Fiziksel güvenlik ağındaki video kayıt cihazında yetkisiz root komutları çalıştırılabiliyor.", 
                           "CVE-2026-9543", 9.8, Kritiklik.KRITIK, "sec-nvr-a-blok", BgvlKaynak.BILDIRIM, 
                           BgvlDurum.DOGRULANDI, "2026-08-01", "2026-08-03", "Oğuzhan Şahin"),

                createBgvl("BGVL-2026-0027", "Web Sunucusunda Verb Tampering (HTTP Method Override)", 
                           "GET/POST dışındaki HEAD ve OPTIONS istekleri ile bazı erişim engelleri baypas edilebiliyor.", 
                           null, 5.0, Kritiklik.ORTA, "web-prod-app-02", BgvlKaynak.TARAMA, 
                           BgvlDurum.ACIK, "2026-08-03", "2026-09-03", null),

                createBgvl("BGVL-2026-0028", "Fortinet SSL-VPN FortiOS Uzaktan Kod Çalıştırma", 
                           "Güvenlik duvarı işletim sistemindeki yetkilendirilmemiş bellek taşması zafiyeti.", 
                           "CVE-2026-9911", 9.8, Kritiklik.KRITIK, "fw-edge-forti-01", BgvlKaynak.BILDIRIM, 
                           BgvlDurum.ACIK, "2026-08-05", "2026-08-07", "Caner Erdem"),

                createBgvl("BGVL-2026-0029", "Kullanıcı Kayıt Formunda Zayıf Parola Politikası", 
                           "Dış portalda 6 karakterli ve sadece rakam içeren parolaların belirlenmesine izin veriliyor.", 
                           null, 3.9, Kritiklik.DUSUK, "portal-ext-web-01", BgvlKaynak.PENTEST, 
                           BgvlDurum.ACIK, "2026-08-06", "2026-10-06", null),

                createBgvl("BGVL-2026-0030", "MongoDB Veritabanı Kümesinde Bağlantı Şifrelemesi (TLS) Kapalı", 
                           "Uygulama sunucuları ile NoSQL veritabanı arasındaki veri trafiği şifrelenmeden iletiliyor.", 
                           null, 6.8, Kritiklik.ORTA, "mongo-cluster-01", BgvlKaynak.TARAMA, 
                           BgvlDurum.YANLIS_POZITIF, "2026-08-07", "2026-09-07", "Serkan Aydın")
            );

            bgvlRepository.saveAll(kayitlar);
        }
    }

    private BgvlEntity createBgvl(String id, String baslik, String aciklama, String cve,
                                  Double cvssSkoru, Kritiklik kritiklik, String etkilenenVarlik,
                                  BgvlKaynak kaynak, BgvlDurum durum, String tespitTarihi,
                                  String slaTarihi, String sorumlu) {
        return new BgvlEntity(
            id,
            baslik,
            aciklama,
            cve,
            cvssSkoru,
            kritiklik,
            etkilenenVarlik,
            kaynak,
            durum,
            tespitTarihi != null ? LocalDate.parse(tespitTarihi) : null,
            slaTarihi != null ? LocalDate.parse(slaTarihi) : null,
            sorumlu
        );
    }
}