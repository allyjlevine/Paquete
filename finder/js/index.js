$(document).ready(function(){
    // hide on subcategories and files on load
    $("#sub-apps").hide();
    $("#files-apps").hide();
    $("#sub-music").hide();
    $("#files-music").hide();
    $("#files-musicvids").hide();
    $("#sub-series").hide();
    $("#files-series").hide();
    $("#sub-sport").hide();
    $("#files-sport").hide();
    $("#sub-tube").hide();
    $("#files-tube").hide();




    //click Applications, hide others
    $("#applications").click(function(){
      $(this).addClass("active");
      $("#music, #series, #sports, #youtube").removeClass("active");
      $("#sub-apps").show();
      $("#sub-music, #files-music, #files-musicvids, #sub-series, #files-series, #sub-sport, #files-sport, #sub-tube, #files-tube").hide();
    });

    $("#android").click(function(){
      $(this).addClass("active");
      $("#files-apps").show();
    });

    //click Music, hide others
    $("#music").click(function(){
      $(this).addClass("active");
      $("#applications, #series, #sports, #youtube").removeClass("active");
      $("#sub-music").show();
      $("#sub-apps, #files-apps, #sub-series, #files-series, #sub-sport, #files-sport, #sub-tube, #files-tube").hide();
    });
    $("#international").click(function(){
      $(this).addClass("active");
      $("#music-vids").removeClass("active");
      $("#files-music").show();
      $("#files-musicvids").hide();
    });
    $("#music-vids").click(function(){
      $(this).addClass("active");
      $("#international").removeClass("active");
      $("#files-musicvids").show();
      $("#files-music").hide();
    });

    //click Series, hide others
    $("#series").click(function(){
      $(this).addClass("active");
        $("#music, #applications, #sports, #youtube").removeClass("active");
      $("#sub-series").show();
      $("#sub-apps, #files-apps, #sub-music, #files-music, #files-musicvids, #sub-sport, #files-sport, #sub-tube, #files-tube").hide();
    });

    // click Sports, hide others
    $("#sports").click(function(){
      $(this).addClass("active");
      $("#music, #series, #applications, #youtube").removeClass("active");
      $("#sub-sport").show();
      $("#sub-apps, #files-apps, #sub-series, #files-series, #sub-music, #files-music, #files-musicvids, #sub-tube, #files-tube").hide();
    });
    $("#soccer").click(function(){
      $("#files-sport").show();
      $(this).addClass("active");
    });

    //click Youtube, hide others
    $("#youtube").click(function(){
      $(this).addClass("active");
      $("#music, #series, #sports, #applications").removeClass("active");
      $("#sub-tube").show();
      $("#sub-apps, #files-apps, #sub-series, #files-series, #sub-sport, #files-sport, #sub-music, #files-music, #files-musicvids").hide();
    });
    $("#fashion").click(function(){
      $(this).addClass("active");
      $("#files-tube").show();
    });

    //remove active when exiting branch
    $(".category-container li").click(function(){
      $(".sub-container li").removeClass("active");
    });


});
