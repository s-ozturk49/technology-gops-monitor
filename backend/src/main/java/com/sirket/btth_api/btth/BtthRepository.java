package com.sirket.btth_api.btth;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BtthRepository extends JpaRepository<BtthEntity, String> {
    
    // Duruma göre filtreleme sorgusu
    List<BtthEntity> findByDurum(BtthDurum durum);
    
    // Başlıkta arama ve sayfalama sorgusu
    Page<BtthEntity> findByBaslikContainingIgnoreCase(String q, Pageable pageable);
}