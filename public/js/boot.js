var boot = function (game) {
	console.log("%cStarting my awesome game", "color:white; background:red");
};

boot.prototype = {
	preload: function () {
		this.game.load.image("loading", "assets/megaman/backgrounds/bg1.jpg");
	},
	create: function () {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.updateLayout();
		this.game.state.start("Preload");
	}
}