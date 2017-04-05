$( document ).ready(function() {
    console.log( "ready!" );
});

$('li.category').click(function() {
   $('li.category').not(this).find('ul').hide();
   $(this).find('ul').toggle();
});
