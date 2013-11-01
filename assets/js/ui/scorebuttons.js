define([
	'flight',
	'handlebars',
	'text!templates/scorebuttons.hbs'
],
function (Flight, Handlebars, scorebuttonHtml) {

	function ScoreButtons () {
		this.template = Handlebars.compile(scorebuttonHtml);

		this.defaultAttrs({
            scoreButtonList: '.js-scorebuttons-list',
            scoreButtonItems: '.js-scorebuttons-list > li',
            scoreButtonLeft: '.js-left-scorebutton',
            scoreButtonRight: '.js-right-scorebutton'
        });

		this.after('initialize', function () {
			this.render();

			this.on('click', { 'scoreButtonLeft': this.scoreButtonLeftClicked });
			this.on('click', { 'scoreButtonRight': this.scoreButtonRightClicked });
		});

		this.render = function () {			
			this.leftPlayer = this.attr.game.players[0];
			this.rightPlayer = this.attr.game.players[1];
			
			this.$node.html(this.template({ leftPlayer: this.leftPlayer, rightPlayer: this.rightPlayer }));

			var contentWidth = 0;

            this.select('scoreButtonItems').each(function() {
                contentWidth += $(this).outerWidth( true );
            });

            this.select('scoreButtonList').css('width', (contentWidth + 20) + 'px');
		};

		this.scoreButtonRightClicked = function (e) {
			e.preventDefault();
			this.playerScored(this.rightPlayer);
		};

		this.scoreButtonLeftClicked = function (e) {
			e.preventDefault();
			this.playerScored(this.leftPlayer);
		};

		this.playerScored = function (scoringPlayer) {
			this.attr.game.scored(scoringPlayer);
			this.render();
			this.trigger('scorebuttons:playerscored', scoringPlayer);
		};
	}

	return flight.component(ScoreButtons);
});