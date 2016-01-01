$(".mybutton").click(function(){
    var next = $(this).next();
    if (next.css("display") === 'none'){
        $(this).find('i').text('arrow_drop_up');
    }
    else{
        $(this).find('i').text('arrow_drop_down');
    }
    next.toggleClass('open');
});
