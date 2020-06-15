**La presente documentación busca hallar un conjunto de opciones de API que permitan obtener datos de Tours tales como 
Nombre, Ubicación y Descripción, y que al mismo tiempo permitan una integración rápida con el proyecto que se está 
desarrollando (TravelLog).**
------------------------------------------------------------------------------------------------------------------------
**Triposo API**  
La API de Triposo permite añadir información de contenido de viajes dentro de aplicaciones. Los desarrolladores pueden 
acceder a POIs (puntos de interés), Tours, y Artículos realizando llamados para obtener respuestas en formato JSON. Triposo 
utiliza Inteligencia Artificial para minar y parsear datos e ideas de viaje [1].
Presenta la posibilidad de consultar Tours de una amplia variedad de proveedores en su Base de Datos, los cuales pueden ser 
consultados junto a POI’s, permitiendo obtener un conjunto de tours que incluyan atracciones principales [2].

ENDPOINT:  
`https://www.triposo.com/api/20200405/tour.json?`

Los tipos de consultas de tours que provee son:  
* Consulta dado un id, retorna el tour preciso.

`/api/20200405/tour.json?  
id=MM__3ab0cb0f-22f9-4139-bbec-03005717a9c2  
&fields=all`

* Consulta dada una locación (ej Rio de Janeiro), retorna un set de tours ubicados en el sitio indicado.  

`/api/20200405/tour.json?  
location_ids=Rio_de_Janeiro  
&count=10  
&fields=all`  

En este caso se puede filtrar por etiquetas (citypass, daytrips, private_tours, etc) [3].

`/api/20200405/tour.json?  
location_ids=Rio_de_Janeiro  
&tag_labels=walkingtours  
&count=10  
&fields=all`  

* Consulta dado un ID de POI (point of interest), retorna también un set de tours, mas especifico que proveyendo una locación.

`/api/20200405/tour.json?  
poi_id=W__108139504  
&fields=all`  

En este caso el ID necesario puede ser consultado con otra consulta a POIs, también presente en la API. En este caso de 
consulta se utilizó la ubicación (Paris) y un nombre más descriptivo a la búsqueda (Eiffel):

`/api/20200405/poi.json?  
annotate=trigram:Eiffel  
&trigram=>=0.3  
&location_id=Paris  
&count=10  
&fields=id,name`  

De esta forma obtenemos un set de POIs con sus respectivos ID y nombre, este último necesario para refinar la búsqueda[4].

* Consulta de “persona”, que representa un tipo de usuario (food_lover, culture_buff, nature, shopper and party), presupuesto 
(budget, mid_range, splurge) y composición (family, couples).

`/api/20200405/tour.json?  
location_ids=Amsterdam  
&annotate=persona:nature  
&order_by=-persona_nature_score  
&fields=all`  

Respecto a la respuesta, permite obtener aquellos campos necesarios para el caso de uso: nombre, descripción y coordenadas. 
Además provee: score, price, images, location, duration, tags, booking info, entre otros.

Además de las consultas mencionadas (Tour y POI), la API presenta consultas de: Ubicaciones, Etiquetas y Artículos.

Por último, cabe detallar que no es una API totalmente gratuita, trabaja con créditos que son los que permiten realizar 
consultas (créditos =consultas) [5].
Tiene tres tipos de planes:
* Developer, apunta a desarrolladores freelance, otorga 25000 créditos por mes.
* Pro, apunta a startups en estado inicial, 3000000 créditos mensuales por USD499.
* Business, para startups en estado de maduración alto y miles de visitas por mes, no indica su costo ya que se debe acordar 
las prestaciones con Triposo.

Como conclusión parcial, esta API presenta un conjunto interesante de consultas y respuestas. Un único detalle sería analizar 
la viabilidad de tomar el peso de refinar los POIs para obtener un ID que permita consultar por el tour deseado, pues la API 
no provee un medio de consulta tan genérico en Tour.

------------------------------------------------------------------------------------------------------------------------

**Musement API**
Esta API permite a los desarrolladores integrar información de tours, atracciones, actividades y eventos en sus sitios web y 
aplicaciones. La información disponible incluye más de 5000 eventos en 300 ciudades y 50 países, pudiendo obtener de cada 
actividad su información, fotos y contenido.

De sus principales bloques, destaca Catalog el cual sirve para obtener datos de los productos almacenados por Musement. Su 
elemento clave son las Actividades, las cuales tienen dos maneras de organizarse: por tipo y por ubicación geográfica [6].

ENDPOINT:  
`https://sandbox.musement.com/api/v3/`

La organización por tipos utiliza [7]:  
* Verticals: primera capa de categorización, identifica las actividades como Museums & art, Tours & attractions, Performances, 
Food & wine, Active & adventure, Sports, Nightlife.

`GET {{api_base_url}}/verticals/{verticals_id}/activities`

* Categories: segunda capa de categorización mucho más detallada que “Vertical”, puede identificar actividades tales como 
“Moto GP”, “City passes”, “Segway tours”, “Ballet”, “Helicopter & balloon rides”, etc.

