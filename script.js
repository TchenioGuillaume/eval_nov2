// if($ === jQuery) {
// alert("jQuery est actif")
// }

$('.modal').hide(); 

$('.valider').click(function() { 
  $('.modal').slideDown() 
})

$('.fermer').click(function() { 
  $('.modal').fadeOut() 
})
