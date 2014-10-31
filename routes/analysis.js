
var dbconn = require('../model/dbconnection');
var fs  = require("fs");
var mysql=require('mysql');



/*var getduos = function(req , res){
	console.log("in the get duos of analysis");
	dbconn.getduos(function(err , rows){
		console.log("length " + rows.length);
		res.send(rows);
	})
}*/

/*var getduos_table = function(req , res){
	console.log("in the get duos of analysis");
	dbconn.getduos_table(function(err , rows){
		console.log("length " + rows.length);
		res.send(rows);
	})
}*/




/*var insert_row_difference = function(req , res){
	dbconn.get_row_difference(function(diff1,diff2,diff3,diff4,diff5){
		for(var i = 0 ; i < diff1.length ; i++){
			var query1 = "insert into row_differences (col1 , col2 , col3 , col4 , col5) values ("+diff1[i]+","+diff2[i]+","+diff3[i]+","+diff4[i]+","+diff5[i]+")"
		 connection.query(query1 , function(err){
			 if(err){
				 console.log("error in inserting difference");
			 }
		 }) 
			console.log("diff1 "+diff1[i]+" diff2 "+diff2[i]+" diff3 "+diff3[i]+" diff4 "+diff4[i]);
		}
		
	})
}*/

var insert_row_difference = function(req , res){
	dbconn.create_row_difference(function(diff1,diff2,diff3,diff4,diff5,date){
		var query = "insert into row_differences (col1 , col2 , col3 , col4 , col5 , date) values ";
		for(var i = 0 ; i < diff1.length ; i++){
		query += "("+diff1[i]+","+diff2[i]+","+diff3[i]+","+diff4[i]+","+diff5[i]+",'"+date[i]+"'),";	
		 
			//console.log("diff1 "+diff1[i]+" diff2 "+diff2[i]+" diff3 "+diff3[i]+" diff4 "+diff4[i]+" date " + date[i]);
		}
		
		var length = query.length;
		query = query.substring(0 , length - 1);
		console.log(query);
		dbconn.query(query , function(err){
			 if(err){
				 console.log(err);
				 console.log("error in inserting difference");
			 }
		 }) 
	})
}

var get_row_difference = function(req , res){
	console.log("in the get duos of analysis");
	dbconn.get_row_difference_fromTable(function(err , rows){
		console.log("length " + rows.length);
		res.send(rows);
	})
}



var get_duos_userInput = function(req , res){
	
	var num1 = req.param("num1");
    var num2 = req.param("num2");
	var num3 = req.param("num3");
	var num4 = req.param("num4");
	var num5 = req.param("num5");
		
	console.log("num1 " + num1);
	dbconn.get_duos_userInput(function(err , rows){
		res.send(rows);
	},num1,num2,num3,num4,num5)
}

var get_trios_userInput = function(req , res){
	
	var num1 = req.param("num1");
    var num2 = req.param("num2");
	var num3 = req.param("num3");
	var num4 = req.param("num4");
	var num5 = req.param("num5");
		
	//console.log("num1 " + num1);
	dbconn.get_trios_userInput(function(err , rows){
		res.send(rows);
	},num1,num2,num3,num4,num5)
}

var patterns = function(req , res){
	res.render('pattern.ejs')
}

var analysis = function(req , res){
	res.render('analysis.ejs');
}

exports.duos=function(req,res){
	dbconn.getduos(function(err,rows){
		if(!err){
			console.log("in db conn duos " + rows);
			res.send(rows);
		}else{
			console.log("e" + err);
		}
	})
}


exports.showReatingnum = function(req, res){
	console.log("inside showInorder")
	var checkarray = new Array();
	var match;
	console.log("inside show graph");
	dbconn.getFirst100data(function(err,rows){
			console.log("Data length : "+ rows.length);

			var result = "<div class='panel panel-default'><table width='80%' class='table'>"+
					"<tr style='background-color:#A1F382'>"+
                        "<th>Date</th>"+
						"<th>Number1</th>"+
						"<th>Number2</th>"+
						"<th>Number3</th>"+
						"<th>Number4</th>"+
						"<th>Number5</th>"+
						"<th>Mega Number</th>"+
						
				"</tr>";
			for(var i = 0;i < rows.length;i++){
				result += "<tr> " ;
                        result += "<td>"+rows[i].drawdate+"</td>";
						match = compare(rows[i].num1,rows[i-1],rows[i+1]);
						if (match ==true) {
							result += "<td class='matchcase'>"+rows[i].num1+"</td>";
						}else{
							result += "<td>"+rows[i].num1+"</td>";
						};
						/*num2*/
						match = compare(rows[i].num2,rows[i-1],rows[i+1]);
						if (match ==true) {
							result += "<td class='matchcase'>"+rows[i].num2+"</td>";
						}else{
							result += "<td>"+rows[i].num2+"</td>";
						};
						//num3
						match = compare(rows[i].num3,rows[i-1],rows[i+1]);
						if (match ==true) {
							result += "<td class='matchcase'>"+rows[i].num3+"</td>";
						}else{
							result += "<td>"+rows[i].num3+"</td>";
						};
						//num4
						match = compare(rows[i].num4,rows[i-1],rows[i+1]);
						if (match ==true) {
							result += "<td class='matchcase'>"+rows[i].num4+"</td>";
						}else{
							result += "<td>"+rows[i].num4+"</td>";
						};
						//num5
						match = compare(rows[i].num5,rows[i-1],rows[i+1]);
						if (match ==true) {
							result += "<td class='matchcase'>"+rows[i].num5+"</td>";
						}else{
							result += "<td>"+rows[i].num5+"</td>";
						};
						//mega
						match = compare(rows[i].meganum,rows[i-1],rows[i+1]);
						if (match ==true) {
							result += "<td class='matchcase'>"+rows[i].meganum+"</td>";
						}else{
							result += "<td>"+rows[i].meganum+"</td>";
						};
					
				
					
				result += "</tr> ";
			}
			result+= "</table></div>";
			//console.log("got table : "+ result)
		  res.send(result);
	});
};


