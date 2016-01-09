/**
 * Created by perandre on 1/6/16.
 */


$("svg").on("dblclick.zoom", null);
var subjectmap = {
    '1': 'Civil and Environmental Engineering',
    '2': 'Mechanical Engineering',
    '3': 'Materials Science and Engineering',
    '4': 'Architecture',
    '5': 'Chemistry',
    '6': 'Electrical Engineering and Computer Science',
    '7': 'Biology',
    '8': 'Physics',
    '9': 'Brain and Cognitive Sciences',
    '10': 'Chemical Engineering',
    '11': 'Urban Studies and Planning',
    '12': 'Earth, Atmospheric, and Planetary Sciences',
    '14': 'Economics',
    '15': 'Management',
    '16': 'Aeronautics and Astronautics',
    '17': 'Political Science',
    '18': 'Mathematics',
    '20': 'Biological Engineering'
};

$('#graphsvg').html('');
var url = "https://s3.amazonaws.com/vdorbs-development/SvgGraphs/wholegraph";
$.get(url,function(svg_content){
    $('#graphsvg').html(svg_content)
        .height = document.documentElement.clientHeight - $('#header').height() - 32;
    addNodeEvents()
});

function filterSubject(key){
    var graphname = 'Subjects/' +subjectmap[key];
    $('#graphsvg').html('');
    var url = "https://s3.amazonaws.com/vdorbs-development/SvgGraphs/" + graphname;
    $.getJSON(url,function(svg_content){
        $('#graphsvg').html(svg_content)
            .height = document.documentElement.clientHeight - $('#header').height() - 32;
        addNodeEvents()
    });
}

function addNodeEvents() {
    var nodes = document.getElementsByClassName('node');
    var numnodes = nodes.length;
    for (var i = 0; i < numnodes; i++) {
        nodes[i].addEventListener('dblclick', getContent);
    }
}
//$('.node').on("dblclick", getContent);

getContent = function(){
    console.log("in getContent");
    var courseName = $(this).find("text").text();
    var url = "https://s3.amazonaws.com/vdorbs-development/MitContent/" + courseName;
    $.getJSON(url,function(res){
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