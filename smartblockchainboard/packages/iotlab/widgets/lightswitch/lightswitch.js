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
    var statusCh = new WebSocket("ws://app.b0x.it:2763/light/status");
    var setCh = new WebSocket("ws://app.b0x.it:2763/light/set");

    disconnectClient = function() {
      statusCh.close();
      setCh.close();
    };

    setLight = function(state) {
      console.log("Setting state=" + state);
      setCh.send(state);
    };

    statusCh.onopen = function() {
      // Web Socket is connected, send data using send()
      // ws.send("This is iWidget!");
      document.getElementById("wsConnect").style.background='rgb(' + 0x00 + ',' + 0xFF + ',' + 0x00 + ')';
      connected = true;
      console.log("Websocket connected");
    };
    statusCh.onmessage = function (evt) {
      var receivedMsg = evt.data;

      console.log("Received light event " + receivedMsg);
      if (receivedMsg == 1) {
        // set image to lightbulb on
        document.getElementById("lightbulbOn").style="display:inline";
        document.getElementById("lightbulbOff").style="display:none";
      } else if (receivedMsg == 0) {
        // set image to lightbulb off
        document.getElementById("lightbulbOff").style="display:inline";
        document.getElementById("lightbulbOn").style="display:none";
      }
    };
    statusCh.onclose = function()
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