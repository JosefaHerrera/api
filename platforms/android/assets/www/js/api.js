$(document).ready(function() {
    $.ajax({
            url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=123456',
            type: 'GET',
            datatype: 'JSON',
        })
        .done(function(response) {
            //console.log('prueba');
            //console.log(response);
        })
        .fail(function() {
            //console.log('error')
        })
        .always(function() {
            //console.log('complete')
        });
})

/*VER SALDO */
$(document).ready(function() {

    // Evento para el boton de saldo que comprueba si el número es válido
    $('#btn-saldo').on('click', function() {
        var numTarjetaSaldo = $('.input-saldo').val();
        var tarjetaVacia = "Por favor, ingrese un número de tarjeta";
        if (numTarjetaSaldo != '')
        {
                  $.ajax({
                url: `http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${numTarjetaSaldo}`,
                type: 'GET',
                datatype: 'JSON',
            })
            .done(function(responseTwo) {
                var plata = responseTwo.saldoTarjeta;
                var fechaPlata = responseTwo.fechaSaldo;
                $( "#saldo" ).empty();
                $('#saldo').append(
                    "<div class='nav-saldo'>Saldo:</div>"+
                    "<div class='header-saldo'>" + plata + "</div>"+
                    "<div class='nav-saldo '>Saldo a la fecha: </div>"+
                    "<div class='header-saldo div-nav'>"+ fechaPlata + "</div>");
            })
            .fail(function() {
              $( "#saldo" ).empty();
              $('#saldo').append(
              "<div class='nav-saldo'>Error</div>"+
              "<div class='header-saldo'> Lo sentimos =( <br> El número de tu Bip! no es valida.</div>");
            })
        }
        else
        {
            $( "#saldo" ).empty();
            $('#saldo').append(
            "<div class='nav-saldo'>Saldo:</div>"+
            "<div class='header-saldo'>" + tarjetaVacia + "</div>");
        }

    });


     $('#btn-paradero').on('click', function() {
       var codigo = $('.input-paradero').val();
       var micro = $('.input-micro').val();
       if(micro == '')
       {
            $( "#paradero" ).empty();
            $('#paradero').append("<div class='nav-saldo'>Error</div>"+
            "<div class='header-saldo'>" +"Debes ingresar un recorrido." + "</div>");
       }
       else
       {
              $.ajax({
              url: `http://www.transantiago.cl/predictor/prediccion?codsimt=${codigo}&codser=${micro}`,
              type: 'GET',
              datatype: 'JSON',
           })

                .done(function(transantiago) {
               var distanciabus = transantiago.servicios.item[0].distanciabus1;
               var demora = transantiago.servicios.item[0].horaprediccionbus1;
               var patente = transantiago.servicios.item[0].ppubus1;
               var mensajeError = transantiago.respuestaParadero;
               if(demora!=null)
               {
                $( "#paradero" ).empty();
                $('#paradero').append("<div class='nav-saldo'>La distancia del bus es: </div>"+
                "<div class='header-saldo'>" + distanciabus + " metros." + "</div>"+
                "<div class='nav-saldo '>La demora del bus es: </div>"+
                "<div class='header-saldo div-nav'>"+ demora + "</div>"+
                "<div class='nav-saldo'>La patente del bus es: </div>"+
                "<div class='header-saldo'>" + patente + "</div>");
               }
               else
                {
                    $( "#paradero" ).empty();
                    $('#paradero').append("<div class='nav-saldo'>Mensaje</div>"+
                    "<div class='header-saldo'>" + mensajeError + "</div>");
                }      
           })
       }
   })
});