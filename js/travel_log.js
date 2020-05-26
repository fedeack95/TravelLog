addEventListener('DOMContentLoaded', function(){
    //Creación array de viajes
let viajes = [
    {
        "id_travel" : 1,
        "nombre" : "Mi primer viaje",
        "descripcion" : "Intercambio cultural en europa!!",
        "usuario_id_usuario" : 1,
        "fecha_inicio" : "14-1-2021",
        "fecha_fin" : "28-12-2021",
        "ciudad_origen" : "Buenos Aires",
        "ciudad_destino" : "Paris"
    }
];
//Creación array de usuarios
let usuarios = [
    {
    "id_usuario" : 1,
    "nombre" : "Leonardo",
    "apellido" : "Molleker",
    "e-mail" : "leonardomolleker1996@gmail.com",
    "nombre_usuario" : "LMolleker",
    "password" : "1234",
    "is_premium" : true
    }
];
//Creación array de planes
let planes = [
    {
        "id_plan" : 1,
        "categoria" : "T",
        "travel_id_travel" : 1,
        "ciudad_origen" : "Buenos Aires",
        "fecha_comienzo" : "14-1-2021",
        "fecha_fin" : "28-12-2021",
    }
];
//Creación array plan transporte
let transportes = [
    {
        "plan_id_plan" : 1,
        "destino" : "Paris",
        "tipo_transporte" : "Aereo",
        "empresa" : "Aerolineas Argentinas",
        "transbordo" : 3,
        "asiento" : 34,
        "codigo_reserva" : 58248,
        "numero_vuelo" : 3901789
    }
];
//Creación array plan excursión
let excursion = [

];
//Creación array plan hospedaje
let hospedaje = [

];
//To do
function crearViaje(){

}
//To do
function crearPlan(){
    if (categoria=="T"){

    }else if (categoria=="E"){

    }else{

    }
}

function mostrarViajes(){
    for (let i = 0; i<viajes.length; i++){
        console.log(viajes[i])
    }
}

viajes.forEach(element => console.log(element));

asignaciónEventosEnIndex()

function cargaAgendarViaje() {
    let container = document.getElementById("bloquePartialRender");
    container.innerHTML = '<div class="container"><div class="title"><h1 class="title">MI VIAJE</h1><p>Los campos indicados con * son obligatorios</p></div><form><div class="form-group"><label for="exampleFormControlInput1">Nombre del viaje *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlInput1">Ciudad origen *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlInput1">Ciudad destino *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlTextarea1">Descripción</label><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div><div class="form-group"><label for="exampleFormControlInput1">Compañia de transporte</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlInput1">Número de vuelo</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlInput1">Fecha de inicio *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder="xx/xx/xxxx"></div><div class="form-group"><label for="exampleFormControlInput1">Fecha de fin *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder="xx/xx/xxxx"></div><div class="containerButton"><button id="btn_email_reserva" type="button" class="btn btn-primary btn-lg btn-medium"><a class="button" href="agendarViaje.html">USAR EMAIL DE RESERVA</a></button></div><div class="containerButton"><button id="btn_agendar" type="button" class="btn btn-primary btn-lg btn-medium"><a class="button" >AGENDAR</a></button></div></form></div>'
    asignacionEventosEnFormulario()
} 

function asignacionEventosEnFormulario(){
    let btnAgendar  = document.getElementById("btn_agendar");
    if (btnAgendar!=undefined && btnAgendar!=null){
      btnAgendar.addEventListener('click', agendar);
    }
    let btnEmailReserva  = document.getElementById("btn_email_reserva");
    if (btnEmailReserva!=undefined && btnEmailReserva!=null){
        btnEmailReserva.addEventListener('click', agendarViaMail);
    }
}

function agendar(){
    let arrayElementsFormulario = document.getElementsByClassName("form-group")
    console.log(arrayElementsFormulario)
    let arrayInformacion = [];
    for (let i = 0; i<arrayElementsFormulario.length; i++){
        arrayInformacion.push(arrayElementsFormulario[i].lastChild.value)
    }
    if(arrayInformacion[0]!="" && arrayInformacion[1]!="" && arrayInformacion[2]!="" && arrayInformacion[6]!="" && arrayInformacion[7]!=""){
        let viaje = {
            "id_travel" : viajes[viajes.length-1].id_travel + 1,
            "nombre" : arrayInformacion[0],
            "descripcion" : arrayInformacion[3],
            "usuario_id_usuario" : 1,
            "fecha_inicio" : arrayInformacion[6],
            "fecha_fin" : arrayInformacion[7],
            "ciudad_origen" : arrayInformacion[1],
            "ciudad_destino" : arrayInformacion[2]
        }

        let hayPlan = false
        if (arrayInformacion[4]!="" && arrayInformacion[5]!=""){
            hayPlan = true
        }
        let plan = {
            "id_plan" : planes[viajes.length-1].id_plan + 1,
            "categoria" : "T",
            "travel_id_travel" : viaje.id_travel,
            "ciudad_origen" : viaje.ciudad_origen,
            "fecha_comienzo" : viaje.fecha_inicio,
            "fecha_fin" : viaje.fecha_fin,
        }

        let transporte = {
            "plan_id_plan" : plan.id_plan,
            "destino" : viaje.ciudad_destino,
            "tipo_transporte" : "Aereo",
            "empresa" : arrayInformacion[4],
            "transbordo" : generarCodigoAleatorio(),
            "asiento" : generarCodigoAleatorio(),
            "codigo_reserva" : generarCodigoAleatorio(),
            "numero_vuelo" : arrayInformacion[5]
        }
        let container = document.getElementById("bloquePartialRender");
        container.innerHTML = '<div class="mensajeAlUsuario"><div><h3 class="title">¿Deseas agendar este viaje?</h3></div><div class="containerData"><h6><span>Nombre del Viaje:</span><br>' + viaje.nombre + '</h6><h6><span>Ciudad destino:</span><br>' + viaje.ciudad_destino + '<h6><span>Descripción:</span><br>' + viaje.descripcion + '<h6><span>Compañia de trasporte:</span><br>' + arrayInformacion[4] + '<h6><span>Número de vuelo:</span><br>' + arrayInformacion[5] + '</h6></h6></h6></h6><h6><span>Fecha de inicio:</span><br>' + viaje.fecha_inicio + '</h6><h6><span>Fecha de fin:</span><br>' + viaje.fecha_fin + '</h6></div><div class="containerButton"><button id="btn_email_reserva" type="button" class="btn btn-secondary btn-lg btn-medium btn_cancel"><a class="buttonCancel" >CANCELAR</a></button></div><div class="containerButton"><button id="btn_agendar" type="button" class="btn btn-primary btn-lg btn-medium"><a class="button">CONFIRMAR</a></button></div></div>'
        asignacionBotonesConfirmacion(viaje, hayPlan, plan, transporte)
    }else{
        alert("Faltan datos obligatorios")
    }
}

function generarCodigoAleatorio(){
    return getRandomInt(999999)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))+1;
  }

