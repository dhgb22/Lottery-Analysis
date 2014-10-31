// Most Frequent Numbers Pattern

function showNumFrequency(){
    $("#chart").empty();
    $(".featurette-head").text('Most Frequent Numbers');
    $(".well").text('On this page, you will find an analysis of the most frequently winning SuperLotto Plus numbers. Some players believe the optimal approach to choosing winning numbers is to keep playing the numbers that appear the most.');
    $.get("/mostFreqNum", function(resultData)
        {
          console.log(resultData);
          var json = resultData;
          
          var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left    - margin.right,
            height = 500 - margin.top - margin.bottom;
          
          var results,data = [],chart,bars;
       
            results = d3.map( json );
            results.forEach( function( key, val ) {
                var result = {};
                result.num = parseInt( val.num);
                result.frequency = parseInt( val.frequency);
                data.push( result );
            } );
            
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .1).domain(json.map(function(d) { return d.num; }));
          
            var y = d3.scale.linear().range([height, 0]).domain([120, d3.max(json, function(d) { return d.frequency; })]);
            
            var tip = d3.tip().attr('class','d3-tip').offset([-10, 0])
                    .html(function(d) {
                        return "<strong>Frequency:</strong> <span style='color:black'>" + d.frequency + "</span>";
            })
          
            //var y = d3.scale.linear().range([height, 0]).domain(d3.extent(data, function(d) { return d.frequency; }));
            
            
          
            chart = d3.select("#chart").append( 'svg' )
                  .attr( 'class', 'chart' )
                  .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                  .append('g')
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                  
            chart.call(tip);
            
            chart.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.num); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.frequency); })
              .attr("height", function(d) { return height - y(d.frequency); })
              .on('mouseover', tip.show)
                .on('mouseout', tip.hide)


          
          
          
          var xAxis = d3.svg.axis().scale(x).orient("bottom");
          var yAxis = d3.svg.axis().scale(y).orient("left");

            chart.append('g').attr('class', 'x axis').attr("transform", "translate(0," + height + ")").call(xAxis);
            
            

            chart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");
            
        });
}


// Low/High Number Frequent Numbers Pattern

function showLowestFrequency()
  {
    $("#chart").empty();
    var data = "<span><div style='float:left' id='lowRange'></div>";
    $("#chart").append(data);
    $("#chart").append("<div style='float:right' id='highRange'></div></span>");
     $(".featurette-head").text('Low & High Numbers');
     $(".well").text("Following graph displays the counts of highest and lowest numbers in all the draws till date.");
    $.get("/lowestNumFreq", function(movieList)
    {
    
      console.log(movieList);
      var json = movieList;
      
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
      
      var results,data = [],chart,bars;
   
        results = d3.map( json );
        results.forEach( function( key, val ) {
            var result = {};
            result.num1 = parseInt( val.num1);
            result.cnt = parseInt( val.cnt);
            data.push( result );
        } );
        
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1).domain(json.map(function(d) { return d.num1; }));
        var y = d3.scale.linear().range([height, 0]).domain([0, d3.max(json, function(d) { return d.cnt; })]);
      
        chart = d3.select( "#lowRange").append( 'svg' )
              .attr( 'class', 'chart' )
              .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
              .append('g')
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        

 
        chart.selectAll(".yellow-bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "yellow-bar")
          .attr("x", function(d) { return x(d.num1); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.cnt); })
          .attr("height", function(d) { return height - y(d.cnt); })
        .append("title").text(function(d) { return d.cnt; });
        
         chart.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("font-weight",'bold')
        .text("Lowest Number Frequency");


      
      
      
      var xAxis = d3.svg.axis().scale(x).orient("bottom");

        chart.append('g').attr('class', 'x axis').attr("transform", "translate(0," + height + ")").call(xAxis);
                
        var yAxis = d3.svg.axis().scale(y).orient("left");
        

        chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
        
    });
    
    // High Numbers
    
    $.get("/highestNumFreq", function(numList)
    {
    
      console.log(numList);
      var json = numList;
      
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
      
      var results,data = [],chart,bars;
   
        results = d3.map( json );
        results.forEach( function( key, val ) {
            var result = {};
            result.num5 = parseInt( val.num5);
            result.cnt = parseInt( val.cnt);
            data.push( result );
        } );
        
        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1).domain(json.map(function(d) { return d.num5; }));
        var y = d3.scale.linear().range([height, 0]).domain([0, d3.max(json, function(d) { return d.cnt; })]);
      
        chart = d3.select( "#highRange").append( 'svg' )
              .attr( 'class', 'chart' )
              .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
              .append('g')
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        

 
        chart.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.num5); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.cnt); })
          .attr("height", function(d) { return height - y(d.cnt); })
        .append("title").text(function(d) { return d.cnt; });
        
        chart.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("font-weight",'bold')
        .text("Highest Number Frequency");


      
      
      
        var xAxis = d3.svg.axis().scale(x).orient("bottom");

        chart.append('g').attr('class', 'x axis').attr("transform", "translate(0," + height + ")").call(xAxis);
                
        var yAxis = d3.svg.axis().scale(y).orient("left");
        

       chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
        
    });
    
  }
  
  
  
