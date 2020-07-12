const progress = require('cli-progress');
const chalk = require('chalk');

module.exports = new progress.MultiBar({

	format: `${chalk.white('{file}')}\t|\t${chalk.yellow('Speed: {speed}kb/s')}\t|\t${chalk.green('Uploaded: {value}kb')}`,
	hideCursor: true

}, progress.Presets.shades_classic);