function asignacionBotonesConfirmacion(viaje, hayPlan, plan, transporte){
    let btnConfirmar = document.getElementById("btn_agendar")
    btnConfirmar.addEventListener('click', function(){
        cargarIndex()
        viajes.push(viaje);
        if (hayPlan){
            planes.push(plan)
            transportes.push(transporte)
        }
    })
    let btnCancelar = document.getElementById("btn_email_reserva");
    btnCancelar.addEventListener('click', cargarIndex)
}

function agendarViaMail(){

}

function cargaMostrarViajes(){
    let container = document.getElementById("bloquePartialRender");
    container.innerHTML = "";
    for (let i = 0; i<viajes.length; i++){
        container.innerHTML += viajes[i].id_travel
    }
}


function cargarIndex(){
    let container = document.getElementById("bloquePartialRender");
    container.innerHTML = '<div id="carouselExampleControls" class="carousel slide" data-ride="carousel"><div class="carousel-inner"><div class="carousel-item active"><img src="images/img_home.jpg" class="d-block w-100" alt="..."></div><div class="carousel-item"><img src="images/img_home.jpg" class="d-block w-100" alt="..."></div><div class="carousel-item"><img src="images/img_home.jpg" class="d-block w-100" alt="..."></div></div><a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div><div id="btn_agendarViaje" class="containerButton"><button type="button" class="btn btn-primary btn-lg"><a class="button" >AGENDAR VIAJE</a></button></div><div class="containerButton"><button id="btn_misViajes" type="button" class="btn btn-primary btn-lg btn-success"><a class="button">MIS VIAJES</a></button><!-- <button type="button" class="btn btn-secondary btn-lg">MIS VIAJES</button> --></div>'
    asignaciónEventosEnIndex()
}
//Asignacion de eventos a los botones del index
function asignaciónEventosEnIndex(){
    let btnAgendarViaje  = document.getElementById("btn_agendarViaje");
    if (btnAgendarViaje!=undefined && btnAgendarViaje!=null){
        btnAgendarViaje.addEventListener('click', cargaAgendarViaje);
    }
    let btnMisViajes  = document.getElementById("btn_misViajes");
    if (btnMisViajes!=undefined && btnAgendarViaje!=null){
        btnMisViajes.addEventListener('click', cargaMostrarViajes);
    }
}
   


});