# Homework 3 - Distributed Systems



### Instalación

Para instalar este projecto se requiren los siguientes prerequisitos:

* Docker
* Make

Al ejecutar el comando `make up` iniciará el projecto el docker y levantará los siguientes endpoints:

| Dirección | Puertos | Servicio |
| --- | --- | --- |
| 127.0.0.1 | 8080 | NGINX |
| 127.0.0.1 | 8000-8002 | Inventory Replicas |
| 127.0.0.1 | 5432 | Postgres Master y Replica |  

Por defecto cuando se crea por primera vez postgres en docker, se inicializa la base de datos con la tabla de `productos`. 


### Información Adicional

Uso de postman para comprobación de consultas:

Hacer un post para insertar:

http://localhost:8080/insertar

Formato raw de ejemplo:
{
      "nombre": "ejemplo",
      "precio": 123454
}

Obtener información de un id especifico:

Hacer un get a la ruta:
    http://localhost:8080/obtener/1

Obtener todos:

Hacer un get a la ruta:
    http://localhost:8080/obtener_todo


##### Comandos Make

El listado completo de comandos `make` son:
```
up                   run the project
stop                 stop Docker containers without removing them
down                 stop and remove Docker containers without wiping volumes
reset                wipe volumes, then pull
pull                 update Docker images
rebuild              rebuild backend Docker image
rebuild-full         rebuild backend Docker image and wipes volumes
install              Installs node dependencies for inventory
```

Este listado se puede visualizar ejecutando `make help`


##### Imagenes de Docker utilizadas

| Servicios | Imagen | Descripción |
| --- | --- | --- |
| NGINX | [nginx](https://hub.docker.com/_/nginx) | Servicio NGINX con balanceador de carga |
| Postgres & Postgres-replica | [bitnami/postgresql](https://hub.docker.com/r/bitnami/postgresql/) | Servicios de PostgresQL con replicación sincronica |
| Inventory | [Node Dockerfile](./.docker/inventory/Dockerfile) | Microservicio de inventario en Node | 


##### Funcionamiento general

Dentro de postgres.js en el directorio /inventory  se explica que los insert se realizan a la base master
y los select se hacen a la replica, de esta forma, se comprueba que los datos se estan replicando.