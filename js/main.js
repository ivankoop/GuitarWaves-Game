var main = function(game){
	console.log("Main");

};

main.prototype = {

	preload: function(){
		game.load.image('main-bullet','assets/square.png');
		game.load.image('square', 'assets/target.png');
		game.load.image('blue-square', 'assets/blue-square.png');
		game.load.image('nota', 'assets/nota.png');
		game.load.image('background', 'assets/background.png');
		game.load.image('player1', 'assets/player1.png');
		game.load.image('player2', 'assets/player2.png');
		game.load.image('white', 'assets/white.png');
		game.load.image('full-background', 'assets/background-body.png');
		game.load.audio('rock', 'sounds/rock.mp3');
		game.load.audio('punk', 'sounds/punk.mp3');
		game.load.audio('guitar-slash', 'sounds/guitar-slash.wav');
		game.load.image('rayito1', 'assets/rayito-01.png');
		game.load.image('rayito2', 'assets/rayito-02.png');

		game.load.atlasJSONHash('rockscene', 'assets/rock_anim.png', 'assets/rock_anim.json');

	},

	fireRate: 50,
  nextFire: 2,
  enemy_nextFire: 10,
  bullets: null,
  enemy_bullets: null,
  cursors: null,
  sprite: null,
  enemy_hold_boolean: false,
  hold_boolean: false,
  background_music: null,
  player1: null,
  player2: null,
  player1_music: null,
  player2_music: null,

  rock_anim: null,
  public_anim: null,

  player_1_anim: null,
  player_2_anim: null,

  rayo_anim: null,

  time_til_spawn: null,
  last_spawn_time: null,

  random_spawns: null,
  guitar_slash: null,

	create: function(){
		this.player1 = game.add.sprite(0,275, 'player1');
		this.player2 = game.add.sprite(655, 275, 'player2');

		this.time_til_spawn = Math.random()*3000 + 2000;
		this.last_spawn_time = game.time.time;

		this.time_til_spawn2 = Math.random()*3000 + 2000;
		this.last_spawn_time2 = game.time.time;

		game.add.sprite(0,0, 'full-background');
		//game.add.sprite(0, 0, 'background');
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.public_anim = game.add.sprite(180,300, 'rockscene', 5);
		game.add.sprite(0,0, 'rockscene', 0);

		this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'rockscene', 1);
		this.sprite.animations.add('anim', [1,2],20,true);
		this.sprite.animations.play('anim');


		this.public_anim.animations.add('cheer', [5,6],10,true);
		this.public_anim.animations.play('cheer');

		this.player_2_anim = game.add.sprite(550, 230, 'rockscene',7);


		this.player_2_anim.animations.add('anim',[7,8,9,10],10,true);
		this.player_2_anim.animations.play('anim');

		this.player_1_anim = game.add.sprite(10, 230, 'rockscene',11);


		this.player_1_anim.animations.add('anim',[11,12,13,14],10,true);
		this.player_1_anim.play('anim');

		this.player1_music = game.add.audio('rock');
		this.player1_music.play();
		this.player1_music.loop = true;

		this.player2_music = game.add.audio('punk');
		this.player2_music.play();
		this.player2_music.loop = true;

		//this.player1_music.volume = 0;

		this.guitar_slash = game.add.audio('guitar-slash');


		game.physics.enable(this.player1,Phaser.Physics.ARCADE);
		game.physics.enable(this.player2,Phaser.Physics.ARCADE)

		this.player1.body.collideWorldBounds = true;
		this.player2.body.collideWorldBounds = true;

		this.bullets = game.add.group();
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.enableBody = true;
		this.bullets.createMultiple(50, 'rayito1');
		this.bullets.setAll('checkWorldBounds', true);


		this.enemy_bullets = game.add.group();
		this.enemy_bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.enemy_bullets.enableBody = true;
		this.enemy_bullets.createMultiple(50, 'rayito2');
		this.enemy_bullets.setAll('checkWorldBounds', true);

		this.random_spawns = game.add.group();
		this.random_spawns.physicsBodyType = Phaser.Physics.ARCADE;
		this.random_spawns.enableBody = true;
		this.random_spawns.createMultiple(50, 'blue-square');
		this.random_spawns.setAll("checkWorldBounds", true);

		this.cursors = game.input.keyboard.createCursorKeys();

		//this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'square');
	
 		game.physics.enable(this.sprite,Phaser.Physics.ARCADE);

		this.sprite.body.collideWorldBounds = true;

		game.physics.arcade.enableBody(this.sprite);

	},
	enemy_shoot: function(){

		if (game.time.now > this.enemy_nextFire && this.enemy_bullets.countDead() > 0)
		{	
		    this.enemy_nextFire	 = game.time.now + this.fireRate;

		    var bullet_1 = this.enemy_bullets.getFirstDead();
		    bullet_1.reset(this.getRandomArbitrary(580,680), this.getRandomArbitrary(350,450));
		    game.physics.enable(bullet_1, Phaser.Physics.ARCADE);

		    bullet_1.body.velocity.setTo(-300,-200);
		    bullet_1.body.bounce.set(3);
		    game.physics.arcade.collide(bullet_1, this.sprite);

		 
		}
	},
	shoot: function(){
		
	  if (game.time.now > this.nextFire && this.bullets.countDead() > 0)
	  {		

	  		console.log('shoot');
	      this.nextFire = game.time.now + this.fireRate;

	      var bullet = this.bullets.getFirstDead();
	      //bullet.reset(50, 500);

	      bullet.reset(this.getRandomArbitrary(100,200), this.getRandomArbitrary(300,400));
	      game.physics.enable(bullet, Phaser.Physics.ARCADE);
	      //bullet.body.collideWorldBounds = true;
	      //game.physics.arcade.moveToObject(bullet, this.sprite, 400);
	      bullet.body.velocity.setTo(300,-200);
	      bullet.body.bounce.set(2);
	      game.physics.arcade.collide(bullet, this.sprite);

	   
	  }
	},
	spawnBonus: function(){
		 var spawn = this.random_spawns.create(50,0,'blue-square');
		 game.physics.enable(spawn, Phaser.Physics.ARCADE);
		 spawn.body.velocity.setTo(0,50);
		 game.physics.arcade.collide(spawn, this.player1);

	},
	spawnBonus2: function(){
		console.log('Spawn bonus 2');
		var spawn = this.random_spawns.create(650,0,'main-bullet');
		 game.physics.enable(spawn, Phaser.Physics.ARCADE);
		 spawn.body.velocity.setTo(0,50);
		 game.physics.arcade.collide(spawn, this.player2);
	},
	update: function(){
		//this.game.physics.arcade.collide(this.bullets, this.sprite);
		//this.game.physics.arcade.collide(this.enemy_bullets, this.sprite);
		game.physics.arcade.overlap(this.bullets, this.sprite, this.firstHit, null, this);
		game.physics.arcade.overlap(this.enemy_bullets, this.sprite, this.enemy_hit, null, this);

		game.physics.arcade.overlap(this.player1, this.sprite, this.player1_dead, null, this);
		game.physics.arcade.overlap(this.player2, this.sprite, this.player2_dead, null, this); 

		game.physics.arcade.overlap(this.player1_ultimate, this.sprite, this.player1_hit_ultimate, null, this);
		game.physics.arcade.overlap(this.player2_ultimate, this.sprite, this.player2_hit_ultimate, null, this);

		game.physics.arcade.collide(this.player1, this.sprite);
		game.physics.arcade.collide(this.player2, this.sprite);

		//game.physics.arcade.collide(this.player1, this.random_spawns);

			game.physics.arcade.overlap(this.random_spawns, this.player1, this.player1Bonus, null, this);
			game.physics.arcade.overlap(this.random_spawns, this.player2, this.player2Bonus, null, this); 

		if(this.sprite.x > 400){
			this.player2_music.pause();
			this.player1_music.resume();
		} else {
			this.player2_music.resume();
			this.player1_music.pause();
		}
		


		this.player1.inputEnabled = true;
		this.player1.events.onInputDown.add(this.player1Shoot, this);

		this.player2.inputEnabled = true;
		this.player2.events.onInputDown.add(this.player2Shoot, this);

		//this.shoot();
		//this.enemy_shoot();
		if(cursors.left.isDown){
			
			if(!this.enemy_hold_boolean){
				this.shoot();
			} 		
			this.enemy_hold_boolean = true;
		}

		if(cursors.left.isUp){
			this.enemy_hold_boolean = false;
		}

		if(cursors.right.isDown){
			if(!this.hold_boolean){
				this.enemy_shoot();
			}
			this.hold_boolean = true;
		}

		if(cursors.right.isUp){
			this.hold_boolean = false;
		}

		var current_time = game.time.time;
		if(current_time - this.last_spawn_time > this.time_til_spawn){
		  this.time_til_spawn = Math.random()*18000+ 15000;
		  console.log(this.time_til_spawn)
		  this.last_spawn_time = current_time;
		  this.spawnBonus();
		}

		if(current_time - this.last_spawn_time2 > this.time_til_spawn2){
		  this.time_til_spawn2 = Math.random()*18000 + 15000;
		  console.log(this.time_til_spawn2)
		  this.last_spawn_time2 = current_time;
		  this.spawnBonus2();
		}
	
	},
	player1_ultimate: null,
	player1Bonus(player,bonus){
		bonus.kill();
		this.player1_ultimate = game.add.sprite(200, 375, 'blue-square');
		game.physics.enable(this.player1_ultimate, Phaser.Physics.ARCADE);
		this.player1_ultimate.body.velocity.setTo(300, -200);
		game.physics.arcade.collide(this.player1_ultimate, this.sprite);
		game.camera.shake(0.05, 500);
		this.guitar_slash.play();
	},
	sprite_acceleration: null,
	player1_hit_ultimate(ultimate,sprite){
		ultimate.kill();
		this.sprite_acceleration +=100;
		sprite.body.velocity.setTo(this.sprite_acceleration,0);
	},

	player2_ultimate: null,
	player2Bonus(player,bonus){
		bonus.kill();
		this.player2_ultimate = game.add.sprite(645, 375, 'main-bullet');
		game.physics.enable(this.player2_ultimate, Phaser.Physics.ARCADE);
		this.player2_ultimate.body.velocity.setTo(-300, -200);
		game.physics.arcade.collide(this.player2_ultimate, this.sprite);
		game.camera.shake(0.05, 500);
		this.guitar_slash.play();
	},
	player2_hit_ultimate(ultimate,sprite){
		ultimate.kill();
		this.sprite_acceleration -=100;
		sprite.body.velocity.setTo(this.sprite_acceleration,0);
	},
	player1Shoot(){
		this.shoot();
	},
	player2Shoot(){
		this.enemy_shoot();
	},

	enemy_hit(sprite,bullet){
		bullet.kill();
		this.sprite_acceleration -=10;
		sprite.body.velocity.setTo(this.sprite_acceleration,0);
	},
	firstHit(sprite,bullet){
		console.log('le toco');
		bullet.kill();
		this.sprite_acceleration +=10;
		sprite.body.velocity.setTo(this.sprite_acceleration,0);
  },

  player1_dead(){
  	console.log('perdio player 1');
  	this.player1_music.stop();
  	this.player2_music.stop();
  	game.state.start("player_two_wins");

  },

  player2_dead(){
  	console.log('perdio player 2');
  	this.player1_music.stop();
  	this.player2_music.stop();
  	game.state.start("player_one_wins");
  },

  getRandomArbitrary(min, max) {
  	return Math.random() * (max - min) + min;
	}

}

