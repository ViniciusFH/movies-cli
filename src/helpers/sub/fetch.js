const OS = require('opensubtitles-api');
const OpenSubtitles = new OS({
    useragent: 'TemporaryUserAgent',
    username: 'Lodono',
    password: 'bocegajen',
    ssl: true
});

const ISO3to2 = require('./ISO3to2');

module.exports = async (filePath, languageISO3) => {

	const subtitles = await OpenSubtitles.search( {
		path: filePath,
		sublanguageid: languageISO3,
		gzip: true
	} );

	const languageISO2 = ISO3to2[languageISO3];

	const subInfo = subtitles.hasOwnProperty(languageISO2) ? subtitles[languageISO2] : null;

	return Promise.resolve(subInfo); 

};