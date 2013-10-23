(function() {

/**
 * Collect GIFs from chat.meatspac.es
 */
function collectMeat() {
	// Messages that haven't been scraped yet.
	var lis = document.querySelectorAll('.chats li[data-key]:not(.scraped)');
	for (var li of lis) {
		li.className += ' scraped';
		var key = li.getAttribute('data-key');

		var src = li.querySelector('img').src;
		// Extract data from data URI
		var gif = atob(src.substr(src.indexOf(',') + 1));
		self.port.emit('foundMeat', [key, gif]);
	}
}

// Collect new images every few seconds.
setInterval(collectMeat, 5000);

})();
