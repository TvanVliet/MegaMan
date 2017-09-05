
var mainMenu = function(game){}
 
mainMenu.prototype = {
  	create: function(){
  		//background image
		var mainMenu = this.game.add.sprite(-50,-70,"titlepage");
		//button
		var playButton = this.game.add.button(230,200,"playButton",this.playTheGame,this);
		//music
		titleMusic = this.game.add.audio('titlescreenmusic');
		titleMusic.play();
	},
	playTheGame: function(){
		titleMusic.stop();
		this.game.state.start("Game");
	}
}