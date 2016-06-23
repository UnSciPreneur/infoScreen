/**
 * Job: precipitationsradar
 *
 * This plugins reads recordings and predictions from http://meteo.search.ch/prognosis
 *
 * Expected configuration:
 *
 * ## PLEASE ADD AN EXAMPLE CONFIGURATION FOR YOUR JOB HERE
 * { 
 *   myconfigKey : [
 *     { widgetTitle : 'Precipitations' },
 *     { url : 'http://meteo.search.ch/images/cosmo/PREC1/' },
 *     { timeframe : 3600 }
 *   ]
 * }
 */

var timeOffset = 0;
var dateFormat = require('dateformat');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var cacheManager = require('cache-manager');
var memoryCache = cacheManager.caching({store: 'memory', max: 100, ttl: 1000/*seconds*/});
var ttl = 1000/*seconds*/;

module.exports = {

    /**
     * Executed on job initialisation (only once)
     * @param config
     * @param dependencies
     */
    onInit: function (config, dependencies) {
        timeOffset = - config.timeframe;
    },

    /**
     * Executed every interval
     * @param config
     * @param dependencies
     * @param jobCallback
     */
    onRun: function (config, dependencies, jobCallback) {
        var timeStamp = Math.round(new Date().getTime() / 600000) * 600  + timeOffset;

        if (timeOffset < config.timeframe) {
            timeOffset += 600;
        }
        else {
            timeOffset = -config.timeframe;
        }

        var imageSrc = config.url + timeStamp + '.png';

        memoryCache.get(imageSrc, function(err, result){
            if ( err || result == undefined ) {
                checkImageURL(imageSrc, function(imageSrc, isAvailable) {
                    if (isAvailable) {
                        dependencies.logger.trace("caching [" + imageSrc + "]=" + imageSrc);
                        memoryCache.set(imageSrc, imageSrc, {ttl:ttl});
                    } else {
                        dependencies.logger.trace("caching [" + imageSrc + "]=" + 'http://meteo.search.ch/images/0.gif');
                        memoryCache.set(imageSrc, 'http://meteo.search.ch/images/0.gif', {ttl:ttl});
                    }
                });
            }

            jobCallback(null, {
                imageSrc: result,
                imageDesc: dateFormat(new Date(timeStamp * 1000), 'mmmm dS, HH:MM'),
                title: config.widgetTitle
            });
        });
    }
};

function checkImageURL(url, callback) {
    var reader = new XMLHttpRequest();

    // Opens the file and specifies the method (get)
    // Asynchronous is true
    reader.open('GET', url, true);
    reader.setRequestHeader('Access-Control-Allow-Origin', '*');

    reader.onreadystatechange = checkReadyState;
    reader.send();

    function checkReadyState() {
        if (reader.readyState === 4 /*XMLHttpRequest.DONE*/) {
            // check to see whether request for the file failed or succeeded
            // the meteo.search.ch server does send a 200 response even if the file is not available,
            // i.e., even if the response has 0 bytes

            var responseHeader = reader.getAllResponseHeaders();
            var contentLength = responseHeader.match(/content-length: [0-9]*/g);
            if( contentLength != null && contentLength.length > 0 ) {
                var length = contentLength[0];
                callback(url, ((reader.status == 200 && length !== "content-length: 0") || (reader.status == 0)) );
            }
        }
    }

}