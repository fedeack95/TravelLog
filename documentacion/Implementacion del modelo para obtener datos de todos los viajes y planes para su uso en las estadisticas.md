Se implemento en el modelo dos funciones para la obtencion de toda la informacion util, tanto para viajes como para planes, necesario para el armado de estadisticas.
Para ambos casos realiza un consulta SELECT sin detallar ningun id (pues se requiere la informacion de todos los viajes y todos los planes) y detallando los campos 
que se necesitan:  
Viajes:  
    -Cantidad de distintos paises para viajes.  
Planes:  
    -Cantidad de tipos de planes.  
    -Cantidad de ciudades.  
    -Cantidad de paises para planes.  
Luego se retornan los conjuntos de informacion al controlador.
