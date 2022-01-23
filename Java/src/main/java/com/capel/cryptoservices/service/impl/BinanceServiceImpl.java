package com.capel.cryptoservices.service.impl;

import com.capel.cryptoservices.service.CryptoCoinService;
import com.capel.cryptoservices.service.dto.CrytoCoinPriceDTO;
import com.capel.cryptoservices.service.exceptions.PlatformException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class BinanceServiceImpl  implements CryptoCoinService {

    private static final String BINANCE_SERVICE_URL = "https://api.binance.com/api/v3/ticker/price";
    private final Logger log = LoggerFactory.getLogger(BinanceServiceImpl.class);

    @Override
    public CrytoCoinPriceDTO getPrice(String symbol)  throws PlatformException {

        /*CrytoCoinPriceDTO crytoCoinPriceDTO = new CrytoCoinPriceDTO();
        crytoCoinPriceDTO.setSymbol("AAA");
        crytoCoinPriceDTO.setPrice((float) 1.0);
        return crytoCoinPriceDTO;*/
        String url = BINANCE_SERVICE_URL +"?symbol="+symbol;
        CrytoCoinPriceDTO result  = null;
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<CrytoCoinPriceDTO> response = null;

        int resultStatusCode;


        try {
            log.debug("Request: {}", url);

            response = restTemplate.getForEntity(url,CrytoCoinPriceDTO.class);
            resultStatusCode = response.getStatusCode().value();
            if (response.getStatusCode().isError()) {
                throw new PlatformException(response.toString());
            }
            result = response.getBody();

        } catch (ResourceAccessException e) {
            log.error("No se ha podido conectar con ");
            throw new PlatformException(e);
        } catch (HttpClientErrorException e) {
            log.error("No se ha podido obtener el resultado del servicio de precios: {}", e.getMessage());
            resultStatusCode = e.getStatusCode().value();

            throw new PlatformException(e);
        } catch (Exception e) {
            log.error("Error al serializar objeto: {}", e.getMessage());
            throw new PlatformException(e);
        }

        return result;
    }

}

