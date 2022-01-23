import uuid
import json
import requests
from flask import Response
from Application import app

#region HTTP utils

def send_request(method, remote_server, url, body= {}, headers = {}, params = {}):
    """
    Manages the send operation to to a given resource via HTTP.
    
    Requires:
        - `Method`: type of the HTTP request. (ex 'POST', 'GET', 'PATCH'...)
        - `Remote_server`: Server address that's listening the HTTP requests. (ex '127.0.0.1:8080')
        - `Url`: Address of the endpoint. (ex 'api/v3.0/services')
        - `Body`: *Optional* Dictionary containing the necesary information for performing the request
        - `Headers`: *Optional* Dictionary containing the necesarry directives for performing the request
        - `Params`: *Optional* Dictionary-like object containing query parameters needed by the request
        - `is_secure`: Boolean variable to define whether the request is httpS or http
    
    Returns:
        - Json object with the response from the asked service.
    """
    arguments = {
        "method": method.upper(),
        "url": "{}/{}".format(remote_server, url),
    }

    if len(headers):
        arguments["headers"] = headers

    if len(body) and method != "GET":
        arguments["json"] = body

    if len(params):
        arguments['params'] = params

    app.logger.debug('send_request-{}'.format( arguments["url"]))
    try:
        resp = requests.request(**arguments)  
        resp.raise_for_status()
        resp = resp.json()
        app.logger.debug('response-{}'.format(resp))
    except Exception as e:
        app.logger.exception(e)  
        resp = {}
    return resp

def create_response(msg):
    """
    Generic function to create the response for the HTTP requests.

    Requires: `msg` the data to send as an answer.

    Returns: `Flask.Response` object -- response to send
    """
    response = Response()
    response.headers["Content-Type"] = 'Application/json'
    response.data = json.dumps(msg)
    return response




