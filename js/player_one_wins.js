var player_one_wins = function(game){
	console.log("Player one History");

};

player_one_wins.prototype = {

	preload: function(){
		game.load.image('exit_btn', 'assets/exit-btn.png');
		game.load.image('play', 'assets/play-btn.png');
		game.load.image('background', 'assets/player1-wins.jpg');
	},
	play_btn: null,
	exit_btn: null,
	create: function(){
		this.exit_btn = game.add.sprite(680,520, 'exit_btn');
		this.play_btn = game.add.sprite(200,400, 'play');
		game.add.sprite(0,0,'background');
	},

	update: function(){

		this.exit_btn.inputEnabled = true;
		this.exit_btn.input.useHandCursor = true;
		this.exit_btn.events.onInputDown.add(this.goExit, this);

		this.play_btn.inputEnabled = true;
		this.play_btn.events.onInputDown.add(this.startGame, this);

	},

	goExit(){
		game.state.start('menu');
	},

	startGame(){
		game.state.start('main');
	}

}