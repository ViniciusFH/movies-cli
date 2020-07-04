const progress = require('cli-progress');

module.exports = new progress.SingleBar({

	format: '{bar} | {percentage}% || {value}/{total}Mbs'

}, progress.Presets.shades_classic);