// showAverageDays between Win Nums


function showAverageDaysForWinNum()
  {
    $("#chart").empty();
      $(".featurette-head").text('Average No Of Draws Between Wins');
      $(".well").text('On this page, you will find average number of draws takes for a number to come again in the draw after its last occurrence. General perspective shows that when a number has not come for long time, its chances of occurring in the draw increases significantly. We call this an overdue number. By using this analysis, you can choose best overdue number which can increases your odds of winning significantly.');
    $.get("/avgDaysForWinNum", function(resultData)
     {
      
      var results,data = [];
      
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
      
      results = d3.map( resultData );
        results.forEach( function( key, val ) {
            var result = {};
            result.key = parseInt( val.key);
            result.avg = Math.round(parseInt( val.days)/parseInt(val.cnt));
            data.push( result );
        } );


      var x = d3.scale.linear().range([0, width]);
      
      var y = d3.scale.linear().range([height, 0]);

      var xAxis = d3.svg.axis().scale(x).orient("bottom");

      var yAxis = d3.svg.axis().scale(y).orient("left");

      var line = d3.svg.line().x(function(d) { return x(d.key); }).y(function(d) { return y(d.avg); });

      var svg = d3.select("#chart").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    

      x.domain(d3.extent(data, function(d) { return d.key; }));
      
     //x.domain(data.map(function(d) { return d.key; }));
      
      
        //var x = d3.scale.ordinal().rangeRoundBands([0, width], .1).domain(json.map(function(d) { return d.num; }));

      
      y.domain(d3.extent(data, function(d) { return d.avg; }));

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Average Days Between Wins");

      svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line);
      
     });
  }






  

// Create Row Difference Table
  
function row_diff_table()
{

    $(".featurette-head").text('Row Differences');
    $(".well").text('On this page , you will find analysis of occurring difference between consecutive draw. As odds of winning the entire jackpot are astronomically small, but a good analysis might increases chance of winning. By knowing most frequent occurring difference between draws, one can choose his number which has more chance of winning after respective draw.');
  var data= "<div class='panel panel-default'><table class='table'>"+
                      "<tr style='color:#285e8e;font-weight:bold;background-color:#99DBEE'><td>Draw Date</td><td> Number1</td><td>Number2</td><td>Number3</td><td>Number4</td><td>Number5</td></tr>";

  $.get("/get_row_difference", function(json){
   // var json = JSON.parse(rows);
  console.log("length " + json.length);
                       for(var i = 0; i<json.length ; i ++){ 
                       data=data+"<tr style='color:#39b3d7'><td>"+json[i].date+"</td><td>"+json[i].col1+"</td>"+"<td>"+json[i].col2+"</td><td>"+json[i].col3+"</td><td>"+json[i].col4+"</td><td>"+json[i].col5+"</td></tr>";
                       } 

                    data=data+"</table></div>";
    $("#chart").empty();
    $("#chart").append(data)        
    

    
  });
      
}


// Show Frequent Pairs

