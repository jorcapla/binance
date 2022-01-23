package com.capel.cryptoservices.service.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PlatformException extends Throwable {
    private static final Logger log = LoggerFactory.getLogger(PlatformException.class);

    public PlatformException(Exception ex) {
        log.error("Failed to process the request to platform: {}", ex.getMessage());
    }

    public PlatformException(String message) {
        log.error("Failed to process the request to platform: {}", message);
    }

}
