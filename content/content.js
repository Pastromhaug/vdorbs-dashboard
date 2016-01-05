getContent = function(){
    console.log("content");
    var url = "https://s3.amazonaws.com/vdorbs-development/MitContent/" + $(this).find("text").text();
    $.getJSON(url,function(res){
        console.log(res);
        $('#coursesyllabus').html(res['syllabus']);
        $('#coursedescription').html(res['description']);
        $('#coursename').html(res['coursename']);
        $('#courseimage').attr('src', res['image']);

    });
    $('#graphsidebarwrapper').css('display','none');
    $('#graphsidebarnav').css('display','none');
    $('#graphgrid').css('display','none');
    $('#contentsidebarnav').css('display','block');
    $('#contentgrid').css('display','block');
    $('#home').css('display','none');
    $('#backbutton').css('display','inline');
};

getGraph = function(){
    $('#graphsidebarwrapper').css('display','block');
    $('#graphsidebarnav').css('display','block');
    $('#graphgrid').css('display','block');
    $('#contentsidebarnav').css('display','none');
    $('#contentgrid').css('display','none');
    $('#home').css('display','inline');
    $('#backbutton').css('display','none');
};