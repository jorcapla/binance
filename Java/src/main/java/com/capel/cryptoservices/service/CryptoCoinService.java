package com.capel.cryptoservices.service;

import com.capel.cryptoservices.service.dto.CrytoCoinPriceDTO;
import com.capel.cryptoservices.service.exceptions.PlatformException;

public interface CryptoCoinService {

    CrytoCoinPriceDTO getPrice(String symbol) throws PlatformException;
}
