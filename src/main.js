const inquirer = require('inquirer');
const fetchTorrents = require('./utils/torrent/fetch');
const downloadTorrent = require('./utils/torrent/download');

function promptForTorrents(torrents) {

	return inquirer.prompt([{

		type: 'rawlist',
		name: 'selectedTorrent',
		message: 'Select your movie (ordered by peers/seeds):',
		choices: torrents.map((t, i) => {

			return { name: t.title, value: i };
		})

	}])


	.then(answers => torrents[answers.selectedTorrent]);

};

module.exports = async options => {

	const { query, action, path, filter, downloadSub, subLanguage } = options;

	if (action === 'download') {

		const torrents = await fetchTorrents(query);

		const selectedTorrent = await promptForTorrents(torrents);

		const torrentID = selectedTorrent.magnet || selectedTorrent.link;

		const downloadedFiles = await downloadTorrent(torrentID, path);

		console.log(selectedTorrent);

	};

	return;
}