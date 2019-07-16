$(document).ready(function () {

    // Or use this to Open link in same window (similar to target=_blank)
    $(".stat-link").click(function(){
        window.location = $(this).attr('href');
        return false;
    });
    
});