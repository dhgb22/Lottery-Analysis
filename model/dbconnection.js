/**
 * New node file
 */


var mysql=require('mysql');

/*var connection=mysql.createConnection({
	host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
	database : 'lottery'
});*/

var connection=mysql.createConnection({
	host: 'localhost',
    user: 'root',
    password: 'jerrymouse',
    port: '3306',
	database : 'lotterytest'
});




exports.getMostFreqNums = function(callback) {
	var query = "select num,frequency from num_frequency";
	connection.query(query, function(err, results) {
		if (err) {
			console.log(err);
		} else {
			callback(err, results);
		}

	});
}

exports.getAllNums = function(callback){
	var query = "SELECT drawId,num1,num2,num3,num4,num5 FROM winning_nums ORDER BY drawID DESC LIMIT 100;"
		connection.query(query, function(err, results) {
			if (err) {
				console.log(err);
			} else {
				callback(results);
			}

		});		
}

exports.getFirstNumFrequency = function (callback){
	var query="select count(num1) as cnt,num1 from winning_nums group by num1;";
	connection.query(query,function(err,rows){
		callback(err,rows);
	});
}

exports.getLastNumFrequency = function (callback){
	var query="select count(num5) as cnt,num5 from winning_nums group by num5;";
	connection.query(query,function(err,rows){
		callback(err,rows);
	});
}



exports.insertNewData = function(num1,num2,num3,num4,num5,megaNum,callback){
	var query="INSERT INTO winning_nums (num1,num2,num3,num4,num5,meganum) VALUES ("+num1+","+num2+","+num3+","+num4+","+num5+","+megaNum+");";
	console.log("Insert Query______"+query);
	connection.query(query,function(err,results){
		if(err)
			console.log(err);
		else
			callback(results);
	});
}

exports.getlastwinningnum = function (callback){
	var query="select * FROM winning_nums  order by drawId desc LIMIT 1; ";
	console.log("Get query______"+query);
	connection.query(query,function(err,rows){
		callback(err,rows);
	});
}

/*exports.getDuos_forTable = function(callback){
	console.log("in the get duos of dbcon");
	var query = "select * from duos order by count desc limit 20";
	connection.query(query , function(err , rows){
		if(err){
			console.log(err);
		}else{
			console.log("length " + rows.length)
			callback(err , rows);
		}
	})
}
*/


/*exports.getduos_table = function(callback){
	console.log("in the get duos of dbcon");
	var query = "select * from duos order by count desc limit 70";
	connection.query(query , function(err , rows){
		if(err){
			console.log(err);
		}else{
			console.log("length " + rows.length)
			callback(err , rows);
		}
	})
}
*/
exports.get_row_difference = function(callback){
	console.log("in the get duos of dbcon");
	var diff1 = [];
	var diff2 = [];
	var diff3 = [];
	var diff4 = [];
	var diff5 = [];
	
	var query = "select * from winning_nums ";
	connection.query(query , function(err , rows){
		if(err){
			console.log(err);
		}else{
			console.log("length " + rows.length)
			for(var i = 1 ; i <rows.length ; i++){
				diff1[i] = num1 - rows[i-1].num1;
				diff2[i] = num2 - rows[i-1].num2;
				diff3[i] = num3 - rows[i-1].num3;
				diff4[i] = num4 - rows[i-1].num4;
				diff5[i] = num5 - rows[i-1].num5;
			}
			
			callback(diff1 ,diff2 ,diff3 ,diff4,diff5);
		}
	})
}

exports.create_row_difference = function(callback){
	console.log("in the get duos of dbcon");
	var diff1 = [];
	var diff2 = [];
	var diff3 = [];
	var diff4 = [];
	var diff5 = [];
	var date = [];
	
	var query = "select * from winning_nums ";
	connection.query(query , function(err , rows){
		if(err){
			console.log(err);
		}else{
			console.log("length " + rows.length)
			for(var i = 1 ; i <rows.length ; i++){
				diff1[i-1] = rows[i - 1].num1 - rows[i].num1;
				diff2[i-1] = rows[i - 1].num2 - rows[i].num2;
				diff3[i-1] = rows[i - 1].num3 - rows[i].num3;
				diff4[i-1] = rows[i - 1].num4 - rows[i].num4;
				diff5[i-1] = rows[i - 1].num5 - rows[i].num5;
				date[i-1] = rows[i].drawdate;
			}
			
			callback(diff1 ,diff2 ,diff3 ,diff4,diff5,date);
		}
	})
}

