var player_two_history = function(game){
	console.log("Player two History");

};

player_two_history.prototype = {

	preload: function(){
		game.load.image('exit-btn', 'assets/exit-btn.png');
		game.load.audio('music','sounds/punk.mp3');
		game.load.image('background', 'assets/tornado-jane');
	},
	exit_btn: null,
	music: null,
	create: function(){
		this.exit_btn = game.add.sprite(680,520, 'exit-btn');
		this.music = game.add.audio('music');
		this.music.play();
		game.add.sprite(0,0, 'background');
	},

	update: function(){
		console.log('player two history update');

		this.exit_btn.inputEnabled = true;
		this.exit_btn.input.useHandCursor = true;
		this.exit_btn.events.onInputDown.add(this.goExit, this);

	},


	goExit(){
		this.music.stop();
		game.state.start('player_selection');
	}

}