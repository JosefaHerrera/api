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
                //console.log('response', responseTwo);
                $( "#saldo" ).empty();
                $('#saldo').append(
                    "<div class='nav-saldo'>Saldo:</div>"+
                    "<div class='header-saldo'>" + responseTwo.saldoTarjeta + "</div>"+
                    "<div class='nav-saldo '>Saldo a la fecha: </div>"+
                    "<div class='header-saldo div-nav'>"+ fechaPlata + "</div>");
                var saldoObtenido = responseTwo.saldoTarjeta;
                // Saldo de la tarjeta
                //console.log('SALDO', saldoObtenido);
            })
            .always(function() {
                //console.log('complete')
            });
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
            "<div class='header-saldo'>" +"Debe ingresar un recorrido." + "</div>");
       }
       else
       {
                   $.ajax({
               url: `http://www.transantiago.cl/predictor/prediccion?codsimt=${codigo}&codser=${micro}`,
               type: 'GET',
               datatype: 'JSON',
           })

                              .done(function(transantiago) {
               //console.log('response', transantiago);
               var distanciabus = transantiago.servicios.item[0].distanciabus1;
               var demora = transantiago.servicios.item[0].horaprediccionbus1;
               var patente = transantiago.servicios.item[0].ppubus1;
               var mensajeError = transantiago.respuestaParadero;
               //console.log(distanciabus + " " + demora + " " + patente + " " + mensajeError);
               if(demora!=null)
               {
                $( "#paradero" ).empty();
                $('#paradero').append("<div class='nav-saldo'>La distancia del bus es: </div>"+
                "<div class='header-saldo'>" + distanciabus + " metros." + "</div>"+
                "<div class='nav-saldo '>La demora del bus es: </div>"+
                "<div class='header-saldo div-nav'>"+ demora + "</div>"+
                "<div class='nav-saldo'>La patente del bus es: </div>"+
                "<div class='header-saldo'>" + patente + "</div>");
               //var saldoObtenido = transantiago.saldoTarjeta;
               // Saldo de la tarjeta
               //console.log('DISTANA', distanciabus);
               //console.log('Demora', demora);
               //console.log('patente', patente);
               }
               else
                {
                    $( "#paradero" ).empty();
                    $('#paradero').append("<div class='nav-saldo'>Mensaje</div>"+
                    "<div class='header-saldo'>" + mensajeError + "</div>");
                }
              
           })
           .always(function() {
               //console.log('complete')
           });
       }



   })
});


/*FIN VER SALDO*/