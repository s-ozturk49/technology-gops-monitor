package com.sirket.btth_api.pr;

import com.sirket.btth_api.btth.Oncelik;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pr")
@CrossOrigin(origins = "*")
public class PrController {

    private final PrService prService;

    public PrController(PrService prService) {
        this.prService = prService;
    }

    @GetMapping
    public ResponseEntity<List<PrResponseDto>> getAll(
            @RequestParam(required = false) PrDurum durum,
            @RequestParam(required = false) Oncelik oncelik,
            @RequestParam(required = false) String arama) {
        List<PrResponseDto> result = prService.getAll(durum, oncelik, arama);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrResponseDto> getById(@PathVariable String id) {
        PrResponseDto response = prService.getById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<PrResponseDto> create(@Valid @RequestBody PrRequestDto dto) {
        PrResponseDto created = prService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PrResponseDto> update(
            @PathVariable String id,
            @Valid @RequestBody PrRequestDto dto) {
        PrResponseDto updated = prService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        prService.delete(id);
        return ResponseEntity.noContent().build();
    }
}