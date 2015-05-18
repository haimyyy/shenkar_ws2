

 exports.findPlayerById = function(playerId){
	var tempPlayer=null;
	for(i in g_players){
		console.log("player",g_players[i])
		if (g_players[i].playerId==playerId) {
			tempPlayer=g_players[i];
			break;
		};
	}
	if (tempPlayer==null) {
		return 0;
	}
	else{
		return tempPlayer;
	}
};
exports.findBestScoredInMonth = function(month){
	var numScored=0;
	var tempPlayer=null;
	for(i in g_players){
		if(g_players[i].month==month)
			if(g_players[i].scoredGoals>numScored){
				numScored=g_players[i].scoredGoals;
				tempPlayer=g_players[i];

			}

	}
	if (tempPlayer==null) {
		return 0 ;
	}
	else{
		return tempPlayer;
	}
}