from Application.Common import utils
class CryptoCoiner():

    def __init__(self, server, type):
        self.server = server
        self.type = type

    def get_price_only(self,symbol):
 
        endpointSymbol ="api/v3/ticker/price?symbol={}".format(symbol)
        priceResponse = utils.send_request('GET', self.server,endpointSymbol)
        priceResponseDTO ={}
        priceResponseDTO = {
            "price":priceResponse["price"]
        }
        return priceResponseDTO
    
    def get_price(self,symbol):
 
        endpointSymbol ="api/v3/ticker/price?symbol={}".format(symbol)
        priceResponse = utils.send_request('GET', self.server,endpointSymbol)
        return priceResponse

