/**
 * Job: wetter-online
 *
 * Expected configuration:
 *
 * ## PLEASE ADD AN EXAMPLE CONFIGURATION FOR YOUR JOB HERE
 * { 
 *   myconfigKey : [ 
 *     { serverUrl : 'localhost' } 
 *   ]
 * }
 */

var $ = require('cheerio');

module.exports = function(config, dependencies, jobCallback) {

    dependencies.easyRequest.HTML(config.url, function(err, body) {
        if (err) {
            var errMsg = err || "ERROR: Couldn't access the web page at " + config.url;
            dependencies.logger.warn(errMsg);
            // ToDo: do a more graceful recovery here
            jobCallback(errMsg);
        } else {
            var imgUrl = $('#comic img', body).attr('src');
            var pageUrl = extractPageUrl($('#middleContainer', body).text());
            jobCallback(err, {pageSrc: pageUrl, imageSrc: imgUrl, title: config.widgetTitle });
        }
    });

};

function extractPageUrl(html) {
    var res = html.match(/Permanent link to this comic: http:\/\/xkcd.com\/\d+\//);
    res = res[0].substring(30);
    return res;
}