exports.showConsecutiveNum = function(req, res){
	console.log("inside showConsecutiveNum")
	var checkarray = new Array();
	var match;
	console.log("inside show graph");
	dbconn.getFirst100data(function(err,rows){
			console.log("Data length : "+ rows.length);

			var result = "<div class='panel panel-default'><table width='80%' class='table'>"+
					"<tr style='background-color:#F5E89E'>"+
                        "<th>Date</th>"+
						"<th>Number1</th>"+
						"<th>Number2</th>"+
						"<th>Number3</th>"+
						"<th>Number4</th>"+
						"<th>Number5</th>"+
						"<th>Mega Number</th>"+
						
				"</tr>";
			for(var i = 0;i < rows.length;i++){
				result += "<tr> " ;
                        result += "<td>"+rows[i].drawdate+"</td>";
						match = compareOrder(rows[i].num1,rows[i].num2,rows[i].num2);
						if (match ==true) {
							result += "<td class='consecutive'>"+rows[i].num1+"</td>";
						}else{
							result += "<td>"+rows[i].num1+"</td>";
						};
						/*num2*/
						match = compareOrder(rows[i].num2,rows[i].num1,rows[i].num3);
						if (match ==true) {
							result += "<td class='consecutive'>"+rows[i].num2+"</td>";
						}else{
							result += "<td>"+rows[i].num2+"</td>";
						};
						//num3
						match = compareOrder(rows[i].num3,rows[i].num2,rows[i].num4);
						if (match ==true) {
							result += "<td class='consecutive'>"+rows[i].num3+"</td>";
						}else{
							result += "<td>"+rows[i].num3+"</td>";
						};
						//num4
						match = compareOrder(rows[i].num4,rows[i].num3,rows[i].num5);
						if (match ==true) {
							result += "<td class='consecutive'>"+rows[i].num4+"</td>";
						}else{
							result += "<td>"+rows[i].num4+"</td>";
						};
						//num5
						match = compareOrder(rows[i].num5,rows[i].num4,rows[i].meganum);
						if (match ==true) {
							result += "<td class='consecutive'>"+rows[i].num5+"</td>";
						}else{
							result += "<td>"+rows[i].num5+"</td>";
						};
						//mega
						match = compareOrder(rows[i].meganum,rows[i].num5,rows[i].num5);
						if (match ==true) {
							result += "<td class='consecutive'>"+rows[i].meganum+"</td>";
						}else{
							result += "<td>"+rows[i].meganum+"</td>";
						};
					
				
					
				result += "</tr> ";
			}
			result+= "</table></div>";
			//console.log("got table : "+ result)
		  res.send(result);
	});

	//res.send(result);
};

//Jinali
exports.calcAvgWinDays = function(req,res)
{
	dbconn.getAllNums(function(rows){
		var dataMap = {};
		
		var key;
		var x;
		for(var i=0;i<rows.length;i++)
		{			
			dataMap = createRecord(dataMap,rows[i],rows[i].num1);
			dataMap = createRecord(dataMap,rows[i],rows[i].num2);
			dataMap = createRecord(dataMap,rows[i],rows[i].num3);
			dataMap = createRecord(dataMap,rows[i],rows[i].num4);
			dataMap = createRecord(dataMap,rows[i],rows[i].num5);
		}
		console.log(dataMap);
		res.send(dataMap);
	});	
}

function createRecord(dataMap,currRow,key){
	
	var record;
	record = dataMap[key];
	if(typeof record != "undefined"){
		record.cnt++
		var diff = parseInt(record.id) - parseInt(currRow.drawId) - 1;
		record.id = currRow.drawId;
		record.days =  parseInt(record.days) +  parseInt(diff);
	}
	else{
		
		dataMap[key] =  { key : key,days : 0,cnt : 0,id:currRow.drawId};
	}
	return dataMap;
} 

