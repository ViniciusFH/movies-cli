const arg = require('arg');
const inquirer = require('inquirer');
const movies = require('./main');

function parseOptions(argv) {

	const options = arg(
		{
			'-d': Boolean,
			'-i': Boolean,
			'-s': Boolean,
			'-m': Boolean,
			'-f': String,
			'-l': String,
			'-p': String,
			'--seed': Boolean
		},

		{
			argv,
			permissive: true
		}
	);

	return {
		download: options['-d'] || false,
		myMovies: options['-m'] || false,
		getInfo: options['-i'] || false,
		seed: options['--seed'] || false,
		mustDownloadSub: options['-s'] || false,
		tokensToFilter: options['-f'] ? options['-f'].split(' ') : [],
		subLanguage: options['-l'] || /*[ */'eng'/*, 'pob' ]*/,
		downloadPath: options['-p'] || require('os').homedir() + '/Downloads',
		others: options._ || [],
	};
}

function promptForAction(options) {

	if (options.download ||
		options.myMovies ||
		options.getInfo ||
		options.seed) {

		return options;


	};

	return inquirer.prompt([{

		name: 'action',
		message: 'Select an option:',
		type: 'list',
		choices: [
			{ name: 'Download movie', value: 'download' },
			{ name: 'Get movie info', value: 'getInfo' },
			{ name: 'Seed', value: 'seed' },
			{ name: 'See my movies', value: 'myMovies' }
		]
	
	}])

		.then(results => {

			options[results.action] = true;

			return options;

		});

}

function promptForMovieName(options) {

	const nonOptions = options.others.filter(opt => opt.indexOf('-') !== 0);

	if (nonOptions.length) {

		options.movieName = nonOptions[0];

		return options;

	};

	return inquirer.prompt([{

			name: 'movieName',
			message: 'What movie?',
			validate: input => /\w/.test(input)
		
		}])

		.then(results => {

			options.movieName = results.movieName;

			return options;

		});

}


module.exports = async args => {

	const argv = args.slice(2);

	let options = parseOptions(argv);

	options = await promptForAction(options);

	if (options.download || options.getInfo) {

		options = await promptForMovieName(options);

		return movies(options);

	};

	return movies(options);

};