module.exports = (torrents, tokensToFilter) => {

	if (tokensToFilter) {

		torrents = torrents.filter(t => {

			let mappedTitle = t.title.split(/[\W]+/).map(w => w.toLowerCase());

			return tokensToFilter.every(f => mappedTitle.includes(f));
		})
	};

	torrents.sort((t1, t2) => (t2.peers + t2.seeds) - (t1.peers + t1.seeds));

	return torrents;
};