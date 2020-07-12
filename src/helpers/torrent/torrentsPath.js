const fs = require('fs');
const home = require('os').homedir();
const util = require('util');
const readFileAsync = util.promisify(require('fs').readFile);

async function fetch() {

	try {

		var data = await readFileAsync(home + '/.movies-cli/torrents.txt', 'utf8');

	} catch (e) {

		console.log(`ERR! Something is wrong with your file system!`);

		return Promise.resolve([]);

	};

	if (!data) {

		return Promise.resolve([]);

	};

	const torrents = data.split('\n');

	torrents.pop();

	return Promise.resolve(torrents);

};

function save(path) {

	if (!path) return false;

	return fs.appendFile(home + '/.movies-cli/torrents.txt', `${path}\n`, err => {

		if (err) console.log(`ALERT! This torrent will probably fail its seeding.`);

	});

}

module.exports = { fetch, save } ;