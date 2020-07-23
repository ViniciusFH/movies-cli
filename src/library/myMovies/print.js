const fetchTorrentsPath = require('../../helpers/torrent/torrentsPath').fetch;
const print = require('../../helpers/screen/myMovies/print');

module.exports = async () => {

	const torrentsPath = await fetchTorrentsPath();

	if (!torrentsPath.length) {

		console.log(`You still have no movies.`);

		return Promise.resolve();

	};

	const torrents = torrentsPath.map(path => {

		return {

			path,
			title: /\/([^\/]+)$/.exec(path)[1]

		};
	});	

	return print(torrents);

};