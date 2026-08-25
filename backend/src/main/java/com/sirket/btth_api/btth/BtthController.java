package com.sirket.btth_api.btth;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/btth")
public class BtthController {

    private final BtthService service;

    // Constructor injection — Spring service nesnesini buraya kendisi verir
    public BtthController(BtthService service) {
        this.service = service;
    }

    @GetMapping
    public List<BtthDto> hepsiniGetir() {
        return service.hepsiniGetir();
    }
}