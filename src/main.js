const downloadTorrent = require('./utils/torrent/main');
const downloadSub = require('./utils/sub/main');
const getTorrentInfo = require('./utils/torrent/main');
const movieExtensionsRegex = require('./utils/movieExtensionsRegex');

module.exports = async options => {

	const { query, action, downloadPath, tokensToFilter, mustDownloadSub, subLanguage } = options;

	if (action === 'download') {

		const downloadedFiles = await downloadTorrent(query, downloadPath, tokensToFilter);

		if (!mustDownloadSub) return Promise.resolve();

		if (downloadedFiles.some(file => /\.srt$/.test(file))) return Promise.resolve();

		const movieFile = downloadedFiles
			.filter(file => movieExtensionsRegex
				.some(extension => extension.test(file.name)))[0];

		const movieFilePath = downloadPath + '/' + movieFile.path;

		await downloadSub(movieFilePath, subLanguage);

	};

	return Promise.resolve();
}