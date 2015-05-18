var express = require('express');
var url = require('url');
var ScoreTable =require('./socredTable');
app = express();


/******* DB and init ********/

var Player1={
	"playerId":1,
	"scoredGoals":6,
	"month":"june"
};
var Player2={
	"playerId":2,
	"scoredGoals":4,
	"month":"october"
};
var Player3={
	"playerId":3,
	"scoredGoals":3,
	"month":"may"
};
var Player4={
	"playerId":4,
	"scoredGoals":6,
	"month":"may"
};
g_players=[];
g_players.push(Player1);
g_players.push(Player2);
g_players.push(Player3);
g_players.push(Player4);

/******* end DB and init *********/


app.get('/getPlareyScoredById/:playerId?', function(req, res) {
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
		res.json({status:1,playerId:ans.playerId,scored:ans.scoredGoals,month:ans.month})
	}
}); 

app.get('/getAllGoalScored', function(req, res) {
	res.json(g_players);
});
app.get('/getBestPlayerScoredInMonth/:month?', function(req, res) {
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
	}else{
		res.json({status:1,playerId:ans.playerId,scored:ans.scoredGoals,month:ans.month})
	}
});
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("port " + port);
});
