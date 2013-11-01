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
            scoreButtonItems: '.js-scorebuttons-list > li'
        });

		this.after('initialize', function () {
			this.leftPlayer = this.attr.game.players[0];
			this.rightPlayer = this.attr.game.players[1];

			this.render();

			var contentWidth = 0;

            this.select('scoreButtonItems').each(function() {
                contentWidth += $(this).outerWidth( true );
            });

            this.select('scoreButtonList').css('width', (contentWidth + 20) + 'px');
		});

		this.render = function () {
			this.$node.html(this.template({ leftPlayer: this.leftPlayer, rightPlayer: this.rightPlayer }));
		};
	}

	return flight.component(ScoreButtons);
});