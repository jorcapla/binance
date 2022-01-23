# Cryptoservices - Java

Esta aplicación se generó utilizando JHipster 7.4.0, puede encontrar documentación y ayuda en [https://www.jhipster.tech/documentation-archive/v7.4.0](https://www.jhipster.tech/documentation-archive /v7.4.0).

Esta es una aplicación de "microservicio" destinada a ser parte de una arquitectura de microservicio, consulte la página [Doing microservices with JHipster][] de la documentación para obtener más información.


## Arrancar la solución para testear el servicio de obtención de precios

La forma mas rápida para probar la aplicación es arrancar el contenedor docker de la aplicación disponible en dockerhub. En caso contrario habria que configurar el equipo para poder ejecutar programas java empaquetados con gradle

Para arrancar la aplicación usando docker lanzar este comando desde la carpeta ráiz de la solución

```
docker-compose -f src/main/docker/app.yml up -d
```
Una vez arrancado docker solo tendrá que llamar a la url http://localhost:8888/api/cryptocoin/price


En las siguientes secciones se explica como arrancar el proyecto en desarrollo, como compilar la aplicación para producción, testing, calidad de código  y despliegue continuo.


## Development

To start your application in the dev profile, run:

```
./gradlew
```

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### JHipster Control Center

JHipster Control Center can help you manage and control your application(s). You can start a local control center server (accessible on http://localhost:7419) with:

```
docker-compose -f src/main/docker/jhipster-control-center.yml up
```

## Building for production

### Packaging as jar

To build the final jar and optimize the cryptoservices application for production, run:

```
./gradlew -Pprod clean bootJar
```

To ensure everything worked, run:

```
java -jar build/libs/*.jar
```

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```
./gradlew -Pprod -Pwar clean bootWar
```

## Testing

To launch your application's tests, run:

```
./gradlew test integrationTest jacocoTestReport
```

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

Note: we have turned off authentication in [src/main/docker/sonar.yml](src/main/docker/sonar.yml) for out of the box experience while trying out SonarQube, for real use cases turn it back on.

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the gradle plugin.

Then, run a Sonar analysis:

```
./gradlew -Pprod clean check jacocoTestReport sonarqube
```

For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

```
./gradlew bootJar -Pprod jibDockerBuild
```

Then run:

```
docker-compose -f src/main/docker/app.yml up -d
```

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 7.4.0 archive]: https://www.jhipster.tech/documentation-archive/v7.4.0
[doing microservices with jhipster]: https://www.jhipster.tech/documentation-archive/v7.4.0/microservices-architecture/
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v7.4.0/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v7.4.0/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v7.4.0/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v7.4.0/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v7.4.0/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v7.4.0/setting-up-ci/
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
