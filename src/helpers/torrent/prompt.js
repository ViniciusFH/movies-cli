const inquirer = require('inquirer');

function forDownload(torrents) {

	return inquirer.prompt([{

		type: 'rawlist',
		name: 'selectedTorrent',
		message: 'Select your movie (ordered by peers/seeds):',
		choices: torrents.map((t, i) => {

			return { name: `${t.title} | s/p: ${t.seeds}/${t.peers} | Size: ${t.size}`, value: i };
		})

	}])


	.then(answers => torrents[answers.selectedTorrent]);

}

function forSeed(torrents) {

	torrents.unshift( { name: 'All', path: 'All' } );

	return inquirer.prompt([{

		type: 'list',
		name: 'selectedTorrent',
		message: 'Select the movie you would like to seed:',
		choices: torrents.map((t, i) => {

			return { name: t.title, value: t.path };
		})

	}])


	.then(answers => answers.selectedTorrent);

}

module.exports = { forDownload, forSeed } ;