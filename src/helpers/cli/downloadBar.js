const progress = require('cli-progress');

module.exports = new progress.SingleBar({

	format: '{bar} | {percentage}% || {value}/{total}Mb | Speed: {speed}',
	hideCursor: true

}, progress.Presets.shades_classic);