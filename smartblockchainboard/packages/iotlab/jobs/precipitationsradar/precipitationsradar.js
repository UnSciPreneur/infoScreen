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
 *     { url : 'http://meteo.search.ch/images/cosmo/PREC/' },
 *     { timeframe : 3600 }
 *   ]
 * }
 */

var timeOffset = 0;
var dateFormat = require('dateformat');

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

        // ToDo: move the logic that verifies urls here and cache the result
        
        jobCallback(null, {
            imageSrc: config.url + timeStamp + '.png',
            imageDesc: dateFormat(new Date(timeStamp * 1000), 'mmmm dS, HH:MM'),
            title: config.widgetTitle
        });
    }
};