function showDuo(){
		$("#chart").empty();
        $(".featurette-head").text('Winning Pairs Analysis');
        $(".well").text('On this page, you will find an analysis of the pairs of numbers that win together frequently. While the odds of winning the entire jackpot are astronomically small, a player may still win money from getting a partial match. As such, some players believe a "small win" approach is possible by playing numbers that seem to have frequent, winning relationships.');
       	$.get('/duos',function(data)
        {
            var margin = { top: 50, right: 0, bottom: 100, left: 30 },
                            width = 960 - margin.left - margin.right,
                            height = 1100 - margin.top - margin.bottom,
       gridSize = Math.floor(width / 47),
       legendElementWidth = gridSize*2,
       buckets = 9,
       colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
       days = ["1", "2", "3", "4", "5", "6", "7","8","9","10","11","12","13","14","15","16","17","18","19", "20", "21", "22", "23", "24", "25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47"],
       times = ["1", "2", "3", "4", "5", "6", "7","8","9","10","11","12","13","14","15","16","17","18","19", "20", "21", "22", "23", "24", "25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47"];
		 
		 console.log("Width_______"+width);
		 console.log(gridSize);
		
		 
		var colorScale = d3.scale.quantile()
      .domain([0, buckets - 1, d3.max(data, function (d) { return d.count; })])
      .range(colors);

  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var dayLabels = svg.selectAll(".dayLabel")
      .data(days)
      .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });
  
  var timeLabels = svg.selectAll(".timeLabel")
  .data(times)
  .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

	var heatMap = svg.selectAll(".num1")
  .data(data)
  .enter().append("rect")
  .attr("x", function(d) { return (d.num1 - 1) * gridSize; })
  .attr("y", function(d) { return (d.num2 - 1) * gridSize; })
  .attr("rx", 4)
  .attr("ry", 4)
  .attr("class", "hour bordered")
  .attr("width", gridSize)
  .attr("height", gridSize)
  .style("fill", colors[0]);
	
	 heatMap.transition().duration(1000)
   .style("fill", function(d) { return colorScale(d.count); });

heatMap.append("title").text(function(d) { return " "+d.num1+","+d.num2; });

var legend = svg.selectAll(".legend")
.data([0].concat(colorScale.quantiles()), function(d) { return d; })
.enter().append("g")
.attr("class", "legend");

legend.append("rect")
.attr("x", function(d, i) { return legendElementWidth * i; })
.attr("y", height)
.attr("width", legendElementWidth)
.attr("height", gridSize / 2)
.style("fill", function(d, i) { return colors[i]; });

legend.append("text")
.attr("class", "mono")
.text(function(d) { return ">= " + Math.round(d); })
.attr("x", function(d, i) { return legendElementWidth * i; })
.attr("y", height + gridSize);

		});

	}



// Show Trio Table

function showTriosTable(){
       $(".featurette-head").text('Winning Triples');
       $(".well").text('On this page, you will find an analysis of the triples of numbers that win together frequently. While the odds of winning the entire jackpot are astronomically small, a player may still win money from getting a partial match. As such, some players believe a "small win" approach is possible by playing numbers that seem to have frequent, winning relationships.');
	var data= "<div class='panel panel-default'><table class='table'>";
$.get("/gettrios_table", function(rows){

     for(var i = 0; i<rows.length ; i ++){ 
    
      var numStr = rows[i].tupple.substring(1, rows[i].tupple.length-1);
        var numArray = numStr.split(',');
        data=data+"<tr style='color:#39b3d7'><td ><div class='testball'><h3 class='htag'>";
        if(numArray[0] >9){
            data+=numArray[0];
        }else{
            data+="&nbsp;"+numArray[0];
        }
        
        data+= "</h3><img class='testimg-circle' data-src='holder.js/100x100' src='images/ball.png'></div></td>"+
       "<td ><div class='testball'><h3 class='htag'>";
       if(numArray[1] >9){
            data+=numArray[1];
        }else{
            data+="&nbsp;"+numArray[1];
        }
       data+="</h3><img class='testimg-circle' data-src='holder.js/100x100' src='images/ball.png'></div></td>"+
       "<td ><div class='testball'><h3 class='htag'>"
       if(numArray[2] >9){
            data+=numArray[2];
        }else{
            data+="&nbsp;"+numArray[2];
        }
        var percentage = parseFloat(rows[i].percentage);
       data+="</h3><img class='testimg-circle' data-src='holder.js/100x100' src='images/ball.png'></div></td>"+
       "<td >Appearing together <b>"+percentage.toFixed(2)+"% </b>of the time, the numbers "+numArray[0]+", "+numArray[1]+", and "+numArray[2]+" won <b>"+rows[i].count+" </b>times</td></tr>";
     } 

  data=data+"</table></div>";
$("#chart").empty();
$("#chart").append(data)        



});
}

