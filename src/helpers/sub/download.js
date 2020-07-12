const request = require('request');
const util = require('util');
const writeFileAsync = util.promisify(require('fs').writeFile);
const zlib = require('zlib');

module.exports = (url, path) => {

	return new Promise((resolve, reject) => {

		return request( { url, encoding: null },
			
			(err, res, data) => {
		
				if (err) return resolve(false);

				return zlib.unzip(data, async (err, buff) => {

					if (err) return resolve(false);

					try {

						await writeFileAsync(path, buff);

					} catch (e) { return resolve(false) };

					return resolve(true);

				});

			});

	});


};