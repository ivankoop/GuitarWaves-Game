var creditos = function(game){
	console.log("Creditos");

};

creditos.prototype = {

	preload: function(){

		game.load.image('exit-btn', 'assets/exit-btn.png');
		game.load.image('background', 'assets/credits.jpg');
	},
	exit_btn: null,
	create: function(){
		this.exit_btn = game.add.sprite(650,510, 'exit-btn');
		game.add.sprite(0,0, 'background');
	},

	update: function(){

		this.exit_btn.inputEnabled = true;
		this.exit_btn.input.useHandCursor = true;
		this.exit_btn.events.onInputDown.add(this.goExit, this);

	},

	goExit(){
		game.state.start('menu');
	}

}