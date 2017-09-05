var preload = function(game){}
 
preload.prototype = {
	preload: function(){ 
 	
		//text
		this.load.bitmapFont('alien', 'assets/fonts/bitmapFonts/carrier_command.png', 'assets/fonts/bitmapFonts/carrier_command.xml');
	
		//audio
		this.load.audio('song', [ 'assets/audio/wilystage.mp3' ]);
		this.load.audio('stagecomplete', [ 'assets/audio/stagecompleted.mp3' ]);
        this.load.audio('shoot', ['assets/audio/SoundEffects/mm-shot1.ogg']);
        this.load.audio('eshoot', ['assets/audio/Fireball+3.wav']);
        this.load.audio('stagemusic', ['assets/audio/stagemusic.mp3']);
        this.load.audio('titlescreenmusic', ['assets/audio/titlescreen.mp3']);
        this.load.audio('winMusic', ['assets/audio/youwin.mp3']);
        this.load.audio('wahoo', ['assets/audio/wahoo.wav']);
        this.load.audio('fkst', ['assets/audio/bossauw.wav'])

        //images
		this.load.atlasJSONArray('megaman', 'assets/megaman/player/megamanRun1.png', 'assets/megaman/player/megamanRun1.json', 50, 50);
        this.load.atlasJSONArray('heli', 'assets/megaman/enemies/heli.png', 'assets/megaman/enemies/heli.json', 40, 40);
        this.load.atlasJSONArray('spinner', 'assets/megaman/enemies/spinnerSprite.png', 'assets/megaman/enemies/spinnerSprite.json', 40, 40)
        this.load.atlasJSONArray('greenguy', 'assets/megaman/enemies/greenguy.png', 'assets/megaman/enemies/greenguy.json', 50, 50);
        this.load.atlasJSONArray('bossman', 'assets/megaman/enemies/bossman.png', 'assets/megaman/enemies/bossman.json', 100, 100);
        this.load.atlasJSONArray('boom', 'assets/megaman/enemies/boom.png', 'assets/megaman/enemies/boom.json', 50, 50);
        this.load.image('bullet', 'assets/megaman/player/ammo1.png');
        this.load.image('background', 'assets/images/mmbg1.png');
        this.load.image('background2', 'assets/megaman/backgrounds/bg1.jpg');
        this.load.image('background3', 'assets/megaman/backgrounds/stage3bg.png');
        this.load.image('bgstage1', 'assets/megaman/backgrounds/bgmountaintest.png');
        this.load.image('bgstage3', 'assets/megaman/backgrounds/realstage3bg.png');
        this.load.image('bossbg', 'assets/megaman/backgrounds/bossbg.png');
        this.load.image('youwin', 'assets/megaman/backgrounds/youwin.jpg');
        this.load.atlasJSONArray('ebullet', 'assets/megaman/enemies/bullet.png', 'assets/megaman/enemies/bullet.json', 20, 20);
        this.load.atlasJSONArray('bal', 'assets/megaman/enemies/bal.png', 'assets/megaman/enemies/bal.json', 20, 20);
        this.load.atlasJSONArray('fireball', 'assets/megaman/enemies/fireball.png', 'assets/megaman/enemies/fireball.json', 20, 20);
        this.load.image('ground', 'assets/sprites/platform.png');
        this.load.image('star', 'assets/sprites/slime.png');
        this.load.image('titlepage', 'assets/megaman/backgrounds/menubg.jpg');
        this.load.image('playButton', 'assets/megaman/menu/startgame.png');
	},
  	create: function(){
		this.game.state.start("MainMenu");
	}
}