// Show Repeating Nums

  function showReatingnum()
  {
                  $(".featurette-head").text('Repeating Numbers');
                  $(".well").text('Repetition is an important characteristic to analyze in lottery games. Repetition Pattern Analysis reveals the repetition tendencies of an analyzed lottery - how many numbers in a winning combination were also the winning numbers in previous draws.');
                  var data = {};
                  
                  var ajax_url = "/showReatingnum";   
                  $.ajax({
                      type: "GET",
                      url:ajax_url,
                      data: JSON.stringify(data),
                      contentType: 'application/json',
                             
                      success: function(output_string) 
                      {   
                          /*location.reload();*/
                       //   alert("success");
                          $("#chart").empty();
                          $("#chart").append(output_string);

                      },
                      error: function (error) {
                        alert("error");
                         /**/
                      }
                  });

    }

// Show Consecutive Numbers

function showConsecutiveNum()
  {
            $(".featurette-head").text('Consecutive Numbers');
             $(".well").text('Adjacent Pairs Pattern Analysis gives you the probability that two consecutive numbers will win together in your lottery of choice.');
                  var data = {};
                  
                  var ajax_url = "/showConsecutiveNum";   
                  $.ajax({
                      type: "GET",
                      url:ajax_url,
                      data: JSON.stringify(data),
                      contentType: 'application/json',
                             
                      success: function(output_string) 
                      {   
                          /*location.reload();*/
                        //  alert("success");
                          $("#chart").empty();
                          $("#chart").append(output_string);

                      },
                      error: function (error) {
                        alert("error");
                         /**/
                      }
                  });

    }
    
/**
 * Odd even pattern analysis
 */
   function getOddEven()
   {
     var data='';
     
       $(".featurette-head").text('Odd-Even Pattern Analysis');
       $(".well").text('Odd-Even Pattern Analysis tells what odd-even types of combinations win most frequently and what odd-even types of combinations win most rarely. It can be used to determine which combinations are good to play and which combinations should be avoided.');
       
     $.get('/oddEven',function(odds){
 
          $("#chart").empty();    
       var pie = new d3pie("chart", {
        header: {
		title: {
			
		}
	},
    size: {
		canvasHeight: 600,
		canvasWidth: 700
	},
	data: {
		content: [
			{ label: odds[0].id, value: odds[0].count, color: '#e6211a'},
			{ label:  odds[1].id, value: odds[1].count, color: '#a7211d' },
			{ label:  odds[2].id, value: odds[2].count,color :'#e69595'},
            { label:  odds[3].id, value: odds[3].count,color : '#eb4d48'},
            { label:  odds[4].id, value: odds[4].count, color : '#d43f3a'},
             { label:  odds[5].id, value: odds[5].count, color : '#690400'},
            
		]
	}
    });

             
       
     }) ;

   }





// Display Analysis for user input

function allFuctions(){

    var num1= $("#num1").val();
	var num2= $("#num2").val();
	var num3= $("#num3").val();
	var num4= $("#num4").val();
	var num5= $("#num5").val();
    var meganum = $("#meganum").val();
    $("#alertMsg").show();
    if(num1 == '' || num2 == '' || num3 == '' || num4 == '' || num5 == ''){
        $("#alertMsg").text("Enter All Numbers");
		return false;
	}
	else if(num1 < 1 ||  num1 > 47 || num2 < 1 ||  num2 > 47 || num3 < 1 ||  num3 > 47 || num4 < 1 ||  num4 > 47 || num5 < 1 ||  num5 > 47) {
         $("#alertMsg").text("Numbers should be between 1 and 47");
		return false;
	}
    else if(meganum < 1 || meganum > 27){
          $("#alertMsg").text("Mega Number should be between 1 and 27");
		return false;
    }
    else {
        var arr = [parseInt(num1),parseInt(num2),parseInt(num3),parseInt(num4),parseInt(num5)];
        var uniqueArray = $.unique(arr);
        if(uniqueArray.length < 5)
        {
             $("#alertMsg").text("All numbers should be unique");
            return false;
        }
    }
      $("#alertMsg").hide();
       $("#resultsDiv").show();
       $("body, html").animate({scrollTop :$("#resultsDiv").offset().top},400);
   
    numFreq_userInput();
    duosTable_userInput();
    //triosTable_userInput();
    userOddEven();
    testPattern();
}  

