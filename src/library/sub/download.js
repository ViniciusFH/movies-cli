const fetch = require('../../helpers/sub/fetch');
const download = require('../../helpers/sub/download');

module.exports = async (movieFilePath, subLanguage) => {

	console.log(movieFilePath);

	console.log('Searching subtitles...');

	const subInfo = await fetch(movieFilePath, subLanguage);

	if (!subInfo) return Promise.resolve();

	subPath = movieFilePath.replace(/\.\w+$/, '.' + subInfo.format);

	console.log(subPath);
	console.log('Downloading...');

	const downloadedSub = await download(subInfo.url, subPath);

};