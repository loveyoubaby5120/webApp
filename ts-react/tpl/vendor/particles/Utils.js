/*
 * Get rand number between x and y.
 * @param {int} x Minimal number.
 * @param {int} y Maximal number.
 * @param {Boolean} round True is value shouldn't be round.
 * @return {int} Rand number.
 * @static
 */
export function getRandNumber(x, y, round){
	var value;

	if(x == null) {
		x = 0;
	}

	if(y == null) {
		y = 10;
	}

	if(round == null) {
		round = true;
	}

	value = Math.random() * (y - x) + x;

	return (round) ? Math.round(value) : value;
};

/*
 * Get distance between to cartesian points.
 * @param {int} x First object abscissa coords.
 * @param {int} y First object ordered coords.
 * @param {int} x2 Second object abscissa coords.
 * @param {int} y2 Second object ordered coords.
 * @return {int} Distance.
 * @static
 */
export function getDistance(x, y, x2, y2){
	return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
};

/*
 * Get mouse position.
 * @param {Object} event The HTML DOM events.
 * @param {Object} element The DOM element.
 * @return {Object} x/y position.
 * @static
 */
export function getMousePosition(event, element){
	if (typeof element === 'undefined') {
		element = document.body;
	}

	var rect = element.getBoundingClientRect();

	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}
