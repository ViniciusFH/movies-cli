const WebTorrent = require('webtorrent');
const progress = require('cli-progress');
const chalk = require('chalk');

module.exports = async (ID, path) => {

	return new Promise((resolve, reject) => {

		const client = new WebTorrent();

		client.add(ID, { path }, torrent => {

			const downloadedFiles = torrent.files;

			const downloadBar = new progress.SingleBar({

				format: '{bar} | {percentage}% || {value}/{total}Mbs || Speed: {speed}'

			}, progress.Presets.shades_classic);

			downloadBar.start( Math.floor(torrent.length / 1e+6), 0, { speed: 'N/A' } );

			torrent.on('download', b => {

				downloadBar.update(Math.floor(torrent.downloaded / 1e+6));

				return;

			});

			torrent.on('done', () => {

				downloadBar.stop();

				console.log('Finished!');

				torrent.destroy();
				client.destroy();

				return resolve(downloadedFiles);

			});

		});

	});


};