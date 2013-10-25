var data = require('sdk/self').data;
var file = require('file');
var pageMod = require('sdk/page-mod');

// Download directory
var dldir = require('sdk/system').pathFor('DfltDwnld');
// TODO make this configurable
var fridge = file.join(dldir, 'meatspaces');

/**
* Take a data URL, store it as a gif.
*/
function refrigerateMeat(data) {
    var name = data[0];
    var gif = data[1];
    var filename = file.join(fridge, name + '.gif');

    if (file.exists(filename)) return;

    // Ensure target dir exists.
    file.mkpath(fridge);

    // Write file.
    var output = file.open(filename, 'wb');
    output.write(gif);
    output.close();
}

pageMod.PageMod({
    include: 'http://chat.meatspac.es/',
    contentScriptFile: data.url('js/refrigerateur.js'),
    onAttach: function(worker) {
        worker.port.on('foundMeat', refrigerateMeat);
    }
});
