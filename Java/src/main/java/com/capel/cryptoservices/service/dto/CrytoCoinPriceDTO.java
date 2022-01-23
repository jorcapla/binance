package com.capel.cryptoservices.service.dto;

import java.util.Objects;

public class CrytoCoinPriceDTO {
  private String symbol;
  private float price;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CrytoCoinPriceDTO that = (CrytoCoinPriceDTO) o;
        return Float.compare(that.price, price) == 0 &&
            Objects.equals(symbol, that.symbol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(symbol, price);
    }

    @Override
    public String toString() {
        return "CrytoCoinPriceDTO{" +
            "symbol='" + symbol + '\'' +
            ", price=" + price +
            '}';
    }
}
