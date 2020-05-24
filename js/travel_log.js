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



});