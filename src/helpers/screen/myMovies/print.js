const Table = require('tty-table');
const header = require('./header');

module.exports = movies => {

	let rows = movies.map(m => [m.title, 'No']);

	const output = Table(header, rows).render();

	console.log(output);

	return;

}


