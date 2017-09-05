
var Game = function(game){
	workingButtons = true;
}

 var background;
 var bmpText;
 var music;
 var cursors;
 var jumpButton;
 var shoot;
 var bullets;
 var ebullets;
 var stateText;
 var scoreText;
 var facing = 'left';
 var jumpTimer = 0;
 var nextFire = 0;
 var fireRate = 350;
 var livingEnemies = [];
 var ebullets;
 var eShootSound;
 var firingTimer = 0;
 var score = 0;
 var stgcmpl;
 var spawnTime = 4000;
 var timecounter = 0;

Game.prototype = {

	//creating everything that needs to be used in the game
  	create: function(){
  		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//sounds
		music = this.game.add.audio('stagemusic');
		music.play();

		shootSound = this.game.add.audio('shoot');
        eShootSound = this.game.add.audio('eshoot');
        jump = this.game.add.audio('wahoo');
        stgcmpl = this.game.add.audio('stagecomplete');

        //images/sprites/text
		background = this.background = this.game.add.sprite(0, 0, 'bgstage1');
		bmpText = this.add.bitmapText(200, 20, 'alien', 'Stage 1', 32);


		// creating player + player animations
		player = this.add.sprite(this.game.world.centerX -200, this.game.world.centerY -300, 'megaman', 'mmStillR1.png');
   		player.anchor.setTo(0.5, 1); 
        player.scale.setTo(2.0, 2.0);

   		this.game.physics.enable(player, Phaser.Physics.ARCADE);

   		player.body.bounce.y = 0.2
    	player.body.collideWorldBounds = true;
        player.body.gravity.y = 500;
        player.enableBody = true;

    	player.animations.add('right', [16, 17, 18, 19, 20], 14, true);
	    player.animations.add('left', [11, 12, 13, 14, 15], 14, true);


	    // creating player and enemy bullets
	    bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('body.gravity.y', 0);

        ebullets = this.game.add.group();
        ebullets.enableBody = true;
        ebullets.physicsBodyType = Phaser.Physics.ARCADE;
        ebullets.createMultiple(50, 'ebullet');
        ebullets.setAll('checkWorldBounds', true);
        ebullets.setAll('outOfBoundsKill', true);
        ebullets.setAll('body.gravity.y', 0);

        //animation when enemy dies
        explosions = this.game.add.group();
   		explosions.createMultiple(30, 'boom');
   		explosions.forEach(this.setupEnemy, this);

        // adding statetext
        stateText = this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY,' ', { font: '24px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        // adding lives group
        lives = this.game.add.group();

    	//setting up enemy groups
	    enemies = this.game.add.group();
	    enemies.enableBody = true;
	    enemies.physicsBodyType = Phaser.Physics.ARCADE;

	    //score text
	    scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '20px', fill: '#fff' });

	    // setting up controls
	    cursors = this.game.input.keyboard.createCursorKeys();
    	jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        
        //spawns enemies every 2 seconds (4 times)
    	this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 4, this.createEnemy, this);

	},

	update: function() {

		//functions to be executed on collision
        this.game.physics.arcade.overlap(bullets, enemies, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(ebullets, player, this.collisionHandlerE, null, this);

		player.body.velocity.x = 0;


	// setting up the behaviour of the enemies
    for(var i = 0; i < enemies.children.length; i++){
        var enemy = enemies.children[i];
        this.game.physics.arcade.moveToObject(enemy,player,80);
    }
       
    // shooting
    if (shoot.isDown)
   		{
         if (this.game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = this.game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(player.x+5, player.y -45);

        bullet.body.velocity.x = 500;

        shootSound.play();
        player.frame = 5;
    }
   }
   // basic controls
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 10;
            }
            else
            {
                player.frame = 10;
            }

            facing = 'idle';
        }
    }

    if (jumpButton.isDown && player.body.onFloor() && this.game.time.now > jumpTimer)
    {
    	jump.play();
        player.body.velocity.y = -450;
        jumpTimer = this.game.time.now + 550
        player.frame = 9;
    }

     if (this.game.time.now > firingTimer)
        {
            enemyBullet = ebullets.getFirstExists(false);

		    enemyBullet.animations.add('fire', [0, 1], 12, true);
		    enemyBullet.scale.setTo(1.5)

		    livingEnemies.length=0;

		    enemies.forEachAlive(function(heli){
	        // put every living enemy in an array
	        	livingEnemies.push(heli);
    });

    if (livingEnemies.length > 0)
    	{

	    var random = this.game.rnd.integerInRange(0,livingEnemies.length-1);
	    //  Grab the first bullet we can from the pool
	    var shooter = livingEnemies[random];

	    enemyBullet.reset(shooter.body.x, shooter.body.y);

	    this.game.physics.arcade.moveToObject(enemyBullet, player, 200);
	    enemyBullet.animations.play('fire');
	    eShootSound.play();
	    firingTimer = this.game.time.now + 2000;
   	 	}
       }
	},
	// function for killing enemies
    collisionHandler: function(bullet, enemy){
   
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(enemy.body.x, enemy.body.y);
	    explosion.play('boom', 30, false, true);

	 	bullet.kill();
	    enemy.kill();

	    score += 10;
	    scoreText.text = 'Score: ' + score;

	    if (enemies.countLiving() == 0)
	    {
	        score += 100;
	        scoreText.text = 'Score: ' + score;

	        ebullets.callAll('kill',this);
	        stateText.text = " Stage 1 Completed! \n Click to go to next stage!";
	        stateText.visible = true;
	        stgcmpl.play();

	        //the "click to restart" handler
	        // this.game.input.onTap.addOnce(this.nextStage,this);
	        this.game.state.start("Stage2",true,false,score);
	    }
},
	
	// function that checks if player is hit
	collisionHandlerE: function(bullet, player){
    bullet.kill();
    player.kill();
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('boom', 30, false, true);


    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    // When the player dies
    if (lives.countLiving() < 1)
    {
        player.kill();
        ebullets.callAll('kill');
        music.stop();

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        this.game.input.onTap.addOnce(this.restart,this);
    }
},

	restart: function() {
	    music.stop();
	    stateText.visible = false
	    this.game.state.start("MainMenu",true,false,score);
	},

	nextStage: function() {
		this.game.state.start("Stage2",true,false,score);
	},

	  createEnemy: function(){
        for(var y = 0; y < 3; y++){
            for(var x = 0; x < 1; x++){
                enemy = enemies.create(this.game.world.width, Math.random() * 200, 'heli', this.game.rnd.integerInRange(0,this.game.world.width +10));
                enemy.anchor.setTo(0.5,0.5);
                enemy.scale.setTo(2);
                enemy.animations.add('fly', [0,1], 20, true);
                enemy.play('fly');
            }
        }
    },

    setupEnemy: function(enemy){
   		enemy.animations.add('boom', [0,1,2,3,4,5]);
	}

};
