/**
 * Job: trello
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

    /*
    This is a good place for initialisation logic, like registering routes in express:

    dependencies.logger.info('adding routes...');
    dependencies.app.route("/jobs/mycustomroute")
        .get(function (req, res) {
          res.end('So something useful here');
        });
    */
  },

  /**
   * Executed every interval
   * @param config
   * @param dependencies
   * @param jobCallback
   */
  onRun: function (config, dependencies, jobCallback) {
    //var logger = dependencies.logger;

    var Trello = require("trello");
    var trello = new Trello(config.trelloAppKey, config.trelloUserToken);

    var result = {};

    console.log("Getting lists");
    trello.getListsOnBoard(config.trelloBoardId, function (err, trelloLists) {

      console.log("Getting cards");
      var listCount = 0;

      trelloLists.forEach(function (list) {
        result[list.id] = {name: list.name, topics: {}};

        trello.getCardsOnList(list.id,  function (err, trelloCards) {
          var i = 0;
          trelloCards.forEach(function (card) {
            result[list.id]["topics"][i] = card.name;
            i++;
          });

          listCount += 1;
          if (trelloLists.length === listCount) {
            jobCallback(err, {title: config.widgetTitle, lists: result});
          }
        });
      });
    });

  }
};