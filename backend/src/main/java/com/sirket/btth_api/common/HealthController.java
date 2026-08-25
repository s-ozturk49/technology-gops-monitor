package com.sirket.btth_api.common;

import org.springframework.web.bind.annotation.*;
import java.time.Instant;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public HealthResponse health() {
        return new HealthResponse("UP", Instant.now().toString());
    }

    public record HealthResponse(String status, String timestamp) {}
}