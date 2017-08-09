var player_selection = function(game){
	console.log("Player Selection");

};

player_selection.prototype = {

	preload: function(){
		game.load.image('read_history', 'assets/read_history_btn.png');
		game.load.image('play_btn', 'assets/play-btn.png');
		game.load.audio('background-music','sounds/background-music.mp3');
		game.load.image('background', 'assets/character-selection.jpg');
	},

	read_history_btn_player1: null,
	read_history_btn_player2: null,
	play_btn: null,
	background_music: null,
	create: function(){
	
		this.read_history_btn_player1 = game.add.sprite(80,150, 'read_history');
		this.read_history_btn_player2 = game.add.sprite(520,150, 'read_history');
		this.play_btn = game.add.sprite(330,530, 'play_btn');
		this.background_music = game.add.audio('background-music');
		this.background_music.play();
		game.add.sprite(0,0,'background');

	},

	update: function(){
		console.log('update player selection');


		this.read_history_btn_player1.inputEnabled = true;
		this.read_history_btn_player1.input.useHandCursor = true;
		this.read_history_btn_player1.events.onInputDown.add(this.historyPlayer1, this);

		this.read_history_btn_player2.inputEnabled = true;
		this.read_history_btn_player2.input.useHandCursor = true;
		this.read_history_btn_player2.events.onInputDown.add(this.historyPlayer2, this);

		this.play_btn.inputEnabled = true;
		this.play_btn.input.useHandCursor = true;
		this.play_btn.events.onInputDown.add(this.startGame, this);



	},

	startGame(){
		console.log('start game');
		this.background_music.stop();
		game.state.start('main');
	},

	historyPlayer1(){
		console.log('historia de player 1');
		this.background_music.stop();
		game.state.start('player_two_history');
	},

		historyPlayer2(){
		console.log('historia de player 2');
		this.background_music.stop();
		game.state.start('player_one_history');
	}

}