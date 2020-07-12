module.exports = bytes => {

	let quantity = bytes,
	measure = 'b';

	if (bytes >= 1000000) {
		quantity = (bytes / 1e+6).toFixed(1);
		measure = 'mb';
	}

	else if (bytes >= 1000) {
		quantity = Math.floor(bytes / 1000);
		measure = 'kb';

	};

	return { quantity, measure };

}