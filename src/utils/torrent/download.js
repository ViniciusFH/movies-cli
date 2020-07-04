const WebTorrent = require('webtorrent');
const chalk = require('chalk');
const downloadBar = require('../downloadBar');

module.exports = async (ID, path) => {

	return new Promise((resolve, reject) => {

		const client = new WebTorrent();

		client.add( ID, { path }, torrent => {

			console.log(`\nDownloading ${torrent.name}\n`);

			const downloadedFiles = torrent.files;

			downloadBar.start(Math.floor(torrent.length / 1e+6), 0);

			torrent.on('download', b => {

				downloadBar.update(Math.floor(torrent.downloaded / 1e+6));

				return;

			});

			torrent.on('done', () => {

				downloadBar.update(Math.floor(torrent.length / 1e+6))
				downloadBar.stop();

				console.log('\nFinished!');

				torrent.destroy();
				client.destroy();

				return resolve(downloadedFiles);

			});

		});

	});


};