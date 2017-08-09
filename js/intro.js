var intro = function(intro){
	console.log("intro");

};

intro.prototype = {

	preload: function(){
		game.load.image('exit_btn', 'assets/exit-btn.png');
		game.load.image('background', 'assets/intro.jpg');
	},
	exit_btn: null,
	create: function(){
			this.exit_btn = game.add.sprite(620,490, 'exit_btn');
			game.add.sprite(0,0, 'background');
	},

	update: function(){
		this.exit_btn.inputEnabled = true;
		this.exit_btn.input.useHandCursor = true;
		this.exit_btn.events.onInputDown.add(this.goExit, this);
	},

	goExit(){
		game.state.start('player_selection');
	},

}