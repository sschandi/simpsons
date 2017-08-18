$(document).ready(function() {
    
    var randOrder = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42];
    var randIndex = 0;
    var colors = ['#1abc9c','#2ecc71','#9b59b6','#34495e','#f1c40f','#e67e22','#e74c3c','#95a5a6','#bdc3c7','#3498db','#16a085','#27ae60','#2980b9','#8e44ad','#2c3e50','#f39c12','#d35400','#c0392b', '#7f8c8d'];
    var colorIndex =0;
    
    shuffle(randOrder);
    shuffle(colors);
    console.log(randOrder);
    function shuffle (array) {
          var i = 0
            , j = 0
            , temp = null
        
          for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
          }
        }
    $("#getMessage").on("click", function(){
      $.getJSON("/json/quotes.json", function(json) {
       
        var html = "";
        var randID = Math.floor(Math.random() * (42 - 0 + 1)) + 0;
        
        var color ="";
        
        
        // Only change code below this line.
        json = json.filter(function(val) {
            if(randOrder[randIndex]<randOrder.length){
                return (val.id === randOrder[randIndex]);
            }
            else{
                randIndex=0;
                return (val.id === randOrder[randIndex]);
            }
        });
        
        randIndex = randIndex+1;
        
        json.forEach(function(val) {
          var keys = Object.keys(val);
          html += "<div class = 'animated fadeIn'>";
          keys.forEach(function(key) {
             if (key=="id"){
                 //do nothing, so we dont display the id.
             }
            else if (key=="quote"){
                html += "<h1>\"" + val[key] + "\"</h1>";
            }
            else{
                html += "<h3 class='text-right'> - " + val[key] + "</h3>";
            }
          });
          html += "</div><br>";
          if(colorIndex<colors.length){
              color = colors[colorIndex];
          }
          else{
              colorIndex = 0;
              color = colors[colorIndex];
          }
          //color = colors[Math.floor(Math.random() * ((colors.length-1) - 0 + 1)) + 0];
        });
        // Only change code above this line.
        
        $("body").css("background-color", color);
        $(".btn").css("background-color", color);
        $(".message").html(html);
        
        colorIndex++;
        
       });
    });
  });