Métodos para re direccionar al usuario desde la app TravelLog hacia su mail para facilitar el registro de un viaje mediante un mail de reserva de vuelo que le haya sido enviado al mismo.  
Candidatos  
-mailto:  
	Esquema de identificación uniforme (URI) para direcciones de correo. Permite mediante un hipervínculo en HTML redireccionar hacia el servicio mail del usuario ya con los campos REMITENTE y DESTINATARIO completos. Ej.:  
        `<a href="mailto:user@domain.com">Send email</a>`  
    Su punto fuerte es la facilidad de parametrizar parte de un mail con destinatario desde un clic.  
    Seguridad  
        -Expone la dirección de correo de la app a posibles bots de cosecha de direcciones, dejándola expuesta a listas de spam, debido a la cantidad de signos y palabras claves en la sentencia reconocibles (@, ‘.’, mailto).  
        -Existen ciertas soluciones para evadir esta captura (enmascaramiento, honeypot, encriptado).  
    Inconvenientes:  
        -Redireccióna a la cuenta de mail por defecto del sistema (navegadores varios [Desktop], o aplicación de correo [Desktop y Mobile]), y no a la registrada en la cuenta.  
        -Inexistencia de reenvío de un mail (en este caso el de reserva) en la interfaz.  
    Posibles soluciones  
        •	Sustitución de la dirección  
            o	Redirección mediante script (invisibiliza la direccion al estar del lado del servidor)  
            `<a href="redirect-mailto.php">email</a>  
            <?php  
            header("Location: mailto : user @ domain.com");  
            ?>`  
        •	Enmascarado de dirección  
            o	Composición dinámica de la dirección mediante concatenacion y codigo ASCII  
            `<script type="text/javascript">  
            var part1 = "user";  
            var part2 = Math.pow(2,6);  
            var part3 = String.fromCharCode(part2);  
            var part4 = "domain.com"  
            var part5 = part1 + String.fromCharCode(part2) + part4;  
            document.write("Send email  
            <href=" + "mai" + "lto" + ":" + part5 + ">" + part1 + part3 + part4 + "</a>.");  
            </script>`  
        •	Encriptado de dirección  
            o	Método de encriptado ROT13 (intercambio de un caracter por otro que se ubica 13 posiciones hacia la derecha)  
            `<a id="email" href=" " onclick='openMailer(this);'>Send email</a>  
            <script type="text/javascript">  
            function decode(a) {  
            return a.replace(/[a-zA-Z]/g, function(c){  
                return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);  
            })  
            };  
            function openMailer(element) {  
            var y = decode("znvygb:orahgmre@qbznva.qr");  
            element.setAttribute("href", y);  
            element.setAttribute("onclick", "");  
            element.firstChild.nodeValue = "Open email software";  
            };  
            </script>`  
        •	Métodos de CAPTCHA  
            o	La dirección solo se revela si el usuario ha resuelto un CAPTCHA. Opción gratuita de Google (reCAPTCHA).  
    Conclusion: no es una opcion valida, ya que no permite reenvio de mails preexistentes.  
    Ref[1].  

-redireccion simple al servicio mail del usuario:  
    Se podria extraer que servicio utiliza el usuario a traves de su mail registrado mediante una query a la BBDD y, en base a ello, redirigirlo al mismo para que de este modo pueda reenviar la reserva que desee agregar. Ej.:  
        `$sentencia = $this->db->prepare( "SELECT email FROM usuario WHERE id_usuario=?");  
        $sentencia->execute(array($id));  
        $email = $sentencia->fetch(PDO::FETCH_ASSOC);  
        if (strpos($email, 'gmail.com') !== false){  
            header("Location: https://www.gmail.com");  
        }`  
    Seguridad  
        -No habria una direccion expuesta, ya que se extrae la informacion desde el backend (email del usuario) y luego que direccion se tomara estara del lado del servidor.  
    Inconvenientes:  
        -La busqueda y reenvio de reserva es manual.  
        -El usuario debe guardar a que direccion enviar el mail (direccion de la app).  
        -No funcionaria muy bien en dispositivos mobiles donde por defecto se redirige al servicio por default.  
    Conclusion: solucion parcial, deja en manos del usuario una buena parte del reenvio pero ahorra el proceso de abrir la cuenta de email.  

-sincronizar mail con cuenta de app:  
	La propia app se encargara de chequear diariamente el correo provisto por el usuario en busca de mails con tags relacionados a reservas.  
    Requiere configuración para los servicios de email mas conocidos (Gmail, Yahoo, Outlook).  
    Se pueden obtener con este metodo acceso a metodos HTTP que permiten revisar el inbox del usuario, incluso ofrece metodos GET refinados a categorias, como bookings.  
    Ref[2].  
    Seguridad  
        -Su uso es optativo y se puede desactivar.  
        -Requiere autenticación (Oauth).  
        -Importacion segura mediante HTTPS para escanear los headers del inbox y solo tomara aquella info relativa a un viaje o plan.   
        -Se pueden guardar varias direcciones del usuario para analizarlas.  
    Inconvenientes  
        - Al no ser obligatorio y requerir autorizacion del usuario para acceder a los datos de su cuenta mail, requiere obligatoriamente de el metodo manual de reenvio y confianza en la plataforma por parte del usuario.  
        -La misma configuracion de los variados servicios agrega complejidad a la solucion.  
    Posibles implementaciones  
        •	Implementar accesos a las APIs de los servicios de correos mas usados (pedidos de credenciales).  
        •	Obtener permisos de los diversos servicios de correo para poder leer los mails de reserva de los usuarios.  
Conclusion: es una opcion valida pero se adecua parcialmente a lo propuesto.  
Se deben implementar metodos de autenticacion y permisos de acceso a las secciones esenciales del inbox, ademas de opciones para que el usuario revoque los permisos desde la app.  
    Se deben poder hacer consultas a las APIs de cada servicio de correo[3].  
Otras soluciones halladas fueron del estilo de mailto, funciones que pueden generar un mail pero sin opcion de reenvio.  
Ref[4].  


Conclusion general:  
Analizando lo encontrado no hay una solucion optima a lo propuesto, debido a que no hay implementaciones que permitan generar un modelo de reenvio que incluya remitente con cuenta de cliente, destinatario con cuenta de la app y la posibilidad de añadir el mail de resarva para reenvio.  
Las dos opciones mas cercanas son la redireccion hacia un cliente de correo de acuerdo al mail que utiliza el usuario (dificultad media), y sincronizacion de inbox con la app (dificultad elevada).  



Referencias  
[1] https://www.ionos.com/digitalguide/e-mail/e-mail-security/protecting-your-email-address-how-to-do-it/  
    https://www.the-art-of-web.com/javascript/mailto/  
[2] https://help.tripit.com/hc/en-us/sections/205829467-Auto-Import  
    https://support.google.com/accounts/answer/3466521?hl=en  
    https://developers.google.com/gmail/api/auth/web-server  
[3] https://developers.google.com/gmail/api/guides  
    https://docs.microsoft.com/en-us/outlook/rest/get-started  
    https://developer.yahoo.com/oauth2/guide/openid_connect/getting_started.html  
[4] https://www.php.net/manual/es/function.mail.php  
    https://www.tutorialspoint.com/php/php_sending_emails.htm  