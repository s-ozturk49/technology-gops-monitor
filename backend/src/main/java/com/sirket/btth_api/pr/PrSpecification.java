package com.sirket.btth_api.pr;

import com.sirket.btth_api.btth.Oncelik;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class PrSpecification {

    public static Specification<PrEntity> withFilters(PrDurum durum, Oncelik oncelik, String aramaMetni) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (durum != null) {
                predicates.add(cb.equal(root.get("durum"), durum));
            }

            if (oncelik != null) {
                predicates.add(cb.equal(root.get("oncelik"), oncelik));
            }

            if (aramaMetni != null && !aramaMetni.isBlank()) {
                String pattern = "%" + aramaMetni.trim().toLowerCase() + "%";
                Predicate baslikMatch = cb.like(cb.lower(root.get("baslik")), pattern);
                Predicate aciklamaMatch = cb.like(cb.lower(root.get("aciklama")), pattern);
                Predicate etkiMatch = cb.like(cb.lower(root.get("etki")), pattern);
                
                predicates.add(cb.or(baslikMatch, aciklamaMatch, etkiMatch));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}