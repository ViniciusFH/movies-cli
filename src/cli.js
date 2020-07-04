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
		 '-p': String
		},

		{
		 argv,
		}
	);

	return {
		filter: options['-f'],
		action: options['-i'] ? 'getInfo' : 'download',
		downloadSub: options['-s'] || false,
		subLanguage: options['-l'] || [ 'eng', 'pob' ],
		path: options['-p'] || require('os').homedir() + '/Downloads/'
	};
};

function promptForQuery() {

	return inquirer.prompt([{

		name: 'query',
		message: 'Query:',
		validate: input => /\w/.test(input)
	
	}])


	.then(answers => answers.query);


};

module.exports = async args => {

	let argv = args.slice(2);

	let options = parseOptions(argv);

	if (argv[0] &&
		argv[0].indexOf('-') !== 0) {

		options.query = argv[0];
	
	};

	if (!options.query) options.query = await promptForQuery();

	return movies(options);	

};