widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('h2', el).text(data.title);
    }

    var htmlcontent = '<table>';
    htmlcontent += '<tr><td width="60%">Noise:</td><td>' + data.html.Noise + ' db</td></tr>';
    htmlcontent += '<tr><td>Temperature:</td><td>' + data.html.Temperature + ' °C</td></tr>';
    htmlcontent += '<tr><td>Humidity:</td><td>' + data.html.Humidity + ' %</td></tr>';
    htmlcontent += '<tr><td>Pressure:</td><td>' + data.html.Pressure + ' mbar</td></tr>';
    htmlcontent += '<tr><td>CO2:</td><td>' + data.html.CO2 + ' ppm</td></tr>';

    htmlcontent += '</table>';

    $('.content', el).html(htmlcontent);
  }
};