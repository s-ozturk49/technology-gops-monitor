package com.sirket.btth_api.pr;

import com.sirket.btth_api.btth.Oncelik;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class PrService {

    private final PrRepository prRepository;
    private final PrMapper prMapper;

    public PrService(PrRepository prRepository, PrMapper prMapper) {
        this.prRepository = prRepository;
        this.prMapper = prMapper;
    }

    @Transactional(readOnly = true)
    public List<PrResponseDto> getAll(PrDurum durum, Oncelik oncelik, String aramaMetni) {
        Specification<PrEntity> spec = PrSpecification.withFilters(durum, oncelik, aramaMetni);

        return prRepository.findAll(spec).stream()
                .map(prMapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public PrResponseDto getById(String id) {
        PrEntity entity = prRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Problem kaydı bulunamadı. ID: " + id));
        return prMapper.toResponseDto(entity);
    }

    public PrResponseDto create(PrRequestDto dto) {
        PrEntity entity = prMapper.toEntity(dto);
        
        entity.setId(generateNextId());
        entity.setOlusturmaTarihi(LocalDate.now());

        if (dto.getDurum() == PrDurum.KAPANDI) {
            entity.setKapanisTarihi(LocalDate.now());
        } else {
            entity.setKapanisTarihi(null);
        }

        PrEntity savedEntity = prRepository.save(entity);
        return prMapper.toResponseDto(savedEntity);
    }

    public PrResponseDto update(String id, PrRequestDto dto) {
        PrEntity entity = prRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Güncellenecek problem kaydı bulunamadı. ID: " + id));

        prMapper.updateEntityFromDto(dto, entity);

        // Durum kapandı olarak değişmişse kapanış tarihini güncelle
        if (dto.getDurum() == PrDurum.KAPANDI) {
            if (entity.getKapanisTarihi() == null) {
                entity.setKapanisTarihi(LocalDate.now());
            }
        } else {
            entity.setKapanisTarihi(null);
        }

        PrEntity updatedEntity = prRepository.save(entity);
        return prMapper.toResponseDto(updatedEntity);
    }

    public void delete(String id) {
        if (!prRepository.existsById(id)) {
            throw new EntityNotFoundException("Silinecek problem kaydı bulunamadı. ID: " + id);
        }
        prRepository.deleteById(id);
    }

    /**
     * Otomatik ID üretici: PR-{YIL}-{SEKANS} (Örn: PR-2026-0001)
     */
    private synchronized String generateNextId() {
        int currentYear = LocalDate.now().getYear();
        String prefix = "PR-" + currentYear + "-";

        List<PrEntity> allRecords = prRepository.findAll();
        
        long maxNumber = allRecords.stream()
                .map(PrEntity::getId)
                .filter(id -> id != null && id.startsWith(prefix))
                .map(id -> {
                    try {
                        String numberPart = id.substring(prefix.length());
                        return Long.parseLong(numberPart);
                    } catch (NumberFormatException e) {
                        return 0L;
                    }
                })
                .max(Long::compareTo)
                .orElse(0L);

        return String.format("%s%04d", prefix, maxNumber + 1);
    }
}