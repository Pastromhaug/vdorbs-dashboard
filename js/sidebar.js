var expanded = [];
var expandedlength = 0;

$(".mybutton").click(function(){
    //var productId = $(this).attr('class').replace('addproduct ', '');
    //addToCart(productId);
    if ($(this).next().css("display") === 'none'){
        //expandedlength = expanded.length;
        //console.log(expandedlength);
        //for (var i = 0; i < expandedlength; i++){
        //    var iexpanded = expanded[i];
        //    if (iexpanded.css("display") !== 'none'){
        //        iexpanded.css("display","none");
        //    }
        //}
        var parnext = $(this).parent().next();
        console.log(parnext);
        parnext.slideDown();
        $(this).find('i').text('arrow_drop_up');
    }
    else{
        $(this).find('i').text('arrow_drop_down');
    }
    $(this).next().toggleClass('open');
    console.log($(this).text());
    //console.log(hey);
    //$(hey).style.display = "inline";
});

//(function($) {
//    var dropdown = $('.dropdown');

    // Add slidedown animation to dropdown
$(".parent").on('show.bs.dropdown', function(e){
    console.log("show.bs");
    $(this).find('.lvl1').first().stop(true, true).slideDown();
}).on('hide.bs.dropdown', function(e){
    console.log("hide.bs");
    $(this).find('.lvl1').first().stop(true, true).slideUp();
});
//})(jQuery);
//
//
//
//(function(removeClass) {
//
//    jQuery.fn.removeClass = function( value ) {
//        if ( value && typeof value.test === "function" ) {
//            for ( var i = 0, l = this.length; i < l; i++ ) {
//                var elem = this[i];
//                if ( elem.nodeType === 1 && elem.className ) {
//                    var classNames = elem.className.split( /\s+/ );
//
//                    for ( var n = classNames.length; n--; ) {
//                        if ( value.test(classNames[n]) ) {
//                            classNames.splice(n, 1);
//                        }
//                    }
//                    elem.className = jQuery.trim( classNames.join(" ") );
//                }
//            }
//        } else {
//            removeClass.call(this, value);
//        }
//        return this;
//    }
//
//})(jQuery.fn.removeClass);