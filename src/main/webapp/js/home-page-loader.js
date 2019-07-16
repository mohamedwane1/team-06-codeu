$(document).ready(function () {

    // Opens in same window
    $(".stat-link").click(function(){
        window.location = $(this).attr('href');
        return false;
    });

    $(".map-link").click(function(){
        window.location = $(this).attr('href');
        return false;
    });

    $(".forum-link").click(function(){
        window.location = $(this).attr('href');
        return false;
    });

  });