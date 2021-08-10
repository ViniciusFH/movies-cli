const TorrentSearchApi = require('torrent-search-api');
const chalk = require('chalk');

TorrentSearchApi.enableProvider('ThePirateBay');
TorrentSearchApi.enableProvider('Yts');
// TorrentSearchApi.enableProvider('KickassTorrents');

module.exports = async query => {

	let torrents = [ ] ;

	try {

		torrents = await TorrentSearchApi.search(query, 'All');

		// Remove ThePirateBay's 'No results found' object.
		torrents = torrents.filter(t => t.id !== '0');

	} catch (e) {

		console.log('Torrents query failed!');

	};

	return torrents;

};