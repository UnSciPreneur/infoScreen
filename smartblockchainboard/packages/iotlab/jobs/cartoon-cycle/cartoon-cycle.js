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

module.exports = function(config, dependencies, job_callback) {

    var logger = dependencies.logger;
    var options = {
        url: config.url
    };

    dependencies.request(options, function(err, response, body) {
        if (err || !response || response.statusCode != 200) {
            var err_msg = err || "ERROR: Couldn't access the web page at " + options.url;
            logger.error(err_msg);
            job_callback(err_msg);
        } else {
            var imgUrl = $('#comic img', body).attr('src');
            var pageUrl = extractPageUrl($('#middleContainer', body).text());
            job_callback(null, {pageSrc: pageUrl, imageSrc: imgUrl, title: config.widgetTitle });
        }
    });

};

function extractPageUrl(html) {
    var res = html.match(/Permanent link to this comic: http:\/\/xkcd.com\/\d+\//);
    res = res[0].substring(30);
    return res;
}
