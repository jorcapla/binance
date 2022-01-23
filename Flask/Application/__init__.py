import os
from dotenv import load_dotenv
from flask import Flask
from flask_swagger_ui import get_swaggerui_blueprint


app = Flask(__name__)

# App configuration
load_dotenv()
app.config['SERVER_RUNNING_IP'] = '127.0.0.1'
app.config['endpoints'] = {
    'binanceURL': os.getenv("BINANCE_URL"),
}


# EndPoint registration  - swagger
Swagger_blueprint = get_swaggerui_blueprint('/swagger', '/static/swagger.json', config={'app_name': 'Capel-Crypto-API'})
app.register_blueprint(Swagger_blueprint, url_prefix = '/swagger')

# EndPoint registration  - CryptoCoin
from .CryptoCoin import CryptoCoin
app.register_blueprint(CryptoCoin)