exports.get_row_difference_fromTable = function(callback){
	var query = "select * from row_differences order by id desc LIMIT 99";
	connection.query(query , function(err , rows){
		if(err){
			console.log(err);
		}else{			
			callback(err, rows );
		}
	})
}

exports.get_duos_userInput = function(callback,num1,num2,num3,num4,num5){
	 var query = "select * from duos where num1 in ("+num1+","+num2+","+num3+","+num4+","+num5+") and num2 in("+num1+","+num2+","+num3+","+num4+","+num5+") order by count desc";
	 connection.query(query , function(err , rows){
			if(err){
				console.log(err);
			}else{			
				callback(err, rows );
			}
		})


}

exports.getFirst100data = function (callback){
	var query="SELECT * FROM winning_nums  order by drawId desc LIMIT 100;";
	console.log("Get 100 query______"+query);
	connection.query(query,function(err,rows){
		callback(err,rows);
	});
}

exports.get_trios_userInput = function(callback,num1,num2,num3,num4,num5){
	 
	var key1 = "("+num1+","+num2+","+num3+")";
    
	 var key2 = "("+num1+","+num3+","+num4+")";
			    		
	 var key3 = "("+num1+","+num4+","+num5+")";
	  		
	 var key4 = "("+num1+","+num3+","+num4+")";
	
	 var key5 = "("+num1+","+num3+","+num5+")";
	
	 var key6 = "("+num1+","+num4+","+num5+")";
	
	 var key7 = "("+num2+","+num3+","+num4+")";
	
	 var key8 = "("+num2+","+num3+","+num5+")";
	
	 var key9 = "("+num2+","+num4+","+num5+")";

	 var key10 = "("+num3+","+num4+","+num5+")";


     var query = "select tupple , count from trios where tupple in ('"+key1+"','"+key2+"','"+key3+"','"+key4+"','"+key5+"','"+key6+"','"+key7+"','"+key8+"','"+key9+"','"+key10+"')";
     
     
     console.log("key1 " + key1);
     console.log(query);
     connection.query(query , function(err , rows){
		   if(err){
		     	console.log(err);
		   }else{		
			   console.log("tupple"+rows[0].tupple);
			   callback(err, rows );
		   }
	});


}

exports.getDuos = function(callback){
	console.log("in the get duos of dbcon");
	var query = "select * from duos order by count desc limit 20";
	connection.query(query , function(err , rows){
		if(err){
			console.log(err);
		}else{
			console.log("length " + rows.length)
			callback(err , rows);
		}
	})
}


exports.getalltrios=function(callback){
	var query="select tupple,count,percentage from trios where count > 4 order by count desc";
	connection.query(query,function(err,rows){
		if(err){
			console.log(err);
		}
		else{
			callback(err,rows);
		}
	})
}

exports.topSixNumbers = function(req , res){
	
}

////////////////megha's part


exports.getOddEven=function(callback){
	var query="select * from oddeven";
	connection.query(query,function(err,rows){
		callback(err,rows);
	});
}

exports.getduos=function(callback){
	var query="select * from duos limit 600";
	connection.query(query,function(err,rows){
		if(!err){
		callback(err,rows);
		}else{
			console.log("err " + err);
		}
	})
}


exports.userOddEven=function(callback,odds){
	var val='';
	switch(odds){
	case 0:{
		val="zero odds five evens";
		break;
		
	}
	case 1:{
		val="one odds four evens";
		break;
		
	}	
	case 2:{
		val="two odds three evens";
		break;
		
	}
	case 3:{
		val="three odds two evens";
		break;
		
	}
	case 4:{
		val="four odds one evens";
		break;
		
	}
	case 5:{
		val="five odds zero evens";
		break;
		
	}
	}
	var query="select id,count,(select sum(count) from oddeven) as total from oddeven where id='"+val+"'";
	connection.query(query,function(err,rows){
		if(err){
			console.log(err+"error in useroddevendb");
		}
		else{
            console.log("Error returned from odd even"+rows);
			callback(rows);
		}
	});
}