// Display Number Frequency for User Input

function numFreq_userInput(){
    
    $("#freqChart").empty();

     var num1 = $("#num1").val();
    var num2 = $("#num2").val();
    var num3 = $("#num3").val();
    var num4 = $("#num4").val();
    var num5 = $("#num5").val();
    
      $.post("/get_numFreq_userInput", { num1 : num1, num2 : num2 , num3 : num3 , num4 : num4 , num5 : num5 } , function(resultData){
          console.log(resultData);
          var json = resultData;
          
          var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 400 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
          
          var results,data = [],chart,bars;
       
            results = d3.map( json );
            results.forEach( function( key, val ) {
                var result = {};
                result.num = parseInt( val.num);
                result.frequency = parseInt( val.frequency);
                data.push( result );
            } );
            
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .1).domain(json.map(function(d) { return d.num; }));
          
            var y = d3.scale.linear().range([height, 0]).domain([120, d3.max(json, function(d) { return d.frequency; })]);
          
                //var y = d3.scale.linear().range([height, 0]).domain(d3.extent(data, function(d) { return d.frequency; }));
            
            
          
            chart = d3.select("#freqChart").append( 'svg' )
                  .attr( 'class', 'chart' )
                  .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                  .append('g')
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            chart.selectAll(".blue-bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "blue-bar")
              .attr("x", function(d) { return x(d.num); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.frequency); })
              .attr("height", function(d) { return height - y(d.frequency); })
              .append("title").text(function(d) { return d.frequency; });

          
          
          
          var xAxis = d3.svg.axis().scale(x).orient("bottom");
          var yAxis = d3.svg.axis().scale(y).orient("left");

            chart.append('g').attr('class', 'x axis').attr("transform", "translate(0," + height + ")").call(xAxis);
            
            

            chart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");
            
        });
}


// Display Duos for User Input

function duosTable_userInput()
  {

    var num1 = $("#num1").val();
    var num2 = $("#num2").val();
    var num3 = $("#num3").val();
    var num4 = $("#num4").val();
    var num5 = $("#num5").val();

    var data= "<div class='panel panel-default'><table class='table'>"+
                        "<tr style='color:#285e8e;font-weight:bold;background-color:#99DBEE'><td>Number1</td><td>Number2</td><td>Frequency</td></tr>";
  
    $.post("/get_duos_userInput", { num1 : num1, num2 : num2 , num3 : num3 , num4 : num4 , num5 : num5 } , function(rows){
    
                         for(var i = 0; i<rows.length ; i ++){ 
                         data=data+"<tr style='color:#39b3d7'><td>"+rows[i].num1+"</td>"+"<td>"+rows[i].num2+"</td><td>"+rows[i].count+"</td></tr>";
                         } 
  
                      data=data+"</table></div>";

      $("#chart").empty();                 
      $("#chart").append(data)        
      

      
    });
        
  }  
  
  

// Show Trio for user Input
  
function triosTable_userInput()
  {
    
    console.log("Inside Trios");
    var num1 = $("#num1").val();
    var num2 = $("#num2").val();
    var num3 = $("#num3").val();
    var num4 = $("#num4").val();
    var num5 = $("#num5").val();
    

    $.post("/get_trios_userInput", { num1 : num1, num2 : num2 , num3 : num3 , num4 : num4 , num5 : num5 } , function(rows){
                        console.log("Results______"+rows);
                         var data= "<table border='1' style='width:800px'>"+
                        "<tr><td>tupple</td><td>count</td></tr>";
                         for(var i = 0; i<rows.length ; i ++){ 
                         data=data+"<tr><td>"+rows[i].tupple+"</td>"+"</td><td>"+rows[i].count+"</td></tr>";
                         } 
  
                      data=data+"</table>";
      $("#trioTable").empty();
      $("#trioTable").append(data)        
      

      
    });
        
  }  
  
// User input odd-even analysis  