`GET {{api_base_url}}/categories/{categories_id}/activities`

* Lists: agrupa un conjunto de actividades y POIs de acuerdo a un criterio mas estratégico. Ej “24 hours in New York”, 
“Best 5 clubs in Vienna”.

`GET {{api_base_url}}/cities/{city_id}/lists`

Y por ubicación geográfica:  
* Cities: presenta actividades de una ciudad disponible.

`GET {{api_base_url}}/cities/{cities_id}/activities`

* Venues (POIs): los principales puntos de interés en una ciudad, tales como Vatican Museums, Eiffel Tower y más.

`GET {{api_base_url}}/venues/{venues_id}/activities`

Como resultados devuelve un amplio rango de datos, desde los deseados para esta investigación (name, description, image) 
hasta otros muy interesantes como languages, price, coordinates, etc.

No se halló una pagina de pagos, por lo que se estima que es de uso libre y sin costo.

Se concluye que esta API se presenta como una interesante opción. Se llegó a ella por medio de Triposo, ya que esa API 
consulta en gran parte a esta otra. Sin embargo, las consultas parecen mucho menos sencillas y están más enfocadas a la 
implementación de un marketplace de tours que a mostrar información de los mismos de forma dinámica.

------------------------------------------------------------------------------------------------------------------------

**Viator API**
Viator vende tours y actividades a través de su sitio web, teniendo 8 sitios en idiomas locales para los mercados Europeo y 
Japonés y mas de 2000 sitios afiliados que incluyen las mayores cadenas de hoteles y aerolíneas, agencias de viajes online, 
sitios específicos de ciudades y más. Viator ofrece su DB de productos en formato XML, el cual los desarrolladores pueden 
utilizar en sus páginas para mostrar productos de Viator así como también en mails de confirmación [8].

La API expone una variedad de servicios que permiten la recuperación de todos los detalles del producto, como descripciones, 
precios, términos y condiciones, fotos y reseñas. Estos datos se pueden ingerir periódicamente y administrar en su sistema 
local, o se pueden hacer llamadas en tiempo real para recuperar contenido en respuesta a la actividad de sus usuarios en sus 
sistemas [9].

ENDPOINT:  
`https://viatorapi.sandbox.viator.com/service/`

Los proyectos asociados a Viator pueden usar los endpoints de búsqueda de productos para recuperar listas del inventario de 
Viator que sean de relevancia para el negocio. Los criterios de búsqueda disponible son:
* Ubicación (destino) en el que opera el producto.
* Si el producto está asociado con una atracción turística conocida (POI) por ej. Empire State Building.
* El tipo de producto (categoría o subcategoría).
* El periodo de tiempo durante el cual opera el producto.
* Palabras o frases que aparecen en la descripción de un producto a través de una búsqueda de texto libre.

En este caso no se pudieron hallar ejemplos de consultas, ya que los mismos solo están disponibles para los asociados al 
servicio, lo cual nos lleva al siguiente punto.

Para poder consumir la API, Viator distingue 4 tipos de consumidores [10]:

* Merchant partners, aquellos consumidores que tienen un sistema completo de marketplace y solo requieren de tener toda la 
información posible sobre viajes, vuelos y tours. Tienen total responsabilidad en los procesos de negocio.  
* Viator Branded Affiliates (VBAs), similar a los anteriores, pero que no cuentan con un sistema de marketplace para la venta 
de productos. En este caso Viator les provee con su propio sistema, por el cual los asociados reciben una pequeña comisión 
de acuerdo al uso de sus usuarios.  
* VBAs with booking capability, una especie de blend entre los dos anteriores. Cuentan con su propio sistema de marketplace 
pero no poseen responsabilidad de los procesos de negocio.  
* White label partners, aquellos que no operar un sitio propio por lo cual Viator les ofrece un entorno completo y 
personalizable.

En base a esto, se puede considerar que a pesar de presentar uno de los catálogos más completos de productos (y en este 
caso, tours) del sector, está pensado exclusivamente para consumirse con un uso puramente comercial, sin posibilidad de 
ofrecer un acceso a solo información. Por lo tanto, se descarta esta opción.

------------------------------------------------------------------------------------------------------------------------

**GetYourGuide API**  
Este es un servicio web para recorridos y actividades de viaje. Los usuarios pueden reservar sus viajes y actividades para 
los próximos viajes. GetYourGuide ofrece recorridos y actividades por geografía y ubicación, categorías y tipo de actividad.  
La API permite a los desarrolladores acceder e integrar el contenido y la funcionalidad de GetYourGuide con otros sitios y 
aplicaciones. La API devuelve listas de actividades según la ubicación. La documentación pública no está disponible [11].

Al no poseer información detallada sobre el servicio, no se tiene más opción que descartarla completamente.

------------------------------------------------------------------------------------------------------------------------

**Headout API**  
Headout es un mercado móvil a pedido que ayuda a los viajeros a descubrir y reservar los tours, actividades, eventos y 
experiencias locales más increíbles de la ciudad durante las próximas 24 horas a precios exclusivos con descuento.
Su API permite la búsqueda por Product, Inventory & Pricing, Booking, City y Category [12].

