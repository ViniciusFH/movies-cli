const arg = require('arg');
const inquirer = require('inquirer');
const movies = require('./main');

function parseOptions(argv) {

	const options = arg(
		{
		 '-i': Boolean,
		 '-f': String,
		 '-s': Boolean,
		 '-l': String,
		 '-p': String,
		 '--seed': Boolean
		},

		{
		 argv,
		}
	);

	return {
		tokensToFilter: options['-f'] ? options['-f'].split(' ') : null,
		getInfo: options['-i'],
		seed: options['--seed'],
		mustDownloadSub: options['-s'] || false,
		subLanguage: options['-l'] || /*[ */'eng'/*, 'pob' ]*/,
		downloadPath: options['-p'] || require('os').homedir() + '/Downloads'
	};
};

function promptForQuery() {

	return inquirer.prompt([{

		name: 'query',
		message: 'Which movie?',
		validate: input => /\w/.test(input)
	
	}])


	.then(answers => answers.query);


};

module.exports = async args => {

	let argv = args.slice(2);

	let options = parseOptions(argv);
	
	if (options.seed && options.getInfo) {

		console.log('Arguments -i and --seed are mutually exclusive. Choose one of them.');

		return;

	};

	if (options.seed || options.getInfo) {

		options.action = options.seed ? 'seed' : 'getInfo';

		return movies(options);

	};

	options.action = 'download';

	if (argv[0] &&
		argv[0].indexOf('-') !== 0) {

		options.query = argv[0];
	
	};


	if (!options.query) options.query = await promptForQuery();

	return movies(options);

};