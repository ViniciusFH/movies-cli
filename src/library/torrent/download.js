const prompt = require('../../helpers/torrent/prompt').forDownload;
const fetch = require('../../helpers/torrent/fetch');
const download = require('../../helpers/torrent/download');
const fix = require('../../helpers/torrent/fix');

module.exports = async (query, path, tokensToFilter) => {

	let torrents = await fetch(query);

	torrents = fix(torrents, tokensToFilter);

	const selectedTorrent = await prompt(torrents);

	const torrentID = selectedTorrent.magnet || selectedTorrent.link;

	const downloadedFiles = await download(torrentID, path);

	return downloadedFiles;

}