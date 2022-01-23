from Application.Common import utils
from . import CryptoCoin
from flask import request
from Application import app
from Application.CryptoCoin.models import CryptoCoiner

@CryptoCoin.route('/api/cryptocoin/price', methods = ['GET'])
def get_Symbol_Price():
    app.logger.debug("get symbol price")
    priceDTO = -1.0
    binanceService = CryptoCoiner(app.config['endpoints'].get('binanceURL'), 'binanceURL')
    symbol="BTCUSDT"
    priceDTO = binanceService.get_price(symbol)
    return priceDTO

@CryptoCoin.route('/api/crytocoin/priceonly', methods = ['GET'])
def get_Symbol_Price_only():
    app.logger.debug("get symbol price")
    priceDTO = -1.0
    binanceService = CryptoCoiner(app.config['endpoints'].get('binanceURL'), 'binanceURL')
    symbol="BTCUSDT"
    priceDTO = binanceService.get_price_only(symbol)
    return priceDTO

