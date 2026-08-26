package com.sirket.btth_api.bgvl;

import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class BgvlSpecification {

    public static Specification<BgvlEntity> filtrele(String q, BgvlDurum durum, Kritiklik kritiklik, BgvlKaynak kaynak) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Arama metni (Başlık, Açıklama, CVE veya Etkilenen Varlık - Case Insensitive)
            if (q != null && !q.trim().isEmpty()) {
                String aramaMetni = "%" + q.trim().toLowerCase() + "%";
                Predicate basliktaAra = cb.like(cb.lower(root.get("baslik")), aramaMetni);
                Predicate aciklamadaAra = cb.like(cb.lower(root.get("aciklama")), aramaMetni);
                Predicate cvedeAra = cb.like(cb.lower(root.get("cve")), aramaMetni);
                Predicate varliktaAra = cb.like(cb.lower(root.get("etkilenenVarlik")), aramaMetni);
                predicates.add(cb.or(basliktaAra, aciklamadaAra, cvedeAra, varliktaAra));
            }

            // Durum filtresi
            if (durum != null) {
                predicates.add(cb.equal(root.get("durum"), durum));
            }

            // Kritiklik filtresi
            if (kritiklik != null) {
                predicates.add(cb.equal(root.get("kritiklik"), kritiklik));
            }

            // Kaynak filtresi
            if (kaynak != null) {
                predicates.add(cb.equal(root.get("kaynak"), kaynak));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}