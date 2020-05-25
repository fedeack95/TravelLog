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

let btnAgendarViaje  = document.getElementById("btn_agendarViaje");
if (btnAgendarViaje!=undefined && btnAgendarViaje!=null){
    btnAgendarViaje.addEventListener('click', cargaAgendarViaje);
}
function cargaAgendarViaje() {
    let container = document.getElementById("bloquePartialRender");
    container.innerHTML = '<div class="container"><div class="title"><h1 class="title">MI VIAJE</h1><p>Los campos indicados con * son obligatorios</p></div><form><div class="form-group"><label for="exampleFormControlInput1">Nombre del viaje *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlInput1">Ciudad origen *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlInput1">Ciudad destino *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlTextarea1">Descripción</label><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div><div class="form-group"><label for="exampleFormControlInput1">Compañia de transporte</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlInput1">Código de reserva</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></div><div class="form-group"><label for="exampleFormControlInput1">Fecha de inicio *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder="xx/xx/xxxx"></div><div class="form-group"><label for="exampleFormControlInput1">Fecha de fin *</label><input type="email" class="form-control" id="exampleFormControlInput1" placeholder="xx/xx/xxxx"></div><div class="containerButton"><button id="btn_email_reserva" type="button" class="btn btn-primary btn-lg btn-medium"><a class="button" href="agendarViaje.html">USAR EMAIL DE RESERVA</a></button></div><div class="containerButton"><button id="btn_agendar" type="button" class="btn btn-primary btn-lg btn-medium"><a class="button" href="mensajeDeConfirmacion.html">AGENDAR</a></button></div></form></div>'
}  

let btnMisViajes  = document.getElementById("btn_misViajes");
console.log(btnMisViajes)
if (btnMisViajes!=undefined && btnAgendarViaje!=null){
    btnMisViajes.addEventListener('click', cargaMostrarViajes);
}
function cargaMostrarViajes(){
    let container = document.getElementById("bloquePartialRender");
    container.innerHTML = "";
    for (let i = 0; i<viajes.length; i++){
        container.innerHTML += viajes[i].nombre
    }
}
   


});