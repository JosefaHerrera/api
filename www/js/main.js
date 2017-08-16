$(document).ready(function(){
    $("#btn-enviar").click(function(){
        var nombre = $("#nombreinput").val();

        if(nombre == ''){
        $("#mensaje1").fadeIn("slow");

             }else if(nombre.value !== '') {
                            $("#mensaje1").fadeOut();
                            localStorage.setItem('nombre',$("#nombreinput").val());
                            window.location.href = 'saldo.html'
                        }
                    });
    var name = localStorage.getItem('nombre');
    $('#nombrelocal').html(name);
});