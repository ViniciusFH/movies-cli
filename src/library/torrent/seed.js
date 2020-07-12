const fetchTorrentsPath = require('../../helpers/torrent/torrentsPath').fetch;
const prompt = require('../../helpers/torrent/prompt').forSeed;
const seed = require('../../helpers/torrent/seed');

module.exports = async () => {

	const torrentsPath = await fetchTorrentsPath();

	if (!torrentsPath.length) {

		console.log(`No movies for seeding were found.`);

		return Promise.resolve();

	};

	const torrents = torrentsPath.map(path => {

		return {

			path,
			title: /\/([^\/]+)$/.exec(path)[1]

		};
	});

	const selectedPath = await prompt(torrents);

	const torrentsToSeed = selectedPath === 'All' ? torrentsPath : [ selectedPath ] ;

	return seed(torrentsToSeed);

};