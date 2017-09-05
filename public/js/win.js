var Win = function(game){}

Win.prototype = {
  	create: function(){
		var youWin = this.game.add.sprite(-50,-70,"youwin");
		music.stop();
		stateText = this.game.add.text(this.game.world.centerX - 100, this.game.world.centerY +30,' ', { font: '24px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
		stateText.text = " You won! \n Click to go back to the main menu.";
        stateText.visible = true;

        //the "click to restart" handler
        this.game.input.onTap.addOnce(this.backToMenu,this);
		// playButton.anchor.setTo(0.5,0.5);
		winMusic = this.game.add.audio('winMusic');
		winMusic.play();
	},
	backToMenu: function(){
		winMusic.stop();
		this.game.state.start("MainMenu");
	}
}