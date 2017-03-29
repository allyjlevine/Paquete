$( document ).ready(function() {
    console.log( "ready!" );
});

$(function(){
  $("#finder-content").load("finder/finder.html");
  $("#sticky-note-content").load("sticky-note/index.html");
  $("#finder-content-tablet").load("finder/finder.html");
  $("#sticky-note-content-tablet").load("sticky-note/index.html");
});
