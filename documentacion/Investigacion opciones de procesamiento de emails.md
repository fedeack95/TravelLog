Metodos de procesamiento de emails para la extraccion de informacion de reserva  

Para comenzar, se debe saber que la informacion relativa a una reserva (tando de vuelo como de hoteles y demas) se almacena dentro del mail como markup en el cuerpo del mismo, segun el standar provisto por schema.org, en formato json-ld[1] o microdatos[2] (metadatos anidados dentro del cuerpo del email).  
Esta informacion se presenta de la siguiente manera[3]:  
    `<script type=3D"application/ld+json">  
                        {  
                            "@context": "http://schema.org",  
                            "@type": "FlightReservation",  
                            "reservationNumber": "YPIIDC",  
                            "reservationStatus": "http://schema.org/Confirmed",  
                            "underName": {  
                                "@type": "Person",  
                                "name": "MANCINI /JOAQUIN ANDRES"  
                            },  
                            "reservationFor": {  
                                "@type": "Flight",  
                                "flightNumber": "AR 1890",  
                                "airline": {  
                                    "@type": "Airline",  
                                    "name": "AEROLINEAS ARGENTINA",  
                                    "iataCode": "AR"  
                                },  
                                "departureAirport": {  
                                    "@type": "Airport",  
                                    "name": "Buenos Aires",  
                                    "iataCode": "AEP"  
                                },  
                                "departureTime": "2027-03-04T20:15:00-08:00",  
                                "arrivalAirport": {  
                                    "@type": "Airport",  
                                    "name": "Ushuaia",  
                                    "iataCode": "USH"  
                                },  
                                "arrivalTime": "2019-12-15T19:55:00-03:00"  
                            },  
                            "airplaneSeat": "23F",  
                            "airplaneSeatClass": {  
                                "@type": "AirplaneSeatClass",  
                                "name": "ECONOMY"  
                            },
                            "ticketNumber": "04421432978752",  
                            "ticketToken": "qrCode:M1MANCINI/JOAQUIN ANDREYPIIDC AEPUSHAR 1890 349Y023F0009 162>5320MR9347BAR2A04421432978750N"  
                        }  
    </script>`  

Sabiendo esto, se puede concluir que una manera de extraer la informacion necesaria para agendar un viaje es tomando esos datos encapsulados en json-ld o microdatos, y hacer un PUT a la API de la app.
Como se toman esos datos se vera a continuacion.  
Los metodos de parseo se dividen en busqueda de campos clave y busqueda por expresiones regulares
-Email parser:  
    porcion de software que permite extraer informacion desde mails entrantes. Pueden ser configurados para tomar campos especificos, tanto del body como del header. Opciones mas avanzadas pueden extraer informacion incluso de archivos adjuntos.  
    Los datos obtenidos pueden ser almacenados en formato CSV, JSON o XML, o enviados a una API, tanto para realizar consultas (GET) como para hacer inserciones (PUT).    
    Como funciona  
        La mayoria de los sistemas de email-parsing pueden tomar emails especificos desde un inbox o proveer una direccion a la cual reenviar tales email para analizarlos. Una vez que los emails estan disponibles, un algoritmo de parseo extraera los campos de datos buscados, mediante reglas de parsing que se deben definir previamente. Las reglas de parsing son una coleccion de instrucciones simples que le indican al algoritmo que tipo de datos debe extraer de los emails, como por ejemplo asiento, numero de reserva, aerolinea, etc.  
    Los pasos para obtener esta informacion son los siguientes:  
        -Acceder al mail con los permisos correspondientes.  
        -Analizar el inbox en busca de palabras clave (vuelo, reserva, etc).  
        -En base a la busqueda anterior, se clasifican los emails candidatos.  
        -El email-parser analiza el cuerpo del email, en busca de los campos que le hayan sido indicados por las reglas de parsing.  
        -Encapsula los datos obtenidos, por ej. en un JSON, y los entrega a donde corresponda, ya sea a un intermediario de terceros que envie esa info a la BBDD o a un script propio que haga ese trabajo.  

    Se hallaron algunas implementaciones de email-parse, a continuacion se presentan algunos ejemplos se su uso.  
    php-mime-mail-parser[4]  
    -carga del mail (4 metodos):  
        `require_once __DIR__.'/vendor/autoload.php';  

        $path = 'path/to/email.eml';  
        $parser = new PhpMimeMailParser\Parser();  

        // 1. Especificar el camino al archivo (string)  
        $parser->setPath($path);   

        // 2. Especificar el mime del texto crudo del mail (string)  
        $parser->setText(file_get_contents($path));  

        // 3. Especificar un archivo php de recurso (stream)  
        $parser->setStream(fopen($path, "r"));  

        // 4.  Especificar un stream para trabajar con un mail server (stream)  
        $parser->setStream(fopen("php://stdin", "r"));`  

    -Obtener metadata del mail (ej. remitente y destinatario):  
        `$rawHeaderTo = $parser->getHeader('to');  
        // return "test" <test@example.com>, "test2" <test2@example.com>  

        $arrayHeaderTo = $parser->getAddresses('to');  
        // return [["display"=>"test", "address"=>"test@example.com", false]]  

        $rawHeaderFrom = $parser->getHeader('from');  
        // return "test" <test@example.com>  

        $arrayHeaderFrom = $parser->getAddresses('from');  
        // return [["display"=>"test", "address"=>"test@example.com", "is_group"=>false]]`  

Para utilizar estos scripts se debe configurar un servidor mail, por ej. Postfix Dentro del directorio del script:  
    `/etc/postfix/master.cf`  
    Y se debe añadir la siguiente linea al final del archivo (especificando myhook para enviar todos los mail al script test.php)  
    `myhook unix - n n - - pipe  
  				flags=F user=www-data argv=php -c /etc/php5/apache2/php.ini -f /var/www/test.php ${sender} ${size} ${recipient}`  
    Y editar la siguiente linea (registrar myhook)  
    `smtp      inet  n       -       -       -       -       smtpd  
        			-o content_filter=myhook:dummy`  
    El script php debe utilizar el cuarto metodo para trabajar con esta configuracion.

Una vez obtenida la informacion requerida para agendar un viaje, se encapsula en formato JSON y se envia mediante una request HTTP (en este caso un POST) hacia la API propia de TravelLog que se encarga de dar de alta un viaje.


Referencias:  
[1] https://json-ld.org/  
    https://es.wikipedia.org/wiki/JSON-LD  
    https://www.w3.org/TR/2014/REC-json-ld-20140116/  
[2] https://schema.org/docs/gs.html  
[3] https://developers.google.com/gmail/markup/reference/flight-reservation#json-ld  
[4] https://github.com/php-mime-mail-parser/php-mime-mail-parser
