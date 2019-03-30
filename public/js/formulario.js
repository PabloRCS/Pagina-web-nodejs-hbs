//dados formulario
$('#contact-form').submit(function(event) {
  event.preventDefault();//guarda dados sem recarregar pagina
  enviar();
});
function enviar() {
  var dados = $('#contact-form').serialize();
  $.ajax({
    type:'post',
    url:'php/formulario.php',
    data: dados,
    success: function(texto) {
      if(texto == "exito"){
        correto();
      }else{
        phperror(texto);
      }
    }
  })
}
function correto() {
  $('#messageSuccess').removeClass('d-none');
}
function phperror(texto) {
  $('#messageUnsuccess').removeClass('d-none');
  $('#messageUnsuccess').html(texto);
}
