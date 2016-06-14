widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('h2', el).text(data.title);
    }

    var htmlcontent = '<table class="trellotable"><thead><tr>';

    for (var h = 0, hkeys = Object.keys(data.lists), hh = hkeys.length; h < hh; h++) {
      htmlcontent += '<td>' + data.lists[hkeys[h]].name + '</td>';
    }

    htmlcontent += '</tr></thead><tbody><tr>';

    for (var i = 0, keys = Object.keys(data.lists), ii = keys.length; i < ii; i++) {
      htmlcontent += '<td><ul>';
      $.each(data.lists[keys[i]].topics, function (index, value){
        htmlcontent += '<li>' + value + '</li>';
      });
      htmlcontent += '</ul></td>';
    }
    htmlcontent += '</tr></tbody></table>';

    $('.content', el).html(htmlcontent);
  }
};