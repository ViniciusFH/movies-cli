const WebTorrent = require('webtorrent');
const multiBar = require('../cli/multiBar');
const chalk = require('chalk');
const parseBytes = require('../utils/parseBytes');

module.exports = async (paths) => {

	return new Promise((resolve, reject) => {

		const client = new WebTorrent();
		const seedsInfo = { } ;

		paths.forEach(path => {

			client.seed(path, torrent => {

				seedsInfo[path] = multiBar.create(Infinity, 0, { speed: '0kb/s', file: torrent.name });

				torrent.on('upload', b => {

					let { quantity, measure } = parseBytes(torrent.uploadSpeed);

					seedsInfo[path].update(b / 1000, { speed: `${quantity}${measure}/s` })

				})

			});
		});

	});


};