ENDPOINT:  
`https://www.headout.com/api/public/v1/`

* Product, que puede ser a su vez [13]:  
    -Por ID, retornando el ítem especifico:  
    `/product/get/{product_id}`  
    -Por ciudad, que devuelve un conjunto de ítems:  
    `/product/listing/list-by/city`  
    -Por categoría, retornando un conjunto también:  
    `/product/listing/list-by/category`  

* City, lista ciudades activas [14]:  
`/city`  

* Categories, lista todas las categorías por ciudad[15]:  
`/category/list-by/city`  

En este caso, el acceso a la API es libre, por lo cual no hubo problemas para testear. Sin embargo el set de opciones es 
algo limitada. Además solo cuenta con unas 30 ciudades activas donde buscar tours.

------------------------------------------------------------------------------------------------------------------------

**TourCMS API**  
TourCMS ofrece un sitio web completo y un sistema de gestión de reservas para operadores turísticos pequeños y medianos.  
Estas llamadas a la API son para acceder a los datos de su producto en vivo en tiempo real. Pueden ser utilizados por los 
socios de TourCMS Marketplace para acceder al contenido de múltiples cuentas de TourCMS. Estas API también pueden ser 
utilizadas por propietarios de cuentas individuales para acceder a sus propios datos [16].

Para la integración con una guía de viaje, se debe utilizar el método de Búsqueda de Tour para regresar los tours (por 
palabra clave, ubicación, nivel de comodidad, distancia a un punto, etc.). Todos los resultados incluyen una imagen, 
lat / long, resumen, descripción breve, etc. y enlaces rastreados para enviar al cliente al sitio web del operador para la 
conversión.

ENDPOINT:  
No posee uno visible, ya que el propio servicio recomienda el uso de alguno de los API wrappers que posee para las 
diferentes implementaciones (PHP, AngularJS, JAVA, etc). Por lo tanto, para poder usarlo e incluso probarlo requiere una 
configuración previa [17].

Al estar la API encapsulada, desde el cliente se debe llamar a este bloque de la siguiente forma [18]:  
`object search_tours ( [ string $params = "" [, int $channel = 0 ]] )`  
Ej.:  
`// Set the Channel ID  
// For Operators this can be found in the API settings page  
// For Agents this can be a specific Channel or 0 to search all  
$channel = 3;`  

`// Define search parameters  
$params = "lat=56.82127&long=-6.09139&k=walking";`  

`// Query the TourCMS API  
$result = $tourcms->search_tours($params, $channel);`  

`// Loop through each Tour and output the Tour name and distance  
foreach($result->tour as $tour) {  
    print $tour->tour_name.' ('.round($tour->distance).' miles)';  
}`  

Ademas se puede especificar entre sus parametros datos como por ejemplo:
tour_id, k(Keyword - matchea contra name, Location, Short description, Summary, Tour code) k2, k3, location, 
lat, long, etc [18].


En este caso es interesante que la API este ya encapsulada y lista para consumir en los diferentes marcos de desarrollo, 
sin embargo trabaja con XML lo cual la posiciona por detrás de otras opciones que ya manejan JSON como lenguaje.

------------------------------------------------------------------------------------------------------------------------

Como conclusión general se obtuvo que entre las opciones analizadas que no existe una gran cantidad de APIs que permitan 
obtener solamente datos de tours (tales como nombre, ubicación y descripción breve), si no que la mayoría apunta a un uso 
en marketplace. De hecho, solo una de las opciones se presenta como una fuerte candidata, Triposo API.









Referencias:

[1]    https://www.programmableweb.com/api/triposo  
[2]    https://www.triposo.com/api/documentation/20200405/#tour  
       https://www.triposo.com/api/documentation/20200405/examples#tours  
[3]    https://www.triposo.com/api/documentation/20200405/reference#common-tag-labels  
[4]    https://www.triposo.com/api/documentation/20200405/examples#poi-by-name  
[5]    https://www.triposo.com/api/console/latest/account/billing  
[6]    https://www.programmableweb.com/api/musement  
[7]    https://api-docs.musement.com/docs/activities#city  
       https://api-docs.musement.com/docs/searching-an-activity  
[8]    https://www.programmableweb.com/api/viator  
[9]    https://docs.viator.com/partner-api/merchant/technical/#section/Overview  
[10]    https://docs.viator.com/partner-api/merchant/technical/#section/Overview/Who-is-the-API-for  
[11]    https://www.programmableweb.com/api/getyourguide  
[12]    https://github.com/headout/api-docs  
[13]    https://github.com/headout/api-docs/blob/master/apis/product.md  
[14]    https://github.com/headout/api-docs/blob/master/apis/city.md#GET-/city  
[15]    https://github.com/headout/api-docs/blob/master/apis/category.md  
[16]    https://www.programmableweb.com/api/tourcms-marketplace  
[17]    https://www.tourcms.com/support/api/mp/client_libraries.php  
[18]    https://www.tourcms.com/support/api/mp/tour_search.php  

