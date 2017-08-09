var menu = function(game){
	console.log("Menu");

};


menu.prototype = {

	//preload de menu
	preload: function(){
		game.load.image('green-start','assets/green-start.png');
		//game.load.image('yellow-start', 'assets/yellow-start.png');
		game.load.image('background', 'assets/menu-back.jpg');
		game.load.image('creditos', 'assets/creditos.png');

		
	},

	rock_anim: null,

	start_game_button: null,
	//start_game_button_bottom: null,
	credits_game_button: null,
	create: function(){


		this.credits_game_button = game.add.sprite(600,500, 'creditos');
		this.start_game_button = game.add.sprite(60,500, 'green-start');

		game.add.sprite(0, 0, 'background');
	
	},

	update: function(){
		this.start_game_button.inputEnabled = true;
		this.start_game_button.input.useHandCursor = true;
		this.start_game_button.events.onInputOver.add(this.over, this);
		this.start_game_button.events.onInputOut.add(this.out, this);

		this.start_game_button.events.onInputDown.add(this.startGame, this);

		this.credits_game_button.inputEnabled = true;
		this.credits_game_button.input.useHandCursor = true;
		this.credits_game_button.events.onInputDown.add(this.startCredits, this);

		console.log('update menuu');
	},

	over(item){
	  //this.start_game_button.kill();
	  console.log('entro');
	},

	startCredits(){
		game.state.start('creditos');
	},

	startGame(){
		console.log('start game');
		game.state.start("intro");
	},

	out(item){
	  this.start_game_button.revive();
	},

}