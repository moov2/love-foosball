define([
	'flight',
	'handlebars',
	'text!templates/scorebuttons.hbs'
],
function (Flight, Handlebars, scorebuttonHtml) {

	function ScoreButtons () {
		this.template = Handlebars.compile(scorebuttonHtml);

		this.after('initialize', function () {
			this.leftPlayer = this.attr.game.players[0];
			this.rightPlayer = this.attr.game.players[1];

			this.render();
		});

		this.render = function () {
			this.$node.html(this.template({ leftPlayer: this.leftPlayer, rightPlayer: this.rightPlayer }));
		};
	}

	return flight.component(ScoreButtons);
});