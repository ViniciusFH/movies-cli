const WebTorrent = require('webtorrent');
const chalk = require('chalk');
const downloadBar = require('../cli/downloadBar');
const parseBytes = require('../utils/parseBytes');
const saveTorrentPath = require('../../helpers/torrent/torrentsPath').save;

module.exports = async (ID, path) => {

	return new Promise((resolve, reject) => {

		const client = new WebTorrent();

		client.add( ID, { path }, torrent => {

			console.log(`\nDownloading ${torrent.name}\n`);

			// Adiciona o torrent a uma lista para facilitar o seed após o download.
			saveTorrentPath(path + '/' + torrent.name)

			const downloadedFiles = torrent.files;

			downloadBar.start(Math.floor(torrent.length / 1e+6), 0, { speed: '0kb/s' });

			torrent.on('download', b => {

				let { quantity, measure } = parseBytes(torrent.downloadSpeed);

				downloadBar.update(Math.floor(torrent.downloaded / 1e+6), { speed: `${quantity}${measure}/s` });

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