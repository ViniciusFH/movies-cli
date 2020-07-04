module.exports = (torrents, filter) => {

	if (filter) {

		torrents.filter(t => {

			let mappedTitle = t.title.split(/[\W]+/).map(w => w.toLowerCase());

			return filter.every(f => mappedTitle.includes(f));
		})
	};

	torrents.sort((t1, t2) => (t2.peers + t2.seeds) - (t1.peers + t2.seeds));

	return torrents;
};