exports.userPattern=function(callback,nums,mega){
	var num="";
	console.log(nums+" inside db");
	for(i=0;i<nums.length;i++){
	num=num+nums[i]+",";
	}
	num=num.substring(0,num.length-1);
	var query="select num1,num2,num3,num4,num5,meganum,drawdate from winning_nums where num1 in (?,?,?,?,?) or num2 in (?,?,?,?,?) or num3 in (?,?,?,?,?) or num4 in (?,?,?,?,?) or num5 in (?,?,?,?,?) or meganum=? order by drawid desc limit 50";
	//var query="select num1,num2,num3,num4,num5,meganum,drawdate from winning_nums where num1 in ("+num+") or num2 in ("+num+") or num3 in ("+num+") or num4 in ("+num+") or num5 in  ("+num+") or meganum="+mega+" order by drawid desc limit 50";
	console.log(query);
	connection.query(query,[nums[0],nums[1],nums[2],nums[3],nums[4],nums[0],nums[1],nums[2],nums[3],nums[4],nums[0],nums[1],nums[2],nums[3],nums[4],nums[0],nums[1],nums[2],nums[3],nums[4],nums[0],nums[1],nums[2],nums[3],nums[4],mega],function(err,results){
		if(!err){
			console.log(results.length)
			callback(results);
		}
		else{
			console.log("error"+err);
		}
	})
	
}

exports.get_numFreq_userInput = function(callback,num1,num2,num3,num4,num5){
    var query = "SELECT * FROM num_frequency where num =? or num =? or num =? or num =? or num =?;";
    console.log("Query_________"+query);
    connection.query(query,[num1,num2,num3,num4,num5],function(err,results){
            if(!err)
            {
                console.log("Success");
                callback(results);
            }
            else{
                console.log("Error________"+err);
            }
    });

}


// Super Pics Query


var getOverDueNumbers = function(callback){
    var query = "SELECT * FROM occurances order by diff_days desc limit 6";
    connection.query(query , function(err , rows){
    	if(err){
    		console.log(err);
    	}else{
    		
    		callback(err,rows);
    	}
    })
}

var getMostOccured = function(callback){
	var query = "select num1,count(*) as count from "+
                "(  select num1 from winning_nums "+
                " union all  select num2 from winning_nums LIMIT 100 "+
                " union all  select num3 from winning_nums LIMIT 100 "+
                " union all  select num4 from winning_nums LIMIT 100 "+
                " union all  select num5 from winning_nums LIMIT 100 "+
                " )t group by num1 order by count desc limit 6;";
	
	connection.query(query , function(err , rows){
    	if(err){
    		console.log(err);
    	}else{
    		
    		callback(err,rows);
    	}
    })
}

var getLeastOccured = function(callback){
	var query = "select num1,count(*) as count from "+
    "(  select num1 from winning_nums "+
    "union all  select num2 from winning_nums LIMIT 100 "+
    "union all  select num3 from winning_nums LIMIT 100 "+
    "union all  select num4 from winning_nums LIMIT 100 "+
    "union all  select num5 from winning_nums LIMIT 100 "+
    ")t group by num1 order by count limit 6;"
    connection.query(query , function(err , rows){
    	if(err){
    		console.log(err);
    	}else{
    		
    		callback(err,rows);
    	}
    })
}
exports.getSuperPicks = function(callback){
	var overDueNumber = [];
	var mostOccured = [];
	var leastOccured = [];
	
	var superNumber1 = [];
	var superNumber2 = [];
	var superNumber3 = [];
	var superNumber = [superNumber1 , superNumber2 , superNumber3];
	
	getOverDueNumbers(function(err , Overdue_rows){
		getMostOccured(function(err , mostOccured_rows){
			getLeastOccured(function(err , leastOccured_rows){
				for(var i =0 ; i <6 ; i++){
					overDueNumber[i] = Overdue_rows[i].key1;
					mostOccured[i] = mostOccured_rows[i].num1;
					leastOccured[i] = leastOccured_rows[i].num1;
					
				}
				console.log("over due "+overDueNumber);
				console.log("most "+ mostOccured);
				console.log("least "+ leastOccured);
			
				for(var i = 0 ; i < 2 ; i++){
					for(j = 0 ; j < 3 ; j++){
				
					   var random = Math.round(Math.random()*(5));
					   console.log(random);
					   superNumber[j].push(overDueNumber[random]);
					   superNumber[j].push(mostOccured[random]);
					   superNumber[j].push(leastOccured[random]);
					}
				}
				//console.log("supernumberrrr "+superNumber[0][0]);
				console.log("supernumber1 "+superNumber[0]);
				console.log("supernumber2 "+superNumber[1]);
				console.log("supernumber3 "+superNumber[2]);
				callback(superNumber);
			})
			
		})
		
		
	});
	
}