function userOddEven(){

  var num1=$('#num1').val(); 
  var num2=$('#num2').val();
  var num3=$('#num3').val();
  var num4=$('#num4').val();
  var num5=$('#num5').val();
  
  $.post('/userOddEven',{num1:num1,num2:num2,num3:num3,num4:num4,num5:num5},function(rows){
    var percentage = (parseInt(rows[0].count)/parseInt(rows[0].total))*100;
    console.log("Odd even Percentage________"+Math.round(percentage));
    $('#userOddEven').text("Such an odd even combination has occurred "+Math.round(percentage)+ "% in past draws.Odd-Even Pattern Analysis tells what odd-even types of combinations win most frequently and what odd-even types of combinations win most rarely. It can be used to determine which combinations are good to play and which combinations should be avoided.");
     var others =  parseInt(rows[0].total) - parseInt(rows[0].count);
     $("#userOddEvenChart").empty();
    var pie = new d3pie("userOddEvenChart", {
        header: {
		title: {
			
		}
	},
    size: {
		canvasHeight: 500,
		canvasWidth: 500
	},
	data: {
		content: [
			{ label: rows[0].id, value: rows[0].count, color: 'steelblue'},
			{ label: 'Other combinations', value:others, color: '#99DBEE' },
		]
	}
    });
  
  })
  
  
}



function testPattern(){
  var num1=$('#num1').val();
  var num2=$('#num2').val();
  var num3=$('#num3').val();
  var num4=$('#num4').val();
  var num5=$('#num5').val();
  var mega=$('#meganum').val();
  $.post('/userPattern',{num1:num1,num2:num2,num3:num3,num4:num4,num5:num5,mega:mega},function(rows){
    
    var data="<div class='panel panel-default'><table class='table'><tr style='background-color:#ffffff'>"+
                       
						"<th>Date</th><th>Number1</th>"+
						"<th>Number2</th>"+
						"<th>Number3</th>"+
						"<th>Number4</th>"+
						"<th>Number5</th>"+
						"<th>Mega Number</th></tr>";
    
    
    
    for(i=0;i<rows.length;i++){
    
        data=data+"<tr><td>"+rows[i].drawdate+"</td>";
      if(rows[i].num1==num1 || rows[i].num1==num2 || rows[i].num1==num3 || rows[i].num1==num4 || rows[i].num1==num5){
        data=data+"<td style='background-color:#99DBEE;'>"+rows[i].num1+"</td>";

      }
      else{
      data=data+"<td>"+rows[i].num1+"</td>";
      }
      
      if(rows[i].num2==num1 || rows[i].num2==num2 || rows[i].num2==num3 || rows[i].num2==num4 || rows[i].num2==num5){
        data=data+"<td style='background-color:#99DBEE;'>"+rows[i].num2+"</td>";

      }
      else{
      data=data+"<td>"+rows[i].num2+"</td>";
      }
      
      if(rows[i].num3==num1 || rows[i].num3==num2 || rows[i].num3==num3 || rows[i].num3==num4 || rows[i].num3==num5){
        data=data+"<td style='background-color:#99DBEE;'>"+rows[i].num3+"</td>";

      }
      else{
      data=data+"<td>"+rows[i].num3+"</td>";
      }
      
      if(rows[i].num4==num1 || rows[i].num4==num2 || rows[i].num4==num3 || rows[i].num4==num4 || rows[i].num4==num5){
        data=data+"<td style='background-color:#99DBEE;'>"+rows[i].num2+"</td>";

      }
      else{
      data=data+"<td>"+rows[i].num4+"</td>";
      }

      if(rows[i].num5==num1 || rows[i].num5==num2 || rows[i].num5==num3 || rows[i].num5==num4 || rows[i].num5==num5){
        data=data+"<td style='background-color:#99DBEE;'>"+rows[i].num5+"</td>";

      }
      else{
      data=data+"<td>"+rows[i].num5+"</td>";
      }
      
      if(rows[i].meganum==mega){
        data=data+"<td style='background-color:#99DBEE;'>"+rows[i].meganum+"</td></tr>";
      }
      else{
        data=data+"<td>"+rows[i].meganum+"</td></tr>";

      }
     
    }
    data=data+"</table></div>";
    $('#userPattern').empty();
    $('#userPattern').append(data);
  })
}


   
   
$(document).ready(function()
{
  $("#num2,#num3,#num4,#num5,#num1,#meganum").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    
    $("#menuPattern").click(function(){

        $("#menuPattern").addClass("active");
       // $("#menuHome").removeClass("active");
    });
    
    
    
    
});
