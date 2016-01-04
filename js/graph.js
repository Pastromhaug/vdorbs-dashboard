var color = d3.scale.category20();        // Array of colors
for (var i = 1; i < 21; i++){
    console.log(color(i));
}
var svgheight = $("#graphsvg").height();  // Set svg container height
var svgwidth = $("#graphsvg").width();    // Set svg container width

var force = cola.d3adaptor()
    .size([svgwidth, svgheight])          // Match dimensions with svg container dimensions
    .symmetricDiffLinkLengths(30);

var edges,nodes,svg;

svg = d3.select("#graphsvg")                // d3 svg container selector
    .call(d3.behavior.zoom().scaleExtent([0.25, 10]).on("zoom", zoom))
    .append("g")
    .attr("w", svgwidth)
    .attr("h", svgheight);

d3.select("svg").on("dblclick.zoom", null);

svg
    .append("defs")                         // Add svg defs for arrowheads
    .append("marker")
    .attr("id", "arrowhead")                // Arrowhead object
    .attr("markerWidth", 40)                // Arrowhead dimensions
    .attr("markerHeight", 40)
    .attr("refX", 41)                       // 18 px x-coord offset
    .attr("refY", 4)                        // 4 px y-coord offset
    .attr("orient", "auto")                 // Facing along direction of link which marker is attached to
    .append("path")                         // svg path
    .attr("d", "M0,0 L0,8 L10,4");          // from (0, 0) to (0, 8) to (10, 4)

//s3graph('Subjects/Electrical Engineering and Computer Science');
s3graph('wholegraph');
function s3graph(graphname){
    var url = "https://s3.amazonaws.com/vdorbs-development/Graphs/" + graphname;
    $.getJSON(url,function(res){
        drawgraph(res.nodes, res.links);
    });
}

function drawgraph(nodedata,links) {
    force
        .nodes(nodedata)                      // Set nodes to nodesobj json
        .links(links)                        // Set links to arrows json
        .start(50, 20, 10)                      // Kickoff rendering
        .start();

    edges = svg
        .selectAll("line")                      // Add lines as svg children
        .data(links)                           // Attach arrows data to lines
        .enter()
        .append("line")                         // Append lines
        .attr("class", "edge")                  // Add edge class to lines
        .attr("marker-end", "url(#arrowhead)"); // Add arrowhead marker to lines

    nodes = svg
        .selectAll("g")                         // Add svg groups as svg children
        .data(nodedata)                         // Attach nodesobj data to groups
        .enter()
        .append("g")                            // Append groups
        .attr("class", "node")                   // Add node class to groups
        .on("mouseover", show_name)             // Callbacks on events
        .on("mouseout", hide_name)
        .on("dblclick", filtercourse)
        .call(force.drag);                      // Enable graph dragging

    var keys = nodedata.map(function (d) {
        return d.name
    });

    nodes
        .append("circle")                       // Append circle to node group
        .attr("stroke", function (d) {
            return color(parseInt(nodedata[keys.indexOf(d.name)].coursenum.split('.')[0]))
        })
        .attr("fill", function (d) {
            return color(parseInt(nodedata[keys.indexOf(d.name)].coursenum.split('.')[0]))
        })
        .attr("r", function(d) {
            return calcRadius(d);
        }); // Color based on subject

    function calcRadius(d){
        return nodedata[keys.indexOf(d.name)].outedges*2  + 20;
    }

    nodes.append("text")                      // Append text to node group
        .attr("dx", 10)                         // Offset horizontally by 10 px
        .attr("opacity", 0)                     // Text transparent by default
        .text(function (d) {
            return d.name;
        });  // Map node name to text

    force.on("tick", function () {            // On each simulation tick
        edges                                   // Draw line from source node to target node
            .attr("x1", function (d) {return d.source.x})
            .attr("y1", function (d) {return d.source.y})
            .attr("x2", function (d) {return d.target.x})
            .attr("y2", function (d) {return d.target.y});

        nodes                                   // Draw node at (x, y) coords
            .attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")"});
    });
}



function zoom() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}




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

function removegraph(){
    edges = edges.data([]);
    edges.exit().remove();
    nodes = nodes.data([]);
    nodes.exit().remove();
}

filtersubject = function(key){
    var graphname = 'Subjects/' +subjectmap[key];
    console.log(graphname);
    removegraph();
    s3graph(graphname);
};

filtercourse = function(){
    var coursename = $(this).find("text").text();
    var graphname = 'Courses/'+ coursename;
    console.log(graphname);
    removegraph();
    s3graph(graphname);
};

showwholegraph = function(){
    edges = edges.data([]);
    edges.exit().remove();
    nodes = nodes.data([]);
    nodes.exit().remove();
    s3graph('wholegraph')
};

$("#left-sidebar-wrapper").on("swipeleft",  function(){
    $("#left-sidebar-wrapper").toggleClass("active");
    console.log("swipeleft");
});

//  shows node name
function show_name() {
    d3.select(this).select("text").style("opacity", 1);
}

// hides node name
function hide_name() {
    d3.select(this).select("text").style("opacity", 0);
}
