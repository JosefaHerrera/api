//TARIFAS
//HORARIO ALTO  $740
//HORARIO BAJO  $640
//HORARIO MEDIO $680


/*******************/
/*PROBANDO SIDEBAR JS - MENU*/
$('#openNav').click(function(){
    $('#mySidenav').width('250px');
});
$('#closeNav').click(function(){
    $('#mySidenav').width('0');
});
//index.html validar form.
//Expresión para validar un correo electrónico expresiones regulares
var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
$(document).ready(function(){
    /**/
    $('#openNav').click(function(){

    $('#mySidenav').width('250px');

});

$('#closeNav').click(function(){

    $('#mySidenav').width('0');

});
    // al hacer click en el btn-enviar, empezará a validar el formulario
    $("#btn-enviar").click(function(){
    //.val() obtenemos el contenido ingresado en el input correo.
    var correo = $("#correo").val();
    //.val() obtenemos el contenido ingresado en el input contraseña.
    var pwd = $("#pwd").val();
    //al realizar variables , el codigo se ve más limpio al momento de hacer validaciones largas.
    //VALIACION (CONDICION)
    
    //Si nombre es = a espacio vacío , aparece el mensaje con el #mensaje1
    //fadeIn(); hace un tipo de animacion de opacidad 0% a 100%
    if(correo == "" || !expr.test(correo)){
        $("#mensaje1").fadeIn("slow");
        ////al tener el valor false , es que no esta validando el contenido como lo hace true.
            return false;
        }else{
        //fadeOut(); hace un tipo de animacion de opacidad 100% a 0%
              $("#mensaje1").fadeOut();
             }if(pwd == "" ){
                    $("#mensaje2").fadeIn("slow");
                    return false;
                }
                else{
                    $("#mensaje2").fadeOut();
                        if (correo.value !== '' && pwd.value !=='') {
                            localStorage.setItem('mail',$("#correo").val());
                            window.location.href = 'opciones.html'
                        }
                    }
    });
    //DEVOLVER EMAIL en perfil
    var mail = localStorage.getItem('mail');
    $('#respuesta-email').html(mail);
});


