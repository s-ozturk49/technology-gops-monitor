package com.sirket.btth_api.btth;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class BtthService {

    public List<BtthDto> hepsiniGetir() {
        return List.of(
            new BtthDto("BTTH-2026-0001", "Yeni kullanıcı hesabı açılması",
                "İK biriminde işe başlayan personel için hesap talebi",
                "Ayşe Yıldız", "İnsan Kaynakları", "Orta", "Yeni", null,
                LocalDate.of(2026, 8, 3), LocalDate.of(2026, 8, 15)),
            new BtthDto("BTTH-2026-0002", "Yazıcı sürücüsü kurulumu",
                "3. kat yazıcısı için sürücü kurulumu gerekiyor",
                "Mehmet Demir", "Muhasebe", "Düşük", "İncelemede", "Selim Öztürk",
                LocalDate.of(2026, 8, 5), null)
        );
    }
}