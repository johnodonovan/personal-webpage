/*
*
*  Parser for PSL output to D3 Venn Diagrams
*  @johnodonovan
*  May 3 2018
*/
//var test="test";
//var obj = jQuery.parseJSON( '{ "name": "John" }' );
//alert( obj.name === "John" );

//var text = '{ "name":"John", "age":"39", "city":"New York"}';
var data = jQuery.parseJSON('{"name":"Interpol","children":[{"name":"People who listen to this artist also listen","children":[{"name":"The National"},{"name":"Radiohead"},{"name":"Guns and Roses"}]},{"name":"Popular artist","children":[{"name":"RadioHead"},{"name":"The Beatles"},{"name":"Queen"},{"name":"The Pogues"}]},{"name":"Similar to the artists","children":[{"name":"The National"},{"name":"Radiohead"},{"name":"Metallica"},{"name":"The Pogues"},{"name":"Nine Inch Nails"}]}]}');


// iterate over the tree and get the child nodes

function getNodeByName(name, node){
    var reduce = [].reduce;
    function runner(result, node){
        if(result || !node) return result;
        return node.name === name && node || //is this the proper node?
            runner(null, node.children) || //process this nodes children
            reduce.call(Object(node), runner, result);  //maybe this is some ArrayLike Structure
    }
    return runner(null, node);
}


var d = ["pop","cf","co","pop+cf","pop+co","cf+co","cf+co+pop"];

//var target = getNodeByName("Popular artist", data);
var cf = data.children[0]
var pop = data.children[1]
var co = data.children[2]

var center = getCenterOverlap(cf, pop, co);
//alert("center is: " + center);



var cocf = getOverlap(cf, co);
var popco = getOverlap(pop, co);
var popcf = getOverlap(cf, pop);




function getOverlap(a,b){

var overlap = "";
for (var i = 0; i < a.children.length; i++) {
    if(a.children[i].name.toLowerCase().trim() !=center.toLowerCase().trim()){   //don't want center artist 
            for (var j = 0; j < b.children.length; j++) {
                //alert("a: " + a.children[i].name + "b: " + b.children[j].name);
              if(a.children[i].name.toLowerCase().trim()==b.children[j].name.toLowerCase().trim()){
                overlap = overlap + ", " + a.children[i].name;
                }
            }
           // alert("child name is: " + tableChild.children[0].name);
        }
//alert("overlap is: " + overlap );
    }
return overlap.substring(2, overlap.length);


}



function getCenterOverlap(a,b,c){

var overlap = "";
for (var i = 0; i < a.children.length; i++){
            for (var j = 0; j < b.children.length; j++) {
                for (var k = 0; k < c.children.length; k++) {
                        //alert("a: " + a.children[i].name + ", b: " + b.children[j].name + ", c: " + c.children[k].name);
                      if(a.children[i].name.toLowerCase().trim()==b.children[j].name.toLowerCase().trim() && b.children[j].name.toLowerCase().trim()==c.children[k].name.toLowerCase().trim()){
                        overlap = overlap + ", " + a.children[i].name;
                        }
                    }    
            }
   // alert("child name is: " + tableChild.children[0].name);
}
//alert("overlap is: " + overlap );
return overlap.substring(2, overlap.length);


}

function stringify(a){
    var s = "";
    for(var i = 0; i<a.children.length; i++){
        if(!isOverlap(a.children[i].name)){
        s = s + a.children[i].name + ","
        }
    }
    return s.substring(0, s.length-1);
}


function isOverlap(a){
    if(a.toLowerCase()==center.toLowerCase())
        return true;
    if(a.toLowerCase()==cocf.toLowerCase())
        return true;
    if(a.toLowerCase()==popco.toLowerCase())
        return true;
    if(a.toLowerCase()==popcf.toLowerCase())
        return true;
}

var sets = [
            {sets:["Most Popular Artists"], size: 12, label: stringify(pop)},
            {sets:["Artists your neigbors like"], size: 12, label:  stringify(cf)},
            {sets:["Similar to artists in your profile"], size: 12, label: stringify(co)},
            {sets: ["Most Popular Artists", "Artists your neigbors like"], size: 4, label: popcf},
            {sets: ["Most Popular Artists", "Similar to artists in your profile"], size: 4, label: popco, },
            {sets: ["Artists your neigbors like", "Similar to artists in your profile"], size: 4, label: cocf},
            {sets: ["Most Popular Artists", "Artists your neigbors like", "Similar to artists in your profile"], size: 2, label: center}
    ];


function getSets()
    {
    return this.sets;
    }

