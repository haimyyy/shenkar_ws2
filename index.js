var express = require('express');
var url = require('url');
var ScoreTable =require('./socredTable');

app = express();

/******* DB and init ********/

var Player1={
	"playerId":1,
	"name":"Benhayun",
	"scoredGoals":6,
	"month":"June"
};
var Player2={
	"playerId":2,
	"name":"Revivo",
	"scoredGoals":4,
	"month":"October"
};
var Player3={
	"playerId":3,
	"name":"Berkovich",
	"scoredGoals":3,
	"month":"May"
};
var Player4={
	"playerId":4,
	"name":"Damari",
	"scoredGoals":6,
	"month":"May"
};
g_players=[];
g_players.push(Player1);
g_players.push(Player2);
g_players.push(Player3);
g_players.push(Player4);

/******* end DB and init *********/


app.get('/getPlayerScoredById/:playerId?', function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
	try{
		var playerId = req.query.playerId;;
		console.log(playerId);		
	}
	catch(err){
		console.log("error playerId " + err)
	}
	var ans =ScoreTable.findPlayerById(playerId);
	console.log(ans);
	if (ans ==0) {
		res.json({status:2,msg:"id isn't exist"});
	}else{
		res.json({status:1,playerId:ans.playerId,scored:ans.scoredGoals,month:ans.month,name:ans.name})
	}

}); 

app.get('/getAllGoalScored', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
	res.json(g_players);
});
app.get('/getBestPlayerScoredInMonth/:month?', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");	
	try{
		var month = req.query.month;;
		console.log(month);		
	}
	catch(err){
		console.log("error month " + err)
	}
	console.log( month);
	var ans =ScoreTable.findBestScoredInMonth(month);
	console.log(ans);
	if (ans ==0) {
		res.json({status:2,msg:"month isn't exist"});
	}else if (ans==1) {
			res.json({status:2,msg:"there isn't scored fot this month"});
	}else{
		res.json({status:1,playerId:ans.playerId,scored:ans.scoredGoals,month:ans.month,name:ans.name})
	}
});
process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});
app.get('/', function(req,res){
	res.json(200,{status:"ok"})
});
app.get('/*', function(req,res){
	res.json(404,{status:"error"})
});
var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("port " + port);
});
