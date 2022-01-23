package com.capel.cryptoservices.web.rest;

import com.capel.cryptoservices.service.CryptoCoinService;
import com.capel.cryptoservices.service.dto.CrytoCoinPriceDTO;
import com.capel.cryptoservices.service.exceptions.PlatformException;
import com.capel.cryptoservices.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CryptoCoinResource {

    private final Logger log = LoggerFactory.getLogger(CryptoCoinResource.class);
    private static final String ENTITY_NAME = "cryptocoin";

    private final CryptoCoinService cryptoCoinService;

    public CryptoCoinResource(CryptoCoinService cryptoCoinService){
        this.cryptoCoinService = cryptoCoinService;
    }
    /**
     * {@code GET  /activities/count} : count all the activities.
     *
      * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/cryptocoin/price")
    public ResponseEntity<CrytoCoinPriceDTO> getPrice() {
        log.debug("REST request to get Price {}");
        String symbol ="BTCUSDT";
        CrytoCoinPriceDTO crytoCoinPriceDTO = null;
        try {
            crytoCoinPriceDTO = this.cryptoCoinService.getPrice(symbol);
        } catch (PlatformException e) {
            throw new BadRequestAlertException("Crypto Service not Ready",ENTITY_NAME,e.toString());
        }
        return ResponseEntity.ok().body(crytoCoinPriceDTO);
    }

}
