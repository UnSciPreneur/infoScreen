widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('h2', el).text(data.title);
    }

    //$('.content', el).html(data.text);

    connectSocket();
  }
};

function WSClick() {
  if (connected) {
    disconnectClient()
  }
  else {
    connectSocket()
  }
}

function connectSocket()
{
  if ("WebSocket" in window) {
    document.getElementById("wsConnect").style.background='rgb(' + 0xF0 + ',' + 0xF0 + ',' + 0x32 + ')';
    // Let us open a web socket
    var artCh = new WebSocket("ws://app.b0x.it:2763/canvas/art");

    disconnectClient = function() {
      artCh.close();
    };

    artCh.onopen = function() {
      // Web Socket is connected, send data using send()
      //ws.send("This is iWidget!");
      document.getElementById("wsConnect").style.background='rgb(' + 0x00 + ',' + 0xFF + ',' + 0x00 + ')';
      connected = true;
    };

    artCh.onmessage = function (evt) {
      var receivedMsg = evt.data;
      if (receivedMsg == "vangogh") {
        document.getElementById("vangogh").style="display:inline";
        document.getElementById("monet").style="display:none";
        document.getElementById("dali").style="display:none";
      }
      else if (receivedMsg == "monet") {
        document.getElementById("vangogh").style="display:none";
        document.getElementById("monet").style="display:inline";
        document.getElementById("dali").style="display:none";

      }
      else if (receivedMsg == "dali") {
        document.getElementById("vangogh").style="display:none";
        document.getElementById("monet").style="display:none";
        document.getElementById("dali").style="display:inline";

      } else {
        /*
        document.getElementById("vangogh").style="display:none";
        document.getElementById("monet").style="display:none";
        document.getElementById("dali").style="display:none";
        */
      }
    };

    artCh.onclose = function()
    {
      // websocket is closed.
      document.getElementById("wsConnect").style.background='rgb(' + 0xFF + ',' + 0x00 + ',' + 0x00 + ')';
      connected = false;
    };
  }
  else
  {
    // The browser doesn't support WebSocket
    document.getElementById("wsConnect").style.background='rgb(' + 0xFF + ',' + 0x00 + ',' + 0x00 + ')';
    connected = false;
  }
}