var netatmo = require('netatmo');
var auth;
var api;

module.exports = {

  /**
   * Executed on job initialisation (only once)
   * @param config
   * @param dependencies
   */
  onInit: function (config, dependencies) {

    auth = {
      "client_id": config.clientId,
      "client_secret": config.clientSecret,
      "username": config.userName,
      "password": config.passWord
    };
    api = new netatmo(auth);
  },

  /**
   * Executed every interval
   * @param config
   * @param dependencies
   * @param jobCallback
   */
  onRun: function (config, dependencies, jobCallback) {

    var logger = dependencies.logger;

    // See docs: http://dev.netatmo.com/doc/restapi/devicelist
    api.getDevicelist(function (err, devices, modules) {
      logger.log(devices[0]['dashboard_data']);
      jobCallback(err, {title: config.widgetTitle, html: devices[0]['dashboard_data']});
    });
  }
};