# Cryptoservices - Flask Python

Esta aplicación se generó utlizando python y flask para el desarrollo de api. Internamente utiliza 

## Arrancar la solución para testear el servicio de obtención de precios

La forma mas rápida para probar la aplicación es arrancar el contenedor docker de la aplicación disponible en dockerhub. En caso contrario habria que configurar el equipo para poder ejecutar programas python

Para arrancar la aplicación usando docker lanzar este comando desde la carpeta ráiz de la solución

```
docker-compose up 
```
Una vez arrancado docker solo tendrá que llamar a la url http://localhost:8888/api/cryptocoin/price


### Arrancar la solución con el entorno de python instalado en el equipo

Para arrancar la solución si tiene el entorno de python configurado en el equipo

pip install -r requirements.txt
flask run -h localhost -p 8888




