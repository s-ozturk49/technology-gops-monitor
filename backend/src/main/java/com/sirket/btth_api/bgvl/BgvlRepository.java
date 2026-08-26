package com.sirket.btth_api.bgvl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BgvlRepository extends JpaRepository<BgvlEntity, String>, JpaSpecificationExecutor<BgvlEntity> {
}