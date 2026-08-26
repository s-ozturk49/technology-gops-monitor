package com.sirket.btth_api.btth;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BtthRepository extends JpaRepository<BtthEntity, String>, JpaSpecificationExecutor<BtthEntity> {
    
    List<BtthEntity> findByDurum(BtthDurum durum);
    
    Page<BtthEntity> findByBaslikContainingIgnoreCase(String q, Pageable pageable);
}