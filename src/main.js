const downloadTorrent = require('./library/torrent/download');
const downloadSub = require('./library/sub/download');
const seedTorrent = require('./library/torrent/seed');
// const getMovieInfo = require('./utils/torrent/main');
const movieExtensionsRegex = require('./helpers/sub/movieExtensionsRegex');

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

	if (action === 'seed') {

		return seedTorrent();

	};

	if (action === 'getInfo') {


	};

	return Promise.resolve();
}