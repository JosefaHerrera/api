$(document).ready(function() {
    $.ajax({
            url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=123456',
            type: 'GET',
            datatype: 'JSON',
        })
        .done(function(response) {
            console.log('prueba');
            console.log(response);
        })
        .fail(function() {
            console.log('error')
        })
        .always(function() {
            console.log('complete')
        });
})

/*VER SALDO */
$(document).ready(function() {

    // Evento para el boton de saldo que comprueba si el número es válido
    $('#btn-saldo').on('click', function() {
        var numTarjetaSaldo = $('.input-saldo').val();
        $.ajax({
                url: `http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${numTarjetaSaldo}`,
                type: 'GET',
                datatype: 'JSON',
            })
            .done(function(responseTwo) {
                console.log('response', responseTwo);
                $('#saldo').append(` 
                    <div class="container text-center">
                        <div class="row">
                            <div class="col-md-12 div-saldo">
                                <div class="card" id="container-saldo">
                                    <div class="card-content title-card-saldo">
                                        <div class="nav-saldo">SALDO TOTAL</div>
                                    </div>
                                    <div class="header-saldo title-info-saldo">
                                        <span>${responseTwo.saldoTarjeta}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
                var saldoObtenido = responseTwo.saldoTarjeta;
                // Saldo de la tarjeta
                console.log('SALDO', saldoObtenido);
            })
            .fail(function() {
                alert("ingrese numero de tarjeta validad")
        })
            .always(function() {
                console.log('complete')
            });
    })
})


/*FIN VER SALDO*/


/*calcular tarifa*/
$('#calculartarifa').click(function(response){
    var inputsaldo = $('#ntarjeta').val();
    var tarifa = $('#selectTarifa').val();
    console.log (inputsaldo);
    console.log (tarifa);

    $.ajax({
        url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip='+inputsaldo,
        type: 'GET',
        datatype: 'JSON',
    })
    //pasar todo a string
    .done(function(response) {
            console.log(response);
            var numsaldo = response.saldoTarjeta;
            var quitardig = numsaldo.replace("$","");
            var quitarpunto = quitardig.replace(".","");
            var saldo = parseInt(quitarpunto);
            var final = saldo - tarifa
            $('#muestratarifa').append("<div class='nav-saldo'>COSTO PASAJE</div>"+
                "<div class='header-saldo'>" +"$ "+ tarifa + "</div>"+
                "<div class='nav-saldo '>SALDO FINAL</div>"+
                "<div class='header-saldo div-nav'>" +"$ "+ final + "</div>");
        })
        .fail(function() {
            console.log('Error')
        })
        .always(function() {
            console.log('Completado')
        });

    
})



