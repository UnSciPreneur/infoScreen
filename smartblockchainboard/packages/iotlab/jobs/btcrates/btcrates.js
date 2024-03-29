/**
 * Job: btcrates
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

module.exports = {

  /**
   * Executed on job initialisation (only once)
   * @param config
   * @param dependencies
   */
  onInit: function (config, dependencies) {
    
  },

  /**
   * Executed every interval
   * @param config
   * @param dependencies
   * @param jobCallback
   */
  onRun: function (config, dependencies, jobCallback) {

    dependencies.easyRequest.HTML(config.url, function (err, body) {
      if (err) {
        var errMsg = err || "ERROR: Couldn't access the web page at " + config.url;
        dependencies.logger.warn(errMsg);
        // ToDo: do a more graceful recovery here
        jobCallback(errMsg);
      } else {
        // dependencies.logger.trace(html);
        jobCallback(err, {title: config.widgetTitle, html: body});
      }
      
    });
  }
};