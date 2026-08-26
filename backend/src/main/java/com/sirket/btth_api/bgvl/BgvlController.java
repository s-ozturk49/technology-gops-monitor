package com.sirket.btth_api.bgvl;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/bgvl")
public class BgvlController {

    private final BgvlService service;

    public BgvlController(BgvlService service) {
        this.service = service;
    }

    @GetMapping
    public Page<BgvlDto> ara(
        @RequestParam(required = false) String q,
        @RequestParam(required = false) BgvlDurum durum,
        @RequestParam(required = false) Kritiklik kritiklik,
        @RequestParam(required = false) BgvlKaynak kaynak,
        @RequestParam(defaultValue = "0") int sayfa,
        @RequestParam(defaultValue = "10") int boyut,
        @RequestParam(defaultValue = "tespitTarihi,desc") String sirala
    ) {
        return service.ara(q, durum, kritiklik, kaynak, sayfa, boyut, sirala);
    }

    @GetMapping("/{id}")
    public BgvlDto getir(@PathVariable String id) {
        return service.getir(id);
    }

    @PostMapping
    public ResponseEntity<BgvlDto> olustur(@Valid @RequestBody BgvlOlusturRequest istek) {
        var olusan = service.olustur(istek);
        return ResponseEntity
            .created(URI.create("/api/bgvl/" + olusan.id()))
            .body(olusan);
    }

    @PutMapping("/{id}")
    public BgvlDto guncelle(@PathVariable String id,
                            @Valid @RequestBody BgvlGuncelleRequest istek) {
        return service.guncelle(id, istek);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void sil(@PathVariable String id) {
        service.sil(id);
    }
}