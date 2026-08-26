package com.sirket.btth_api.pr;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PrRepository extends JpaRepository<PrEntity, String>, JpaSpecificationExecutor<PrEntity> {
}