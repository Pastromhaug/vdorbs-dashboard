getContent = function(){
    console.log("content");
    var courseName = $(this).find("text").text();
    var url = "https://s3.amazonaws.com/vdorbs-development/MitContent/" + courseName;
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
    $('#home').text(courseName);
    $('#backbutton').css('display','inline');
};

getGraph = function(){
    $('#graphsidebarwrapper').css('display','block');
    $('#graphsidebarnav').css('display','block');
    $('#graphgrid').css('display','block');
    $('#contentsidebarnav').css('display','none');
    $('#contentgrid').css('display','none');
    $('#home').text('Home');
    $('#backbutton').css('display','none');
};