package com.sirket.btth_api.btth;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/btth")
public class BtthController {

    private final BtthService service;

    public BtthController(BtthService service) {
        this.service = service;
    }

    @GetMapping
    public List<BtthDto> hepsiniGetir() {
        return service.hepsiniGetir();
    }

    @GetMapping("/{id}")
    public BtthDto getir(@PathVariable String id) {
        return service.getir(id);
    }

    @PostMapping
    public ResponseEntity<BtthDto> olustur(@Valid @RequestBody BtthOlusturRequest istek) {
        var olusan = service.olustur(istek);
        return ResponseEntity
            .created(URI.create("/api/btth/" + olusan.id()))
            .body(olusan);
    }

    @PutMapping("/{id}")
    public BtthDto guncelle(@PathVariable String id,
                            @Valid @RequestBody BtthGuncelleRequest istek) {
        return service.guncelle(id, istek);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void sil(@PathVariable String id) {
        service.sil(id);
    }
}