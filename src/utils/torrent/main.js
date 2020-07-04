const inquirer = require('inquirer');
const fetch = require('./fetch');
const download = require('./download');
const fix = require('./fix');

module.exports = async (query, path, tokensToFilter) => {

	let torrents = await fetch(query);

	torrents = fix(torrents, tokensToFilter);

	const selectedTorrent = await promptForTorrents(torrents);

	const torrentID = selectedTorrent.magnet || selectedTorrent.link;

	const downloadedFiles = await download(torrentID, path);

	return downloadedFiles;

}

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