exports.getMostFreqNums = function(req,res){
	dbconn.getMostFreqNums(function(err,rows){
		res.send(rows);
	});
};




function compareOrder(num,num1,num2){
	if(num-1 == num1 || num+1 == num2){
		return true;
	}else{
		return false;
	}
}

function compare(num,row1,row2){
	if(typeof row1 == 'undefined'){
		if(num == row2.num1 ||
		num == row2.num2  ||
		num == row2.num3  ||
		num == row2.num4 ||
		num == row2.num5 ||
		num == row2.meganum ){
		return true;
		}else{
			return false;
		}
	}else if(typeof row2 == 'undefined'){
		if(num == row1.num1 ||
		num == row1.num2  ||
		num == row1.num3  ||
		num == row1.num4 ||
		num == row1.num5 ||
		num == row1.meganum ){
		return true;
		}else{
			return false;
		}
	}else{
		if(num == row1.num1 || num == row2.num1 ||
		num == row1.num2 || num == row2.num2 ||
		num == row1.num3 || num == row2.num3 ||
		num == row1.num4 || num == row2.num4 ||
		num == row1.num5 || num == row2.num5 ||
		num == row1.meganum || num == row2.meganum ){
		return true;
		}else{
			return false;
		}
	}
	
}

var gettrios_table = function(req , res){
	dbconn.getalltrios(function(err , rows){
		res.send(rows);
	})
}





////////////////megha's part

exports.oddEven=function(req,res){
	
	
	dbconn.getOddEven(function(err,rows){

			if(err){
				console.log(err);
			}
			else{
				console.log(rows);
				/*var data='';
				for(i=0;i<rows.length;i++){
					data=data+";"+rows[i].id+":"+rows[i].count;
				}*/
				res.send(rows);
			}
	});

	
}

/*

exports.duoGraph=function(req,res){
	dbconn.getduos(function(rows){
		res.send(rows);
	})
}
*/

exports.insertOddEven=function(req,res){
	dbconn.oddEven(function(rows){
		var odd=[];
		for(i=0;i<=5;i++){
			odd[i]=0;
			
		}
		for(i=0;i<rows.length;i++){
			

			var oddcount=0;
		if(rows[i].num1%2!=0){
			oddcount++;
			
		}
		if(rows[i].num2%2!=0){
			oddcount++;
			
		}
		if(rows[i].num3%2!=0){
			oddcount++;
			
		}
		if(rows[i].num4%2!=0){
			oddcount++;
			
		}
		if(rows[i].num5%2!=0){
			oddcount++;
			
		}
		odd[oddcount]++;			
		}
		console.log(odd.length);
		console.log("oddss "+odd[0]+" "+odd[1]+" "+odd[2]+" "+odd[3]+" "+odd[4]+" "+odd[5]);
		dbconn.insertOddEven(function(){
			console.log("completed!!")
		},odd);
	});
}



exports.userOddEven=function(req,res){
	console.log("within userOddEven");
	var nums=[];
	nums[1]=req.param('num1');
	nums[2]=req.param('num2');
	nums[3]=req.param('num3');
	nums[4]=req.param('num4');
	nums[5]=req.param('num5');
	var odds=0;
	for(i=1;i<6;i++){
		if(nums[i]%2==0){
			odds++;
		}
	}
	
	dbconn.userOddEven(function(rows){
        console.log(rows);
		res.send(rows);
	},odds);
}


exports.userPattern=function(req,res){
	console.log("within index");
	var nums=[];
	nums[0]=req.param('num1');
	nums[1]=req.param('num2');
	nums[2]=req.param('num3');
	nums[3]=req.param('num4');
	nums[4]=req.param('num5');
	mega=req.param('mega')
	console.log(nums+" in index");
	dbconn.userPattern(function(val){
		/*res.writeHead(200,{'Content-Type':'application/json'});
		//res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(val));*/
		res.send(val);
	},nums,mega);
}


exports.get_numFreq_userInput = function(req,res){
    console.log("Inside num freq for user input");
    var num1 = req.param("num1");
    var num2 = req.param("num2");
	var num3 = req.param("num3");
	var num4 = req.param("num4");
	var num5 = req.param("num5");
    dbconn.get_numFreq_userInput(function(rows){
        console.log(rows)
		res.send(rows);
	},num1,num2,num3,num4,num5);
    
}

// SuperPics

var superPicks = function(req , res){

	dbconn.getSuperPicks(function(superNumbers){
        res.render('superPicks.ejs' , {superNumbers : superNumbers});
	})

    
}

exports.superPicks = superPicks;
exports.gettrios_table = gettrios_table;
exports.analysis = analysis;
exports.patterns = patterns;
exports.get_trios_userInput = get_trios_userInput;
exports.get_duos_userInput = get_duos_userInput;
exports.get_row_difference = get_row_difference;
exports.insert_row_difference = insert_row_difference;
//exports.getduos = getduos;
//exports.getduos_table = getduos_table;