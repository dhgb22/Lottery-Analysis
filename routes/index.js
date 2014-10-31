
/*
 * GET home page.
 */
var dbconn = require('../model/dbconnection');
var fs  = require("fs");

exports.index = function(req, res){
	dbconn.getlastwinningnum(function(err,rows){
			console.log(rows.length);
			//readFile();
		  res.render('index', {win:rows });
	});
};

exports.getLowestNumFreq = function(req, res){
	dbconn.getFirstNumFrequency(function(err,rows){
			console.log(rows.length);
		  res.send(rows);
	});
	
};

exports.getHighestNumFreq = function(req,res){
    dbconn.getLastNumFrequency(function(err,rows){
			console.log(rows);
		  res.send(rows);
	});
};



function readFile(){
	fs.readFile('lottery.txt', function(err,data){
		  var array = data.toString().split('\n');
		  var newRecord = array[5];
		  var numArray = newRecord.toString().split(/[\s]+/);
		  console.log(numArray);  
		  dbconn.insertNewData(numArray[5],numArray[6],numArray[7],numArray[8],numArray[9],numArray[10],function(results){
			  console.log("Data insertes successfully");
		  });
	});
}