package com.sirket.btth_api.btth;

import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class BtthSpecification {

    public static Specification<BtthEntity> filtrele(String q, BtthDurum durum, Oncelik oncelik) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Arama metni (Başlık veya Açıklamada arama - Case Insensitive)
            if (q != null && !q.trim().isEmpty()) {
                String aramaMetni = "%" + q.trim().toLowerCase() + "%";
                Predicate basliktaAra = cb.like(cb.lower(root.get("baslik")), aramaMetni);
                Predicate aciklamadaAra = cb.like(cb.lower(root.get("aciklama")), aramaMetni);
                predicates.add(cb.or(basliktaAra, aciklamadaAra));
            }

            // Durum filtresi
            if (durum != null) {
                predicates.add(cb.equal(root.get("durum"), durum));
            }

            // Öncelik filtresi
            if (oncelik != null) {
                predicates.add(cb.equal(root.get("oncelik"), oncelik));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}