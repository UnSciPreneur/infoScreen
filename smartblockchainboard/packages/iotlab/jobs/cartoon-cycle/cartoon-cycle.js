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

    // ## 1. USE OF DEPENDENCIES ##
    // You can use the following dependencies in your job:
    // - dependencies.easyRequest : a wrapper on top of the "request" module
    // - dependencies.request : the popular http request module itself
    // - dependencies.logger : atlasboard logger interface
    // - dependencies.underscore
    // - dependencies.moment
    // - dependencies.storage : a simple persistance layer for Atlasboard    

    // # 2. CONFIGURATION CHECK
    // You probably want to check that the right configuration has been passed to the job.
    // You can add unit tests to ensure this (see test/wetter-online file)
    // Your config check may look something like this:
    // if (!config.globalAuth || !config.globalAuth[authName] ||
    //   !config.globalAuth[authName].username || !config.globalAuth[authName].password) {
    //   return job_callback('no credentials found in the wetter-online job. Please check the global authentication file!');
    // }

    // # 3. USE OF JOB_CALLBACK
    // Using nodejs callback standard conventions, you should return an error or null (if success) 
    // as the first parameter, and the actual data to be sent to the widget as the second parameter. 
    // Atlasboard will deal with the rest.

    // This is an example of how to make an HTTP call to google using the easyRequest dependency, 
    // and send the result to the registered atlasboard widgets.
    // Have a look at test/wetter-online for an example of how to unit tests this easily by mocking easyRequest calls
    /*
    dependencies.easyRequest.HTML('http://www.niederschlagsradar.de/image.ashx?type=loop1stunde&jaar=&regio=homepage&tijdid=201503131515&time=&bliksem=0', function(err, html){
      //  dependencies.logger.log(JSON.stringify(html));
      job_callback(err, { title: config.widgetTitle, html: html });
    });
    */
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
            var result = $('#comic img', body).attr('src');
            job_callback(null, {pageSrc: 'http://xkcd.com', imageSrc: result, title: config.widgetTitle });
        }
    });

};
