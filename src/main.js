const downloadTorrent = require('./library/torrent/download');
const downloadSub = require('./library/sub/download');
const seedTorrent = require('./library/torrent/seed');
const printMyMovies = require('./library/myMovies/print');
// const getMovieInfo = require('./utils/torrent/main');
const movieExtensionsRegex = require('./helpers/sub/movieExtensionsRegex');

module.exports = async options => {

	const { downloadPath, tokensToFilter, mustDownloadSub, subLanguage } = options;

	if (options.download) {

		const { movieName } = options; 

		const downloadedFiles = await downloadTorrent(movieName, downloadPath, tokensToFilter);

		if (!mustDownloadSub) return Promise.resolve();

		if (downloadedFiles.some(file => /\.srt$/.test(file))) return Promise.resolve();

		const movieFile = downloadedFiles
			.filter(file => movieExtensionsRegex
				.some(extension => extension.test(file.name)))[0];

		const movieFilePath = downloadPath + '/' + movieFile.path;

		await downloadSub(movieFilePath, subLanguage);

	}

	else if (options.myMovies) {

		return printMyMovies();

	}

	else if (options.seed) {

		return seedTorrent();

	}

	else if (options.getInfo) {


	};

	return Promise.resolve();
}